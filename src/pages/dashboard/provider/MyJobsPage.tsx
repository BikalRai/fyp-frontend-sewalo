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

type JobStatus = "pending" | "active" | "completed" | "rejected";

interface IJob {
  id: string;
  title: string;
  category: string;
  location: string;
  customerName: string;
  customerPhone?: string;
  yourQuote: number;
  status: JobStatus;
  postedAt: string;
  timeline: string;
  completedAt?: string;
  isReviewed?: boolean;
  customerRating?: number;
}

const mockJobs: IJob[] = [
  {
    id: "job-1",
    title: "Leaking kitchen sink — needs urgent fix",
    category: "Plumbing",
    location: "Lalitpur, Kupondole",
    customerName: "Sanjay Thapa",
    customerPhone: "+977 9841234567",
    yourQuote: 2000,
    status: "active",
    postedAt: "2 days ago",
    timeline: "Today",
  },
  {
    id: "job-2",
    title: "Bathroom tile repair — 2 broken tiles",
    category: "Masonry",
    location: "Kathmandu, Baneshwor",
    customerName: "Priya Shrestha",
    customerPhone: "+977 9812345678",
    yourQuote: 3500,
    status: "active",
    postedAt: "1 day ago",
    timeline: "Tomorrow",
  },
  {
    id: "job-3",
    title: "Complete home rewiring and main panel upgrade",
    category: "Electrical",
    location: "Kathmandu, Sanepa",
    customerName: "Ramesh Karki",
    yourQuote: 4500,
    status: "pending",
    postedAt: "3 hrs ago",
    timeline: "This week",
  },
  {
    id: "job-4",
    title: "Install 3 ceiling fans",
    category: "Electrical",
    location: "Lalitpur, Jhamsikhel",
    customerName: "Deepa Adhikari",
    yourQuote: 1800,
    status: "pending",
    postedAt: "5 hrs ago",
    timeline: "This weekend",
  },
  {
    id: "job-5",
    title: "Full house plumbing inspection",
    category: "Plumbing",
    location: "Kathmandu, New Baneshwor",
    customerName: "Bikash Rai",
    yourQuote: 3000,
    status: "completed",
    postedAt: "1 week ago",
    timeline: "Completed",
    completedAt: "Jun 22",
    isReviewed: true,
    customerRating: 5,
  },
  {
    id: "job-6",
    title: "Water tank installation",
    category: "Plumbing",
    location: "Bhaktapur, Suryabinayak",
    customerName: "Sunita Tamang",
    yourQuote: 5500,
    status: "completed",
    postedAt: "2 weeks ago",
    timeline: "Completed",
    completedAt: "Jun 18",
    isReviewed: false,
  },
];

// Earnings summary derived from completed jobs
const totalEarned = mockJobs
  .filter((j) => j.status === "completed")
  .reduce((sum, j) => sum + j.yourQuote, 0);

const earningsStats = [
  {
    label: "Total earned",
    value: `Rs. ${totalEarned.toLocaleString()}`,
    icon: <IoWalletOutline className="text-accent text-lg" />,
  },
  {
    label: "This month",
    value: "Rs. 8,500",
    icon: <IoTrendingUpOutline className="text-accent text-lg" />,
  },
  {
    label: "Active jobs",
    value: mockJobs.filter((j) => j.status === "active").length.toString(),
    icon: <IoHourglassOutline className="text-accent text-lg" />,
  },
  {
    label: "Avg. rating",
    value: "4.8",
    icon: <IoStarOutline className="text-yellow-400 text-lg" />,
  },
];

// --- Sub-components per tab ---

const PendingCard = ({ job }: { job: IJob }) => (
  <div className="bg-card-bg border border-light-gray rounded-2xl p-5 flex flex-col sm:flex-row justify-between gap-4">
    <div className="flex-1">
      <div className="flex items-center gap-2 text-xs text-muted font-medium mb-2">
        <span>{job.category}</span>
        <span className="w-1 h-1 rounded-full bg-light-gray" />
        <span>{job.postedAt}</span>
      </div>
      <h3 className="text-base font-bold text-primary mb-1">{job.title}</h3>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-text-dark mt-2">
        <span className="flex items-center gap-1.5">
          <IoLocationOutline className="text-muted" />
          {job.location}
        </span>
        <span className="flex items-center gap-1.5">
          <IoTimeOutline className="text-muted" />
          {job.timeline}
        </span>
      </div>
    </div>
    <div className="flex flex-col items-end justify-between gap-3 shrink-0">
      <div className="text-right">
        <p className="text-xs text-muted font-medium">Your quote</p>
        <p className="text-lg font-bold text-primary">
          Rs. {job.yourQuote.toLocaleString()}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs text-muted font-medium">
          Awaiting response from {job.customerName}
        </span>
      </div>
    </div>
  </div>
);

