import { Tabs, SimpleGrid, Paper, Text, Group } from "@mantine/core";
import {
  IoTimeOutline,
  IoLocationOutline,
  IoCallOutline,
  IoCheckmarkCircleOutline,
  IoHourglassOutline,
  IoTrendingUpOutline,
  IoWalletOutline,
  IoStarOutline,
} from "react-icons/io5";
import SeButton from "@/components/button/SeButton";
import { formatTimeAgo } from "@/uitls/job.utils";
import type { JobResponse } from "@/types/job.types";
import { useProviderJobs } from "@/hooks/mutations/useJob";

// --- Sub-components per tab ---

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

const ActiveCard = ({ job }: { job: JobResponse }) => (
  <div className="bg-card-bg border border-accent/30 rounded-2xl p-5 flex flex-col sm:flex-row justify-between gap-4 shadow-sm shadow-accent/5">
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
      <SeButton
        btnText="Mark as complete"
        variant="accentLight"
        icon={<IoCheckmarkCircleOutline className="text-lg" />}
        iconPosition="left"
      />
    </div>
  </div>
);

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
        <p className="text-lg font-bold text-green-600">
          Rs. {job.myBid?.quotedPrice?.toLocaleString() || 0}
        </p>
      </div>

      {/* Assuming you will add a reviews array/object to JobResponse later */}
      <span className="text-xs text-muted">No review yet</span>
    </div>
  </div>
);

// --- Page ---

const MyJobsPage = () => {
  // Fetch real data
  const { data: jobs, isLoading, isError } = useProviderJobs();

  if (isLoading)
    return (
      <div className="p-8 text-center text-muted">Loading your jobs...</div>
    );
  if (isError)
    return (
      <div className="p-8 text-center text-red-500">Failed to load jobs.</div>
    );

  // Safeguard: Only process jobs where this provider actually has a bid
  const myBiddedJobs = jobs?.filter((job) => job.myBid) || [];

  // Categorize based on actual backend state
  const pending = myBiddedJobs.filter(
    (j) => j.myBid?.status === "PENDING" && j.status === "OPEN",
  );
  const active = myBiddedJobs.filter(
    (j) => j.myBid?.status === "ACCEPTED" && j.status !== "COMPLETED",
  );
  const completed = myBiddedJobs.filter(
    (j) => j.status === "COMPLETED" && j.myBid?.status === "ACCEPTED",
  );

  // Dynamic Earnings Summary
  const totalEarned = completed.reduce(
    (sum, j) => sum + (j.myBid?.quotedPrice || 0),
    0,
  );

  // Calculate this month's earnings dynamically based on the bid's createdAt date
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const thisMonthEarned = completed.reduce((sum, j) => {
    const jobDate = new Date(j.myBid?.createdAt || j.createdAt);
    if (
      jobDate.getMonth() === currentMonth &&
      jobDate.getFullYear() === currentYear
    ) {
      return sum + (j.myBid?.quotedPrice || 0);
    }
    return sum;
  }, 0);

  const earningsStats = [
    {
      label: "Total earned",
      value: `Rs. ${totalEarned.toLocaleString()}`,
      icon: <IoWalletOutline className="text-accent text-lg" />,
    },
    {
      label: "This month",
      value: `Rs. ${thisMonthEarned.toLocaleString()}`,
      icon: <IoTrendingUpOutline className="text-accent text-lg" />,
    },
    {
      label: "Active jobs",
      value: active.length.toString(),
      icon: <IoHourglassOutline className="text-accent text-lg" />,
    },
    {
      label: "Avg. rating",
      value: "4.8", // Hardcoded until backend supports reviews
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
                  ? "text-green-600"
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
          tab: "data-[active]:bg-accent data-[active]:text-white hover:bg-light-gray font-medium transition-colors",
        }}
      >
        <Tabs.List className="mb-6 gap-2">
          <Tabs.Tab value="active">
            Active
            {active.length > 0 && (
              <span className="ml-2 text-xs font-bold bg-white text-accent px-2 py-0.5 rounded-full shadow-sm">
                {active.length}
              </span>
            )}
          </Tabs.Tab>
          <Tabs.Tab value="pending">
            Pending
            {pending.length > 0 && (
              <span className="ml-2 text-xs font-bold bg-light-gray text-muted px-2 py-0.5 rounded-full">
                {pending.length}
              </span>
            )}
          </Tabs.Tab>
          <Tabs.Tab value="completed">Completed</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="active">
          <div className="grid gap-4">
            {active.length === 0 ? (
              <div className="text-sm text-muted py-12 text-center border-2 border-dashed border-light-gray rounded-2xl">
                No active jobs right now. Once a customer accepts your bid, it
                will appear here.
              </div>
            ) : (
              active.map((job) => <ActiveCard key={job.id} job={job} />)
            )}
          </div>
        </Tabs.Panel>

        <Tabs.Panel value="pending">
          <div className="grid gap-4">
            {pending.length === 0 ? (
              <div className="text-sm text-muted py-12 text-center border-2 border-dashed border-light-gray rounded-2xl">
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
              <div className="text-sm text-muted py-12 text-center border-2 border-dashed border-light-gray rounded-2xl">
                No completed jobs yet. Keep up the good work!
              </div>
            ) : (
              completed.map((job) => <CompletedCard key={job.id} job={job} />)
            )}
          </div>
        </Tabs.Panel>
      </Tabs>
    </div>
  );
};

export default MyJobsPage;
