import { SPECIALTIES } from '../../lib/specialties';
import Container from '../ui/Container';

export default function Specialties() {
  return (
    <Container as="section" id="specialties" className="scroll-mt-20 py-20 md:py-28">
      <p className="text-xs font-semibold uppercase tracking-wider text-clinic-500">Explore specialties</p>
      <div className="mt-6 flex flex-wrap gap-x-10 gap-y-4">
        {SPECIALTIES.map((s) => (
          <span key={s} className="font-trench text-[clamp(1.25rem,2.5vw,1.75rem)] font-medium text-ink/70 transition-colors hover:text-clinic-600">
            {s}
          </span>
        ))}
      </div>
    </Container>
  );
}
