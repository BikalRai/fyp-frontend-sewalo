const Card = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`md:col-span-2 bg-card-bg rounded-2xl border border-light-gray/80 shadow-[0_2px_16px_rgba(25,53,87,0.04)] overflow-hidden p-6 sm:p-8 ${className}`}
  >
    {children}
  </div>
);

export default Card;
