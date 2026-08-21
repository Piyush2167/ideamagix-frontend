import Link from 'next/link';

export default function AuthShell({
  eyebrow, title, subtitle, switchHref, switchLabel, children, footer,
  brandHeadline, brandPoints = [],
}) {
  return (
    <div className="flex flex-1 flex-col lg:flex-row">
      <aside className="hidden shrink-0 flex-col justify-between bg-ink px-12 py-12 text-white lg:flex lg:w-[40%] xl:w-[36%]">
        <Link href="/" className="text-sm font-semibold tracking-tight text-white/70 hover:text-white">
          Online Prescription
        </Link>

        <div>
          <span className="mb-6 block h-px w-10 bg-clinic-400" />
          <h2 className="font-trench text-[clamp(1.75rem,2.5vw,2.25rem)] font-bold leading-tight tracking-tight">{brandHeadline}</h2>
          {brandPoints.length > 0 && (
            <ul className="mt-8 space-y-4">
              {brandPoints.map((point) => (
                <li key={point} className="flex items-start gap-3 text-[15px] text-white/70">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-clinic-400" />
                  {point}
                </li>
              ))}
            </ul>
          )}
        </div>

        <p className="text-xs text-white/35">{eyebrow}</p>
      </aside>

      <div className="flex flex-1 flex-col items-center justify-center bg-white px-4 py-12">
        <Link href="/" className="mb-8 text-sm font-semibold tracking-tight text-ink/60 hover:text-ink lg:hidden">
          Online Prescription
        </Link>

        <div className="w-full max-w-sm">
          <div className="mb-7">
            <p className="text-xs font-semibold uppercase tracking-wider text-clinic-500">{eyebrow}</p>
            <h1 className="mt-2 font-trench text-2xl font-bold text-ink">{title}</h1>
            {subtitle && <p className="mt-1.5 text-sm text-ink/50">{subtitle}</p>}
          </div>

          {children}

          {footer && <div className="mt-7 border-t border-line pt-5 text-center text-sm text-ink/50">{footer}</div>}

          {switchHref && (
            <div className="mt-5 text-center">
              <Link href={switchHref} className="text-sm text-ink/45 hover:text-ink">
                {switchLabel}
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
