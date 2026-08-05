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
  const initials = author
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <div className="relative w-full h-full min-h-[640px] rounded-none overflow-hidden">
      {/* Full-bleed background image */}
      <img
        src={image}
        alt={author}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark gradient overlay — heavier at bottom for text */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a1525] via-[#0a1525]/50 to-[#0a1525]/20" />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />

      {/* Top-left badge */}
      <div className="absolute top-6 left-6 z-20 flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/10 rounded-full px-3.5 py-1.5 text-[11px] font-semibold text-white/80">
        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
        {badge}
      </div>

      {/* Top-right stat pill */}
      <div className="absolute top-6 right-6 z-20 bg-accent/90 backdrop-blur-sm rounded-xl px-3 py-2 text-center shadow-lg">
        <p className="text-lg font-bold text-white leading-none">480+</p>
        <p className="text-[9px] text-white/80 font-medium mt-0.5">
          Verified Pros
        </p>
      </div>

      {/* Bottom content stack */}
      <div className="absolute bottom-0 left-0 right-0 p-6 space-y-4">
        {/* Quote Card */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/15 rounded-2xl p-5 relative">
          {/* Floating quote icon */}
          <div className="absolute -top-3 left-5 w-6 h-6 bg-accent rounded-full flex items-center justify-center shadow-md">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
          </div>

          <p className="text-sm text-white/95 leading-relaxed font-medium mt-1">
            "{quote}"
          </p>

          <div className="mt-3 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-accent/30 border border-accent/50 flex items-center justify-center text-accent text-[10px] font-bold">
              {initials}
            </div>
            <div>
              <p className="text-xs text-white font-semibold">{author}</p>
              <p className="text-[10px] text-white/50">Verified Customer</p>
            </div>
            {/* Star rating */}
            <div className="ml-auto flex gap-0.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <svg
                  key={i}
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="#fbbf24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </div>
          </div>
        </div>

        {/* Trust bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex -space-x-2">
              {["RK", "SM", "BP", "NL"].map((name) => (
                <div
                  key={name}
                  className="w-7 h-7 rounded-full bg-accent flex items-center justify-center text-white text-[9px] font-bold border-2 border-[#0a1525]"
                >
                  {name}
                </div>
              ))}
            </div>
            <p className="text-[11px] text-white/60">Joined this week</p>
          </div>

          <div className="flex items-center gap-1 text-[11px] text-white/60">
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            Avg. &lt; 8 min
          </div>
        </div>

        {/* Caption tags */}
        <div className="flex items-center gap-2">
          <span className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-lg px-3 py-1.5 text-[11px] text-white/70 font-medium">
            ⚡ {caption}
          </span>
          <span className="bg-accent/20 border border-accent/30 rounded-lg px-3 py-1.5 text-[11px] text-accent font-bold">
            Top Rated
          </span>
        </div>
      </div>

      {/* Side decorative accent line */}
      <div className="absolute left-6 top-1/3 bottom-1/3 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent" />
    </div>
  );
};

export default AuthSidePanel;
