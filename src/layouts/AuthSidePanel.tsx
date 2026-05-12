type AuthSidePanelProps = {
  image: string;
  quote: string;
  author: string;
  caption: string;
  badge?: string;
};

const AuthSidePanel = ({
  image,
  quote,
  author,
  caption,
  badge = "Made in Kathmandu",
}: AuthSidePanelProps) => {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Badge */}
      <div className="absolute top-0 right-0 flex items-center gap-1.5 bg-white rounded-full px-3 py-1.5 shadow-sm text-xs font-medium text-gray-700">
        <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
        {badge}
      </div>

      {/* Image card */}
      <div className="relative rotate-2 bg-white p-3 pb-8 shadow-md rounded-sm w-100 h-120">
        <img
          src={image}
          alt={author}
          className="w-full h-full object-cover rounded-sm"
        />

        <p className="absolute bottom-2 left-0 right-0 text-center text-xs text-gray-500">
          {caption}
        </p>
      </div>

      {/* Quote */}
      <div className="absolute bottom-16 left-4 bg-accent text-light rounded-xl px-4 py-3 max-w-45 shadow-md">
        <p className="text-xs leading-relaxed">"{quote}"</p>

        <p className="text-xs text-light mt-1.5">— {author}</p>
      </div>

      {/* Decorative dot */}
      <div className="absolute top-1/3 right-6 w-2 h-2 rounded-full bg-green-400 opacity-60" />
    </div>
  );
};

export default AuthSidePanel;
