"use client";
import { useState, useEffect } from 'react';
import api from '../../../api/axios';
import PatientTopbar from '../../../components/patient/PatientTopbar';
import Container from '../../../components/ui/Container';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import Skeleton from '../../../components/ui/Skeleton';
import EmptyState from '../../../components/ui/EmptyState';
import Link from 'next/link';
import { FileText, ArrowClockwise, DownloadSimple } from '@phosphor-icons/react/dist/ssr';

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
}

export default function PatientPrescriptions() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchPrescriptions = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await api.get('/prescriptions/mine');
      setPrescriptions(res.data);
    } catch (err) {
      console.error('Failed to fetch prescriptions', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrescriptions();
  }, []);

  return (
    <div className="flex min-h-[100dvh] flex-col bg-canvas">
      <PatientTopbar />
      <Container as="main" className="flex-1 py-10">
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-clinic-500">Records</p>
          <h1 className="mt-1 font-trench text-[clamp(1.75rem,3.5vw,2.25rem)] font-bold tracking-tight text-ink">My prescriptions</h1>
        </div>

        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-20 w-full rounded-xl2" />)}
          </div>
        ) : error ? (
          <EmptyState
            title="Something went wrong"
            description="We couldn't load your prescriptions. Please try again."
            action={<Button variant="secondary" onClick={fetchPrescriptions}><ArrowClockwise size={16} />Try Again</Button>}
          />
        ) : prescriptions.length === 0 ? (
          <EmptyState
            icon={<FileText size={32} weight="light" />}
            title="No prescriptions yet"
            description="Once a doctor reviews your consultation, your prescription will appear here."
            action={<Link href="/patient/doctors"><Button>Find a Doctor</Button></Link>}
          />
        ) : (
          <div className="space-y-3">
            {prescriptions.map((p) => (
              <Card key={p._id} className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center">
                <div className="min-w-0 flex-1">
                  <h3 className="text-[15px] font-semibold text-ink">Dr. {p.consultation?.doctor?.name}</h3>
                  <p className="text-sm text-ink/45">{p.consultation?.doctor?.specialty} · {formatDate(p.createdAt)}</p>
                  <p className="mt-1 truncate text-sm text-ink/50">{p.medicines?.length || 0} medicine(s) prescribed</p>
                </div>
                {p.pdfUrl && (
                  <a href={`${process.env.NEXT_PUBLIC_API_BASE_URL}/${p.pdfUrl}`} target="_blank" rel="noreferrer">
                    <Button variant="secondary" size="sm" className="w-full sm:w-auto">
                      <DownloadSimple size={15} />
                      View PDF
                    </Button>
                  </a>
                )}
              </Card>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}
