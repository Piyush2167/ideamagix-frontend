import Link from 'next/link';
import Container from '../ui/Container';

const COLUMNS = [
  {
    title: 'Platform',
    links: [
      { label: 'How It Works', href: '#how-it-works' },
      { label: 'Specialties', href: '#specialties' },
    ],
  },
  {
    title: 'For Doctors',
    links: [
      { label: 'Doctor Login', href: '/doctor/login' },
      { label: 'Doctor Signup', href: '/doctor/signup' },
    ],
  },
  {
    title: 'For Patients',
    links: [
      { label: 'Patient Login', href: '/patient/login' },
      { label: 'Patient Signup', href: '/patient/signup' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-line bg-white">
      <Container className="py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <p className="text-[15px] font-semibold tracking-tight text-ink">Online Prescription</p>
            <p className="mt-2 max-w-[22ch] text-sm text-ink/45">Doctor consultations and digital prescriptions, online.</p>
          </div>
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <p className="text-xs font-semibold uppercase tracking-wide text-ink/40">{col.title}</p>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-ink/60 hover:text-ink">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-14 border-t border-line pt-6 text-sm text-ink/40">
          © {new Date().getFullYear()} Online Prescription
        </div>
      </Container>
    </footer>
  );
}
