import { useState } from "react";
import {
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
import {
  LuBriefcase,
  LuCircleDot,
  LuTimer,
  LuCheckCheck,
  LuClipboardList,
} from "react-icons/lu";
import SeButton from "@/components/button/SeButton";
import { formatTimeAgo } from "@/uitls/job.utils";
import type { JobResponse } from "@/types/job.types";
import { useCompleteJob, useProviderJobs } from "@/hooks/mutations/useJob";
import { uploadImagesToCloudinary } from "@/services/upload.service";
import { useProviderStats } from "@/hooks/mutations/useProvider";
import { useNavigate } from "react-router-dom";

type TabKey = "active" | "pending" | "completed";

const TAB_CONFIG: Record<TabKey, { label: string; icon: React.ReactNode }> = {
  active: { label: "Active", icon: <LuCircleDot size={16} /> },
  pending: { label: "Pending", icon: <LuTimer size={16} /> },
  completed: { label: "Completed", icon: <LuCheckCheck size={16} /> },
};

const TABS: TabKey[] = ["active", "pending", "completed"];

// --- Sub-components per tab ---

const PendingCard = ({ job }: { job: JobResponse }) => (
  <div className="bg-card-bg border border-light-gray rounded-2xl p-5 flex flex-col sm:flex-row justify-between gap-4 hover:border-accent/40 transition-colors duration-200">
    <div className="flex-1 min-w-0">
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
          <span className="truncate max-w-[200px]">{job.address}</span>
        </span>
        <span className="flex items-center gap-1.5">
          <IoTimeOutline className="text-muted" />
          {job.urgency.replace("_", " ")}
        </span>
      </div>
    </div>

    <div className="flex flex-col items-start sm:items-end justify-between gap-3 shrink-0">
      <div className="sm:text-right">
        <p className="text-xs text-muted font-medium uppercase tracking-wider">
          Your quote
        </p>
        <p className="text-lg font-bold text-primary">
          Rs. {job.myBid?.quotedPrice?.toLocaleString() || 0}
        </p>
      </div>
      <span className="text-xs text-muted font-medium">
        Awaiting response from {job.customerName.split(" ")[0]}
      </span>
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
      className="bg-card-bg border border-accent/30 rounded-2xl p-5 flex flex-col sm:flex-row justify-between gap-4 shadow-[0_2px_12px_rgba(57,172,134,0.06)] cursor-pointer hover:border-accent hover:shadow-[0_4px_20px_rgba(57,172,134,0.12)] transition-all duration-200"
    >
      <div className="flex-1 min-w-0">
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
            <span className="truncate max-w-[200px]">{job.address}</span>
          </span>
          <span className="flex items-center gap-1.5">
            <IoTimeOutline className="text-muted" />
            Due: {job.urgency.replace("_", " ")}
          </span>
        </div>

        {job.contactNumber && (
          <a
            href={`tel:${job.contactNumber}`}
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-accent hover:text-accent-hover transition-colors mt-4 bg-accent/5 px-3 py-1.5 rounded-lg"
          >
            <IoCallOutline />
            {job.contactNumber}
          </a>
        )}
      </div>

      <div className="flex flex-col items-start sm:items-end justify-between gap-3 shrink-0">
        <div className="sm:text-right">
          <p className="text-xs text-muted font-medium uppercase tracking-wider">
            Agreed quote
          </p>
          <p className="text-lg font-bold text-primary">
            Rs. {job.myBid?.quotedPrice?.toLocaleString() || 0}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <SeButton
            btnText="Message"
            variant="outline"
            size="sm"
            icon={<IoChatbubbleEllipsesOutline className="text-lg" />}
            iconPosition="left"
            clickFunc={(e) => {
              e.stopPropagation();
              navigate(`/dashboard/jobs/${job.id}/chat`);
            }}
          />
          <SeButton
            btnText="Mark complete"
            variant="accentLight"
            size="sm"
            icon={<IoCheckmarkCircleOutline className="text-lg" />}
            iconPosition="left"
            clickFunc={(e) => {
              e.stopPropagation();
              onMarkComplete(job);
            }}
          />
        </div>
      </div>
    </div>
  );
};

