import { useMemo, useState } from "react";
import SeButton from "@/components/button/SeButton";
import SeDashboardHeader from "@/components/heading/SeDashboardHeader";
import JobCard from "@/features/dashboard/components/customer/JobCard";
import { useCustomerPosts } from "@/hooks/mutations/useJob";
import DashboardContentLayoutPadding from "@/layouts/DashboardContentLayoutPadding";
import { SegmentedControl, TextInput } from "@mantine/core";
import { LuPlus, LuSearch } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

const searchIcon = <LuSearch />;

const TAB_STATUS_MAP: Record<string, string[]> = {
  All: [],
  Pending: ["OPEN", "ANALYZING"],
  "In Progress": ["IN_PROGRESS", "AWAITING_CONFIRMATION"],
  Completed: ["COMPLETED"],
};

const MyPosts = () => {
  const { data: posts, isLoading, isError } = useCustomerPosts();
  const [activeTab, setActiveTab] = useState("All");
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

  if (isLoading) {
    return <div>Loading your jobs...</div>;
  }

  if (isError) {
    return <div>Error loading jobs.</div>;
  }

  return (
    <DashboardContentLayoutPadding>
      <div>
        <SeDashboardHeader title="My Jobs" />
        <p className="text-muted leading-6">
          Track the status of your submitted job requests.
        </p>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <TextInput
            placeholder="Search jobs..."
            leftSection={searchIcon}
            className="w-2xs"
            value={searchText}
            onChange={(e) => setSearchText(e.currentTarget.value)}
          />
        </div>
        <SeButton
          btnText="Post a Job"
          icon={<LuPlus />}
          iconPosition="left"
          variant="accentLight"
          clickFunc={() => navigate("/dashboard/post-rfq")}
          size="sm"
        />
      </div>

      <div>
        <SegmentedControl
          color="#193557"
          data={["All", "Pending", "In Progress", "Completed"]}
          value={activeTab}
          onChange={setActiveTab}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        {filteredPosts.length === 0 ? (
          <p className="col-span-2 text-sm text-muted py-8 text-center">
            No jobs match your current filters.
          </p>
        ) : (
          filteredPosts.map((post) => <JobCard key={post.id} job={post} />)
        )}
      </div>
    </DashboardContentLayoutPadding>
  );
};

export default MyPosts;
