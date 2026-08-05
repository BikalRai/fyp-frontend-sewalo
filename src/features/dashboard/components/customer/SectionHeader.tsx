const SectionHeader = ({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) => (
  <div className="md:col-span-1">
    <div className="flex items-center gap-2.5 mb-3">
      <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center">
        <Icon className="text-accent text-base" />
      </div>
      <h3 className="text-base font-bold text-primary">{title}</h3>
    </div>
    <p className="text-sm text-muted leading-relaxed pl-[3.25rem]">
      {description}
    </p>
  </div>
);

export default SectionHeader;
