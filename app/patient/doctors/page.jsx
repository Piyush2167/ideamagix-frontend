"use client";
import { useState, useEffect } from 'react';
import api from '../../api/axios';
import DoctorCard from '../../components/DoctorCard';

export default function DoctorsList() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await api.get('/doctors');
        setDoctors(res.data);
      } catch (error) {
        console.error("Failed to fetch doctors", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDoctors();
  }, []);

  return (
    <div className="flex-1 bg-slate-50 p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-10 border-b border-slate-200 pb-6">
          <div>
            <h2 className="text-3xl font-trench font-bold text-slate-900">Available Doctors</h2>
            <p className="text-slate-500 mt-1">Select a specialist for your consultation.</p>
          </div>
        </div>
        
        {loading ? (
          <div className="text-slate-400 text-lg text-center py-20 animate-pulse">Loading doctors...</div>
        ) : doctors.length === 0 ? (
          <div className="text-slate-500 text-center py-20 bg-white rounded-2xl border border-slate-200 shadow-sm">
            No doctors found. Please check back later.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {doctors.map(doc => (
              <DoctorCard key={doc._id} doctor={doc} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