const ActiveCard = ({ job }: { job: IJob }) => (
  <div className="bg-card-bg border border-accent/30 rounded-2xl p-5 flex flex-col sm:flex-row justify-between gap-4">
    <div className="flex-1">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xs font-bold text-accent bg-accent/10 px-2.5 py-0.5 rounded-full">
          Active
        </span>
        <span className="text-xs text-muted font-medium">{job.category}</span>
      </div>
      <h3 className="text-base font-bold text-primary mb-2">{job.title}</h3>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-text-dark">
        <span className="flex items-center gap-1.5">
          <IoLocationOutline className="text-muted" />
          {job.location}
        </span>
        <span className="flex items-center gap-1.5">
          <IoTimeOutline className="text-muted" />
          Due: {job.timeline}
        </span>
      </div>
      {job.customerPhone && (
        <a
          href={`tel:${job.customerPhone}`}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent/80 transition-colors mt-3"
        >
          <IoCallOutline />
          {job.customerPhone}
        </a>
      )}
    </div>
    <div className="flex flex-col items-end justify-between gap-3 shrink-0">
      <div className="text-right">
        <p className="text-xs text-muted font-medium">Agreed quote</p>
        <p className="text-lg font-bold text-primary">
          Rs. {job.yourQuote.toLocaleString()}
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

const CompletedCard = ({ job }: { job: IJob }) => (
  <div className="bg-card-bg border border-light-gray rounded-2xl p-5 flex flex-col sm:flex-row justify-between gap-4 opacity-90">
    <div className="flex-1">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xs font-bold text-muted bg-light-gray px-2.5 py-0.5 rounded-full">
          Completed
        </span>
        <span className="text-xs text-muted font-medium">
          {job.completedAt}
        </span>
      </div>
      <h3 className="text-base font-bold text-primary mb-2">{job.title}</h3>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-text-dark">
        <span className="flex items-center gap-1.5">
          <IoLocationOutline className="text-muted" />
          {job.location}
        </span>
        <span className="text-sm text-muted">{job.customerName}</span>
      </div>
    </div>
    <div className="flex flex-col items-end justify-between gap-3 shrink-0">
      <div className="text-right">
        <p className="text-xs text-muted font-medium">Earned</p>
        <p className="text-lg font-bold text-primary">
          Rs. {job.yourQuote.toLocaleString()}
        </p>
      </div>
      {job.isReviewed ? (
        <div className="flex items-center gap-1 text-sm font-medium text-yellow-500">
          {Array.from({ length: job.customerRating ?? 0 }).map((_, i) => (
            <IoStarOutline key={i} />
          ))}
        </div>
      ) : (
        <span className="text-xs text-muted">No review yet</span>
      )}
    </div>
  </div>
);

// --- Page ---

const MyJobsPage = () => {
  const pending = mockJobs.filter((j) => j.status === "pending");
  const active = mockJobs.filter((j) => j.status === "active");
  const completed = mockJobs.filter((j) => j.status === "completed");

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
              <Text size="xs" c="dimmed" fw={500}>
                {stat.label}
              </Text>
              {stat.icon}
            </Group>
            <Text size="xl" fw={700} className="text-primary">
              {stat.value}
            </Text>
          </Paper>
        ))}
      </SimpleGrid>

      {/* Tabs */}
      <Tabs defaultValue="active" variant="pills">
        <Tabs.List className="mb-6 gap-1">
          <Tabs.Tab value="active">
            Active
            {active.length > 0 && (
              <span className="ml-2 text-xs font-bold bg-accent text-white px-2 py-0.5 rounded-full">
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
              <p className="text-sm text-muted py-8 text-center">
                No active jobs right now.
              </p>
            ) : (
              active.map((job) => <ActiveCard key={job.id} job={job} />)
            )}
          </div>
        </Tabs.Panel>

        <Tabs.Panel value="pending">
          <div className="grid gap-4">
            {pending.length === 0 ? (
              <p className="text-sm text-muted py-8 text-center">
                No pending bids right now.
              </p>
            ) : (
              pending.map((job) => <PendingCard key={job.id} job={job} />)
            )}
          </div>
        </Tabs.Panel>

        <Tabs.Panel value="completed">
          <div className="grid gap-4">
            {completed.length === 0 ? (
              <p className="text-sm text-muted py-8 text-center">
                No completed jobs yet.
              </p>
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
