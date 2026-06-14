import SeButton from "@/components/button/SeButton";
import { IoAddCircleOutline } from "react-icons/io5";
const DashboardNoJobPost = () => {
  return (
    <div className="w-full border border-accent border-dashed bg-accent/10 flex flex-col items-center justify-center gap-5 py-12 rounded-xl text-center">
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
