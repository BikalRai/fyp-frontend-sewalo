interface CircleProps {
  name: string;
  color: string;
}

const HeroContentCircle = ({ name, color }: CircleProps) => {
  return (
    <div
      className={`text-xs w-8 h-8 rounded-full border-2 border-primary flex items-center justify-center ${color} text-light`}
    >
      {name}
    </div>
  );
};

export default HeroContentCircle;
