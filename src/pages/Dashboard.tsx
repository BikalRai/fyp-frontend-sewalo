import { useUserProfile } from "@/hooks/mutations/useUser";

const Dashboard = () => {
  const { data: user } = useUserProfile();

  console.log(user);
  return <div>Dashboard</div>;
};

export default Dashboard;
