"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import api from '../../../../../api/axios';
import Stepper from '../../../../../components/Stepper';
import PatientTopbar from '../../../../../components/patient/PatientTopbar';
import { Input, Textarea } from '../../../../../components/ui/Field';
import RadioCard from '../../../../../components/ui/RadioCard';
import Button from '../../../../../components/ui/Button';
import Skeleton from '../../../../../components/ui/Skeleton';
import { CheckCircle, QrCode } from '@phosphor-icons/react/dist/ssr';

const CONSULTATION_FEE = 500;
const STEPS = ['Medical History', 'Family History', 'Payment'];

export default function ConsultationForm({ params }) {
  const { doctorId } = params;
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [doctor, setDoctor] = useState(null);
  const [qrCode, setQrCode] = useState(null);
  const [success, setSuccess] = useState(null);

  const [formData, setFormData] = useState({
    currentIllnessHistory: '',
    recentSurgery: '',
    recentSurgeryTimeSpan: '',
    diabetic: null,
    allergies: '',
    others: '',
    qrPaymentTransactionId: '',
  });
  const [errors, setErrors] = useState({});
  const [consentAccepted, setConsentAccepted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    api.get('/doctors').then((res) => {
      setDoctor(res.data.find((d) => d._id === doctorId) || null);
    }).catch(() => setDoctor(null));
  }, [doctorId]);

  useEffect(() => {
    if (step === 3 && !qrCode) {
      api.get('/consultations/qr').then((res) => setQrCode(res.data.qr)).catch((err) => console.error('Failed to fetch QR', err));
    }
  }, [step, qrCode]);

  const set = (key) => (e) => setFormData({ ...formData, [key]: e.target.value });

  const validateStep1 = () => {
    const next = {};
    if (!formData.currentIllnessHistory.trim()) next.currentIllnessHistory = 'Please describe your current condition';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const validateStep2 = () => {
    const next = {};
    if (formData.diabetic === null) next.diabetic = 'Please select an option';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const nextStep = () => {
    const valid = step === 1 ? validateStep1() : step === 2 ? validateStep2() : true;
    if (valid) setStep((s) => Math.min(s + 1, 3));
  };
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.qrPaymentTransactionId.trim()) {
      setErrors({ qrPaymentTransactionId: 'Enter your payment transaction ID' });
      return;
    }
    setSubmitError('');
    setSubmitting(true);
    try {
      const res = await api.post('/consultations', { ...formData, doctorId });
      setSuccess(res.data);
    } catch (err) {
      setSubmitError(err.response?.data?.message || 'Failed to submit consultation. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    const code = `CONS-${success._id.slice(-6).toUpperCase()}`;
    return (
      <div className="flex min-h-[100dvh] flex-col bg-canvas">
        <PatientTopbar />
        <main className="flex flex-1 items-center justify-center px-4 py-16">
          <div className="w-full max-w-md rounded-xl2 border border-line bg-white p-10 text-center shadow-card">
            <CheckCircle size={40} weight="light" className="mx-auto text-clinic-500" />
            <h1 className="mt-5 font-trench text-2xl font-bold text-ink">Consultation submitted</h1>
            <p className="mt-2 text-sm leading-relaxed text-ink/50">
              Your consultation request has been successfully sent to {doctor ? `Dr. ${doctor.name}` : 'your doctor'}.
            </p>
            <p className="mt-6 font-mono text-sm tracking-wide text-ink/60">{code}</p>
            <Button className="mt-8 w-full" onClick={() => router.push('/patient/doctors')}>
              Back to Doctors
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-[100dvh] flex-col bg-canvas">
      <PatientTopbar />
      <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-10 md:py-14">
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-clinic-500">Consultation</p>
          <h1 className="mt-1 font-trench text-2xl font-bold text-ink">
            {doctor ? `Consult Dr. ${doctor.name}` : <Skeleton className="h-7 w-56" />}
          </h1>
          {doctor && <p className="mt-1 text-sm text-ink/45">{doctor.specialty}</p>}
        </div>

        <div className="rounded-xl2 border border-line bg-white p-6 shadow-card md:p-10">
          <Stepper currentStep={step} steps={STEPS} />

          <form onSubmit={step === 3 ? handleSubmit : (e) => { e.preventDefault(); nextStep(); }} className="mt-10 space-y-6">
            {step === 1 && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-ink">Tell us about your current condition</h2>
                <Textarea
                  id="currentIllnessHistory"
                  label="Current illness history"
                  required
                  rows={4}
                  value={formData.currentIllnessHistory}
                  onChange={set('currentIllnessHistory')}
                  error={errors.currentIllnessHistory}
                  placeholder="Describe your current illness, symptoms, duration, and any relevant information..."
                />
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <Input
                    id="recentSurgery"
                    label="Recent surgery"
                    helperText="If any"
                    value={formData.recentSurgery}
                    onChange={set('recentSurgery')}
                    placeholder="e.g. Appendix surgery"
                  />
                  <Input
                    id="recentSurgeryTimeSpan"
                    label="Time span"
                    value={formData.recentSurgeryTimeSpan}
                    onChange={set('recentSurgeryTimeSpan')}
                    placeholder="e.g. 6 months ago"
                  />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-ink">Medical & family history</h2>
                <div>
                  <p className="mb-3 text-sm font-medium text-ink">Diabetes<span className="ml-0.5 text-clinic-500">*</span></p>
                  <div className="grid grid-cols-2 gap-3">
                    <RadioCard name="diabetic" label="Diabetic" checked={formData.diabetic === true} onChange={() => setFormData({ ...formData, diabetic: true })} />
                    <RadioCard name="diabetic" label="Non-Diabetic" checked={formData.diabetic === false} onChange={() => setFormData({ ...formData, diabetic: false })} />
                  </div>
                  {errors.diabetic && <p className="mt-1.5 text-sm text-rose-600">{errors.diabetic}</p>}
                </div>
                <Input id="allergies" label="Any allergies" value={formData.allergies} onChange={set('allergies')} placeholder="List any known allergies..." />
                <Textarea id="others" label="Others" rows={3} value={formData.others} onChange={set('others')} placeholder="Any other medical information you want the doctor to know..." />
              </div>
            )}

            {step === 3 && (
              <div className="space-y-8">
                <h2 className="text-lg font-semibold text-ink">Payment</h2>
                <p className="-mt-4 text-sm text-ink/50">Complete your consultation payment to submit your consultation request.</p>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="rounded-lg border border-line bg-canvas p-6 text-center">
                    <p className="text-xs font-medium uppercase tracking-wide text-ink/45">Consultation Fee</p>
                    <p className="mt-2 font-trench text-3xl font-bold text-ink">₹{CONSULTATION_FEE}</p>
                    <div className="mx-auto mt-5 flex h-36 w-36 items-center justify-center rounded-lg border border-line bg-white">
                      {qrCode ? (
                        <img src={qrCode} alt="Payment QR" className="h-full w-full rounded-md object-contain p-2" />
                      ) : (
                        <QrCode size={28} className="animate-pulse text-ink/20" />
                      )}
                    </div>
                    <p className="mt-3 text-xs font-medium uppercase tracking-wide text-ink/40">Scan to Pay</p>
                  </div>

                  <div className="flex flex-col justify-center">
                    <Input
                      id="qrPaymentTransactionId"
                      label="Transaction ID"
                      required
                      helperText="Enter the ID after completing the payment"
                      value={formData.qrPaymentTransactionId}
                      onChange={set('qrPaymentTransactionId')}
                      error={errors.qrPaymentTransactionId}
                      placeholder="e.g. 123456789012"
                      className="font-mono"
                    />
                  </div>
                </div>

                {submitError && (
                  <div className="rounded-lg border border-rose-100 bg-rose-50 px-3.5 py-2.5 text-sm text-rose-700">
                    {submitError}
                  </div>
                )}

                <label className="flex cursor-pointer items-start gap-3 border-t border-line pt-6 text-sm text-ink/60">
                  <input
                    type="checkbox"
                    required
                    checked={consentAccepted}
                    onChange={(e) => setConsentAccepted(e.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded border-line text-clinic-500 focus:ring-clinic-500/30"
                  />
                  I understand this is an online consultation without a physical checkup, and I consent to proceed based on the information I've provided.
                </label>
              </div>
            )}

            <div className="flex justify-between border-t border-line pt-6">
              {step > 1 ? (
                <Button type="button" variant="secondary" onClick={prevStep}>Back</Button>
              ) : <span />}

              {step < 3 ? (
                <Button type="submit">Continue</Button>
              ) : (
                <Button type="submit" disabled={!consentAccepted} loading={submitting}>
                  Submit Consultation
                </Button>
              )}
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
