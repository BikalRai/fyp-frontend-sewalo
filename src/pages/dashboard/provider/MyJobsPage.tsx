import { useState } from "react";
import {
  Tabs,
  SimpleGrid,
  Paper,
  Text,
  Group,
  Modal,
  Textarea,
  FileInput,
  Stack,
  LoadingOverlay,
  Box,
} from "@mantine/core";
import {
  IoTimeOutline,
  IoLocationOutline,
  IoCallOutline,
  IoCheckmarkCircleOutline,
  IoHourglassOutline,
  IoTrendingUpOutline,
  IoWalletOutline,
  IoStarOutline,
  IoCloudUploadOutline,
  IoChatbubbleEllipsesOutline,
} from "react-icons/io5";
import SeButton from "@/components/button/SeButton";
import { formatTimeAgo } from "@/uitls/job.utils";
import type { JobResponse } from "@/types/job.types";
import { useCompleteJob, useProviderJobs } from "@/hooks/mutations/useJob";
import { uploadImagesToCloudinary } from "@/services/upload.service";
import { useProviderStats } from "@/hooks/mutations/useProvider";
import { useNavigate } from "react-router-dom";

// --- Sub-components per tab ---
// (PendingCard, ActiveCard, and CompletedCard remain EXACTLY the same)

const PendingCard = ({ job }: { job: JobResponse }) => (
  <div className="bg-card-bg border border-light-gray rounded-2xl p-5 flex flex-col sm:flex-row justify-between gap-4 hover:border-accent transition-colors">
    <div className="flex-1">
      <div className="flex items-center gap-2 text-xs text-muted font-medium mb-2">
        <span className="font-bold uppercase tracking-wider text-primary bg-card-label px-2 py-0.5 rounded-full">
          {job.categoryName}
        </span>
        <span className="w-1 h-1 rounded-full bg-light-gray" />
        <span>{formatTimeAgo(job.createdAt)}</span>
      </div>
      <h3 className="text-base font-bold text-primary mb-1">
        {job.categoryName} Request
      </h3>
      <p className="text-sm text-text-dark line-clamp-1 mb-2">
        {job.description}
      </p>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-text-dark mt-2">
        <span className="flex items-center gap-1.5">
          <IoLocationOutline className="text-muted" />
          <span className="truncate max-w-50">{job.address}</span>
        </span>
        <span className="flex items-center gap-1.5">
          <IoTimeOutline className="text-muted" />
          {job.urgency.replace("_", " ")}
        </span>
      </div>
    </div>

    <div className="flex flex-col items-end justify-between gap-3 shrink-0">
      <div className="text-right">
        <p className="text-xs text-muted font-medium uppercase tracking-wider">
          Your quote
        </p>
        <p className="text-lg font-bold text-primary">
          Rs. {job.myBid?.quotedPrice?.toLocaleString() || 0}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs text-muted font-medium">
          Awaiting response from {job.customerName.split(" ")[0]}
        </span>
      </div>
    </div>
  </div>
);

