import { useJobBids, useAcceptBid } from "@/hooks/mutations/useBid";
import SeButton from "@/components/button/SeButton";
import { formatTimeAgo } from "@/uitls/job.utils";
import {
  IoChatbubbleEllipsesOutline,
  IoCheckmarkCircleOutline,
  IoRibbonOutline,
} from "react-icons/io5";
import { toast } from "sonner";
import type { BidResponse } from "@/types/bid.types";

interface ReceivedBidsListProps {
  jobId: string;
}

const ReceivedBidsList = ({ jobId }: ReceivedBidsListProps) => {
  const { data: bids, isLoading, isError } = useJobBids(jobId);
  const { mutate: acceptBid, isPending, variables } = useAcceptBid(jobId);

  const handleAccept = (bidId: string) => {
    acceptBid(bidId, {
      onSuccess: () => {
        toast.success("Bid accepted! The job is now in progress.");
      },
      onError: () => {
        toast.error("Failed to accept bid. Please try again.");
      },
    });
  };

  if (isLoading) return <div>Loading quotes...</div>;
  if (isError) return <div>Couldn't load bids. Try refreshing.</div>;

  if (!bids || bids.length === 0) {
    return (
      <div className="text-center py-16 bg-bg/50 rounded-2xl border border-dashed border-muted/30">
        <p className="text-muted font-medium">
          Waiting for professionals to bid on your job...
        </p>
      </div>
    );
  }

  // Segregate the data based on status
  const acceptedBid = bids.find((bid) => bid.status === "ACCEPTED");
  const otherBids = bids.filter((bid) => bid.status !== "ACCEPTED");

  // Reusable card renderer
  const renderBidCard = (bid: BidResponse, isHired: boolean) => (
    <div
      key={bid.id}
      className={`p-6 rounded-2xl border transition-all duration-200 ${
        isHired
          ? "bg-primary/5 border-primary/20 shadow-md"
          : "bg-card-bg border-light-gray shadow-sm hover:shadow-md"
      }`}
    >
      <div className="flex flex-col lg:flex-row justify-between gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-4">
            {bid.providerImageUrl ? (
              <img
                src={bid.providerImageUrl}
                alt={bid.providerName}
                className="w-12 h-12 rounded-full object-cover shadow-sm"
              />
            ) : (
              <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg shadow-sm">
                {bid.providerName.charAt(0)}
              </div>
            )}
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-primary text-base">
                  {bid.providerName}
                </h3>
                {isHired && (
                  <span className="bg-green-100 text-green-700 text-small font-bold uppercase tracking-wider py-1 px-2 rounded flex items-center gap-1">
                    <IoRibbonOutline /> Hired
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1.5 text-sm mt-0.5 text-muted font-medium">
                {bid.providerStartingRate && (
                  <span>Starting rate: Rs.{bid.providerStartingRate}/hr</span>
                )}
              </div>
            </div>
          </div>
          <div className="bg-card-label/50 p-4 rounded-xl text-sm text-text-dark leading-relaxed relative border border-light-gray/50 font-medium">
            <IoChatbubbleEllipsesOutline className="absolute top-4 right-4 text-muted/30 text-xl" />
            "{bid.message}"
          </div>
        </div>

        <div className="flex flex-col items-start lg:items-end justify-between min-w-65 lg:border-l border-light-gray pt-4 lg:pt-0 lg:pl-6">
          <div className="mb-6 lg:text-right w-full">
            <p className="text-small font-bold text-muted tracking-widest uppercase mb-1">
              {bid.pricingBasis === "VISIT"
                ? "Minimum Visit Fee"
                : "Fixed Quote"}
            </p>
            <p className="text-3xl font-black text-primary tracking-tight">
              <span className="text-base font-semibold text-muted mr-1">
                Rs.
              </span>
              {bid.quotedPrice}
            </p>
            <p className="text-xs font-medium text-muted mt-1">
              Submitted {formatTimeAgo(bid.createdAt)}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full">
            {/* Show Message button only if evaluating, OR if this is the hired pro */}
            {(!acceptedBid || isHired) && (
              <SeButton
                btnText="Message"
                type="button"
                variant={isHired ? "accentLight" : "lightGray"}
                className="flex-1 whitespace-nowrap"
              />
            )}

            {/* Show Hire Pro button only if no one is hired yet */}
            {!acceptedBid && (
              <SeButton
                btnText="Hire Pro"
                type="button"
                variant="accentLight"
                icon={<IoCheckmarkCircleOutline className="text-lg shrink-0" />}
                iconPosition="left"
                clickFunc={() => handleAccept(bid.id)}
                disabled={isPending && variables === bid.id}
                className="flex-1 whitespace-nowrap"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      {/* State 1: A professional has been hired */}
      {acceptedBid ? (
        <div className="space-y-8">
          <div>
            <h2 className="text-lg font-bold text-primary mb-4">
              Hired Professional
            </h2>
            {renderBidCard(acceptedBid, true)}
          </div>

          {/* Render remaining bids as non-actionable history */}
          {otherBids.length > 0 && (
            <div className="opacity-75">
              <h3 className="text-md font-semibold text-muted mb-4 border-b border-light-gray pb-2">
                Other Quotes ({otherBids.length})
              </h3>
              <div className="grid gap-4">
                {otherBids.map((bid) => renderBidCard(bid, false))}
              </div>
            </div>
          )}
        </div>
      ) : (
        /* State 2: Active Evaluation Phase */
        <div>
          <h2 className="text-lg font-bold text-primary mb-5 flex items-center gap-2">
            Received Quotes
            <span className="bg-primary text-white text-xs py-0.5 px-2.5 rounded-full">
              {bids.length}
            </span>
          </h2>
          <div className="grid gap-5">
            {bids.map((bid) => renderBidCard(bid, false))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ReceivedBidsList;
