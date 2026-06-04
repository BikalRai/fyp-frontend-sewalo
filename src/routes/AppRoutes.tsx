import CustomerOnboardingFlow from "@/layouts/CustomerOnboardingLayout";
import ProviderOnboardingFlow from "@/layouts/ProviderOnboardingFlow";
import Auth from "@/pages/auth/Auth";
import GoogleAuthSetRole from "@/pages/auth/GoogleAuthSetRole";
import Login from "@/pages/auth/login/Login";
import Register from "@/pages/auth/register/Register";
import JobPost from "@/pages/customer/job/JobPost";
import Home from "@/pages/home/Home";
import VerifyAccount from "@/pages/onboarding/VerifyAccount";
import { useAuthStore } from "@/store/authStore";
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";

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
    ],
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
