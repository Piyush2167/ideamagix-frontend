"use client";
import { useState, useContext } from 'react';
import { DoctorAuthContext } from '../../../context/DoctorAuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AuthShell from '../../../components/auth/AuthShell';
import { Input, Select } from '../../../components/ui/Field';
import Button from '../../../components/ui/Button';
import ImageUpload from '../../../components/ui/ImageUpload';
import { SPECIALTIES } from '../../../lib/specialties';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function DoctorSignup() {
  const [form, setForm] = useState({
    name: '', specialty: '', email: '', phone: '', experience: '', password: '',
  });
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useContext(DoctorAuthContext);
  const router = useRouter();

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = 'Name is required';
    if (!form.specialty) next.specialty = 'Select a specialty';
    if (!EMAIL_RE.test(form.email)) next.email = 'Enter a valid email address';
    if (form.phone.trim().length < 7) next.phone = 'Enter a valid phone number';
    if (!form.experience || Number(form.experience) < 0) next.experience = 'Enter years of experience';
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
    if (file) data.append('profilePicture', file);

    try {
      await register(data);
      router.push('/doctor/profile');
    } catch (err) {
      setServerError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell
      eyebrow="Doctor Portal"
      title="Join as a Doctor"
      subtitle="Create your professional profile to manage consultations."
      brandHeadline="Manage your practice, from anywhere."
      brandPoints={[
        'Review patient history before every call',
        'Write and send digital prescriptions in minutes',
        'Keep every consultation organized in one place',
      ]}
      switchHref="/patient/signup"
      switchLabel="Are you a patient? Go to Patient Portal"
      footer={
        <>
          Already have an account?{' '}
          <Link href="/doctor/login" className="font-medium text-clinic-600 hover:text-clinic-700">
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

        <Input id="name" label="Full name" required value={form.name} onChange={set('name')} error={errors.name} placeholder="Dr. Priya Nair" />

        <Select id="specialty" label="Specialty" required value={form.specialty} onChange={set('specialty')} error={errors.specialty}>
          <option value="">Select specialty</option>
          {SPECIALTIES.map((s) => <option key={s} value={s}>{s}</option>)}
        </Select>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input id="email" label="Email address" type="email" required value={form.email} onChange={set('email')} error={errors.email} placeholder="doctor@example.com" />
          <Input id="phone" label="Phone number" type="tel" required value={form.phone} onChange={set('phone')} error={errors.phone} placeholder="+91 98765 43210" />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input id="experience" label="Years of experience" type="number" step="0.1" min="0" required value={form.experience} onChange={set('experience')} error={errors.experience} placeholder="e.g. 5.5" />
          <Input id="password" label="Password" type="password" required value={form.password} onChange={set('password')} error={errors.password} placeholder="Create a secure password" />
        </div>

        <Button type="submit" className="w-full" loading={loading}>
          Create Doctor Account
        </Button>
      </form>
    </AuthShell>
  );
}
