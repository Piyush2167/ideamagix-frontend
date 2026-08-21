"use client";
import { useState } from 'react';
import { Plus } from '@phosphor-icons/react/dist/ssr';

const ITEMS = [
  { q: 'How does online consultation work?', a: 'Browse doctors, pick the one that fits your need, and submit a short consultation form describing your symptoms and medical history.' },
  { q: 'Can I choose a specific doctor?', a: 'Yes — you browse the full doctor list by specialty and choose exactly who you want to consult.' },
  { q: 'How do I submit my medical history?', a: 'It\'s part of the consultation form itself, split into a few short, guided steps.' },
  { q: 'How does payment work?', a: 'Scan the QR code shown at checkout and enter your transaction ID to confirm your consultation.' },
  { q: 'Where can I find my prescription?', a: 'In your consultation once your doctor has reviewed your case and written it.' },
  { q: 'Can doctors manage multiple consultations?', a: 'Yes — doctors see every consultation request in a single dashboard.' },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="mx-auto max-w-3xl px-4 py-20 md:px-8 md:py-28">
      <p className="text-xs font-semibold uppercase tracking-wider text-clinic-500">FAQ</p>
      <h2 className="mt-3 font-trench text-[clamp(1.75rem,3vw,2.25rem)] font-bold tracking-tight text-ink">Common questions</h2>

      <div className="mt-10 divide-y divide-line border-t border-line">
        {ITEMS.map((item, i) => {
          const isOpen = openIndex === i;
          return (
            <div key={item.q}>
              <button
                onClick={() => setOpenIndex(isOpen ? -1 : i)}
                className="flex w-full items-center justify-between gap-4 py-5 text-left"
              >
                <span className="text-[15px] font-medium text-ink">{item.q}</span>
                <Plus size={16} className={`shrink-0 text-ink/40 transition-transform ${isOpen ? 'rotate-45' : ''}`} />
              </button>
              {isOpen && <p className="max-w-xl pb-5 text-sm leading-relaxed text-ink/55">{item.a}</p>}
            </div>
          );
        })}
      </div>
    </section>
  );
}
