import SeButton from "@/components/button/SeButton";
import { LuArrowRight, LuBriefcase } from "react-icons/lu";

const LeadSection = () => {
  return (
    <div
      className="bg-primary/5 flex flex-col items-center justify-center gap-4 py-12 mt-12 rounded-2xl"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='16' ry='16' stroke='%2394a3b8' stroke-width='1.5' stroke-dasharray='10%2c 8' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e")`,
      }}
    >
      <div className="h-16 w-16 rounded-full flex items-center justify-center bg-primary/10">
        <LuBriefcase className="h-8 w-8 stroke-2" />
      </div>
      <h3 className="text-xl font-bold leading-7">Readyto find new Clients?</h3>
      <p className="text-muted leading-6 max-w-md text-center">
        Browse fresh leads in your area and start growing your business today.
      </p>
      <SeButton
        variant="primary"
        btnText="Browse Lead Feed"
        icon={<LuArrowRight />}
      />
    </div>
  );
};

export default LeadSection;