const CompletedCard = ({ job }: { job: JobResponse }) => (
  <div className="bg-card-bg border border-light-gray rounded-2xl p-5 flex flex-col sm:flex-row justify-between gap-4 opacity-80 hover:opacity-100 transition-opacity duration-200">
    <div className="flex-1 min-w-0">
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
          <span className="truncate max-w-[200px]">{job.address}</span>
        </span>
        <span className="text-sm text-muted font-medium border-l border-light-gray pl-4">
          Client: {job.customerName}
        </span>
      </div>
    </div>

    <div className="flex flex-col items-start sm:items-end justify-between gap-3 shrink-0">
      <div className="sm:text-right">
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

  const { mutateAsync: completeJob, isPending: isSubmitting } =
    useCompleteJob();

  const [activeTab, setActiveTab] = useState<TabKey>("active");

  const [jobToComplete, setJobToComplete] = useState<JobResponse | null>(null);
  const [completionNotes, setCompletionNotes] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [isUploadingImages, setIsUploadingImages] = useState(false);

  const isProcessing = isSubmitting || isUploadingImages;

  const closeModal = () => {
    if (isProcessing) return;
    setJobToComplete(null);
    setCompletionNotes("");
    setFiles([]);
    setIsUploadingImages(false);
  };

  const handleCompleteSubmit = async () => {
    if (!jobToComplete) return;

    try {
      let uploadedImageUrls: string[] = [];

      if (files.length > 0) {
        setIsUploadingImages(true);
        uploadedImageUrls = await uploadImagesToCloudinary(files);
        setIsUploadingImages(false);
      }

      await completeJob({
        jobId: jobToComplete.id,
        payload: {
          completionNotes: completionNotes,
          completionImages: uploadedImageUrls,
        },
      });

      closeModal();
    } catch (error) {
      setIsUploadingImages(false);
      console.error("Completion failed:", error);
    }
  };

  if (isLoading)
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <div className="w-10 h-10 border-3 border-light-gray border-t-accent rounded-full animate-spin" />
        <p className="text-sm text-muted font-medium">Loading your jobs...</p>
      </div>
    );

  if (isError)
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <div className="w-14 h-14 rounded-full bg-soft-danger/10 flex items-center justify-center">
          <LuClipboardList className="text-soft-danger" size={24} />
        </div>
        <div className="text-center">
          <p className="text-base font-semibold text-text-dark">
            Failed to load jobs
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

  const tabCounts: Record<TabKey, number> = {
    active: active.length,
    pending: pending.length,
    completed: completed.length,
  };

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

  const getTabContent = () => {
    switch (activeTab) {
      case "active":
        return active.length === 0 ? (
          <EmptyState message="No active jobs right now. Once a customer accepts your bid, it will appear here." />
        ) : (
          active.map((job) => (
            <ActiveCard
              key={job.id}
              job={job}
              onMarkComplete={setJobToComplete}
            />
          ))
        );
      case "pending":
        return pending.length === 0 ? (
          <EmptyState message="No pending bids right now. Head over to the lead feed to place some quotes!" />
        ) : (
          pending.map((job) => <PendingCard key={job.id} job={job} />)
        );
      case "completed":
        return completed.length === 0 ? (
          <EmptyState message="No completed jobs yet. Keep up the good work!" />
        ) : (
          completed.map((job) => <CompletedCard key={job.id} job={job} />)
        );
    }
  };

  return (
    <div className="pb-12 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <LuBriefcase className="text-primary" size={20} />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-text-dark tracking-tight">
              My Jobs
            </h1>
            <p className="text-sm text-muted mt-0.5">
              Track your bids, active work, and earnings.
            </p>
          </div>
        </div>
      </div>

      {/* Earnings strip */}
      <SimpleGrid cols={{ base: 2, sm: 4 }} spacing="md" className="mb-8">
        {earningsStats.map((stat) => (
          <Paper
            key={stat.label}
            withBorder
            radius="md"
            p="md"
            className="bg-card-bg border-light-gray/80 shadow-[0_2px_12px_rgba(25,53,87,0.04)] hover:shadow-[0_4px_16px_rgba(25,53,87,0.08)] transition-shadow duration-200"
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

      {/* Filter Tabs — Icon + Count (Admin Jobs style) */}
      <div className="flex gap-2 flex-wrap mb-6">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 ${
              activeTab === tab
                ? "bg-primary text-white shadow-[0_4px_12px_rgba(25,53,87,0.25)]"
                : "bg-card-bg text-muted border border-light-gray hover:border-primary hover:text-primary"
            }`}
          >
            <span className={activeTab === tab ? "text-white" : "text-muted"}>
              {TAB_CONFIG[tab].icon}
            </span>
            {TAB_CONFIG[tab].label}
            {tabCounts[tab] > 0 && (
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                  activeTab === tab
                    ? "bg-white/20 text-white"
                    : "bg-light text-muted"
                }`}
              >
                {tabCounts[tab]}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="grid gap-4">{getTabContent()}</div>

      {/* Completion Modal */}
      <Modal
        opened={!!jobToComplete}
        onClose={closeModal}
        closeOnClickOutside={!isProcessing}
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

const EmptyState = ({ message }: { message: string }) => (
  <div className="flex flex-col items-center justify-center py-16 px-4 bg-card-bg rounded-2xl border border-light-gray/80 shadow-[0_2px_12px_rgba(25,53,87,0.04)]">
    <div className="w-14 h-14 rounded-full bg-light flex items-center justify-center mb-4">
      <LuClipboardList className="text-muted/50" size={26} />
    </div>
    <p className="text-sm text-muted text-center max-w-sm">{message}</p>
  </div>
);

export default MyJobsPage;
