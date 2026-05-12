import SeAuthContainer from "@/components/container/SeAuthContainer";
import AuthSidePanel from "@/layouts/AuthSidePanel";
import { loginImg } from "@/uitls/images";
import { Outlet, useLocation } from "react-router-dom";

const Auth = () => {
  const { pathname } = useLocation();

  const isRegister = pathname.includes("register");

  const panelData = isRegister
    ? {
        image: loginImg,
        quote: "Found my first 10 clients in two weeks.",
        author: "Sanjay Tamang",
        caption: "Electrician • Baneshwor ⚡",
      }
    : {
        image: loginImg,
        quote: "Felt like calling a neighbour, not a hotline.",
        author: "Nita Pita",
        caption: "Prakash bhai — golden hour fixer ⚡",
      };
  return (
    <SeAuthContainer
      panel={<AuthSidePanel {...panelData} />}
      reverse={isRegister}
    >
      <Outlet />
    </SeAuthContainer>
  );
};

export default Auth;
