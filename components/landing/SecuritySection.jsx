import Container from '../ui/Container';

const POINTS = [
  'Doctor and patient accounts are kept completely separate.',
  'A prescription can only be written by the doctor assigned to that consultation.',
  'Your medical history is collected directly from you, in your own words.',
];

export default function SecuritySection() {
  return (
    <section className="border-t border-line bg-white">
      <Container className="py-20 md:py-28">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="max-w-md">
            <p className="text-xs font-semibold uppercase tracking-wider text-clinic-500">Privacy</p>
            <h2 className="mt-3 font-trench text-[clamp(1.75rem,3vw,2.25rem)] font-bold tracking-tight text-ink">Your health information deserves care.</h2>
          </div>
          <div className="space-y-5">
            {POINTS.map((point) => (
              <p key={point} className="border-t border-line pt-5 text-[15px] leading-relaxed text-ink/60">{point}</p>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
