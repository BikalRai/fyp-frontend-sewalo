interface Social {
  Icon: React.ElementType;
  link: string;
}

const SeSocials = ({ Icon, link }: Social) => {
  return (
    <div className="h-9 w-9 rounded-full flex items-center justify-center border border-muted group hover:border-light transition-colors duration-300 cursor-pointer">
      <a href={link}>
        {
          <Icon className="fill-muted group-hover:fill-light text-xs transition-colors duration-300" />
        }
      </a>
    </div>
  );
};

export default SeSocials;
