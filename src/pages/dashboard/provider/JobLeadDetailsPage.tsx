import SeButton from "@/components/button/SeButton";
import {
  useJobLead,
  useUnlockJob,
  usePlaceBid,
} from "@/hooks/mutations/useJob";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  IoLocationOutline,
  IoTimeOutline,
  IoArrowBack,
  IoLockClosedOutline,
  IoCheckmarkCircleOutline,
  IoPersonCircleOutline,
  IoCallOutline,
} from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import { placeBidSchema, type PlaceBidRequestDto } from "@/types/bid.types";

// Native JS relative time formatter
const timeAgo = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.round((now.getTime() - date.getTime()) / 1000);
  const minutes = Math.round(seconds / 60);
  const hours = Math.round(minutes / 60);
  const days = Math.round(hours / 24);

  if (seconds < 60) return "Just now";
  if (minutes < 60) return `${minutes} mins ago`;
  if (hours < 24) return `${hours} hours ago`;
  if (days === 1) return "Yesterday";
  return `${days} days ago`;
};

const JobLeadDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // 1. Server State
  const { data: job, isLoading, isError } = useJobLead(String(id));
  const { mutate: unlockJob, isPending: isUnlocking } = useUnlockJob();
  const { mutate: submitBid, isPending: isSubmitting } = usePlaceBid();

  console.log(job);

  // 2. React Hook Form Setup (Replaces quote & message useState)
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isValid },
  } = useForm<PlaceBidRequestDto>({
    resolver: zodResolver(placeBidSchema),
    mode: "onChange", // Validates as they type
  });

  // Watch the message field so we can show the character countdown dynamically
  const messageValue = watch("message", "");

  // 3. UI State
  const [isBidding, setIsBidding] = useState(false);
  const [localHasSubmitted, setLocalHasSubmitted] = useState(false);

  if (isLoading)
    return <div className="pt-8 text-center">Loading job details...</div>;
  if (isError || !job)
    return (
      <div className="pt-8 text-center text-red-500">Failed to load job.</div>
    );

  // 4. Derived State (Directly from backend)
  const isUnlocked = job.isUnlocked;
  const hasSubmitted = Boolean(job.myBid) || localHasSubmitted;

  const postedAt = timeAgo(job.createdAt);

  const handleUnlock = () => {
    unlockJob(String(id), {
      onSuccess: () => setIsBidding(true),
    });
  };

  // 5. RHF Submit Handler
  const onSubmit = (data: PlaceBidRequestDto) => {
    submitBid(
      {
        jobId: String(id),
        payload: data, // Already validated and formatted by Zod
      },
      {
        onSuccess: () => {
          setLocalHasSubmitted(true);
          setIsBidding(false);
          reset(); // Clear the form memory on success
        },
      },
    );
  };

  return (
    <div className="max-w-5xl mx-auto pt-8 pb-12 px-4">
      <button
        className="flex items-center gap-2 text-muted hover:text-primary transition-colors text-sm font-medium mb-8 group cursor-pointer"
        onClick={() => navigate(-1)}
      >
        <IoArrowBack
          size={20}
          className="group-hover:-translate-x-1 transition-transform shrink-0"
        />
        <span>Back to Lead Feed</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card-bg border border-light-gray rounded-2xl p-8 shadow-sm">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-xs font-bold tracking-wider uppercase text-primary bg-card-label px-3 py-1 rounded-full">
                {job.categoryName}
              </span>
              <span className="text-sm text-muted font-medium">
                Posted {postedAt}
              </span>
            </div>

            <h1 className="text-3xl font-bold text-primary mb-8 leading-tight">
              {job.categoryName} Request
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-6 border-y border-light-gray mb-8">
              <div className="flex flex-col gap-1">
                <span className="text-xs font-bold text-muted uppercase tracking-wider">
                  Location
                </span>
                <div className="flex items-center gap-2 text-text-dark font-medium">
                  <IoLocationOutline className="text-primary text-lg shrink-0" />
                  <span className="line-clamp-1" title={job.address}>
                    {job.address}
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs font-bold text-muted uppercase tracking-wider">
                  Timeline
                </span>
                <div className="flex items-center gap-2 text-text-dark font-medium">
                  <IoTimeOutline className="text-primary text-lg shrink-0" />
                  {job.urgency.replace("_", " ")}
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-primary mb-3">
                Job Description
              </h3>
              <p className="text-text-dark leading-relaxed whitespace-pre-wrap">
                {job.description}
              </p>
            </div>

            {job.images && job.images.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-bold text-primary mb-3">
                  Attached Images
                </h3>
                <div className="flex gap-4 overflow-x-auto pb-2">
                  {job.images.map((imgUrl, idx) => (
                    <img
                      key={idx}
                      src={imgUrl}
                      alt="Job reference"
                      className="w-32 h-32 object-cover rounded-lg border border-light-gray"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-card-bg border border-light-gray rounded-2xl p-6 shadow-sm sticky top-24">
            <div className="mb-6">
              <div className="flex justify-between items-end mb-2">
                <h3 className="text-lg font-bold text-primary">Bid Status</h3>
                <span className="text-sm font-bold text-soft-danger">
                  {job.bidCount} Bids
                </span>
              </div>
            </div>

            {/* STATE 1: Locked */}
            {!isUnlocked && (
              <>
                <SeButton
                  btnText={
                    isUnlocking ? "Unlocking..." : "Unlock Lead (1 Token)"
                  }
                  variant="outline"
                  clickFunc={handleUnlock}
                  disabled={isUnlocking}
                  icon={<IoLockClosedOutline className="text-lg" />}
                  iconPosition="left"
                  className="w-full justify-center py-3.5 rounded-xl text-[15px] font-semibold"
                />
                <p className="text-xs text-muted text-center mt-3">
                  Reveals exact address and lets you place a bid.
                </p>
              </>
            )}

            {/* STATE 2: Unlocked, ready to bid */}
            {isUnlocked && !isBidding && !hasSubmitted && (
              <SeButton
                btnText="Place Bid"
                variant="accentLight"
                clickFunc={() => setIsBidding(true)}
                className="w-full justify-center py-3.5 rounded-xl text-[15px] font-semibold"
              />
            )}

            {/* STATE 3: Actively bidding (Replaced with React Hook Form) */}
            {isUnlocked && isBidding && !hasSubmitted && (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-4 animate-in fade-in slide-in-from-top-2 duration-300"
              >
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-muted uppercase tracking-wider">
                    Your Quote
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted pointer-events-none">
                      Rs.
                    </span>
                    <input
                      type="number"
                      placeholder="2500"
                      {...register("quotedPrice", { valueAsNumber: true })}
                      className={`w-full h-10.5 pl-9 pr-3 rounded-lg border bg-card-bg text-text-dark text-sm focus:outline-none ${
                        errors.quotedPrice
                          ? "border-red-500 focus:border-red-500"
                          : "border-light-gray focus:border-accent"
                      }`}
                    />
                  </div>
                  {errors.quotedPrice && (
                    <span className="text-xs text-red-500">
                      {errors.quotedPrice.message}
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-muted uppercase tracking-wider">
                    Your Message
                  </label>
                  <textarea
                    placeholder="Why are you the right fit for this job?"
                    rows={4}
                    {...register("message")}
                    className={`w-full p-3 rounded-lg border bg-card-bg text-text-dark text-sm focus:outline-none resize-none ${
                      errors.message
                        ? "border-red-500 focus:border-red-500"
                        : "border-light-gray focus:border-accent"
                    }`}
                  />
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-red-500">
                      {errors.message?.message}
                    </span>
                    <span
                      className={`text-xs ${messageValue.length > 300 ? "text-red-500" : "text-muted"}`}
                    >
                      {300 - messageValue.length} characters left
                    </span>
                  </div>
                </div>

                <div className="flex gap-2 mt-2">
                  <SeButton
                    btnText="Cancel"
                    variant="outline"
                    type="button" // Prevents accidental form submission
                    clickFunc={() => {
                      setIsBidding(false);
                      reset(); // Clear form memory if they cancel
                    }}
                    disabled={isSubmitting}
                    className="w-1/3 justify-center py-3.5 rounded-xl"
                  />
                  <SeButton
                    btnText={isSubmitting ? "Submitting..." : "Submit Quote"}
                    variant="accentLight"
                    type="submit" // Triggers handleSubmit
                    disabled={!isValid || isSubmitting}
                    className="w-2/3 justify-center py-3.5 rounded-xl"
                  />
                </div>
              </form>
            )}

            {/* STATE 4: Submitted */}
            {hasSubmitted && (
              <div className="flex flex-col items-center text-center gap-2 py-4 animate-in fade-in zoom-in duration-300">
                <div className="w-11 h-11 rounded-full bg-green-100 flex items-center justify-center mb-1">
                  <IoCheckmarkCircleOutline className="text-green-600 text-2xl" />
                </div>
                <p className="text-base font-bold text-primary">Quote sent</p>
                <p className="text-sm text-muted leading-relaxed">
                  {job.customerName} will be notified.
                </p>

                {job.myBid && (
                  <div className="w-full bg-light-gray/50 rounded-xl p-4 mt-4 text-sm flex flex-col gap-3 text-left border border-light-gray">
                    <div className="flex justify-between items-center">
                      <span className="text-muted font-medium">Your quote</span>
                      <span className="font-bold text-primary text-base">
                        Rs. {job.myBid.quotedPrice}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted font-medium">Status</span>
                      <span className="text-xs font-bold tracking-wider uppercase px-2 py-1 rounded-md bg-accent/10 text-accent">
                        {job.myBid.status}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Contact Details — visible only if unlocked */}
            {isUnlocked && (
              <div className="mt-6 pt-6 border-t border-light-gray">
                <div className="flex items-center gap-3 mb-4">
                  {job.customerImageUrl ? (
                    <img
                      src={job.customerImageUrl}
                      alt={job.customerName}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <IoPersonCircleOutline className="text-4xl text-muted/50 shrink-0" />
                  )}
                  <div>
                    <p className="text-xs text-muted font-medium uppercase tracking-wider">
                      Posted By
                    </p>
                    <p className="text-sm font-bold text-text-dark">
                      {job.customerName}
                    </p>
                  </div>
                </div>
                {job.contactNumber && (
                  <div className="bg-light p-4 rounded-xl border border-light-gray/50">
                    <p className="text-xs font-bold text-muted uppercase tracking-wider mb-2">
                      Contact Number
                    </p>
                    <a
                      href={`tel:${job.contactNumber}`}
                      className="flex items-center gap-2 text-primary font-bold hover:text-accent transition-colors text-lg"
                    >
                      <IoCallOutline />
                      {job.contactNumber}
                    </a>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobLeadDetailsPage;
