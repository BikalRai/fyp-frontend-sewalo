const HeroBannerCard = () => {
  return (
    <div className="bg-white rounded-2xl p-5 w-full max-w-md shadow-[0_8px_40px_rgba(0,0,0,0.3)] border border-white/10 relative overflow-hidden">
      {/* Subtle gradient glow on card */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-accent/5 rounded-full -translate-y-1/2 translate-x-1/4 blur-2xl" />

      {/* Card Header */}
      <div className="flex items-center justify-between mb-4 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-bold text-text-dark">Plumbing Repair</p>
            <p className="text-[10px] text-muted">
              Kathmandu, Nepal • 2 min ago
            </p>
          </div>
        </div>
        <span className="bg-accent/10 text-accent text-[10px] font-bold px-2.5 py-1 rounded-lg">
          Rs 2,500
        </span>
      </div>

      {/* Job Details */}
      <div className="space-y-3 relative z-10">
        <div className="bg-light rounded-xl p-3.5 border border-light-gray">
          <p className="text-[11px] text-muted uppercase font-bold tracking-wider mb-1">
            Description
          </p>
          <p className="text-xs text-text-dark leading-relaxed">
            Kitchen sink is leaking heavily from the pipe connection. Need
            urgent repair today evening.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-light rounded-xl p-3 border border-light-gray">
            <p className="text-[10px] text-muted uppercase font-bold tracking-wider mb-1">
              Urgency
            </p>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-soft-danger" />
              <span className="text-xs font-bold text-text-dark">Urgent</span>
            </div>
          </div>
          <div className="bg-light rounded-xl p-3 border border-light-gray">
            <p className="text-[10px] text-muted uppercase font-bold tracking-wider mb-1">
              Bids
            </p>
            <span className="text-xs font-bold text-text-dark">
              3 providers
            </span>
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="mt-4 pt-4 border-t border-light-gray flex items-center justify-between relative z-10">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white text-[8px] font-bold">
            SP
          </div>
          <span className="text-[11px] text-muted">
            Posted by{" "}
            <span className="font-semibold text-text-dark">Sita P.</span>
          </span>
        </div>
        <button className="bg-primary hover:bg-[#122742] text-white text-[11px] font-bold px-4 py-2 rounded-lg transition-colors flex items-center gap-1.5">
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          Bid Now
        </button>
      </div>
    </div>
  );
};

export default HeroBannerCard;
