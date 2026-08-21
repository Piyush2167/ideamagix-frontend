const VARIANTS = {
  primary: 'bg-ink text-white hover:bg-ink/90 disabled:bg-ink/30',
  secondary: 'bg-white text-ink border border-line hover:bg-canvas disabled:text-ink/30',
  ghost: 'bg-transparent text-ink hover:bg-canvas disabled:text-ink/30',
  danger: 'bg-transparent text-rose-600 hover:bg-rose-50 disabled:text-rose-200',
  inverse: 'bg-white text-ink hover:bg-white/90 disabled:bg-white/30',
  'inverse-outline': 'bg-transparent text-white border border-white/20 hover:bg-white/10 disabled:text-white/30',
};

const SIZES = {
  sm: 'px-3.5 py-2 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-6 py-3 text-[15px]',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  className = '',
  children,
  ...props
}) {
  return (
    <button
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center gap-2 rounded-lg font-medium
        transition-all duration-150 active:scale-[0.98] disabled:cursor-not-allowed disabled:active:scale-100
        ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
      {...props}
    >
      {loading && (
        <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" />
      )}
      {children}
    </button>
  );
}
