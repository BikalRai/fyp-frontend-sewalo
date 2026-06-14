import SeButton from "@/components/button/SeButton";
import SeDashboardHeader from "@/components/heading/SeDashboardHeader";
import JobCard from "@/features/dashboard/components/customer/JobCard";
import DashboardContentLayoutPadding from "@/layouts/DashboardContentLayoutPadding";
import { SegmentedControl, TextInput } from "@mantine/core";
import { LuPlus, LuSearch } from "react-icons/lu";

const MyPosts = () => {
  const searchIcon = <LuSearch />;
  return (
    <DashboardContentLayoutPadding>
      <div>
        <SeDashboardHeader title="My Jobs" />
        <p className="text-muted leading-6">
          Track the status of your submitted job requests.
        </p>
      </div>

      {/* search  */}
      <div className="flex items-center justify-between">
        <div>
          <TextInput
            placeholder="Search jobs..."
            leftSection={searchIcon}
            className="w-2xs"
          />
        </div>
        <SeButton
          btnText="Post a Job"
          icon={<LuPlus />}
          iconPosition="left"
          variant="accentLight"
          size="sm"
        />
      </div>

      {/* tabs */}
      <div>
        <SegmentedControl
          color="#193557"
          data={["All", "Pending", "Matched", "In Progress", "Completed"]}
        />
      </div>

      {/* cards */}
      <div>
        <JobCard />
      </div>
    </DashboardContentLayoutPadding>
  );
};

export default MyPosts;
