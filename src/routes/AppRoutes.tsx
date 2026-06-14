import CustomerOnboarding from "@/layouts/CustomerOnboarding";
import ProviderOnboardingFlow from "@/layouts/ProviderOnboardingFlow";
import Auth from "@/pages/auth/Auth";
import GoogleAuthSetRole from "@/pages/auth/GoogleAuthSetRole";
import Login from "@/pages/auth/login/Login";
import Register from "@/pages/auth/register/Register";
import Dashboard from "@/pages/Dashboard";
import DashboardHome from "@/pages/dashboard/DashboardHome";
import DashboardRFQ from "@/pages/dashboard/customer/DashboardRFQ";
import MyPosts from "@/pages/dashboard/customer/MyPosts";
import Home from "@/pages/home/Home";
import VerifyAccount from "@/pages/onboarding/VerifyAccount";
import { useAuthStore } from "@/store/authStore";
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import Profile from "@/pages/dashboard/Profile";
import JobDetailsPage from "@/pages/dashboard/customer/JobDetailsPage";
import MessagesPage from "@/pages/dashboard/MessagesPage";

interface RequireAuthProps {
  allowedRoles?: string[];
}

export const RequireAuth = ({ allowedRoles }: RequireAuthProps) => {
  const { accessToken, role, isOnboarded, isActive } = useAuthStore();

  // verify if logged in
  if (!accessToken) {
    return <Navigate to="/auth/login" replace />;
  }

  // Bounce to safe fallback
  if (allowedRoles && role && !allowedRoles.includes(role)) {
    // 1. The Google Limbo State
    if (role === "GUEST") {
      return <Navigate to="/auth/google/set-role" replace />;
    }

    // 2. The Incomplete Profile State (Role chosen, forms not finished)
    if (!isOnboarded) {
      if (role === "PROVIDER") {
        return <Navigate to="/provider-onboarding" replace />;
      }
      if (role === "CUSTOMER") {
        return <Navigate to="/customer-onboarding" replace />;
      }
    }

    // 3. The Unverified State (For standard email registrations)
    if (!isActive) {
      return <Navigate to="/auth/verify" replace />;
    }

    // 4. The True Fallback (Fully active, fully onboarded, just clicked a bad link)
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

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
    element: <RequireAuth allowedRoles={["GUEST"]} />,
    children: [
      {
        path: "/auth/google/set-role",
        element: <GoogleAuthSetRole />,
      },
    ],
  },

  {
    element: <RequireAuth allowedRoles={["PROVIDER", "CUSTOMER"]} />,
    children: [
      {
        path: "/auth/verify",
        element: <VerifyAccount />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
        children: [
          { index: true, element: <DashboardHome /> },
          {
            element: <RequireAuth allowedRoles={["CUSTOMER"]} />,
            children: [
              { path: "post-rfq", element: <DashboardRFQ /> },
              {
                path: "my-posts",
                element: <MyPosts />,
              },
              {
                path: "my-posts/:jobid",
                element: <JobDetailsPage />,
              },
            ],
          },
          {
            element: <RequireAuth allowedRoles={["PROVIDER"]} />,
            children: [],
          },
          {
            element: <Profile />,
            path: "profile",
          },
          {
            element: <MessagesPage />,
            path: "messages",
          },
        ],
      },
    ],
  },
  {
    element: <RequireAuth allowedRoles={["CUSTOMER"]} />,
    children: [
      { path: "/customer-onboarding", element: <CustomerOnboarding /> },
      // {
      //   path: "/post-job",
      //   element: <JobPost />,
      // },
    ],
  },
  {
    element: <RequireAuth allowedRoles={["PROVIDER"]} />,
    children: [
      {
        path: "/provider-onboarding",
        element: <ProviderOnboardingFlow />,
      },
    ],
  },
]);

const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
