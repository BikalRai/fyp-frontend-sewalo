import SeButton from "@/components/button/SeButton";
import { useSubmitRating } from "@/hooks/mutations/useJob";
import type { JobResponse } from "@/types/job.types";
import { Rating, Text, Textarea } from "@mantine/core";
import { useState } from "react";
import { toast } from "sonner";

const JobRatingSection = ({ job }: { job: JobResponse }) => {
  const [score, setScore] = useState<number>(0);
  const [review, setReview] = useState<string>("");
  const { mutate: submitRating, isPending } = useSubmitRating();

  if (job.status !== "COMPLETED") return null;

  if (job.rating) {
    return (
      <div className="bg-card-bg rounded-2xl border border-light-gray shadow-sm p-6">
        <h3 className="text-xs font-bold tracking-widest uppercase text-muted mb-3">
          Your Review
        </h3>
        <Rating value={job.rating.score} readOnly />
        {job.rating.review && (
          <p className="text-text-dark text-sm leading-relaxed font-medium mt-3">
            {job.rating.review}
          </p>
        )}
      </div>
    );
  }

  const handleSubmit = () => {
    if (score === 0) {
      toast.error("Please select a star rating.");
      return;
    }

    submitRating(
      { jobId: job.id, payload: { score, review: review || undefined } },
      {
        onSuccess: () => toast.success("Thanks for your feedback!"),
        onError: () => toast.error("Couldn't submit your rating. Try again."),
      },
    );
  };

  return (
    <div className="bg-card-bg rounded-2xl border border-light-gray shadow-sm p-6 flex flex-col gap-4">
      <div>
        <h3 className="text-xs font-bold tracking-widest uppercase text-muted mb-1">
          How did it go?
        </h3>
        <Text size="sm" c="dimmed">
          Rate your experience with this job.
        </Text>
      </div>

      <Rating value={score} onChange={setScore} size="lg" />

      <Textarea
        placeholder="Leave a review (optional)"
        value={review}
        onChange={(e) => setReview(e.currentTarget.value)}
        maxLength={1000}
        minRows={3}
        autosize
      />

      <SeButton
        btnText={isPending ? "Submitting..." : "Submit Rating"}
        variant="primary"
        clickFunc={handleSubmit}
        disabled={isPending}
      />
    </div>
  );
};

export default JobRatingSection;
