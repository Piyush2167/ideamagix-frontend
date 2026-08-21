import Container from '../ui/Container';

const STEPS = [
  { n: '01', title: 'Find a doctor', body: 'Browse doctors by specialty and choose who’s right for you.' },
  { n: '02', title: 'Share your details', body: 'Tell your doctor about your symptoms and medical history.' },
  { n: '03', title: 'Consult & pay', body: 'Submit your consultation and confirm your payment.' },
  { n: '04', title: 'Get your prescription', body: 'Your doctor reviews your case and sends a digital prescription.' },
];

export default function HowItWorks() {
  return (
    <Container as="section" id="how-it-works" className="scroll-mt-20 py-20 md:py-28">
      <div className="max-w-lg">
        <p className="text-xs font-semibold uppercase tracking-wider text-clinic-500">How it works</p>
        <h2 className="mt-3 font-trench text-[clamp(1.75rem,3vw,2.25rem)] font-bold tracking-tight text-ink">Healthcare shouldn't feel complicated.</h2>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((step) => (
          <div key={step.n} className="border-t border-line pt-5">
            <span className="font-mono text-sm text-ink/30">{step.n}</span>
            <h3 className="mt-3 text-[15px] font-semibold text-ink">{step.title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-ink/50">{step.body}</p>
          </div>
        ))}
      </div>
    </Container>
  );
}
