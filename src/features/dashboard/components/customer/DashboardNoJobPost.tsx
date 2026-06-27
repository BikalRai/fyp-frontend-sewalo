import SeButton from "@/components/button/SeButton";
import { IoAddCircleOutline } from "react-icons/io5";
const DashboardNoJobPost = () => {
  return (
    <div
      className="w-full bg-primary/5 flex flex-col items-center justify-center gap-5 py-12 rounded-xl text-center"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='16' ry='16' stroke='%2394a3b8' stroke-width='1.5' stroke-dasharray='10%2c 8' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e")`,
      }}
    >
      <div className="h-16 w-16 rounded-full flex items-center justify-center bg-accent/20">
        <IoAddCircleOutline className="text-light/80 w-8 h-8" />
      </div>
      <h3 className="font-bold text-xl leading-7">Submit Your First Request</h3>
      <p className="leading-6 text-muted">
        Tell us what you need — plumbing, electrical, cleaning, anything. We'll
        match you with verified local pros in minutes.
      </p>
      <SeButton
        btnText="Submit New RFQ"
        icon={<IoAddCircleOutline />}
        variant="accentLight"
        iconPosition="left"
        size="sm"
      />
    </div>
  );
};

export default DashboardNoJobPost;
