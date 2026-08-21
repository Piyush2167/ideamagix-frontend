"use client";
import { useState, useContext } from 'react';
import { DoctorAuthContext } from '../../context/DoctorAuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function DoctorSignup() {
  const [formData, setFormData] = useState({
    name: '', specialty: '', email: '', phone: '', experience: '', password: ''
  });
  const [file, setFile] = useState(null);
  const { register } = useContext(DoctorAuthContext);
  const router = useRouter();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    if (file) data.append('profilePicture', file);

    try {
      await register(data);
      router.push('/doctor/profile');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center bg-slate-50 p-4 py-12">
      <div className="w-full max-w-xl bg-white border border-slate-200 p-8 md:p-10 rounded-2xl shadow-sm">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-trench font-bold text-slate-900 mb-2">Join as a Doctor</h2>
          <p className="text-slate-500 text-sm">Create your professional profile to manage consultations.</p>
        </div>
        
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-6 text-sm border border-red-100">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-slate-700 text-sm font-medium mb-1.5">Full Name</label>
              <input type="text" name="name" required onChange={handleChange} className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" placeholder="Dr. Jane Smith" />
            </div>
            <div>
              <label className="block text-slate-700 text-sm font-medium mb-1.5">Specialty</label>
              <input type="text" name="specialty" required onChange={handleChange} className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" placeholder="e.g. Cardiologist" />
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-slate-700 text-sm font-medium mb-1.5">Email Address</label>
              <input type="email" name="email" required onChange={handleChange} className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" placeholder="doctor@example.com" />
            </div>
            <div>
              <label className="block text-slate-700 text-sm font-medium mb-1.5">Phone Number</label>
              <input type="tel" name="phone" required onChange={handleChange} className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" placeholder="+123456789" />
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-slate-700 text-sm font-medium mb-1.5">Experience (Years)</label>
              <input type="number" step="0.1" name="experience" required onChange={handleChange} className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" placeholder="e.g. 5.5" />
            </div>
            <div>
              <label className="block text-slate-700 text-sm font-medium mb-1.5">Password</label>
              <input type="password" name="password" required onChange={handleChange} className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" placeholder="Create a secure password" />
            </div>
          </div>
          
          <div className="pt-2">
            <label className="block text-slate-700 text-sm font-medium mb-1.5">Profile Picture</label>
            <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} className="w-full text-slate-600 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-colors cursor-pointer" />
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating Account...' : 'Register Account'}
          </button>
        </form>
        
        <p className="mt-8 text-center text-slate-500 text-sm">
          Already have an account?{' '}
          <Link href="/doctor/signin" className="text-blue-600 hover:text-blue-700 font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
