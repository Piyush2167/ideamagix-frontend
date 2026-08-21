const TONES = {
  neutral: 'bg-canvas text-ink/60 border-line',
  pending: 'bg-amber-50 text-amber-700 border-amber-100',
  completed: 'bg-clinic-50 text-clinic-700 border-clinic-100',
  reviewed: 'bg-sky-50 text-sky-700 border-sky-100',
  error: 'bg-rose-50 text-rose-700 border-rose-100',
};

export default function Badge({ tone = 'neutral', children }) {
  return (
    <span className={`inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-semibold uppercase tracking-wide ${TONES[tone]}`}>
      {children}
    </span>
  );
}
