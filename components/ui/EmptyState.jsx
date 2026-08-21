export default function EmptyState({ icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl2 border border-dashed border-line bg-white px-6 py-16 text-center">
      {icon && <div className="mb-4 text-ink/25">{icon}</div>}
      <p className="text-[15px] font-medium text-ink">{title}</p>
      {description && <p className="mt-1 max-w-xs text-sm text-ink/45">{description}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
