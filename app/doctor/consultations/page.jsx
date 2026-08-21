"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import api from '../../../api/axios';
import DoctorTopbar from '../../../components/doctor/DoctorTopbar';
import Container from '../../../components/ui/Container';
import Card from '../../../components/ui/Card';
import Badge from '../../../components/ui/Badge';
import Avatar from '../../../components/ui/Avatar';
import Button from '../../../components/ui/Button';
import Skeleton from '../../../components/ui/Skeleton';
import EmptyState from '../../../components/ui/EmptyState';
import { ClipboardText, ArrowClockwise } from '@phosphor-icons/react/dist/ssr';

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
}

export default function DoctorConsultations() {
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
          <p className="text-xs font-semibold uppercase tracking-wider text-clinic-500">Consultations</p>
          <h1 className="mt-1 font-trench text-[clamp(1.75rem,3.5vw,2.25rem)] font-bold tracking-tight text-ink">Consultation management</h1>
        </div>

        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-16 w-full rounded-lg" />)}
          </div>
        ) : error ? (
          <EmptyState
            title="Something went wrong"
            description="We couldn't load your consultations. Please try again."
            action={<Button variant="secondary" onClick={fetchConsultations}><ArrowClockwise size={16} />Try Again</Button>}
          />
        ) : consultations.length === 0 ? (
          <EmptyState
            icon={<ClipboardText size={32} weight="light" />}
            title="No consultations yet"
            description="When patients book you, their requests will appear here."
          />
        ) : (
          <>
            {/* Desktop table */}
            <Card className="hidden overflow-hidden md:block">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-line text-xs font-semibold uppercase tracking-wide text-ink/40">
                    <th className="px-5 py-3.5 font-semibold">Patient</th>
                    <th className="px-5 py-3.5 font-semibold">Date</th>
                    <th className="px-5 py-3.5 font-semibold">Consultation ID</th>
                    <th className="px-5 py-3.5 font-semibold">Status</th>
                    <th className="px-5 py-3.5 font-semibold">Payment</th>
                    <th className="px-5 py-3.5 font-semibold"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {consultations.map((c) => (
                    <tr key={c._id}>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <Avatar size="sm" name={c.patient?.name} src={c.patient?.profilePicture ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/${c.patient.profilePicture}` : null} />
                          <div>
                            <p className="font-medium text-ink">{c.patient?.name}</p>
                            <p className="text-xs text-ink/40">{c.patient?.age} yrs</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3.5 font-mono text-ink/60">{formatDate(c.createdAt)}</td>
                      <td className="px-5 py-3.5 font-mono text-ink/60">CONS-{c._id.slice(-6).toUpperCase()}</td>
                      <td className="px-5 py-3.5"><Badge tone={c.status}>{c.status}</Badge></td>
                      <td className="px-5 py-3.5 text-ink/60">{c.qrPaymentTransactionId ? 'Reference submitted' : '—'}</td>
                      <td className="px-5 py-3.5 text-right">
                        <Button size="sm" variant="secondary" onClick={() => router.push(`/doctor/consultations/${c._id}`)}>View</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>

            {/* Mobile cards */}
            <div className="space-y-3 md:hidden">
              {consultations.map((c) => (
                <Card key={c._id} className="p-4">
                  <div className="flex items-center gap-3">
                    <Avatar size="sm" name={c.patient?.name} src={c.patient?.profilePicture ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/${c.patient.profilePicture}` : null} />
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium text-ink">{c.patient?.name}</p>
                      <p className="text-xs text-ink/40">{formatDate(c.createdAt)} · CONS-{c._id.slice(-6).toUpperCase()}</p>
                    </div>
                    <Badge tone={c.status}>{c.status}</Badge>
                  </div>
                  <Button size="sm" variant="secondary" className="mt-4 w-full" onClick={() => router.push(`/doctor/consultations/${c._id}`)}>
                    View
                  </Button>
                </Card>
              ))}
            </div>
          </>
        )}
      </Container>
    </div>
  );
}
