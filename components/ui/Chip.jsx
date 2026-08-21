import { X } from '@phosphor-icons/react/dist/ssr';

export default function Chip({ children, onRemove }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-clinic-100 bg-clinic-50 py-1 pl-3 pr-2 text-sm font-medium text-clinic-700">
      {children}
      {onRemove && (
        <button type="button" onClick={onRemove} className="rounded-full p-0.5 hover:bg-clinic-100" aria-label={`Remove ${children}`}>
          <X size={12} weight="bold" />
        </button>
      )}
    </span>
  );
}
