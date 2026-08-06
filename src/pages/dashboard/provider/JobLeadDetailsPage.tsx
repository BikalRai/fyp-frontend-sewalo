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
  IoEyeOutline,
  IoEyeOffOutline,
} from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import { placeBidSchema, type PlaceBidRequestDto } from "@/types/bid.types";
import { Modal } from "@mantine/core";

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

  const { data: job, isLoading, isError } = useJobLead(String(id));
  const { mutate: unlockJob, isPending: isUnlocking } = useUnlockJob();
  const { mutate: submitBid, isPending: isSubmitting } = usePlaceBid();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isValid },
  } = useForm<PlaceBidRequestDto>({
    resolver: zodResolver(placeBidSchema),
    mode: "onChange",
  });

  const messageValue = watch("message", "");

  const [isBidding, setIsBidding] = useState(false);
  const [localHasSubmitted, setLocalHasSubmitted] = useState(false);

  // 2. Added state to track which image is clicked
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (isLoading)
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <div className="w-10 h-10 border-3 border-light-gray border-t-accent rounded-full animate-spin" />
        <p className="text-sm text-muted font-medium">Loading job details...</p>
      </div>
    );

  if (isError || !job)
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <div className="w-14 h-14 rounded-full bg-soft-danger/10 flex items-center justify-center">
          <IoLocationOutline className="text-soft-danger" size={24} />
        </div>
        <div className="text-center">
          <p className="text-base font-semibold text-text-dark">
            Failed to load job
          </p>
          <p className="text-sm text-muted mt-1">
            Something went wrong. Please try again.
          </p>
        </div>
        <SeButton
          btnText="Retry"
          variant="outline"
          clickFunc={() => window.location.reload()}
          size="sm"
        />
      </div>
    );

  const isUnlocked = job.isUnlocked;
  const hasSubmitted = Boolean(job.myBid) || localHasSubmitted;
  const postedAt = timeAgo(job.createdAt);

  const handleUnlock = () => {
    unlockJob(String(id), {
      onSuccess: () => setIsBidding(true),
    });
  };

  const onSubmit = (data: PlaceBidRequestDto) => {
    submitBid(
      {
        jobId: String(id),
        payload: data,
      },
      {
        onSuccess: () => {
          setLocalHasSubmitted(true);
          setIsBidding(false);
          reset();
        },
      },
    );
  };

  const getMaskedAddress = (fullAddress: string) => {
    const parts = fullAddress.split(",");
    if (parts.length <= 2) return fullAddress;
    return `${parts[0]}, ${parts[1]}...`;
  };

  return (
    <>
      {/* 3. The Mantine Modal for the Image Lightbox */}
      <Modal
        opened={!!selectedImage}
        onClose={() => setSelectedImage(null)}
        centered
        size="auto"
        withCloseButton={false}
        padding={0}
        overlayProps={{ backgroundOpacity: 0.7, blur: 4 }}
      >
        {selectedImage && (
          <img
            src={selectedImage}
            alt="Enlarged job reference"
            className="max-h-[85vh] max-w-[90vw] object-contain rounded-md block"
          />
        )}
      </Modal>

      <div className="pt-6 pb-12 px-4 sm:px-6">
        {/* Back Button */}
        <button
          className="flex items-center gap-2 text-muted hover:text-primary transition-colors text-sm font-medium mb-6 group cursor-pointer"
          onClick={() => navigate(-1)}
        >
          <IoArrowBack
            size={18}
            className="group-hover:-translate-x-1 transition-transform shrink-0"
          />
          <span>Back to Lead Feed</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-card-bg border border-light-gray/80 rounded-2xl p-6 sm:p-8 shadow-[0_2px_16px_rgba(25,53,87,0.04)]">
              {/* Category + Time */}
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="text-xs font-bold tracking-wider uppercase text-primary bg-card-label px-3 py-1.5 rounded-full">
                  {job.categoryName}
                </span>
                <span className="text-xs text-muted font-medium flex items-center gap-1">
                  <IoTimeOutline size={12} />
                  Posted {postedAt}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl font-extrabold text-text-dark mb-6 leading-tight">
                {job.categoryName} Request
              </h1>

              {/* Location + Timeline Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-5 border-y border-light-gray/60 mb-6">
                {/* Location */}
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-bold text-muted uppercase tracking-widest">
                    Location
                  </span>
                  <div className="flex items-start gap-2">
                    <IoLocationOutline className="text-accent text-lg shrink-0 mt-0.5" />
                    <div className="min-w-0">
                      {isUnlocked ? (
                        <>
                          <p className="text-sm font-semibold text-text-dark break-words">
                            {job.address}
                          </p>
                          <p className="text-xs text-accent font-medium mt-1 flex items-center gap-1">
                            <IoEyeOutline size={12} />
                            Full address visible
                          </p>
                        </>
                      ) : (
                        <>
                          <p className="text-sm font-semibold text-text-dark">
                            {getMaskedAddress(job.address)}
                          </p>
                          <p className="text-xs text-muted font-medium mt-1 flex items-center gap-1">
                            <IoEyeOffOutline size={12} />
                            Exact location hidden — unlock to view
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Timeline */}
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-bold text-muted uppercase tracking-widest">
                    Timeline
                  </span>
                  <div className="flex items-center gap-2">
                    <IoTimeOutline className="text-accent text-lg shrink-0" />
                    <span className="text-sm font-semibold text-text-dark">
                      {job.urgency.replace("_", " ")}
                    </span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-base font-bold text-text-dark mb-3">
                  Job Description
                </h3>
                <p className="text-sm text-text-dark leading-relaxed whitespace-pre-wrap">
                  {job.description}
                </p>
              </div>

              {/* Images */}
              {job.images && job.images.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-base font-bold text-text-dark mb-3">
                    Attached Images
                  </h3>
                  <div className="flex gap-3 overflow-x-auto pb-2 -mx-2 px-2 scrollbar-hide">
                    {job.images.map((imgUrl, idx) => (
                      <div
                        key={idx}
                        onClick={() => setSelectedImage(imgUrl)}
                        role="button"
                        tabIndex={0}
                        className="shrink-0 w-28 h-28 sm:w-32 sm:h-32 rounded-xl overflow-hidden border border-light-gray hover:border-accent transition-colors cursor-pointer group"
                      >
                        <img
                          src={imgUrl}
                          alt="Job reference"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-card-bg border border-light-gray/80 rounded-2xl p-6 shadow-[0_2px_16px_rgba(25,53,87,0.04)] lg:sticky lg:top-24">
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-light-gray/60">
                <h3 className="text-base font-bold text-text-dark">
                  Bid Status
                </h3>
                <span className="text-xs font-bold text-soft-danger bg-soft-danger/10 px-2.5 py-1 rounded-full">
                  {job.bidCount} Bids
                </span>
              </div>

              {!isUnlocked && (
                <div className="space-y-4">
                  <div className="bg-light rounded-xl p-4 border border-light-gray/60">
                    <div className="flex items-center gap-2 mb-2">
                      <IoEyeOffOutline className="text-muted" size={18} />
                      <span className="text-sm font-semibold text-text-dark">
                        Location Hidden
                      </span>
                    </div>
                    <p className="text-xs text-muted leading-relaxed">
                      {getMaskedAddress(job.address)}
                    </p>
                  </div>

                  <SeButton
                    btnText={
                      isUnlocking ? "Unlocking..." : "Unlock Lead (1 Token)"
                    }
                    variant="outline"
                    clickFunc={handleUnlock}
                    disabled={isUnlocking}
                    icon={<IoLockClosedOutline className="text-lg" />}
                    iconPosition="left"
                    styleClass="w-full justify-center"
                  />
                  <p className="text-xs text-muted text-center">
                    Reveals exact address and lets you place a bid.
                  </p>
                </div>
              )}

              {isUnlocked && !isBidding && !hasSubmitted && (
                <div className="space-y-4">
                  <div className="bg-accent/5 rounded-xl p-4 border border-accent/20">
                    <div className="flex items-center gap-2 mb-2">
                      <IoEyeOutline className="text-accent" size={18} />
                      <span className="text-sm font-semibold text-text-dark">
                        Full Address
                      </span>
                    </div>
                    <p className="text-xs text-text-dark leading-relaxed break-words">
                      {job.address}
                    </p>
                  </div>

                  <SeButton
                    btnText="Place Bid"
                    variant="accentLight"
                    clickFunc={() => setIsBidding(true)}
                    styleClass="w-full justify-center"
                  />
                </div>
              )}

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
                        className={`w-full h-10 pl-9 pr-3 rounded-lg border bg-white text-text-dark text-sm focus:outline-none transition-colors ${
                          errors.quotedPrice
                            ? "border-soft-danger focus:border-soft-danger focus:ring-2 focus:ring-soft-danger/15"
                            : "border-light-gray hover:border-accent/40 focus:border-accent focus:ring-2 focus:ring-accent/15"
                        }`}
                      />
                    </div>
                    {errors.quotedPrice && (
                      <span className="text-xs text-soft-danger font-medium">
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
                      className={`w-full p-3 rounded-lg border bg-white text-text-dark text-sm focus:outline-none resize-none transition-colors ${
                        errors.message
                          ? "border-soft-danger focus:border-soft-danger focus:ring-2 focus:ring-soft-danger/15"
                          : "border-light-gray hover:border-accent/40 focus:border-accent focus:ring-2 focus:ring-accent/15"
                      }`}
                    />
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-soft-danger font-medium">
                        {errors.message?.message}
                      </span>
                      <span
                        className={`text-xs font-medium ${
                          messageValue.length > 300
                            ? "text-soft-danger"
                            : "text-muted"
                        }`}
                      >
                        {300 - messageValue.length} left
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-2">
                    <SeButton
                      btnText="Cancel"
                      variant="outline"
                      type="button"
                      clickFunc={() => {
                        setIsBidding(false);
                        reset();
                      }}
                      disabled={isSubmitting}
                      styleClass="w-1/3 justify-center"
                    />
                    <SeButton
                      btnText={isSubmitting ? "Submitting..." : "Submit Quote"}
                      variant="accentLight"
                      type="submit"
                      disabled={!isValid || isSubmitting}
                      styleClass="w-2/3 justify-center"
                    />
                  </div>
                </form>
              )}

              {hasSubmitted && (
                <div className="flex flex-col items-center text-center gap-3 py-4 animate-in fade-in zoom-in duration-300">
                  <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center mb-1">
                    <IoCheckmarkCircleOutline className="text-emerald-500 text-2xl" />
                  </div>
                  <p className="text-base font-bold text-text-dark">
                    Quote sent
                  </p>
                  <p className="text-xs text-muted leading-relaxed">
                    {job.customerName} will be notified.
                  </p>

                  {job.myBid && (
                    <div className="w-full bg-light rounded-xl p-4 mt-4 text-sm flex flex-col gap-3 text-left border border-light-gray/60">
                      <div className="flex justify-between items-center">
                        <span className="text-muted font-medium text-xs">
                          Your quote
                        </span>
                        <span className="font-bold text-text-dark text-base">
                          Rs. {job.myBid.quotedPrice}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted font-medium text-xs">
                          Status
                        </span>
                        <span className="text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full bg-accent/10 text-accent">
                          {job.myBid.status}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {isUnlocked && (
                <div className="mt-6 pt-6 border-t border-light-gray/60">
                  <div className="flex items-center gap-3 mb-4">
                    {job.customerImageUrl ? (
                      <img
                        src={job.customerImageUrl}
                        alt={job.customerName}
                        className="w-10 h-10 rounded-full object-cover border-2 border-light-gray"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-light flex items-center justify-center">
                        <IoPersonCircleOutline className="text-2xl text-muted/50" />
                      </div>
                    )}
                    <div>
                      <p className="text-[10px] text-muted font-bold uppercase tracking-widest">
                        Posted By
                      </p>
                      <p className="text-sm font-bold text-text-dark">
                        {job.customerName}
                      </p>
                    </div>
                  </div>
                  {job.contactNumber && (
                    <a
                      href={`tel:${job.contactNumber}`}
                      className="flex items-center justify-center gap-2 w-full py-3 bg-light rounded-xl border border-light-gray/60 text-primary font-bold hover:bg-accent hover:text-white hover:border-accent transition-all duration-200 text-sm"
                    >
                      <IoCallOutline size={16} />
                      {job.contactNumber}
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobLeadDetailsPage;
