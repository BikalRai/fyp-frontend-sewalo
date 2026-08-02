import SeButton from "@/components/button/SeButton";
import SeSpinner from "@/components/spinner/SeSpinner";
import { useConfirmJobCompletion } from "@/hooks/mutations/useJob";
import type { JobResponse } from "@/types/job.types"; // Assuming you have this exported
import {
  formatTimeAgo,
  getDifficultyStyles,
  getUrgencyStyles,
} from "@/uitls/job.utils";
import { IoHammer } from "react-icons/io5";
import { LuClock, LuMapPin, LuUsers } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

// 1. We pass the entire job object so the card has access to everything it needs
interface JobCardProps {
  job: JobResponse;
}

// 3. Helper for dynamic status colors
const getStatusStyles = (status: string, hasRating: boolean) => {
  switch (status) {
    case "ANALYZING":
      return "bg-blue-50 text-blue-600 border-blue-200";
    case "OPEN":
      return "bg-green-50 text-green-600 border-green-200";
    case "CANCELLED":
      return "bg-red-50 text-red-600 border-red-200";
    case "AWAITING_CONFIRMATION":
      return "bg-amber-50 text-amber-600 border-amber-200";
    case "COMPLETED":
      return hasRating
        ? "bg-gray-50 text-gray-600 border-gray-200"
        : "bg-blue-50 text-blue-600 border-blue-200";
    default:
      return "bg-gray-50 text-gray-600 border-gray-200";
  }
};

const JobCard = ({ job }: JobCardProps) => {
  const navigate = useNavigate();

  const getDetails = () => {
    navigate(`/dashboard/my-posts/${job.id}`);
  };

  const isAwaitingConfirmation = job.status === "AWAITING_CONFIRMATION";
  const confirmCompletion = useConfirmJobCompletion();

  const handleConfirm = (e: React.MouseEvent) => {
    e.stopPropagation();
    confirmCompletion.mutate(job.id, {
      onSuccess: () =>
        toast.success("Job confirmed! Tap into it to leave a review."),
    });
  };

  const needsReview = job.status === "COMPLETED" && !job.rating;

  return (
    <div className="bg-light border border-muted/10 rounded-xl p-5 flex flex-col gap-3 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <div
          className={`px-2.5 py-1 rounded-full border text-xs font-semibold w-fit flex items-center gap-1.5 ${getStatusStyles(job.status, !!job.rating)}`}
        >
          {job.status === "ANALYZING" && <SeSpinner />}
          {job.status}
        </div>
        {job.urgency && (
          <span
            className={`text-xs font-semibold px-2.5 py-1 rounded-md w-fit ${getUrgencyStyles(job.urgency)}`}
          >
            {job.urgency}
          </span>
        )}
      </div>

      <div>
        <p className="text-sm font-medium text-text-dark mb-1">
          {job.description || "No description provided."}
        </p>
        {job.address && (
          <div className="flex items-center gap-1.5 text-muted text-xs">
            <LuMapPin className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{job.address}</span>
          </div>
        )}
      </div>

      {job.difficulty && (
        <span
          className={`text-xs font-semibold px-2.5 py-1 rounded-md w-fit ${getDifficultyStyles(job.difficulty)}`}
        >
          {job.difficulty} difficulty
        </span>
      )}

      <div className="flex items-center justify-between border-t border-muted/10 pt-3 mt-0.5">
        <div className="flex items-center gap-5 text-muted text-sm font-medium">
          <div className="flex items-center gap-1.5">
            <IoHammer className="w-4 h-4" />
            <span>{job.categoryName}</span>
          </div>
          <div
            className="flex items-center gap-1.5"
            title="Providers preparing quotes"
          >
            <LuUsers className="w-4 h-4" />
            {/* Option A: Show how many providers have unlocked it */}
            <span>{job.unlockCount}/3 Interested</span>
          </div>
          <div className="flex items-center gap-1.5">
            <LuClock className="w-4 h-4" />
            <span>{formatTimeAgo(job.createdAt)}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {isAwaitingConfirmation && (
            <SeButton
              btnText={
                confirmCompletion.isPending
                  ? "Confirming..."
                  : "Confirm Completion"
              }
              variant="accentLight"
              size="sm"
              clickFunc={handleConfirm}
              disabled={confirmCompletion.isPending}
            />
          )}
          {needsReview && (
            <SeButton
              btnText="Leave a Review"
              variant="accentLight"
              size="sm"
              clickFunc={getDetails}
            />
          )}
          <SeButton
            btnText="View"
            variant="lightGray"
            size="sm"
            clickFunc={getDetails}
          />
        </div>
      </div>
    </div>
  );
};

export default JobCard;
