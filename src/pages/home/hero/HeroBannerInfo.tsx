const HeroBannerInfo = () => {
  const stats = [
    { value: "480+", label: "Verified Pros" },
    { value: "< 8m", label: "Avg Response" },
    { value: "0%", label: "Commission" },
  ];

  return (
    <div className="grid grid-cols-3 gap-3 w-full max-w-md">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-3 text-center"
        >
          <p className="text-lg font-bold text-accent">{stat.value}</p>
          <p className="text-[10px] text-light/50 mt-0.5">{stat.label}</p>
        </div>
      ))}
    </div>
  );
};

export default HeroBannerInfo;
