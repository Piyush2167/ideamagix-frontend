export default function Container({ as: Tag = 'div', className = '', children, ...props }) {
  return (
    <Tag className={`mx-auto w-[min(91.6667%,1440px)] ${className}`} {...props}>
      {children}
    </Tag>
  );
}