const ActiveCard = ({
  job,
  onMarkComplete,
}: {
  job: JobResponse;
  onMarkComplete: (job: JobResponse) => void;
}) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/dashboard/leads/${job.id}`)}
      className="bg-card-bg border border-accent/30 rounded-2xl p-5 flex flex-col sm:flex-row justify-between gap-4 shadow-sm shadow-accent/5 cursor-pointer hover:border-accent transition-colors"
    >
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-bold text-accent bg-accent/10 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
            Active
          </span>
          <span className="text-xs text-muted font-medium">
            {job.categoryName}
          </span>
        </div>
        <h3 className="text-base font-bold text-primary mb-2">
          {job.categoryName} Request
        </h3>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-text-dark">
          <span className="flex items-center gap-1.5">
            <IoLocationOutline className="text-muted" />
            <span className="truncate max-w-50">{job.address}</span>
          </span>
          <span className="flex items-center gap-1.5">
            <IoTimeOutline className="text-muted" />
            Due: {job.urgency.replace("_", " ")}
          </span>
        </div>

        {job.contactNumber && (
          <a
            href={`tel:${job.contactNumber}`}
            onClick={(e) => e.stopPropagation()} // Prevent card click when clicking phone number
            className="inline-flex items-center gap-1.5 text-sm font-bold text-accent hover:text-accent/80 transition-colors mt-4 bg-accent/5 px-3 py-1.5 rounded-lg"
          >
            <IoCallOutline />
            {job.contactNumber}
          </a>
        )}
      </div>

      <div className="flex flex-col items-end justify-between gap-3 shrink-0">
        <div className="text-right">
          <p className="text-xs text-muted font-medium uppercase tracking-wider">
            Agreed quote
          </p>
          <p className="text-lg font-bold text-primary">
            Rs. {job.myBid?.quotedPrice?.toLocaleString() || 0}
          </p>
        </div>

        {/* NEW: Button Group */}
        <div className="flex flex-wrap items-center gap-2 justify-end">
          <SeButton
            btnText="Message"
            variant="outline"
            size="sm"
            icon={<IoChatbubbleEllipsesOutline className="text-lg" />}
            iconPosition="left"
            clickFunc={(e) => {
              e.stopPropagation(); // Prevents the card click
              navigate(`/dashboard/jobs/${job.id}/chat`);
            }}
          />
          <SeButton
            btnText="Mark as complete"
            variant="accentLight"
            size="sm"
            icon={<IoCheckmarkCircleOutline className="text-lg" />}
            iconPosition="left"
            clickFunc={(e) => {
              e.stopPropagation(); // Prevents the card click
              onMarkComplete(job);
            }}
          />
        </div>
      </div>
    </div>
  );
};

const CompletedCard = ({ job }: { job: JobResponse }) => (
  <div className="bg-card-bg border border-light-gray rounded-2xl p-5 flex flex-col sm:flex-row justify-between gap-4 opacity-90 hover:opacity-100 transition-opacity">
    <div className="flex-1">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xs font-bold text-muted bg-light-gray px-2.5 py-0.5 rounded-full uppercase tracking-wider">
          Completed
        </span>
        <span className="text-xs text-muted font-medium">
          {formatTimeAgo(job.myBid?.createdAt || job.createdAt)}
        </span>
      </div>
      <h3 className="text-base font-bold text-primary mb-2">
        {job.categoryName} Request
      </h3>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-text-dark">
        <span className="flex items-center gap-1.5">
          <IoLocationOutline className="text-muted" />
          <span className="truncate max-w-50">{job.address}</span>
        </span>
        <span className="text-sm text-muted font-medium border-l border-light-gray pl-4">
          Client: {job.customerName}
        </span>
      </div>
    </div>

    <div className="flex flex-col items-end justify-between gap-3 shrink-0">
      <div className="text-right">
        <p className="text-xs text-muted font-medium uppercase tracking-wider">
          Earned
        </p>
        <p className="text-lg font-bold text-accent">
          Rs. {job.myBid?.quotedPrice?.toLocaleString() || 0}
        </p>
      </div>
      <span className="text-xs text-muted">No review yet</span>
    </div>
  </div>
);

// --- Page ---

const MyJobsPage = () => {
  const { data: jobs, isLoading, isError } = useProviderJobs();
  const { data: stats } = useProviderStats();

  // Wire up your actual API hook
  const { mutateAsync: completeJob, isPending: isSubmitting } =
    useCompleteJob();

  // --- MODAL STATE ---
  const [jobToComplete, setJobToComplete] = useState<JobResponse | null>(null);
  const [completionNotes, setCompletionNotes] = useState("");
  const [files, setFiles] = useState<File[]>([]);

  // NEW: Track the image upload process separately
  const [isUploadingImages, setIsUploadingImages] = useState(false);

  // Combine both states so the UI stays locked from start to finish
  const isProcessing = isSubmitting || isUploadingImages;

  const closeModal = () => {
    if (isProcessing) return; // Prevent closing while processing
    setJobToComplete(null);
    setCompletionNotes("");
    setFiles([]);
    setIsUploadingImages(false);
  };

  const handleCompleteSubmit = async () => {
    if (!jobToComplete) return;

    try {
      let uploadedImageUrls: string[] = [];

      // 1. Upload files to Cloudinary if the provider selected any
      if (files.length > 0) {
        setIsUploadingImages(true); // Lock the UI for uploads
        uploadedImageUrls = await uploadImagesToCloudinary(files);
        setIsUploadingImages(false); // Unlock upload state
      }

      // 2. Fire the mutation with the exact payload Spring Boot is expecting
      await completeJob({
        jobId: jobToComplete.id,
        payload: {
          completionNotes: completionNotes,
          completionImages: uploadedImageUrls,
        },
      });

      // 3. Close the modal and reset state on success
      closeModal();
    } catch (error) {
      setIsUploadingImages(false); // Ensure UI unlocks on upload failure
      console.error("Completion failed:", error);
    }
  };

  if (isLoading)
    return (
      <div className="p-8 text-center text-muted">Loading your jobs...</div>
    );
  if (isError)
    return (
      <div className="p-8 text-center text-danger">Failed to load jobs.</div>
    );

  const myBiddedJobs = jobs?.filter((job) => job.myBid) || [];

  const pending = myBiddedJobs.filter(
    (j) => j.myBid?.status === "PENDING" && j.status === "OPEN",
  );
  const active = myBiddedJobs.filter(
    (j) => j.myBid?.status === "ACCEPTED" && j.status !== "COMPLETED",
  );
  const completed = myBiddedJobs.filter(
    (j) => j.status === "COMPLETED" && j.myBid?.status === "ACCEPTED",
  );

  const earningsStats = [
    {
      label: "Total earned",
      value: `Rs. ${(stats?.totalEarned ?? 0).toLocaleString()}`,
      icon: <IoWalletOutline className="text-accent text-lg" />,
    },
    {
      label: "This month",
      value: `Rs. ${(stats?.thisMonthEarned ?? 0).toLocaleString()}`,
      icon: <IoTrendingUpOutline className="text-accent text-lg" />,
    },
    {
      label: "Active jobs",
      value: (stats?.activeJobs ?? 0).toString(),
      icon: <IoHourglassOutline className="text-accent text-lg" />,
    },
    {
      label: "Avg. rating",
      value: stats?.avgRating != null ? stats.avgRating.toFixed(1) : "—",
      icon: <IoStarOutline className="text-yellow-400 text-lg" />,
    },
  ];

  return (
    <div className="max-w-5xl mx-auto pb-12 p-4">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-primary mb-1">My Jobs</h1>
        <p className="text-sm text-muted">
          Track your bids, active work, and earnings.
        </p>
      </div>

      {/* Earnings strip */}
      <SimpleGrid cols={{ base: 2, sm: 4 }} spacing="md" className="mb-8">
        {earningsStats.map((stat) => (
          <Paper
            key={stat.label}
            withBorder
            radius="lg"
            p="md"
            className="bg-card-bg border-light-gray"
          >
            <Group justify="space-between" align="flex-start" mb={8}>
              <Text
                size="xs"
                c="dimmed"
                fw={700}
                className="uppercase tracking-wider"
              >
                {stat.label}
              </Text>
              {stat.icon}
            </Group>
            <Text
              size="xl"
              fw={700}
              className={
                stat.label.includes("Total") || stat.label.includes("month")
                  ? "text-accent"
                  : "text-primary"
              }
            >
              {stat.value}
            </Text>
          </Paper>
        ))}
      </SimpleGrid>

      {/* Tabs */}
      <Tabs
        defaultValue="active"
        variant="pills"
        classNames={{
          tab: "text-muted font-medium hover:bg-light-gray transition-colors data-[active]:!bg-accent data-[active]:!text-white data-[active]:hover:bg-primary/90 rounded-full px-5 py-2",
        }}
      >
        <Tabs.List className="mb-6 gap-2 border-b-0">
          <Tabs.Tab value="active">
            Active
            {active.length > 0 && (
              <span className="ml-2 text-xs font-bold px-2 py-0.5 rounded-full shadow-sm bg-primary text-white group-data-[active]:!bg-white/30 group-data-[active]:!text-white">
                {active.length}
              </span>
            )}
          </Tabs.Tab>
          <Tabs.Tab value="pending">
            Pending
            {pending.length > 0 && (
              <span className="ml-2 text-xs font-bold px-2 py-0.5 rounded-full shadow-sm bg-primary text-white group-data-[active]:!bg-white/30 group-data-[active]:!text-white">
                {pending.length}
              </span>
            )}
          </Tabs.Tab>
          <Tabs.Tab value="completed">Completed</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="active">
          <div className="grid gap-4">
            {active.length === 0 ? (
              <div className="text-sm text-muted py-12 text-center border-2 border-dashed border-light-gray rounded-2xl bg-light">
                No active jobs right now. Once a customer accepts your bid, it
                will appear here.
              </div>
            ) : (
              active.map((job) => (
                <ActiveCard
                  key={job.id}
                  job={job}
                  onMarkComplete={setJobToComplete}
                />
              ))
            )}
          </div>
        </Tabs.Panel>

        <Tabs.Panel value="pending">
          <div className="grid gap-4">
            {pending.length === 0 ? (
              <div className="text-sm text-muted py-12 text-center border-2 border-dashed border-light-gray rounded-2xl bg-light">
                No pending bids right now. Head over to the lead feed to place
                some quotes!
              </div>
            ) : (
              pending.map((job) => <PendingCard key={job.id} job={job} />)
            )}
          </div>
        </Tabs.Panel>

        <Tabs.Panel value="completed">
          <div className="grid gap-4">
            {completed.length === 0 ? (
              <div className="text-sm text-muted py-12 text-center border-2 border-dashed border-light-gray rounded-2xl bg-light">
                No completed jobs yet. Keep up the good work!
              </div>
            ) : (
              completed.map((job) => <CompletedCard key={job.id} job={job} />)
            )}
          </div>
        </Tabs.Panel>
      </Tabs>

      {/* Completion Modal */}
      <Modal
        opened={!!jobToComplete}
        onClose={closeModal}
        closeOnClickOutside={!isProcessing} // Prevent accidental close while loading
        closeOnEscape={!isProcessing}
        withCloseButton={!isProcessing}
        title={
          <Text fw={700} size="lg" className="text-primary">
            Complete Job
          </Text>
        }
        centered
        radius="lg"
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
      >
        {/* NEW: Box pos="relative" to contain the LoadingOverlay */}
        <Box pos="relative">
          <LoadingOverlay
            visible={isProcessing}
            zIndex={1000}
            overlayProps={{ radius: "sm", blur: 2 }}
            loaderProps={{ color: "var(--color-accent)", type: "bars" }}
          />

          <Stack gap="md">
            <Text size="sm" className="text-muted">
              You are about to mark the{" "}
              <Text span fw={700} className="text-primary">
                {jobToComplete?.categoryName}
              </Text>{" "}
              job for {jobToComplete?.customerName} as complete.
            </Text>

            <Textarea
              label={
                <Text size="sm" fw={600} className="text-text-dark mb-1">
                  Completion Notes (Optional)
                </Text>
              }
              placeholder="e.g., Fixed the leak under the sink, checked all seals."
              value={completionNotes}
              onChange={(e) => setCompletionNotes(e.currentTarget.value)}
              maxLength={500}
              minRows={3}
              autosize
              classNames={{ input: "border-light-gray focus:border-accent" }}
              disabled={isProcessing}
            />

            <FileInput
              label={
                <Text size="sm" fw={600} className="text-text-dark mb-1">
                  Proof of Work (Optional)
                </Text>
              }
              description={
                <Text size="xs" component="span" className="text-muted mb-2">
                  Upload up to 5 images for your portfolio and dispute
                  protection.
                </Text>
              }
              placeholder="Click to select images"
              multiple
              accept="image/png,image/jpeg,image/webp"
              leftSection={<IoCloudUploadOutline className="text-muted" />}
              value={files}
              onChange={setFiles}
              clearable
              classNames={{ input: "border-light-gray focus:border-accent" }}
              disabled={isProcessing}
            />

            <Group justify="flex-end" mt="md">
              <SeButton
                btnText="Cancel"
                variant="outline"
                clickFunc={closeModal}
                disabled={isProcessing}
              />
              <SeButton
                btnText={
                  isUploadingImages
                    ? "Uploading Images..."
                    : isSubmitting
                      ? "Completing..."
                      : "Confirm Completion"
                }
                variant="primary"
                clickFunc={handleCompleteSubmit}
                disabled={isProcessing}
              />
            </Group>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
};

export default MyJobsPage;
