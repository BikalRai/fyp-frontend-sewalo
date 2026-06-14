import { useLogout } from "@/hooks/mutations/useAuth";
import { logoLight } from "@/uitls/images";
import {
  LuBriefcase,
  LuBriefcaseBusiness,
  LuCreditCard,
  LuFile,
  LuHouse,
  LuLayoutList,
  LuLogOut,
  LuMail,
  LuUser,
} from "react-icons/lu";
import { Link, useLocation } from "react-router-dom";

export type NavRole = "CUSTOMER" | "PROVIDER";

export interface INavItem {
  label: string;
  path: string;
  icon: React.ElementType;
  roles: NavRole[];
}

interface INavBarProp {
  role: NavRole;
}

const navlinks: INavItem[] = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: LuHouse,
    roles: ["CUSTOMER", "PROVIDER"],
  },
  { label: "Post RFQ", path: "post-rfq", icon: LuFile, roles: ["CUSTOMER"] },
  { label: "My Posts", path: "my-posts", icon: LuFile, roles: ["CUSTOMER"] },
  { label: "Job Leads", path: "leads", icon: LuBriefcase, roles: ["PROVIDER"] },
  {
    label: "Active Jobs",
    path: "active-jobs",
    icon: LuBriefcaseBusiness,
    roles: ["PROVIDER"],
  },
  {
    label: "Earnings",
    path: "earnings",
    icon: LuLayoutList,
    roles: ["PROVIDER"],
  },
  {
    label: "Profile",
    path: "profile",
    icon: LuUser,
    roles: ["CUSTOMER", "PROVIDER"],
  },
  {
    label: "Subscription",
    path: "subscription",
    icon: LuCreditCard,
    roles: ["PROVIDER"],
  },
  {
    label: "Messages",
    path: "messages",
    icon: LuMail,
    roles: ["CUSTOMER", "PROVIDER"],
  },
];

const SeDashboardNavbar = ({ role }: INavBarProp) => {
  const location = useLocation();

  const roleBasedLinks = navlinks.filter((link) => link.roles.includes(role));

  const { mutate: userLogout, isPending } = useLogout();

  const currentPath = location.pathname;

  return (
    <nav className="flex flex-col h-full py-6 bg-primary w-16 lg:w-60 transition-all duration-300">
      {/* Logo */}
      <div className="h-8 px-3 lg:px-6 mb-8 flex items-center justify-center lg:justify-start">
        <img src={logoLight} alt="Logo of Sewala" className="h-full w-auto" />
      </div>

      {/* Section label — desktop only */}
      <span className="hidden lg:block text-light/30 text-xs font-semibold tracking-widest px-6 mb-2 uppercase">
        Workspace
      </span>

      {/* Nav links */}
      <div className="flex flex-col gap-1 px-2 flex-1">
        {roleBasedLinks.map((link, i) => {
          const isActive =
            link.path === "/dashboard"
              ? currentPath === "/dashboard"
              : currentPath.includes(link.path);
          return (
            <Link
              key={i}
              to={link.path}
              title={link.label} // native tooltip — shows on tablet hover
              className={`
                group relative flex items-center gap-3 text-sm font-medium
                px-3 py-2.5 rounded-lg transition-colors duration-200
                ${
                  isActive
                    ? "text-accent bg-white/10"
                    : "text-light/50 hover:text-light hover:bg-white/5"
                }
              `}
            >
              <link.icon size={17} className="shrink-0" />

              {/* Label — hidden on tablet, visible on desktop */}
              <span className="hidden lg:block truncate">{link.label}</span>

              {/*
                Custom tooltip for tablet (md screens where lg:block is still hidden).
                Appears to the right of the icon.
              */}
              <span
                className="
                  lg:hidden absolute left-full ml-3 px-2.5 py-1
                  rounded-md text-xs font-medium whitespace-nowrap
                  bg-gray-900 text-white
                  opacity-0 pointer-events-none
                  group-hover:opacity-100
                  transition-opacity duration-150
                  z-50
                "
              >
                {link.label}
              </span>
            </Link>
          );
        })}
      </div>

      {/* Logout */}
      <div className="px-2 mt-6">
        <button
          onClick={() => userLogout()} // <-- This triggers the TanStack mutation
          disabled={isPending} // <-- Prevents spam-clicking while logging out
          title="Logout"
          className="
            w-full text-left
            group relative flex items-center gap-3 text-sm font-medium
            px-3 py-2.5 rounded-lg
            text-light/40 hover:text-light hover:bg-white/5
            transition-colors duration-200
            disabled:opacity-50 disabled:cursor-not-allowed
          "
        >
          <LuLogOut size={17} className="shrink-0" />
          <span className="hidden lg:block">
            {isPending ? "Logging out..." : "Logout"}
          </span>

          <span
            className="
              lg:hidden absolute left-full ml-3 px-2.5 py-1
              rounded-md text-xs font-medium whitespace-nowrap
              bg-gray-900 text-white
              opacity-0 pointer-events-none
              group-hover:opacity-100
              transition-opacity duration-150
              z-50
            "
          >
            {isPending ? "..." : "Logout"}
          </span>
        </button>
      </div>
    </nav>
  );
};

export default SeDashboardNavbar;
