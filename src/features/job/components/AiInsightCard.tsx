import React from "react";
import {
  IoSparklesOutline,
  IoTimeOutline,
  IoHammerOutline,
} from "react-icons/io5";
import type { AiAnalysisResponse } from "@/types/job.types";

interface Props {
  analysis: AiAnalysisResponse | null;
}

const AiInsightCard: React.FC<Props> = ({ analysis }) => {
  if (!analysis) return null;

  return (
    <div className="bg-linear-to-br from-accent/5 via-card-bg to-accent/10 border border-accent/20 rounded-2xl p-5 shadow-sm flex flex-col gap-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
            <IoSparklesOutline size={16} />
          </div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-primary">
            AI Job Insights
          </h4>
        </div>

        {analysis.estimatedHours && (
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-muted bg-bg px-2.5 py-1 rounded-full border border-light-gray">
            <IoTimeOutline className="text-accent" />
            Est. {analysis.estimatedHours} hrs
          </span>
        )}
      </div>

      {/* Reasoning */}
      <p className="text-sm text-text-dark leading-relaxed font-medium">
        {analysis.reasoning}
      </p>

      {/* Recommended Tools */}
      {analysis.recommendedTools && analysis.recommendedTools.length > 0 && (
        <div className="flex flex-col gap-1.5 pt-2 border-t border-light-gray/60">
          <span className="text-[11px] font-bold tracking-widest text-muted uppercase flex items-center gap-1">
            <IoHammerOutline size={12} className="text-accent" /> Recommended
            Tools
          </span>
          <div className="flex flex-wrap gap-1.5 mt-1">
            {analysis.recommendedTools.map((tool, index) => (
              <span
                key={index}
                className="text-xs bg-bg text-text-dark px-2.5 py-1 rounded-md border border-light-gray font-medium"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AiInsightCard;
