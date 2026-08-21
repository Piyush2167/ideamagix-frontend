"use client";
import { useState } from 'react';
import Link from 'next/link';
import Button from '../ui/Button';
import Container from '../ui/Container';
import { List, X, CaretDown } from '@phosphor-icons/react/dist/ssr';

const LINKS = [
  { href: '#specialties', label: 'Doctors' },
  { href: '#how-it-works', label: 'How It Works' },
  { href: '#for-doctors', label: 'For Doctors' },
];

function SignInMenu({ className = '' }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setOpen((v) => !v)}
        onBlur={() => setTimeout(() => setOpen(false), 120)}
        className="flex items-center gap-1 text-sm font-medium text-ink/70 hover:text-ink"
      >
        Sign In
        <CaretDown size={13} />
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-2 w-40 overflow-hidden rounded-lg border border-line bg-white py-1 shadow-card">
          <Link onMouseDown={(e) => e.preventDefault()} href="/patient/login" className="block px-3.5 py-2.5 text-sm text-ink hover:bg-canvas">
            Patient Portal
          </Link>
          <Link onMouseDown={(e) => e.preventDefault()} href="/doctor/login" className="block px-3.5 py-2.5 text-sm text-ink hover:bg-canvas">
            Doctor Portal
          </Link>
        </div>
      )}
    </div>
  );
}

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-white/90 backdrop-blur">
      <Container as="nav" className="flex items-center gap-8 py-4">
        <Link href="/" className="text-[15px] font-semibold tracking-tight text-ink">
          Online Prescription
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {LINKS.map((link) => (
            <a key={link.href} href={link.href} className="text-sm font-medium text-ink/60 hover:text-ink">
              {link.label}
            </a>
          ))}
        </div>

        <div className="ml-auto hidden items-center gap-6 md:flex">
          <SignInMenu />
          <Link href="/patient/signup">
            <Button size="sm">Get Started</Button>
          </Link>
        </div>

        <button onClick={() => setDrawerOpen(true)} className="ml-auto text-ink md:hidden" aria-label="Open menu">
          <List size={22} />
        </button>
      </Container>

      {drawerOpen && (
        <div className="fixed inset-0 z-40 bg-ink/40 md:hidden" onClick={() => setDrawerOpen(false)}>
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute right-0 top-0 flex h-full w-72 flex-col gap-6 bg-white p-6 shadow-card"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-ink">Menu</span>
              <button onClick={() => setDrawerOpen(false)} aria-label="Close menu">
                <X size={20} className="text-ink/60" />
              </button>
            </div>
            {LINKS.map((link) => (
              <a key={link.href} href={link.href} onClick={() => setDrawerOpen(false)} className="text-[15px] font-medium text-ink">
                {link.label}
              </a>
            ))}
            <div className="mt-auto space-y-3 border-t border-line pt-6">
              <Link href="/patient/login" className="block text-sm font-medium text-ink/70">Patient Sign In</Link>
              <Link href="/doctor/login" className="block text-sm font-medium text-ink/70">Doctor Sign In</Link>
              <Link href="/patient/signup" className="block">
                <Button className="w-full">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
