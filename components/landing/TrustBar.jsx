import { Check } from '@phosphor-icons/react/dist/ssr';
import Container from '../ui/Container';

const POINTS = [
  'Separate accounts for doctors and patients',
  'Consultations tied to your medical history',
  'Prescriptions issued only by your doctor',
  'A simple, guided consultation flow',
];

export default function TrustBar() {
  return (
    <section className="border-y border-line bg-white">
      <Container className="grid grid-cols-1 gap-x-6 gap-y-4 py-8 sm:grid-cols-2 lg:grid-cols-4">
        {POINTS.map((point) => (
          <div key={point} className="flex items-center gap-2.5 text-sm text-ink/60">
            <Check size={15} weight="bold" className="shrink-0 text-clinic-500" />
            {point}
          </div>
        ))}
      </Container>
    </section>
  );
}
