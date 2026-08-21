import Link from 'next/link';
import Button from '../ui/Button';

export default function FinalCTA() {
  return (
    <section className="border-t border-line bg-ink">
      <div className="mx-auto max-w-3xl px-4 py-20 text-center md:px-8 md:py-24">
        <h2 className="font-trench text-[clamp(1.75rem,4vw,2.75rem)] font-bold tracking-tight text-white">Ready when you are.</h2>
        <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-white/55">
          Find a doctor, start your consultation, and manage your prescription online.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/patient/signup">
            <Button size="lg" variant="inverse" className="w-full sm:w-auto">Find a Doctor</Button>
          </Link>
          <Link href="/doctor/signup">
            <Button size="lg" variant="inverse-outline" className="w-full sm:w-auto">
              Join as a Doctor
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
