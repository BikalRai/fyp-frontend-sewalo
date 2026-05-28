import CustomerOnboardingFlow from "@/layouts/CustomerOnboardingLayout";
import ProviderOnboardingFlow from "@/layouts/ProviderOnboardingFlow";
import Auth from "@/pages/auth/Auth";
import Login from "@/pages/auth/login/Login";
import Register from "@/pages/auth/register/Register";
import JobPost from "@/pages/customer/job/JobPost";
import Home from "@/pages/home/Home";
import VerifyAccount from "@/pages/onboarding/VerifyAccount";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/auth",
    element: <Auth />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/verify",
    element: <VerifyAccount />,
  },
  {
    path: "/customer-onboarding",
    element: <CustomerOnboardingFlow />,
  },
  {
    path: "/provider-onboarding",
    element: <ProviderOnboardingFlow />,
  },
  {
    path: "/post-job",
    element: <JobPost />,
  },
]);

const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
