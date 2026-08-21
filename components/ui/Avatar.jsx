const SIZES = { sm: 'h-9 w-9 text-xs', md: 'h-12 w-12 text-sm', lg: 'h-24 w-24 text-2xl', xl: 'h-32 w-32 text-4xl' };

export default function Avatar({ src, name = '', size = 'md', className = '' }) {
  const initials = name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();

  return (
    <div className={`shrink-0 overflow-hidden rounded-full bg-clinic-50 ${SIZES[size]} ${className}`}>
      {src ? (
        <img src={src} alt={name} className="h-full w-full object-cover" />
      ) : (
        <div className="flex h-full w-full items-center justify-center font-semibold text-clinic-600">
          {initials || '—'}
        </div>
      )}
    </div>
  );
}
