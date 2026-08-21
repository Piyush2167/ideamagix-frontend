import Link from 'next/link';
import Button from '../ui/Button';
import Avatar from '../ui/Avatar';
import Badge from '../ui/Badge';
import Container from '../ui/Container';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr';

export default function Hero() {
  return (
    <Container className="grid grid-cols-1 items-center gap-14 py-16 md:py-24 lg:grid-cols-2 lg:gap-10">
      <div className="max-w-xl animate-fadeIn">
        <p className="text-xs font-semibold uppercase tracking-wider text-clinic-500">Doctor consultations, online</p>
        <h1 className="mt-4 font-trench font-bold leading-[1.05] tracking-tight text-ink text-[clamp(2.25rem,5vw,3.5rem)]">
          See a doctor.<br />Get your prescription.<br />From home.
        </h1>
        <p className="mt-5 max-w-md text-[17px] leading-relaxed text-ink/55">
          Book a consultation with a doctor, share your medical history securely,
          and receive a digital prescription once they've reviewed your case.
        </p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Link href="/patient/signup">
            <Button size="lg" className="w-full sm:w-auto">
              Find a Doctor
              <ArrowRight size={17} />
            </Button>
          </Link>
          <Link href="/doctor/signup">
            <Button size="lg" variant="secondary" className="w-full sm:w-auto">
              I'm a Doctor
            </Button>
          </Link>
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-sm lg:mx-0 lg:ml-auto">
        <div className="absolute -inset-x-6 -inset-y-8 -z-10 rounded-[3rem] bg-clinic-50/70" />

        <div className="rounded-xl2 border border-line bg-white p-6 shadow-card">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wide text-ink/40">Doctor</p>
            <Badge tone="completed">Available</Badge>
          </div>
          <div className="mt-4 flex items-center gap-3">
            <Avatar name="Kavya Iyer" size="md" />
            <div>
              <p className="text-[15px] font-semibold text-ink">Dr. Kavya Iyer</p>
              <p className="text-sm text-clinic-600">Rheumatologist</p>
            </div>
          </div>
          <div className="mt-5 border-t border-line pt-4 text-sm text-ink/45">11.5 years experience</div>
        </div>

        <div className="ml-10 mt-6 -rotate-2 rounded-xl2 border border-line bg-white p-5 shadow-card">
          <p className="text-xs font-semibold uppercase tracking-wide text-ink/40">Prescription</p>
          <p className="mt-2 text-sm font-medium text-ink">Paracetamol · 500mg</p>
          <p className="text-sm text-ink/45">Twice daily · 5 days</p>
        </div>
      </div>
    </Container>
  );
}
