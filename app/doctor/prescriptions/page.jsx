"use client";
import { useState, useEffect } from 'react';
import api from '../../../api/axios';
import { useRouter } from 'next/navigation';
import DoctorTopbar from '../../../components/doctor/DoctorTopbar';
import Container from '../../../components/ui/Container';
import Card from '../../../components/ui/Card';
import Badge from '../../../components/ui/Badge';
import Button from '../../../components/ui/Button';
import Avatar from '../../../components/ui/Avatar';
import Skeleton from '../../../components/ui/Skeleton';
import EmptyState from '../../../components/ui/EmptyState';
import { FileText, ArrowClockwise } from '@phosphor-icons/react/dist/ssr';

export default function PrescriptionsPage() {
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const router = useRouter();

  const fetchConsultations = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await api.get('/consultations/doctor');
      setConsultations(res.data);
    } catch (err) {
      console.error('Failed to fetch consultations', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConsultations();
  }, []);

  return (
    <div className="flex min-h-[100dvh] flex-col bg-canvas">
      <DoctorTopbar />
      <Container as="main" className="flex-1 py-10">
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-clinic-500">Prescriptions</p>
          <h1 className="mt-1 font-trench text-[clamp(1.75rem,3.5vw,2.25rem)] font-bold tracking-tight text-ink">Patient consultations</h1>
          <p className="mt-1 text-sm text-ink/45">Select a consultation to write or edit a prescription.</p>
        </div>

        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <Card key={i} className="flex items-center gap-4 p-5">
                <Skeleton className="h-11 w-11 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-1/3" />
                  <Skeleton className="h-3.5 w-2/3" />
                </div>
                <Skeleton className="h-9 w-32 rounded-lg" />
              </Card>
            ))}
          </div>
        ) : error ? (
          <EmptyState
            title="Something went wrong"
            description="We couldn't load your consultations. Please try again."
            action={<Button variant="secondary" onClick={fetchConsultations}><ArrowClockwise size={16} />Try Again</Button>}
          />
        ) : consultations.length === 0 ? (
          <EmptyState
            icon={<FileText size={32} weight="light" />}
            title="No consultations yet"
            description="When patients book you, they'll appear here ready for a prescription."
          />
        ) : (
          <div className="space-y-3">
            {consultations.map((consult) => (
              <Card key={consult._id} className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center">
                <Avatar src={consult.patient?.profilePicture ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/${consult.patient.profilePicture}` : null} name={consult.patient?.name} />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-[15px] font-semibold text-ink">{consult.patient?.name}</h3>
                    <span className="text-sm text-ink/40">{consult.patient?.age} yrs</span>
                    <Badge tone={consult.status}>{consult.status}</Badge>
                  </div>
                  <p className="mt-1 truncate text-sm text-ink/50">{consult.currentIllnessHistory}</p>
                </div>
                <Button
                  size="sm"
                  className="w-full sm:w-auto"
                  onClick={() => router.push(`/doctor/prescriptions/${consult._id}`)}
                >
                  {consult.status === 'completed' ? 'Edit Prescription' : 'Write Prescription'}
                </Button>
              </Card>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}
