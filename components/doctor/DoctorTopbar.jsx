"use client";
import { useContext, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { DoctorAuthContext } from '../../context/DoctorAuthContext';
import Avatar from '../ui/Avatar';
import Container from '../ui/Container';
import { SignOut, CaretDown } from '@phosphor-icons/react/dist/ssr';

const LINKS = [
  { href: '/doctor/profile', label: 'Dashboard' },
  { href: '/doctor/consultations', label: 'Consultations' },
  { href: '/doctor/prescriptions', label: 'Prescriptions' },
];

export default function DoctorTopbar() {
  const { doctor, logout } = useContext(DoctorAuthContext);
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <header className="sticky top-0 z-20 border-b border-line bg-white/90 backdrop-blur">
      <Container className="flex items-center gap-6 py-3">
        <Link href="/doctor/profile" className="shrink-0 text-[15px] font-semibold tracking-tight text-ink">
          Online Prescription
        </Link>

        <nav className="hidden items-center gap-6 sm:flex">
          {LINKS.map((link) => {
            const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${active ? 'text-ink' : 'text-ink/50 hover:text-ink'}`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="relative ml-auto">
          <button
            onClick={() => setMenuOpen((v) => !v)}
            onBlur={() => setTimeout(() => setMenuOpen(false), 120)}
            className="flex items-center gap-2 rounded-full py-1 pl-1 pr-2 hover:bg-canvas"
          >
            <Avatar name={doctor?.name} size="sm" />
            <span className="hidden text-sm font-medium text-ink sm:block">{doctor?.name}</span>
            <CaretDown size={14} className="text-ink/40" />
          </button>

          {menuOpen && (
            <div className="absolute right-0 top-full mt-2 w-44 overflow-hidden rounded-lg border border-line bg-white py-1 shadow-card">
              <button
                onMouseDown={handleLogout}
                className="flex w-full items-center gap-2 px-3.5 py-2.5 text-left text-sm text-ink hover:bg-canvas"
              >
                <SignOut size={16} />
                Logout
              </button>
            </div>
          )}
        </div>
      </Container>

      <nav className="flex items-center gap-5 overflow-x-auto border-t border-line px-4 py-2.5 sm:hidden">
        {LINKS.map((link) => {
          const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`shrink-0 text-sm font-medium ${active ? 'text-ink' : 'text-ink/50'}`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
