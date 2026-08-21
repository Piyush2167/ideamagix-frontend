const fieldClasses = (hasError) =>
  `w-full rounded-lg border bg-white px-3.5 py-2.5 text-[15px] text-ink placeholder:text-ink/35
   outline-none transition-colors focus:border-clinic-500 focus:ring-2 focus:ring-clinic-500/15
   ${hasError ? 'border-rose-300' : 'border-line'}`;

function Label({ children, required, htmlFor }) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-ink">
      {children}
      {required && <span className="ml-0.5 text-clinic-500">*</span>}
    </label>
  );
}

function ErrorText({ children }) {
  if (!children) return null;
  return <p className="mt-1.5 text-sm text-rose-600">{children}</p>;
}

function HelperText({ children }) {
  if (!children) return null;
  return <p className="mt-1.5 text-sm text-ink/45">{children}</p>;
}

export function Input({ label, required, error, helperText, id, className = '', ...props }) {
  return (
    <div>
      {label && <Label htmlFor={id} required={required}>{label}</Label>}
      <input id={id} className={`${fieldClasses(!!error)} ${className}`} {...props} />
      {error ? <ErrorText>{error}</ErrorText> : <HelperText>{helperText}</HelperText>}
    </div>
  );
}

export function Textarea({ label, required, error, helperText, id, rows = 4, className = '', ...props }) {
  return (
    <div>
      {label && <Label htmlFor={id} required={required}>{label}</Label>}
      <textarea id={id} rows={rows} className={`${fieldClasses(!!error)} resize-none ${className}`} {...props} />
      {error ? <ErrorText>{error}</ErrorText> : <HelperText>{helperText}</HelperText>}
    </div>
  );
}

export function Select({ label, required, error, helperText, id, children, className = '', ...props }) {
  return (
    <div>
      {label && <Label htmlFor={id} required={required}>{label}</Label>}
      <select id={id} className={`${fieldClasses(!!error)} ${className}`} {...props}>
        {children}
      </select>
      {error ? <ErrorText>{error}</ErrorText> : <HelperText>{helperText}</HelperText>}
    </div>
  );
}
