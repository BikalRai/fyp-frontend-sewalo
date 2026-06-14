import { useUserProfile } from "@/hooks/mutations/useUser";
import SeDashboardLayout from "@/layouts/SeDashboardLayout";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  const { data: user } = useUserProfile();

  console.log(user);
  return (
    <SeDashboardLayout>
      <Outlet />
    </SeDashboardLayout>
  );
};

export default Dashboard;
