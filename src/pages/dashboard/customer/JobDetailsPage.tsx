import SeButton from "@/components/button/SeButton";
import { useCustomerJobDetail } from "@/hooks/mutations/useJob";
import { formatTimeAgo } from "@/uitls/job.utils";
import {
  IoLocationOutline,
  IoTimeOutline,
  IoBriefcaseOutline,
  IoStar,
  IoChatbubbleEllipsesOutline,
  IoCheckmarkCircleOutline,
} from "react-icons/io5";
import { LuLayoutList } from "react-icons/lu";
import { Link, useParams } from "react-router-dom";

const JobDetailsPage = () => {
  const { jobId } = useParams<{ jobId: string }>();

  const { data: job, isLoading, isError } = useCustomerJobDetail(jobId!);

  if (isLoading) return <div>Loading job details...</div>;
  if (isError || !job) return <div>Couldn't load this job. Try again.</div>;

  const handleAcceptBid = (bidId: string) => {
    console.log(`Ready to accept bid ${bidId} and fire mutation!`);
  };

  return (
    <div className="max-w-4xl mx-auto grid gap-8 pb-12">
      <Link
        to="/dashboard/my-posts"
        className="text-muted text-sm flex items-center gap-1 hover:text-accent transition-colors w-fit"
      >
        <LuLayoutList size={14} />
        Back to My Posts
      </Link>

      <div className="bg-card-bg rounded-2xl border border-light-gray shadow-sm overflow-hidden">
        <div className="p-6 border-b border-light-gray bg-bg/30 flex flex-col gap-4">
          <div className="flex justify-between items-start">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-accent/10 text-accent w-fit">
              {job.status}
            </span>
            <p className="text-sm font-medium text-muted whitespace-nowrap">
              Posted {formatTimeAgo(job.createdAt)}
            </p>
          </div>
          <div className="flex flex-wrap gap-5 text-sm font-medium text-muted">
            <span className="flex items-center gap-1.5">
              <IoBriefcaseOutline className="text-accent text-lg" />
              {job.categoryName}
            </span>
            <span className="flex items-center gap-1.5">
              <IoTimeOutline className="text-accent text-lg" />
              {job.urgency}
            </span>
            <span className="flex items-center gap-1.5">
              <IoLocationOutline className="text-accent text-lg" />
              {job.address}
            </span>
          </div>
        </div>
        <div className="p-6">
          <h3 className="text-xs font-bold tracking-widest uppercase text-muted mb-3">
            Description
          </h3>
          <p className="text-text-dark text-sm leading-relaxed font-medium">
            {job.description}
          </p>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-bold text-primary mb-5 flex items-center gap-2">
          Received Quotes
          <span className="bg-primary text-white text-xs py-0.5 px-2.5 rounded-full">
            {job.bidCount}
          </span>
        </h2>
        <div className="grid gap-5">
          {job.bids.length === 0 ? (
            <div className="text-center py-16 bg-bg/50 rounded-2xl border border-dashed border-muted/30">
              <p className="text-muted font-medium">
                Waiting for professionals to bid on your job...
              </p>
            </div>
          ) : (
            job.bids.map((bid) => (
              <div
                key={bid.id}
                className="bg-card-bg p-6 rounded-2xl border border-light-gray shadow-sm hover:shadow-md transition-all duration-200"
              >
                <div className="flex flex-col lg:flex-row justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg shadow-sm">
                        {bid.providerName.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-bold text-primary text-base">
                          {bid.providerName}
                        </h3>
                        <div className="flex items-center gap-1.5 text-sm mt-0.5">
                          <IoStar className="text-accent" />
                          <span className="font-bold text-text-dark">
                            {bid.rating}
                          </span>
                          <span className="text-muted font-medium">
                            ({bid.reviewCount} reviews)
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-card-label/50 p-4 rounded-xl text-sm text-text-dark leading-relaxed relative border border-light-gray/50 font-medium">
                      <IoChatbubbleEllipsesOutline className="absolute top-4 right-4 text-muted/30 text-xl" />
                      "{bid.message}"
                    </div>
                  </div>
                  <div className="flex flex-col items-start lg:items-end justify-between min-w-[260px] lg:border-l border-light-gray pt-4 lg:pt-0 lg:pl-6">
                    <div className="mb-6 lg:text-right w-full">
                      <p className="text-[10px] font-bold text-muted tracking-widest uppercase mb-1">
                        {bid.pricingBasis === "VISIT"
                          ? "Minimum Visit Fee"
                          : "Fixed Quote"}
                      </p>
                      <p className="text-3xl font-black text-primary tracking-tight">
                        <span className="text-base font-semibold text-muted mr-1">
                          Rs.
                        </span>
                        {bid.price}
                      </p>
                      <p className="text-xs font-medium text-muted mt-1">
                        Submitted {formatTimeAgo(bid.submittedAt)}
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 w-full">
                      <SeButton
                        btnText="Message"
                        type="button"
                        variant="lightGray"
                        className="flex-1 whitespace-nowrap"
                      />
                      <SeButton
                        btnText="Hire Pro"
                        type="button"
                        variant="accentLight"
                        icon={
                          <IoCheckmarkCircleOutline className="text-lg shrink-0" />
                        }
                        iconPosition="left"
                        clickFunc={() => handleAcceptBid(bid.id)}
                        className="flex-1 whitespace-nowrap"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default JobDetailsPage;
