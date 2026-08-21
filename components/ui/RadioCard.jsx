export default function RadioCard({ name, value, checked, onChange, label, description }) {
  return (
    <label
      className={`flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-colors
        ${checked ? 'border-clinic-500 bg-clinic-50' : 'border-line bg-white hover:border-ink/20'}`}
    >
      <span
        className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border
          ${checked ? 'border-clinic-500' : 'border-line'}`}
      >
        {checked && <span className="h-2 w-2 rounded-full bg-clinic-500" />}
      </span>
      <span>
        <span className="block text-sm font-medium text-ink">{label}</span>
        {description && <span className="block text-sm text-ink/45">{description}</span>}
      </span>
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
    </label>
  );
}
