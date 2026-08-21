"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import api from '../../../../api/axios';
import DoctorTopbar from '../../../../components/doctor/DoctorTopbar';
import Container from '../../../../components/ui/Container';
import Card from '../../../../components/ui/Card';
import Badge from '../../../../components/ui/Badge';
import Avatar from '../../../../components/ui/Avatar';
import Button from '../../../../components/ui/Button';
import Skeleton from '../../../../components/ui/Skeleton';
import EmptyState from '../../../../components/ui/EmptyState';
import { ArrowLeft, Warning } from '@phosphor-icons/react/dist/ssr';

function Field({ label, value }) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wide text-ink/40">{label}</p>
      <p className="mt-1 text-sm text-ink">{value || '—'}</p>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="border-t border-line pt-6 first:border-t-0 first:pt-0">
      <h2 className="mb-4 text-xs font-semibold uppercase tracking-wide text-ink/40">{title}</h2>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">{children}</div>
    </div>
  );
}

export default function ConsultationDetail({ params }) {
  const { consultationId } = params;
  const router = useRouter();
  const [consultation, setConsultation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    api.get(`/consultations/${consultationId}`)
      .then((res) => setConsultation(res.data))
      .catch((err) => {
        console.error('Failed to load consultation', err);
        setError(true);
      })
      .finally(() => setLoading(false));
  }, [consultationId]);

  return (
    <div className="flex min-h-[100dvh] flex-col bg-canvas">
      <DoctorTopbar />
      <Container as="main" className="flex-1 py-10">
        <button onClick={() => router.push('/doctor/consultations')} className="mb-6 flex items-center gap-1.5 text-sm font-medium text-ink/50 hover:text-ink">
          <ArrowLeft size={15} /> Back to Consultations
        </button>

        {loading ? (
          <Card className="space-y-6 p-8">
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
          </Card>
        ) : error || !consultation ? (
          <EmptyState
            icon={<Warning size={32} weight="light" />}
            title="Couldn't load this consultation"
            description="It may not exist, or you may not be authorized to view it."
            action={<Button variant="secondary" onClick={() => router.push('/doctor/consultations')}>Back to Consultations</Button>}
          />
        ) : (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <Card className="space-y-6 p-6 lg:col-span-2 md:p-8">
              <Section title="Patient Information">
                <div className="flex items-center gap-3 sm:col-span-2">
                  <Avatar
                    name={consultation.patient?.name}
                    src={consultation.patient?.profilePicture ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/${consultation.patient.profilePicture}` : null}
                  />
                  <div>
                    <p className="text-[15px] font-semibold text-ink">{consultation.patient?.name}</p>
                    <p className="text-sm text-ink/45">{consultation.patient?.age} years</p>
                  </div>
                </div>
                <Field label="Phone" value={consultation.patient?.phone} />
                <Field label="Email" value={consultation.patient?.email} />
              </Section>

              <Section title="Medical History">
                <div className="sm:col-span-2">
                  <Field label="Current illness" value={consultation.currentIllnessHistory} />
                </div>
                <Field label="Recent surgery" value={consultation.recentSurgery} />
                <Field label="Surgery time span" value={consultation.recentSurgeryTimeSpan} />
              </Section>

              <Section title="Family History">
                <Field label="Diabetic" value={consultation.diabetic ? 'Yes' : 'No'} />
                <Field label="Allergies" value={consultation.allergies} />
                <div className="sm:col-span-2">
                  <Field label="Others" value={consultation.others} />
                </div>
              </Section>
            </Card>

            <div className="space-y-6">
              <Card className="space-y-4 p-6">
                <h2 className="text-xs font-semibold uppercase tracking-wide text-ink/40">Payment</h2>
                <Field label="Transaction ID" value={consultation.qrPaymentTransactionId} />
                <Field label="Status" value={<Badge tone={consultation.status}>{consultation.status}</Badge>} />
              </Card>

              <Button className="w-full" onClick={() => router.push(`/doctor/prescriptions/${consultation._id}`)}>
                {consultation.status === 'completed' ? 'Edit Prescription' : 'Write Prescription'}
              </Button>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}
