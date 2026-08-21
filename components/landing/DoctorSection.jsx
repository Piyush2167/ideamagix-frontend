import Link from 'next/link';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import Container from '../ui/Container';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr';

const ROWS = [
  { patient: 'Meera Pillai', status: 'pending', date: 'Today' },
  { patient: 'Devansh Oberoi', status: 'completed', date: 'Yesterday' },
];

export default function DoctorSection() {
  return (
    <section id="for-doctors" className="scroll-mt-16 border-t border-line bg-white">
      <Container className="py-20 md:py-28">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="order-2 rounded-xl2 border border-line bg-canvas p-6 shadow-card md:p-8 lg:order-1">
            <p className="text-xs font-semibold uppercase tracking-wide text-ink/40">Consultations</p>
            <div className="mt-4 divide-y divide-line">
              {ROWS.map((row) => (
                <div key={row.patient} className="flex items-center justify-between py-3.5 first:pt-0 last:pb-0">
                  <div>
                    <p className="text-sm font-medium text-ink">{row.patient}</p>
                    <p className="text-xs text-ink/40">{row.date}</p>
                  </div>
                  <Badge tone={row.status}>{row.status}</Badge>
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-lg border border-line bg-white p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-ink/40">Prescription</p>
              <p className="mt-2 text-sm font-medium text-ink">Cetirizine · 10mg</p>
              <p className="text-xs text-ink/45">Once daily · 7 days</p>
            </div>
          </div>

          <div className="order-1 max-w-md lg:order-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-clinic-500">For doctors</p>
            <h2 className="mt-3 font-trench text-[clamp(1.75rem,3vw,2.25rem)] font-bold tracking-tight text-ink">A simpler way to manage consultations.</h2>
            <p className="mt-4 text-[15px] leading-relaxed text-ink/55">
              See every consultation request in one dashboard, review each patient's
              medical history, and issue a digital prescription in minutes.
            </p>
            <Link href="/doctor/signup" className="mt-7 inline-block">
              <Button>
                Join as a Doctor
                <ArrowRight size={16} />
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
