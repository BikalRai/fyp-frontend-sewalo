import { useMemo, useState } from "react";
import SeButton from "@/components/button/SeButton";
import SeDashboardHeader from "@/components/heading/SeDashboardHeader";
import JobCard from "@/features/dashboard/components/customer/JobCard";
import { useCustomerPosts } from "@/hooks/mutations/useJob";
import DashboardContentLayoutPadding from "@/layouts/DashboardContentLayoutPadding";
import { TextInput } from "@mantine/core";
import {
  LuPlus,
  LuSearch,
  LuClipboardList,
  LuInbox,
  LuTimer,
  LuCheckCheck,
  LuCircle,
} from "react-icons/lu";
import { useNavigate } from "react-router-dom";

const searchIcon = <LuSearch size={16} />;

type TabKey = "All" | "Pending" | "In Progress" | "Completed";

const TAB_STATUS_MAP: Record<TabKey, string[]> = {
  All: [],
  Pending: ["OPEN", "ANALYZING"],
  "In Progress": ["IN_PROGRESS", "AWAITING_CONFIRMATION"],
  Completed: ["COMPLETED"],
};

const TAB_ICONS: Record<TabKey, React.ReactNode> = {
  All: <LuClipboardList size={16} />,
  Pending: <LuTimer size={16} />,
  "In Progress": <LuCircle size={16} />,
  Completed: <LuCheckCheck size={16} />,
};

const TABS: TabKey[] = ["All", "Pending", "In Progress", "Completed"];

const MyPosts = () => {
  const { data: posts, isLoading, isError } = useCustomerPosts();
  const [activeTab, setActiveTab] = useState<TabKey>("All");
  const [searchText, setSearchText] = useState("");

  const navigate = useNavigate();

  const filteredPosts = useMemo(() => {
    if (!posts) return [];

    const allowedStatuses = TAB_STATUS_MAP[activeTab];
    const byTab =
      allowedStatuses.length === 0
        ? posts
        : posts.filter((p) => allowedStatuses.includes(p.status));

    const query = searchText.trim().toLowerCase();
    if (!query) return byTab;

    return byTab.filter(
      (p) =>
        p.description?.toLowerCase().includes(query) ||
        p.categoryName?.toLowerCase().includes(query),
    );
  }, [posts, activeTab, searchText]);

  const tabCounts = useMemo(() => {
    if (!posts) return { All: 0, Pending: 0, "In Progress": 0, Completed: 0 };
    return {
      All: posts.length,
      Pending: posts.filter((p) => TAB_STATUS_MAP["Pending"].includes(p.status))
        .length,
      "In Progress": posts.filter((p) =>
        TAB_STATUS_MAP["In Progress"].includes(p.status),
      ).length,
      Completed: posts.filter((p) =>
        TAB_STATUS_MAP["Completed"].includes(p.status),
      ).length,
    };
  }, [posts]);

  if (isLoading) {
    return (
      <DashboardContentLayoutPadding>
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <div className="w-10 h-10 border-3 border-light-gray border-t-accent rounded-full animate-spin" />
          <p className="text-sm text-muted font-medium">Loading your jobs...</p>
        </div>
      </DashboardContentLayoutPadding>
    );
  }

  if (isError) {
    return (
      <DashboardContentLayoutPadding>
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <div className="w-14 h-14 rounded-full bg-soft-danger/10 flex items-center justify-center">
            <LuInbox className="text-soft-danger" size={24} />
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
      </DashboardContentLayoutPadding>
    );
  }

  return (
    <DashboardContentLayoutPadding>
      {/* Header */}
      <div className="mb-6">
        <SeDashboardHeader title="My Jobs" />
        <p className="text-muted leading-6 text-sm mt-1">
          Track the status of your submitted job requests.
        </p>
      </div>

      {/* Search + Button Row */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 mb-6">
        <div className="w-full sm:w-auto sm:min-w-[380px]">
          <TextInput
            placeholder="Search jobs..."
            leftSection={searchIcon}
            size="md"
            className="w-full"
            value={searchText}
            onChange={(e) => setSearchText(e.currentTarget.value)}
          />
        </div>
        <SeButton
          btnText="Post a Job"
          icon={<LuPlus size={16} />}
          iconPosition="left"
          variant="accentLight"
          clickFunc={() => navigate("/dashboard/post-rfq")}
          size="sm"
          styleClass="w-full sm:w-auto justify-center"
        />
      </div>

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
              {TAB_ICONS[tab]}
            </span>
            {tab}
            <span
              className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                activeTab === tab
                  ? "bg-white/20 text-white"
                  : "bg-light text-muted"
              }`}
            >
              {tabCounts[tab]}
            </span>
          </button>
        ))}
      </div>

      {/* Job Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredPosts.length === 0 ? (
          <div className="col-span-1 lg:col-span-2 bg-card-bg rounded-2xl border border-light-gray shadow-[0_2px_12px_rgba(25,53,87,0.04)] p-16 flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-full bg-light text-muted flex items-center justify-center mb-4">
              <LuClipboardList size={26} />
            </div>
            <h3 className="text-lg font-bold text-text-dark">No jobs found</h3>
            <p className="text-sm text-muted mt-1 max-w-sm">
              {searchText
                ? "No jobs match your search. Try different keywords."
                : `No ${activeTab !== "All" ? activeTab.toLowerCase() + " " : ""}jobs yet. Post your first job to get started.`}
            </p>
            {activeTab === "All" && !searchText && (
              <SeButton
                btnText="Post a Job"
                icon={<LuPlus size={16} />}
                iconPosition="left"
                variant="accentLight"
                clickFunc={() => navigate("/dashboard/post-rfq")}
                size="sm"
                styleClass="mt-4"
              />
            )}
          </div>
        ) : (
          filteredPosts.map((post) => <JobCard key={post.id} job={post} />)
        )}
      </div>
    </DashboardContentLayoutPadding>
  );
};

export default MyPosts;
