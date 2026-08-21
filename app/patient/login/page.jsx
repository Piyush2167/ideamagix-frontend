"use client";
import { useState, useContext } from 'react';
import { PatientAuthContext } from '../../../context/PatientAuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AuthShell from '../../../components/auth/AuthShell';
import { Input } from '../../../components/ui/Field';
import Button from '../../../components/ui/Button';

export default function PatientLogin() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useContext(PatientAuthContext);
  const router = useRouter();

  const validate = () => {
    const next = {};
    if (!form.email.trim()) next.email = 'Email is required';
    if (!form.password) next.password = 'Password is required';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');
    if (!validate()) return;
    setLoading(true);
    try {
      await login(form.email, form.password);
      router.push('/patient/doctors');
    } catch (err) {
      setServerError(err.response?.data?.message || 'Unable to sign in. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell
      eyebrow="Patient Portal"
      title="Welcome back"
      brandHeadline="Healthcare consultations, without the waiting room."
      brandPoints={[
        'Consult licensed doctors from home',
        'Get a digital prescription you can trust',
        'Track every consultation in one place',
      ]}
      switchHref="/doctor/login"
      switchLabel="Are you a doctor? Go to Doctor Portal"
      footer={
        <>
          Don't have an account?{' '}
          <Link href="/patient/signup" className="font-medium text-clinic-600 hover:text-clinic-700">
            Create Patient Account
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        {serverError && (
          <div className="rounded-lg border border-rose-100 bg-rose-50 px-3.5 py-2.5 text-sm text-rose-700">
            {serverError}
          </div>
        )}
        <Input
          id="email"
          label="Email"
          type="email"
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          error={errors.email}
          placeholder="you@example.com"
        />
        <Input
          id="password"
          label="Password"
          type="password"
          required
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          error={errors.password}
          placeholder="••••••••"
        />
        <Button type="submit" className="w-full" loading={loading}>
          Sign In
        </Button>
      </form>
    </AuthShell>
  );
}
