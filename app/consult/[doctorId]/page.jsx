"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import api from '../../api/axios';
import Stepper from '../../components/Stepper';

export default function ConsultationForm({ params }) {
  const { doctorId } = params;
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [qrCode, setQrCode] = useState(null);
  
  const [formData, setFormData] = useState({
    currentIllnessHistory: '',
    recentSurgery: '',
    recentSurgeryTimeSpan: '',
    diabetic: false,
    allergies: '',
    others: '',
    qrPaymentTransactionId: ''
  });
  const [consentAccepted, setConsentAccepted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const steps = ['History', 'Details', 'Payment'];

  useEffect(() => {
    if (step === 3 && !qrCode) {
      const fetchQR = async () => {
        try {
          const res = await api.get('/consultations/qr');
          setQrCode(res.data.qr);
        } catch (error) {
          console.error("Failed to fetch QR", error);
        }
      };
      fetchQR();
    }
  }, [step, qrCode]);

  const handleChange = (e) => {
    const value = e.target.type === 'radio' ? e.target.value === 'true' : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const nextStep = () => setStep(s => Math.min(s + 1, 3));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.post('/consultations', { ...formData, doctorId });
      alert('Consultation submitted successfully!');
      router.push('/patient/doctors');
    } catch (error) {
      alert('Failed to submit consultation. Try again.');
      console.error(error);
      setSubmitting(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-slate-50 p-4 py-10">
      <div className="w-full max-w-3xl bg-white border border-slate-200 p-8 md:p-12 rounded-2xl shadow-sm">
        <h2 className="text-3xl font-trench font-bold text-slate-900 mb-2 text-center">Consultation Form</h2>
        <p className="text-slate-500 text-sm text-center mb-10">Please provide accurate information for the doctor.</p>
        
        <div className="max-w-xl mx-auto">
          <Stepper currentStep={step} steps={steps} />
        </div>

        <form onSubmit={step === 3 ? handleSubmit : (e) => { e.preventDefault(); nextStep(); }} className="mt-10 space-y-6">
          {step === 1 && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <label className="block text-slate-700 text-sm font-semibold mb-2">Current Illness History</label>
                <textarea required name="currentIllnessHistory" value={formData.currentIllnessHistory} onChange={handleChange} rows="4" className="w-full bg-white border border-slate-300 rounded-lg p-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors" placeholder="Describe your current symptoms..."></textarea>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-slate-700 text-sm font-semibold mb-2">Recent Surgery <span className="text-slate-400 font-normal">(If any)</span></label>
                  <input type="text" name="recentSurgery" value={formData.recentSurgery} onChange={handleChange} className="w-full bg-white border border-slate-300 rounded-lg p-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors" placeholder="e.g. Knee replacement" />
                </div>
                <div>
                  <label className="block text-slate-700 text-sm font-semibold mb-2">Time Span</label>
                  <input type="text" name="recentSurgeryTimeSpan" value={formData.recentSurgeryTimeSpan} onChange={handleChange} className="w-full bg-white border border-slate-300 rounded-lg p-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors" placeholder="e.g. 2 years ago" />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                <label className="block text-slate-700 text-sm font-semibold mb-3">Are you diabetic?</label>
                <div className="flex gap-6">
                  <label className="flex items-center text-slate-700 cursor-pointer">
                    <input type="radio" name="diabetic" value="true" checked={formData.diabetic === true} onChange={handleChange} className="mr-2 w-4 h-4 text-blue-600 focus:ring-blue-500 border-slate-300" /> Yes
                  </label>
                  <label className="flex items-center text-slate-700 cursor-pointer">
                    <input type="radio" name="diabetic" value="false" checked={formData.diabetic === false} onChange={handleChange} className="mr-2 w-4 h-4 text-blue-600 focus:ring-blue-500 border-slate-300" /> No
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-slate-700 text-sm font-semibold mb-2">Allergies</label>
                <input type="text" name="allergies" value={formData.allergies} onChange={handleChange} className="w-full bg-white border border-slate-300 rounded-lg p-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors" placeholder="e.g. Peanuts, Penicillin..." />
              </div>
              <div>
                <label className="block text-slate-700 text-sm font-semibold mb-2">Others <span className="text-slate-400 font-normal">(Any other medical condition)</span></label>
                <textarea name="others" value={formData.others} onChange={handleChange} rows="3" className="w-full bg-white border border-slate-300 rounded-lg p-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors" placeholder="Any additional context for the doctor"></textarea>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-8 animate-fadeIn">
              <div className="flex flex-col md:flex-row justify-between items-stretch border border-slate-200 rounded-xl overflow-hidden">
                
                {/* Left Side: QR Code */}
                <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8 bg-slate-50 border-b md:border-b-0 md:border-r border-slate-200">
                  <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wider mb-4">Scan to Pay</h3>
                  <div className="bg-white p-3 border border-slate-200 rounded-xl mb-4 w-48 h-48 flex items-center justify-center shadow-sm">
                    {qrCode ? (
                      <img src={qrCode} alt="Payment QR" className="w-full h-full object-contain rounded-lg" />
                    ) : (
                      <div className="w-full h-full bg-slate-200 animate-pulse rounded-lg"></div>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 uppercase font-medium mb-1">or use UPI ID</p>
                  <p className="text-slate-900 font-bold bg-white px-3 py-1 rounded-md border border-slate-200 select-all">
                    UPIIDREDACTED
                  </p>
                </div>

                {/* Right Side: Payment Details */}
                <div className="w-full md:w-1/2 p-8 flex flex-col justify-center bg-white">
                  <p className="text-slate-500 text-sm font-medium mb-1">Consultation Fee</p>
                  <p className="text-4xl font-trench font-bold text-slate-900 mb-6 flex items-start gap-1">
                    <span className="text-2xl mt-1">₹</span>600
                  </p>
                  
                  <div className="space-y-2">
                    <label className="block text-slate-700 text-sm font-semibold">Transaction ID*</label>
                    <p className="text-xs text-slate-500 mb-2">Enter the ID after completing the payment</p>
                    <input 
                      required 
                      type="text" 
                      name="qrPaymentTransactionId" 
                      value={formData.qrPaymentTransactionId} 
                      onChange={handleChange} 
                      placeholder="e.g. 123456789012"
                      className="w-full bg-white border border-slate-300 rounded-lg p-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors font-mono" 
                    />
                  </div>
                </div>
              </div>
              
              {/* Consent Section */}
              <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl">
                <h4 className="text-slate-800 text-sm font-bold tracking-wide mb-2">Consent for Online Consultation</h4>
                <p className="text-slate-600 text-xs leading-relaxed mb-5">
                  I have understood that this is an online consultation without a physical checkup of my symptoms. The doctor hence relies on my description of the problem or scanned reports provided by me. With this understanding, I hereby give my consent for online consultation.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200">
                  <label className="flex items-center text-slate-800 cursor-pointer text-sm font-semibold">
                    <input 
                      type="checkbox" 
                      required
                      checked={consentAccepted}
                      onChange={(e) => setConsentAccepted(e.target.checked)}
                      className="mr-3 w-5 h-5 text-blue-600 border-slate-300 rounded focus:ring-blue-500" 
                    /> 
                    I Accept the Terms
                  </label>
                  
                  <button 
                    type="submit" 
                    disabled={!consentAccepted || submitting}
                    className="w-full sm:w-auto px-8 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:text-slate-500 text-white font-medium transition-colors"
                  >
                    {submitting ? 'Submitting...' : 'Complete Appointment'}
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between mt-8 pt-6 border-t border-slate-100">
            {step > 1 && step < 3 ? (
              <button type="button" onClick={prevStep} className="px-6 py-2.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors font-medium">
                Back
              </button>
            ) : <div></div>}
            
            {step < 3 && (
              <button type="submit" className="px-8 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-medium shadow-sm transition-transform hover:-translate-y-0.5">
                Next Step
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
