import Link from 'next/link';
import Avatar from '../ui/Avatar';
import Button from '../ui/Button';
import Container from '../ui/Container';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr';

const DOCTORS = [
  { name: 'Rohan Desai', specialty: 'General Physician', exp: '6 yrs' },
  { name: 'Farah Contractor', specialty: 'Dermatologist', exp: '4.5 yrs' },
];

export default function PatientSection() {
  return (
    <Container as="section" className="py-20 md:py-28">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="max-w-md">
          <p className="text-xs font-semibold uppercase tracking-wider text-clinic-500">For patients</p>
          <h2 className="mt-3 font-trench text-[clamp(1.75rem,3vw,2.25rem)] font-bold tracking-tight text-ink">Healthcare designed around you.</h2>
          <p className="mt-4 text-[15px] leading-relaxed text-ink/55">
            Search doctors by specialty, walk through a guided consultation form, and
            confirm payment in a few steps — no phone calls, no waiting rooms.
          </p>
          <Link href="/patient/signup" className="mt-7 inline-block">
            <Button>
              Find a Doctor
              <ArrowRight size={16} />
            </Button>
          </Link>
        </div>

        <div className="rounded-xl2 border border-line bg-white p-6 shadow-card md:p-8">
          <p className="text-xs font-semibold uppercase tracking-wide text-ink/40">Available doctors</p>
          <div className="mt-4 divide-y divide-line">
            {DOCTORS.map((doc) => (
              <div key={doc.name} className="flex items-center gap-3 py-3.5 first:pt-0 last:pb-0">
                <Avatar name={doc.name} size="sm" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-ink">Dr. {doc.name}</p>
                  <p className="truncate text-xs text-ink/45">{doc.specialty} · {doc.exp}</p>
                </div>
                <span className="shrink-0 text-xs font-medium text-clinic-600">Consult</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
}
