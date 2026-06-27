import SeButton from "@/components/button/SeButton";
import { Group, Paper, Select, SimpleGrid, Text } from "@mantine/core";
import {
  IoLocationOutline,
  IoTimeOutline,
  IoArrowForward,
  IoCaretDown,
  IoPeopleOutline,
  IoTrendingUpOutline,
  IoLockClosedOutline,
  IoStarOutline,
  IoFlashOutline,
  IoPersonOutline,
} from "react-icons/io5";

const stats = [
  {
    label: "Leads this month",
    value: "12",
    icon: <IoTrendingUpOutline className="text-accent text-lg" />,
  },
  {
    label: "Unlocks remaining",
    value: "3",
    icon: <IoLockClosedOutline className="text-accent text-lg" />,
  },
  {
    label: "Avg. rating",
    value: "4.8",
    icon: <IoStarOutline className="text-yellow-400 text-lg" />,
  },
  {
    label: "Response time",
    value: "23m",
    icon: <IoFlashOutline className="text-accent text-lg" />,
  },
];

const mockLeads = [
  {
    id: "lead-1",
    title: "Leaking kitchen sink — needs urgent fix",
    description:
      "The PVC pipe under my kitchen sink has a steady drip. It seems to be coming from the U-bend joint.",
    category: "Plumbing",
    distance: "1.2 km away",
    urgencyText: "ASAP",
    urgencyLevel: "high",
    location: "Lalitpur, Kupondole",
    postedAt: "12 min ago",
    budget: "Rs 1,500–2,500",
    currentBids: 2,
    maxBids: 3,
  },
  {
    id: "lead-2",
    title: "Complete home rewiring and main panel upgrade",
    description:
      "Looking to replace old wiring in a 3-bedroom house and upgrade the main breaker panel to handle more load.",
    category: "Electrical",
    distance: "2.8 km away",
    urgencyText: "This week",
    urgencyLevel: "medium",
    location: "Kathmandu, Sanepa",
    postedAt: "1 hr ago",
    budget: "Rs 3,000–5,000",
    currentBids: 0,
    maxBids: 3,
  },
];

