import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-white p-6 relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-100 via-white to-white -z-10"></div>
      
      <div className="max-w-3xl text-center space-y-8 z-10">
        <h1 className="text-5xl md:text-6xl font-trench font-bold text-slate-900 tracking-tight leading-tight">
          Modern Care,<br />
          <span className="text-blue-600">Simplified.</span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-600 font-sans max-w-xl mx-auto leading-relaxed">
          The most professional platform for doctors and patients to connect, consult, and manage prescriptions securely.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
          <Link 
            href="/patient/signin" 
            className="px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-medium shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5"
          >
            I am a Patient
          </Link>
          <Link 
            href="/doctor/signin" 
            className="px-8 py-4 bg-white hover:bg-slate-50 text-slate-900 border border-slate-200 rounded-xl font-medium shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5"
          >
            I am a Doctor
          </Link>
        </div>
      </div>
    </div>
  );
}
