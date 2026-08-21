"use client";
import { useState, useEffect } from 'react';
import api from '../../../api/axios';
import PatientTopbar from '../../../components/patient/PatientTopbar';
import Container from '../../../components/ui/Container';
import Card from '../../../components/ui/Card';
import Badge from '../../../components/ui/Badge';
import Avatar from '../../../components/ui/Avatar';
import Button from '../../../components/ui/Button';
import Skeleton from '../../../components/ui/Skeleton';
import EmptyState from '../../../components/ui/EmptyState';
import Link from 'next/link';
import { CalendarBlank, ArrowClockwise } from '@phosphor-icons/react/dist/ssr';

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
}

export default function PatientConsultations() {
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchConsultations = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await api.get('/consultations/patient');
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
      <PatientTopbar />
      <Container as="main" className="flex-1 py-10">
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-clinic-500">Track</p>
          <h1 className="mt-1 font-trench text-[clamp(1.75rem,3.5vw,2.25rem)] font-bold tracking-tight text-ink">My consultations</h1>
        </div>

        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-20 w-full rounded-xl2" />)}
          </div>
        ) : error ? (
          <EmptyState
            title="Something went wrong"
            description="We couldn't load your consultations. Please try again."
            action={<Button variant="secondary" onClick={fetchConsultations}><ArrowClockwise size={16} />Try Again</Button>}
          />
        ) : consultations.length === 0 ? (
          <EmptyState
            icon={<CalendarBlank size={32} weight="light" />}
            title="No consultations yet"
            description="Once you book a doctor, your consultations will appear here."
            action={<Link href="/patient/doctors"><Button>Find a Doctor</Button></Link>}
          />
        ) : (
          <div className="space-y-3">
            {consultations.map((c) => (
              <Card key={c._id} className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center">
                <Avatar
                  name={c.doctor?.name}
                  src={c.doctor?.profilePicture ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/${c.doctor.profilePicture}` : null}
                />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-[15px] font-semibold text-ink">Dr. {c.doctor?.name}</h3>
                    <span className="text-sm text-ink/40">{c.doctor?.specialty}</span>
                  </div>
                  <p className="mt-1 text-sm text-ink/45">{formatDate(c.createdAt)} · CONS-{c._id.slice(-6).toUpperCase()}</p>
                </div>
                <Badge tone={c.status}>{c.status}</Badge>
              </Card>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}
