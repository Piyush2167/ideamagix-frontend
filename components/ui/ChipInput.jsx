"use client";
import { useState } from 'react';
import Chip from './Chip';

export default function ChipInput({ label, helperText, values, onChange, placeholder }) {
  const [draft, setDraft] = useState('');

  const commit = () => {
    const value = draft.trim();
    if (value && !values.includes(value)) onChange([...values, value]);
    setDraft('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      commit();
    } else if (e.key === 'Backspace' && !draft && values.length > 0) {
      onChange(values.slice(0, -1));
    }
  };

  return (
    <div>
      {label && <label className="mb-1.5 block text-sm font-medium text-ink">{label}</label>}
      <div className="flex min-h-[46px] flex-wrap items-center gap-2 rounded-lg border border-line bg-white px-3 py-2 focus-within:border-clinic-500 focus-within:ring-2 focus-within:ring-clinic-500/15">
        {values.map((v) => (
          <Chip key={v} onRemove={() => onChange(values.filter((x) => x !== v))}>
            {v}
          </Chip>
        ))}
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={commit}
          placeholder={values.length === 0 ? placeholder : ''}
          className="min-w-[120px] flex-1 border-0 bg-transparent py-1 text-[15px] text-ink outline-none placeholder:text-ink/35"
        />
      </div>
      {helperText && <p className="mt-1.5 text-sm text-ink/45">{helperText}</p>}
    </div>
  );
}
