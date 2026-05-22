import Auth from "@/pages/auth/Auth";
import Login from "@/pages/auth/login/Login";
import Register from "@/pages/auth/register/Register";
import JobPost from "@/pages/customer/job/JobPost";
import Home from "@/pages/home/Home";
import AddressForm from "@/pages/onboarding/user/AddressForm";
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
    path: "/customer-address",
    element: <AddressForm />,
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
