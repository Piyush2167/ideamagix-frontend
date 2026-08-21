"use client";
import { useContext } from 'react';
import { DoctorAuthContext } from '../../context/DoctorAuthContext';
import { useRouter } from 'next/navigation';

export default function DoctorProfile() {
  const { doctor, logout } = useContext(DoctorAuthContext);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  if (!doctor) {
    return <div className="min-h-screen bg-slate-50 text-slate-500 p-8 flex items-center justify-center">Loading profile...</div>;
  }

  return (
    <div className="flex-1 bg-slate-50 p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8 border-b border-slate-200 pb-6">
          <div>
            <h2 className="text-3xl font-trench font-bold text-slate-900">Dashboard</h2>
            <p className="text-slate-500 mt-1">Manage your professional profile and patient consultations.</p>
          </div>
          <button onClick={handleLogout} className="px-5 py-2.5 bg-white text-slate-600 border border-slate-200 hover:bg-slate-100 rounded-lg transition-colors font-medium text-sm shadow-sm">
            Logout
          </button>
        </div>
        
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden mb-8">
          <div className="p-8 md:p-10 flex flex-col md:flex-row gap-8 items-center md:items-start">
            <div className="flex-shrink-0">
              <div className="w-32 h-32 rounded-full border-4 border-slate-100 overflow-hidden bg-slate-100 flex items-center justify-center text-4xl text-slate-400 font-bold">
                {doctor.profilePicture ? (
                  <img src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/${doctor.profilePicture}`} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <span>{doctor.name.charAt(0)}</span>
                )}
              </div>
            </div>
            
            <div className="flex-1 space-y-5 text-center md:text-left">
              <div>
                <h3 className="text-2xl font-bold text-slate-900">{doctor.name}</h3>
                <p className="text-blue-600 font-medium">{doctor.specialty}</p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                <div>
                  <p className="text-slate-500 text-sm font-medium">Email Address</p>
                  <p className="text-slate-900">{doctor.email}</p>
                </div>
                <div>
                  <p className="text-slate-500 text-sm font-medium">Phone</p>
                  <p className="text-slate-900">{doctor.phone}</p>
                </div>
                <div>
                  <p className="text-slate-500 text-sm font-medium">Experience</p>
                  <p className="text-slate-900">{doctor.experience} Years</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-8 md:p-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Patient Consultations</h3>
              <p className="text-slate-600 text-sm">Review incoming patient requests and write prescriptions.</p>
            </div>
            <button 
              onClick={() => router.push('/doctor/prescriptions')}
              className="w-full md:w-auto px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-lg shadow-sm transition-transform hover:-translate-y-0.5"
            >
              View Consultations
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
