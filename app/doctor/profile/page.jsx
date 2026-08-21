"use client";
import { useContext } from 'react';
import { DoctorAuthContext } from '../../../context/DoctorAuthContext';
import { useRouter } from 'next/navigation';
import DoctorTopbar from '../../../components/doctor/DoctorTopbar';
import Container from '../../../components/ui/Container';
import Card from '../../../components/ui/Card';
import Avatar from '../../../components/ui/Avatar';
import Button from '../../../components/ui/Button';
import { ClipboardText, FileText } from '@phosphor-icons/react/dist/ssr';

function greeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

export default function DoctorProfile() {
  const { doctor } = useContext(DoctorAuthContext);
  const router = useRouter();

  if (!doctor) {
    return (
      <div className="flex min-h-[100dvh] flex-col bg-canvas">
        <DoctorTopbar />
        <div className="flex flex-1 items-center justify-center text-sm font-medium text-ink/45">Loading profile...</div>
      </div>
    );
  }

  const imageUrl = doctor.profilePicture ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/${doctor.profilePicture}` : null;

  return (
    <div className="flex min-h-[100dvh] flex-col bg-canvas">
      <DoctorTopbar />
      <Container as="main" className="flex-1 py-10">
        <div className="mb-8">
          <p className="text-sm text-ink/45">{greeting()}, Dr. {doctor.name.split(' ')[0]}</p>
          <h1 className="mt-1 font-trench text-[clamp(1.75rem,3.5vw,2.25rem)] font-bold tracking-tight text-ink">Dashboard</h1>
        </div>

        <Card className="mb-6 flex flex-col items-center gap-6 p-8 text-center md:flex-row md:items-start md:text-left md:p-10">
          <Avatar src={imageUrl} name={doctor.name} size="xl" />
          <div className="flex-1 space-y-5">
            <div>
              <h2 className="text-xl font-semibold text-ink">Dr. {doctor.name}</h2>
              <p className="text-sm font-medium text-clinic-600">{doctor.specialty}</p>
            </div>
            <div className="grid grid-cols-1 gap-4 border-t border-line pt-4 sm:grid-cols-3">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-ink/40">Email</p>
                <p className="mt-0.5 text-sm text-ink">{doctor.email}</p>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-ink/40">Phone</p>
                <p className="mt-0.5 text-sm text-ink">{doctor.phone}</p>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-ink/40">Experience</p>
                <p className="mt-0.5 text-sm text-ink">{doctor.experience} years</p>
              </div>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Card className="flex flex-col gap-4 p-6">
            <ClipboardText size={22} className="text-clinic-500" />
            <div>
              <h3 className="text-[15px] font-semibold text-ink">Consultations</h3>
              <p className="mt-1 text-sm text-ink/50">Review incoming patient requests and their medical history.</p>
            </div>
            <Button variant="secondary" className="mt-auto" onClick={() => router.push('/doctor/consultations')}>
              View Consultations
            </Button>
          </Card>
          <Card className="flex flex-col gap-4 p-6">
            <FileText size={22} className="text-clinic-500" />
            <div>
              <h3 className="text-[15px] font-semibold text-ink">Prescriptions</h3>
              <p className="mt-1 text-sm text-ink/50">Write or edit a digital prescription for a consultation.</p>
            </div>
            <Button variant="secondary" className="mt-auto" onClick={() => router.push('/doctor/prescriptions')}>
              View Prescriptions
            </Button>
          </Card>
        </div>
      </Container>
    </div>
  );
}
