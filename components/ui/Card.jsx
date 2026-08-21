export default function Card({ className = '', children, ...props }) {
  return (
    <div className={`rounded-xl2 border border-line bg-white shadow-card ${className}`} {...props}>
      {children}
    </div>
  );
}
