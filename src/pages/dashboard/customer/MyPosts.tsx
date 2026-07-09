import SeButton from "@/components/button/SeButton";
import SeDashboardHeader from "@/components/heading/SeDashboardHeader";
import JobCard from "@/features/dashboard/components/customer/JobCard";
import { useCustomerPosts } from "@/hooks/mutations/useJob";
import DashboardContentLayoutPadding from "@/layouts/DashboardContentLayoutPadding";
import { SegmentedControl, TextInput } from "@mantine/core";
import { LuPlus, LuSearch } from "react-icons/lu";

const searchIcon = <LuSearch />;

const MyPosts = () => {
  const { data: posts, isLoading, isError } = useCustomerPosts();

  // 1. Handle the loading state FIRST
  if (isLoading) {
    return <div>Loading your jobs...</div>;
  }

  // 2. Handle potential API/Auth errors
  if (isError) {
    return <div>Error loading jobs.</div>;
  }

  console.log(posts, "POSTS");
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
      <div className="grid grid-cols-2 gap-4">
        {posts?.map((post) => (
          <JobCard key={post.id} job={post} />
        ))}
      </div>
    </DashboardContentLayoutPadding>
  );
};

export default MyPosts;
