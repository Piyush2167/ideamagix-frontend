"use client";
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import api from '../api/axios';

export default function PrescriptionForm() {
  const { id: consultationId } = useParams();
  const router = useRouter();
  
  const [consultation, setConsultation] = useState(null);
  const [careToBeTaken, setCareToBeTaken] = useState('');
  const [medicines, setMedicines] = useState([{ name: '', dosage: '', duration: '' }]);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(`/prescriptions/${consultationId}`);
        if (res.data.consultation) setConsultation(res.data.consultation);
        if (res.data.prescription) {
          setCareToBeTaken(res.data.prescription.careToBeTaken);
          setMedicines(res.data.prescription.medicines);
          setPdfUrl(res.data.prescription.pdfUrl);
          setVersion(res.data.prescription.version);
        }
      } catch (error) {
        console.error('Failed to fetch data', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [consultationId]);

  const handleMedChange = (index, field, value) => {
    const updated = [...medicines];
    updated[index][field] = value;
    setMedicines(updated);
  };

  const addMedicine = () => setMedicines([...medicines, { name: '', dosage: '', duration: '' }]);
  const removeMedicine = (index) => setMedicines(medicines.filter((_, i) => i !== index));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await api.post(`/prescriptions/${consultationId}`, { careToBeTaken, medicines });
      setPdfUrl(res.data.pdfUrl);
      setVersion(res.data.version);
      alert(version > 0 ? 'Prescription updated and resent!' : 'Prescription generated and sent!');
    } catch (error) {
      console.error(error);
      alert('Failed to save prescription');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="flex-1 bg-slate-50 flex items-center justify-center text-slate-500 font-medium">Loading Document...</div>;

  const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

  return (
    <div className="flex-1 bg-slate-100 p-4 md:p-8 flex justify-center py-10">
      <div className="w-full max-w-3xl">
        <div className="flex justify-between items-center mb-6 px-2">
          <h2 className="text-2xl font-bold text-slate-900">
            {version > 0 ? `Edit Prescription (v${version})` : 'Write Prescription'}
          </h2>
          <button onClick={() => router.push('/doctor/prescriptions')} className="text-slate-500 hover:text-slate-800 font-medium transition-colors text-sm">
            &larr; Back to List
          </button>
        </div>

        {/* Paper Document UI */}
        <div className="bg-white text-slate-900 shadow-sm border border-slate-200 rounded-sm overflow-hidden">
          {/* Header Section */}
          <div className="p-8 md:p-10 border-b-4 border-slate-900">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-bold uppercase tracking-wide text-slate-900 mb-1">Dr. {consultation?.doctor?.name || 'Doctor'}</h2>
                <div className="text-sm text-slate-600">
                  <p className="font-semibold text-slate-800">{consultation?.doctor?.specialty || 'General Physician'}</p>
                  <p>Contact: {consultation?.doctor?.phone || 'N/A'}</p>
                </div>
              </div>
              <div className="text-sm font-medium text-slate-600 text-right">
                <p>Date: <span className="font-bold text-slate-900">{today}</span></p>
                <p className="mt-1">Reg No: 123456</p>
              </div>
            </div>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="p-8 md:p-10 space-y-8">
            
            {/* Patient Info Block */}
            {consultation && (
              <div className="flex justify-between items-center pb-4 border-b border-slate-200">
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Patient Name</p>
                  <p className="font-bold text-slate-900 text-lg">{consultation.patient.name} <span className="text-slate-500 font-medium text-sm ml-2">({consultation.patient.age} Yrs)</span></p>
                </div>
                <div className="text-right max-w-xs">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Symptoms reported</p>
                  <p className="text-sm text-slate-700 truncate" title={consultation.currentIllnessHistory}>{consultation.currentIllnessHistory}</p>
                </div>
              </div>
            )}

            {/* Rx Symbol */}
            <div className="text-4xl font-serif font-bold text-slate-900">Rx</div>

            {/* Medicine box */}
            <div>
              <label className="block text-slate-900 font-bold mb-3 uppercase tracking-wide text-sm">Medications</label>
              <div className="w-full rounded-lg border border-slate-200 overflow-hidden">
                <div className="bg-slate-50 grid grid-cols-12 gap-2 p-3 border-b border-slate-200 text-xs font-bold text-slate-600 uppercase">
                  <div className="col-span-5">Medicine Name</div>
                  <div className="col-span-3">Dosage</div>
                  <div className="col-span-3">Duration</div>
                  <div className="col-span-1 text-center">Act</div>
                </div>
                {medicines.map((med, index) => (
                  <div key={index} className={`grid grid-cols-12 gap-2 p-3 items-center ${index !== medicines.length - 1 ? 'border-b border-slate-100' : ''}`}>
                    <div className="col-span-5">
                      <input required type="text" placeholder="e.g. Paracetamol 500mg" value={med.name} onChange={(e) => handleMedChange(index, 'name', e.target.value)} className="w-full bg-transparent border-0 border-b border-slate-300 p-1 outline-none focus:border-slate-900 text-sm font-medium text-slate-900 transition-colors" />
                    </div>
                    <div className="col-span-3">
                      <input required type="text" placeholder="e.g. 1-0-1" value={med.dosage} onChange={(e) => handleMedChange(index, 'dosage', e.target.value)} className="w-full bg-transparent border-0 border-b border-slate-300 p-1 outline-none focus:border-slate-900 text-sm text-slate-800 transition-colors" />
                    </div>
                    <div className="col-span-3">
                      <input required type="text" placeholder="e.g. 5 days" value={med.duration} onChange={(e) => handleMedChange(index, 'duration', e.target.value)} className="w-full bg-transparent border-0 border-b border-slate-300 p-1 outline-none focus:border-slate-900 text-sm text-slate-800 transition-colors" />
                    </div>
                    <div className="col-span-1 flex justify-center">
                      {medicines.length > 1 && (
                        <button type="button" onClick={() => removeMedicine(index)} className="text-slate-400 hover:text-red-600 transition-colors p-1" title="Remove">✕</button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <button type="button" onClick={addMedicine} className="mt-3 text-blue-600 hover:text-blue-800 text-sm font-semibold flex items-center gap-1">+ Add another medicine</button>
            </div>

            {/* Care to be taken box */}
            <div>
              <label className="block text-slate-900 font-bold mb-3 uppercase tracking-wide text-sm">General Advice / Care</label>
              <textarea 
                required 
                value={careToBeTaken} 
                onChange={(e) => setCareToBeTaken(e.target.value)} 
                rows="3" 
                placeholder="Dietary instructions, rest, etc."
                className="w-full border border-slate-200 rounded-lg p-4 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-800 text-sm transition-colors" 
              ></textarea>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-center justify-end pt-6 border-t border-slate-200">
              {pdfUrl && (
                <a href={`${process.env.NEXT_PUBLIC_API_BASE_URL}/${pdfUrl}`} target="_blank" rel="noreferrer" className="w-full sm:w-auto px-6 py-2.5 bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 hover:text-slate-900 font-medium rounded-lg transition-colors text-center shadow-sm">
                  Preview PDF
                </a>
              )}
              <button type="submit" disabled={saving} className="w-full sm:w-auto px-8 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-medium shadow-sm rounded-lg transition-colors disabled:opacity-70">
                {saving ? 'Generating Document...' : (version > 0 ? 'Update & Finalize' : 'Sign & Finalize')}
              </button>
            </div>
          </form>

          {/* Footer Section */}
          <div className="p-8 bg-slate-50 border-t-4 border-slate-900 text-right">
            <p className="text-slate-600 text-xs uppercase tracking-widest font-bold">Authorized Digital Signature</p>
            <p className="text-slate-900 font-serif italic text-2xl mt-2">{consultation?.doctor?.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
