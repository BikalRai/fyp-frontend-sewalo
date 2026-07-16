import SeButton from "@/components/button/SeButton";
import ReceivedBidsList from "@/features/bid/ReceivedBidsList";
import {
  useCancelJobPost,
  useCustomerJobDetail,
} from "@/hooks/mutations/useJob";
import { formatTimeAgo } from "@/uitls/job.utils";
import { Button, Group, Modal, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IoLocationOutline,
  IoTimeOutline,
  IoBriefcaseOutline,
  IoCloseCircleOutline,
} from "react-icons/io5";
import { LuLayoutList } from "react-icons/lu";
import { Link, useParams } from "react-router-dom";
import { toast } from "sonner";

const JobDetailsPage = () => {
  const { jobId } = useParams<{ jobId: string }>();

  const {
    data: job,
    isLoading: isJobLoading,
    isError,
  } = useCustomerJobDetail(jobId!);
  const { mutate: cancelJob, isPending } = useCancelJobPost();

  const [opened, { open, close }] = useDisclosure(false);

  if (isJobLoading) return <div>Loading job details...</div>;
  if (isError || !job) return <div>Couldn't load this job. Try again.</div>;

  const executeCancel = () => {
    cancelJob(jobId!, {
      onSuccess: () => {
        toast.success("Job cancelled successfully.");
        close();
      },
      onError: (error) => {
        console.error("Cancel job error:", error);
        toast.error("Failed to cancel the job. Please try again.");
        close();
      },
    });
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title={<span className="font-bold text-lg">Cancel Job Post</span>}
        centered
        overlayProps={{ backgroundOpacity: 0.55, blur: 3 }}
      >
        <Text size="sm" c="dimmed" mb="xl">
          Are you sure you want to cancel this job? This action cannot be
          undone, and all professionals who submitted quotes will be notified
          that the job is no longer available.
        </Text>

        <Group justify="flex-end" gap="sm">
          <Button variant="default" onClick={close} disabled={isPending}>
            Keep Job
          </Button>
          <Button color="red" onClick={executeCancel} loading={isPending}>
            Yes, Cancel Job
          </Button>
        </Group>
      </Modal>

      <div className="max-w-4xl mx-auto grid gap-8 pb-12">
        <div className="flex justify-between items-center w-full">
          <Link
            to="/dashboard/my-posts"
            className="text-muted text-sm flex items-center gap-1 hover:text-accent transition-colors w-fit"
          >
            <LuLayoutList size={14} />
            Back to My Posts
          </Link>

          {job.status === "OPEN" && (
            <SeButton
              btnText="Cancel Job"
              type="button"
              variant="tertiary"
              size="sm"
              icon={<IoCloseCircleOutline size={18} />}
              iconPosition="left"
              clickFunc={open}
              className="text-red-500! hover:text-red-600! hover:bg-red-50! px-3 py-1.5 rounded-lg"
            />
          )}
        </div>

        <div className="bg-card-bg rounded-2xl border border-light-gray shadow-sm overflow-hidden">
          <div className="p-6 border-b border-light-gray bg-bg/30 flex flex-col gap-4">
            <div className="flex justify-between items-start">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-small font-bold tracking-wider uppercase bg-accent/10 text-accent w-fit">
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

        <ReceivedBidsList jobId={jobId!} />
      </div>
    </>
  );
};

export default JobDetailsPage;
