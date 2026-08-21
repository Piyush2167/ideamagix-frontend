"use client";
import { useRouter } from 'next/navigation';

export default function DoctorCard({ doctor }) {
  const router = useRouter();
  
  const imageUrl = doctor.profilePicture 
    ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/${doctor.profilePicture}` 
    : 'https://via.placeholder.com/150';

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
      <div className="h-48 overflow-hidden bg-slate-100">
        <img src={imageUrl} alt={doctor.name} className="w-full h-full object-cover opacity-95 hover:opacity-100 transition-opacity" />
      </div>
      <div className="p-6">
        <h3 className="text-lg font-bold text-slate-900 mb-1 line-clamp-1">{doctor.name}</h3>
        <p className="text-blue-600 text-sm font-semibold mb-3 line-clamp-1">{doctor.specialty}</p>
        <p className="text-slate-500 text-sm mb-6">Experience: <span className="font-medium text-slate-700">{doctor.experience} years</span></p>
        
        <button 
          onClick={() => router.push(`/consult/${doctor._id}`)}
          className="w-full bg-slate-900 hover:bg-slate-800 text-white font-medium py-2.5 rounded-lg shadow-sm transition-colors"
        >
          Book Consult
        </button>
      </div>
    </div>
  );
}
