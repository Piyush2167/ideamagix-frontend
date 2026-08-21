"use client";
import { useState, useEffect } from 'react';
import api from '../../api/axios';
import { useRouter } from 'next/navigation';

export default function PrescriptionPage() {
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchConsultations = async () => {
      try {
        const res = await api.get('/consultations/doctor');
        setConsultations(res.data);
      } catch (error) {
        console.error('Failed to fetch consultations', error);
      } finally {
        setLoading(false);
      }
    };
    fetchConsultations();
  }, []);

  return (
    <div className="flex-1 bg-slate-50 p-6 md:p-12">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8 border-b border-slate-200 pb-6">
          <div>
            <h2 className="text-3xl font-trench font-bold text-slate-900">Patient Consultations</h2>
            <p className="text-slate-500 mt-1">Pending and completed patient consultations.</p>
          </div>
          <button onClick={() => router.push('/doctor/profile')} className="px-4 py-2 text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded-lg transition-colors text-sm font-medium shadow-sm">
            &larr; Back to Dashboard
          </button>
        </div>

        {loading ? (
          <div className="text-slate-400 animate-pulse text-center py-20 font-medium">Loading consultations...</div>
        ) : consultations.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center text-slate-500 shadow-sm">
            <p className="text-lg">No consultations right now.</p>
            <p className="text-sm mt-1 text-slate-400">When patients book you, they will appear here.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {consultations.map(consult => (
              <div key={consult._id} className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition-all hover:shadow-md">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-lg font-bold text-slate-900">{consult.patient?.name}</h3>
                    <span className="text-slate-400 text-sm">• {consult.patient?.age} yrs</span>
                    <span className={`px-2.5 py-0.5 rounded-md text-xs font-semibold ${consult.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                      {consult.status.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-slate-600 text-sm line-clamp-2"><span className="font-semibold text-slate-700">Symptoms:</span> {consult.currentIllnessHistory}</p>
                </div>
                
                <button 
                  onClick={() => router.push(`/doctor/prescription/${consult._id}`)}
                  className="w-full md:w-auto px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm transition-colors whitespace-nowrap text-sm"
                >
                  {consult.status === 'completed' ? 'Edit Prescription' : 'Write Prescription'}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
