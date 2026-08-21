"use client";
import { useState, useContext } from 'react';
import { PatientAuthContext } from '../../context/PatientAuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function PatientSignup() {
  const [formData, setFormData] = useState({
    name: '', age: '', email: '', phone: '', password: '', surgeryHistory: '', illnessHistory: ''
  });
  const [file, setFile] = useState(null);
  const { register } = useContext(PatientAuthContext);
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
      router.push('/patient/doctors');
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
          <h2 className="text-3xl font-trench font-bold text-slate-900 mb-2">Join as a Patient</h2>
          <p className="text-slate-500 text-sm">Create an account to book consultations easily.</p>
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
              <input type="text" name="name" required onChange={handleChange} className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" placeholder="John Doe" />
            </div>
            <div>
              <label className="block text-slate-700 text-sm font-medium mb-1.5">Age</label>
              <input type="number" name="age" required onChange={handleChange} className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" placeholder="e.g. 34" />
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-slate-700 text-sm font-medium mb-1.5">Email Address</label>
              <input type="email" name="email" required onChange={handleChange} className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" placeholder="john@example.com" />
            </div>
            <div>
              <label className="block text-slate-700 text-sm font-medium mb-1.5">Phone Number</label>
              <input type="tel" name="phone" required onChange={handleChange} className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" placeholder="+123456789" />
            </div>
          </div>
          
          <div>
            <label className="block text-slate-700 text-sm font-medium mb-1.5">Password</label>
            <input type="password" name="password" required onChange={handleChange} className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" placeholder="Create a secure password" />
          </div>
          
          <div className="pt-2 border-t border-slate-100">
            <h3 className="text-sm font-semibold text-slate-800 mb-3">Medical Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-slate-700 text-sm font-medium mb-1.5">Surgery History <span className="text-slate-400 font-normal">(Optional)</span></label>
                <input type="text" name="surgeryHistory" onChange={handleChange} className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" placeholder="e.g. Appendectomy 2019" />
              </div>
              <div>
                <label className="block text-slate-700 text-sm font-medium mb-1.5">Illness History <span className="text-slate-400 font-normal">(Comma separated)</span></label>
                <input type="text" name="illnessHistory" onChange={handleChange} className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" placeholder="e.g. Asthma, Diabetes" />
              </div>
            </div>
          </div>
          
          <div>
            <label className="block text-slate-700 text-sm font-medium mb-1.5">Profile Picture</label>
            <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} className="w-full text-slate-600 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200 transition-colors" />
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full mt-4 bg-slate-900 hover:bg-slate-800 text-white font-medium py-3 rounded-lg transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating Account...' : 'Register Account'}
          </button>
        </form>
        
        <p className="mt-8 text-center text-slate-500 text-sm">
          Already have an account?{' '}
          <Link href="/patient/signin" className="text-blue-600 hover:text-blue-700 font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