const JobLeadsPage = () => {
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  return (
    <div className="max-w-5xl mx-auto pb-12 p-4">
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-medium text-accent bg-accent/10 px-3 py-1 rounded-full mb-3">
            <IoPersonOutline size={12} />
            Provider workspace
          </div>
          <h1 className="text-3xl font-bold text-primary">
            {greeting}, Bikal 👋
          </h1>
          <p className="text-sm text-muted mt-1">
            3 new jobs near you today. 2 match your trades.
          </p>
        </div>
        <SeButton
          btnText="Edit profile"
          variant="outline"
          className="shrink-0 mt-1"
        />
      </div>

      {/* stats card */}
      <SimpleGrid cols={{ base: 2, sm: 4 }} spacing="md" className="mb-6">
        {stats.map((stat) => (
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

      {/* 3. Plan Banner */}
      <div className="bg-primary rounded-2xl px-7 py-5 flex items-center justify-between gap-4 mb-8">
        <div>
          <p className="text-xs font-bold text-white/50 uppercase tracking-widest mb-1">
            Current Plan
          </p>
          <p className="text-lg font-bold text-white">
            Starter — 3 unlocks left
          </p>
          <p className="text-sm text-white/60 mt-0.5">
            Upgrade to Pro for unlimited leads &amp; 0% commission.
          </p>
        </div>
        <SeButton
          btnText="Upgrade to Pro"
          variant="accentLight"
          className="shrink-0 whitespace-nowrap"
        />
      </div>

      {/* filters */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          <Select
            data={["All Categories", "Electrical", "Plumbing", "Painting"]}
            defaultValue="All Categories"
            clearable
            rightSection={<IoCaretDown size={16} />}
            comboboxProps={{
              shadow: "sm",
              transitionProps: { transition: "pop", duration: 200 },
            }}
            classNames={{
              root: "w-full sm:w-[160px]",
              input:
                "h-[44px] rounded-lg border-light-gray bg-card-bg text-text-dark focus:border-accent hover:border-muted/50 transition-colors cursor-pointer text-sm",
              dropdown:
                "bg-card-bg border-light-gray rounded-xl shadow-sm border",
              option:
                "text-sm hover:bg-light-gray text-text-dark data-[combobox-selected]:bg-accent/10 data-[combobox-selected]:text-accent font-medium rounded-md my-0.5 transition-colors",
            }}
          />
          <Select
            data={["All Urgency", "Emergency", "Urgent", "Normal", "Flexible"]}
            defaultValue="All Urgency"
            clearable
            rightSection={<IoCaretDown size={16} />}
            comboboxProps={{
              shadow: "sm",
              transitionProps: { transition: "pop", duration: 200 },
            }}
            classNames={{
              root: "w-full sm:w-[140px]",
              input:
                "h-[44px] rounded-lg border-light-gray bg-card-bg text-text-dark focus:border-accent hover:border-muted/50 transition-colors cursor-pointer text-sm",
              dropdown:
                "bg-card-bg border-light-gray rounded-xl shadow-sm border",
              option:
                "text-sm hover:bg-light-gray text-text-dark data-[combobox-selected]:bg-accent/10 data-[combobox-selected]:text-accent font-medium rounded-md my-0.5 transition-colors",
            }}
          />
        </div>
        <span className="text-sm font-medium text-muted whitespace-nowrap">
          {mockLeads.length} leads available
        </span>
      </div>

      {/* cards */}
      <div className="grid gap-4">
        {mockLeads.map((lead) => {
          const isHighDemand = lead.currentBids === lead.maxBids - 1;
          const badgeStyles = {
            high: "bg-soft-danger/10 text-soft-danger",
            medium: "bg-yellow-100 text-yellow-700",
            low: "bg-light-gray text-muted",
          }[lead.urgencyLevel];

          return (
            <div
              key={lead.id}
              className="bg-card-bg rounded-2xl border border-light-gray shadow-sm p-6 hover:border-accent transition-colors flex flex-col gap-4"
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2 text-xs font-medium text-muted">
                  <span
                    className={`px-2.5 py-0.5 rounded-full font-bold ${badgeStyles}`}
                  >
                    {lead.urgencyText}
                  </span>
                  <span>{lead.category}</span>
                  <span className="w-1 h-1 rounded-full bg-light-gray"></span>
                  <span>{lead.distance}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-medium">
                  <IoPeopleOutline className="text-muted" size={14} />
                  <span
                    className={
                      isHighDemand ? "text-soft-danger font-bold" : "text-muted"
                    }
                  >
                    {lead.currentBids} / {lead.maxBids} Bids
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                <div className="flex-1 pr-0 sm:pr-4">
                  <h3 className="text-lg font-bold text-primary mb-1.5">
                    {lead.title}
                  </h3>
                  {/* Description is always visible — no lock logic here */}
                  <p className="text-sm text-text-dark line-clamp-2">
                    {lead.description}
                  </p>
                </div>
                <div className="shrink-0 w-full sm:w-auto mt-2 sm:mt-0">
                  {/* Single CTA — always "View Details" */}
                  <SeButton
                    btnText="View Details"
                    variant="accentLight"
                    icon={<IoArrowForward className="text-lg" />}
                    iconPosition="right"
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-medium text-text-dark mt-1">
                <div className="flex items-center gap-1.5">
                  <IoLocationOutline className="text-muted text-lg shrink-0" />
                  <span className="truncate">{lead.location}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <IoTimeOutline className="text-muted text-lg shrink-0" />
                  <span>{lead.postedAt}</span>
                </div>
                <div className="font-bold text-primary">{lead.budget}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default JobLeadsPage;
