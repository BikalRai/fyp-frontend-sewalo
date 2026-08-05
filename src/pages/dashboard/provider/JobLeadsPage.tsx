import SeButton from "@/components/button/SeButton";
import { useProviderCredits } from "@/hooks/mutations/useBilling";
import { useJobLeads } from "@/hooks/mutations/useJob";
import {
  useProviderProfile,
  usePublicProviderProfile,
} from "@/hooks/mutations/useProvider";
import { useUserProfile } from "@/hooks/mutations/useUser";
import { formatTimeAgo } from "@/uitls/job.utils";
import { Group, Paper, SimpleGrid, Text } from "@mantine/core";
import {
  IoLocationOutline,
  IoTimeOutline,
  IoArrowForward,
  IoPeopleOutline,
  IoTrendingUpOutline,
  IoLockClosedOutline,
  IoStarOutline,
  IoPersonOutline,
  IoLockOpenOutline,
  IoCheckmarkCircleOutline,
} from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const JobLeadsPage = () => {
  const { data: user } = useUserProfile();
  const { data: leads, isLoading, isError } = useJobLeads();
  const { data: credits } = useProviderCredits();
  const isProvider = user?.role === "PROVIDER";
  const { data: provider } = useProviderProfile(isProvider);
  const { data: providerPublicData } = usePublicProviderProfile(
    provider?.id as string,
  );
  const navigate = useNavigate();

  // 1. Handle the loading state FIRST
  if (isLoading) {
    return <div>Loading your leads...</div>;
  }

  // 2. Handle potential API/Auth errors
  if (isError) {
    return <div>Error loading leads.</div>;
  }

  const jobsBidOn = leads?.filter((l) => l.myBid !== null).length ?? 0;

  const stats = [
    {
      label: "Unlocks remaining",
      value: credits?.balance ?? "—",
      icon: <IoLockClosedOutline className="text-accent text-lg" />,
    },
    {
      label: "Avg. rating",
      value:
        providerPublicData?.avgRating != null
          ? providerPublicData.avgRating.toFixed(1)
          : "—",
      icon: <IoStarOutline className="text-yellow-400 text-lg" />,
    },
    {
      label: "Jobs bid on",
      value: jobsBidOn,
      icon: <IoTrendingUpOutline className="text-accent text-lg" />,
    },
  ];

  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  return (
    <div className="pb-12 p-4">
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-medium text-accent bg-accent/10 px-3 py-1 rounded-full mb-3">
            <IoPersonOutline size={12} />
            Provider workspace
          </div>
          <h1 className="text-3xl font-bold text-primary">
            {greeting}, {user?.fullName?.split(" ")[0] ?? "there"} 👋
          </h1>
          {/* <p className="text-sm text-muted mt-1">
            3 new jobs near you today. 2 match your trades.
          </p> */}
        </div>
      </div>

      {/* stats card */}
      <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="md" className="mb-6">
        {stats.map((stat) => (
          <Paper
            key={stat.label}
            withBorder
            radius="lg"
            p="lg"
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
      {/* <div className="bg-primary rounded-2xl px-7 py-5 flex items-center justify-between gap-4 mb-8">
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
      </div> */}

      {/* filters */}
      {/* <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
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
          {leads?.length ?? 0} leads available
        </span>
      </div> */}
      <div className="flex justify-end mb-8">
        <span className="text-sm font-medium text-muted whitespace-nowrap">
          {leads?.length ?? 0} leads available
        </span>
      </div>

      {/* cards */}
      <div className="grid gap-4">
        {leads?.map((lead) => {
          // Map to actual backend enums
          const badgeStyles =
            {
              HIGH: "bg-soft-danger/10 text-soft-danger",
              STANDARD: "bg-yellow-100 text-yellow-700",
              LOW: "bg-light-gray text-muted",
            }[lead.urgency] || "bg-light-gray text-muted";

          const hasBids = lead.bidCount > 0;
          const bidText = lead.bidCount === 1 ? "Bid" : "Bids";

          // --- THE NEW STATE LOGIC ---
          const hasBid = Boolean(lead.myBid);
          const isUnlocked = lead.isUnlocked;
          const isFull = lead.unlockCount >= 3;

          // Determine card styling based on state
          const cardBorder = hasBid
            ? "border-green-500 shadow-green-500/10"
            : isUnlocked
              ? "border-accent/50 shadow-accent/5"
              : isFull
                ? "border-red-200 bg-red-50/10 opacity-75" // Visually dim full jobs
                : "border-light-gray hover:border-accent";

          const cardBg = hasBid ? "bg-green-50/30" : "bg-card-bg";

          return (
            <div
              key={lead.id}
              className={`${cardBg} rounded-2xl border ${cardBorder} shadow-sm p-6 transition-all duration-200 flex flex-col gap-4 relative overflow-hidden`}
            >
              {/* Optional: A subtle background accent for submitted bids */}
              {hasBid && (
                <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-bl-full pointer-events-none" />
              )}

              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2 text-xs font-medium text-muted">
                  <span
                    className={`px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${badgeStyles}`}
                  >
                    {lead.urgency}
                  </span>

                  {/* Status Badges */}
                  {hasBid ? (
                    <span className="flex items-center gap-1 text-green-600 bg-green-100 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
                      <IoCheckmarkCircleOutline size={14} />
                      Quote Sent
                    </span>
                  ) : isUnlocked ? (
                    <span className="flex items-center gap-1 text-accent bg-accent/10 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
                      <IoLockOpenOutline size={14} />
                      Unlocked
                    </span>
                  ) : (
                    <>
                      <span className="w-1 h-1 rounded-full bg-light-gray"></span>
                      <span className="bg-primary/5 px-2 py-1 rounded-2xl text-primary font-medium">
                        {lead.distance} KM
                      </span>
                    </>
                  )}
                </div>

                <div className="flex items-center gap-1.5 text-xs font-medium z-10">
                  <IoPeopleOutline
                    className={hasBids ? "text-primary" : "text-muted"}
                    size={14}
                  />
                  <span
                    className={
                      hasBids ? "text-primary font-bold" : "text-muted"
                    }
                  >
                    {lead.bidCount} {bidText}
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-start gap-4 z-10">
                <div className="flex-1 pr-0 sm:pr-4">
                  <h3 className="text-lg font-bold text-primary mb-1.5">
                    {lead.categoryName} Request
                  </h3>
                  <p className="text-sm text-text-dark line-clamp-2 leading-relaxed">
                    {lead.description}
                  </p>
                </div>
                <div className="shrink-0 w-full sm:w-auto mt-2 sm:mt-0">
                  <SeButton
                    clickFunc={() => navigate(`/dashboard/leads/${lead.id}`)}
                    btnText={
                      hasBid
                        ? "View Quote"
                        : isUnlocked
                          ? "Place Bid"
                          : isFull
                            ? "Job Full" // Prevent unlocking
                            : "View Details" // Which leads to the unlock screen
                    }
                    variant={
                      hasBid
                        ? "outline"
                        : isFull && !isUnlocked
                          ? "lightGray"
                          : "accentLight"
                    }
                    icon={
                      !(isFull && !isUnlocked) ? (
                        <IoArrowForward className="text-lg" />
                      ) : undefined
                    }
                    iconPosition="right"
                    // Disable the button entirely if it's full AND they haven't unlocked it yet
                    disabled={isFull && !isUnlocked}
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-medium text-text-dark mt-1 z-10">
                <div className="flex items-center gap-1.5">
                  <IoLocationOutline className="text-muted text-lg shrink-0" />
                  <span className="truncate">
                    {lead.address || "Address hidden"}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <IoTimeOutline className="text-muted text-lg shrink-0" />
                  <span>{formatTimeAgo(lead.createdAt)}</span>
                </div>

                {/* Show the actual quote amount if they bid */}
                {hasBid && lead.myBid ? (
                  <div className="font-bold text-green-600">
                    You Quoted: Rs. {lead.myBid.quotedPrice}
                  </div>
                ) : (
                  <div className="font-bold text-primary">Budget TBD</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default JobLeadsPage;
