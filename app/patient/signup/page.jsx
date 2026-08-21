"use client";
import { useState, useContext } from 'react';
import { PatientAuthContext } from '../../../context/PatientAuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AuthShell from '../../../components/auth/AuthShell';
import { Input, Textarea } from '../../../components/ui/Field';
import Button from '../../../components/ui/Button';
import ImageUpload from '../../../components/ui/ImageUpload';
import ChipInput from '../../../components/ui/ChipInput';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function PatientSignup() {
  const [form, setForm] = useState({
    name: '', age: '', email: '', phone: '', password: '', surgeryHistory: '',
  });
  const [illnessHistory, setIllnessHistory] = useState([]);
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useContext(PatientAuthContext);
  const router = useRouter();

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = 'Name is required';
    if (!form.age || Number(form.age) <= 0) next.age = 'Enter a valid age';
    if (!EMAIL_RE.test(form.email)) next.email = 'Enter a valid email address';
    if (form.phone.trim().length < 7) next.phone = 'Enter a valid phone number';
    if (form.password.length < 6) next.password = 'At least 6 characters';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');
    if (!validate()) return;
    setLoading(true);
    const data = new FormData();
    Object.entries(form).forEach(([key, value]) => data.append(key, value));
    data.append('illnessHistory', illnessHistory.join(','));
    if (file) data.append('profilePicture', file);

    try {
      await register(data);
      router.push('/patient/doctors');
    } catch (err) {
      setServerError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell
      eyebrow="Patient Portal"
      title="Join as a Patient"
      subtitle="Create an account to book consultations easily."
      brandHeadline="Healthcare consultations, without the waiting room."
      brandPoints={[
        'Consult licensed doctors from home',
        'Get a digital prescription you can trust',
        'Track every consultation in one place',
      ]}
      switchHref="/doctor/signup"
      switchLabel="Are you a doctor? Go to Doctor Portal"
      footer={
        <>
          Already have an account?{' '}
          <Link href="/patient/login" className="font-medium text-clinic-600 hover:text-clinic-700">
            Sign in
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        {serverError && (
          <div className="rounded-lg border border-rose-100 bg-rose-50 px-3.5 py-2.5 text-sm text-rose-700">
            {serverError}
          </div>
        )}

        <ImageUpload label="Profile picture" onChange={setFile} />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input id="name" label="Full name" required value={form.name} onChange={set('name')} error={errors.name} placeholder="Ananya Verma" />
          <Input id="age" label="Age" type="number" min="0" required value={form.age} onChange={set('age')} error={errors.age} placeholder="e.g. 34" />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input id="email" label="Email address" type="email" required value={form.email} onChange={set('email')} error={errors.email} placeholder="you@example.com" />
          <Input id="phone" label="Phone number" type="tel" required value={form.phone} onChange={set('phone')} error={errors.phone} placeholder="+91 98765 43210" />
        </div>

        <Input id="password" label="Password" type="password" required value={form.password} onChange={set('password')} error={errors.password} placeholder="Create a secure password" />

        <div className="border-t border-line pt-5">
          <p className="mb-4 text-sm font-semibold text-ink">Medical history</p>
          <div className="space-y-4">
            <Textarea id="surgeryHistory" label="History of surgery" helperText="Optional" value={form.surgeryHistory} onChange={set('surgeryHistory')} placeholder="Previous surgeries, if any..." rows={3} />
            <ChipInput
              label="History of illness"
              helperText="Type a condition and press Enter"
              values={illnessHistory}
              onChange={setIllnessHistory}
              placeholder="e.g. Diabetes, Asthma, Hypertension"
            />
          </div>
        </div>

        <Button type="submit" className="w-full" loading={loading}>
          Create Patient Account
        </Button>
      </form>
    </AuthShell>
  );
}
