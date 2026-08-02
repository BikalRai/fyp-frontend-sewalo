import type { JobResponse } from "@/types/job.types";

interface ActivityProps {
  bids: JobResponse[]; // leads with myBid populated
}

const Activity = ({ bids }: ActivityProps) => {
  return (
    <div className="bg-light border border-muted/20 shadow-sm rounded-lg flex flex-col p-6 mt-6">
      <h3 className="font-semibold text-lg leading-7">Recent Activity</h3>
      {bids.length === 0 ? (
        <p className="text-sm text-muted leading-6 mt-2">
          No recent activity yet. Start by browsing the lead feed.
        </p>
      ) : (
        <ul className="mt-4 divide-y divide-light-gray">
          {bids.map((lead) => (
            <li
              key={lead.id}
              className="py-3 flex items-center justify-between gap-4"
            >
              <div className="min-w-0">
                <p className="text-sm font-semibold text-primary truncate">
                  {lead.categoryName} — Rs. {lead.myBid?.quotedPrice}
                </p>
                <p className="text-xs text-muted truncate">
                  {lead.description}
                </p>
              </div>
              <span className="text-xs font-medium text-muted shrink-0">
                {lead.myBid?.status}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Activity;
