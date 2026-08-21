"use client";
import { useState, useContext } from 'react';
import { DoctorAuthContext } from '../../../context/DoctorAuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AuthShell from '../../../components/auth/AuthShell';
import { Input } from '../../../components/ui/Field';
import Button from '../../../components/ui/Button';

export default function DoctorLogin() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useContext(DoctorAuthContext);
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
      router.push('/doctor/profile');
    } catch (err) {
      setServerError(err.response?.data?.message || 'Unable to sign in. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell
      eyebrow="Doctor Portal"
      title="Sign in to manage your consultations"
      brandHeadline="Manage your practice, from anywhere."
      brandPoints={[
        'Review patient history before every call',
        'Write and send digital prescriptions in minutes',
        'Keep every consultation organized in one place',
      ]}
      switchHref="/patient/login"
      switchLabel="Are you a patient? Go to Patient Portal"
      footer={
        <>
          Don't have an account?{' '}
          <Link href="/doctor/signup" className="font-medium text-clinic-600 hover:text-clinic-700">
            Create Doctor Account
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
          placeholder="doctor@example.com"
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
