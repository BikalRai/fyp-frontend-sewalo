import SeButton from "@/components/button/SeButton";
import type { IJobCardProps } from "@/types/job.types";
import { IoHammer } from "react-icons/io5";
import { LuClock, LuUsers } from "react-icons/lu";

const JobCard = ({
  title,
  description,
  jobType,
  bids,
  jobPosted,
}: IJobCardProps) => {
  return (
    <div className="bg-light border border-muted/10 rounded-xl p-5 flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <h4 className="text-lg font-medium leading-7">
          {title ? title : "Job title"}
        </h4>
        <div>job status</div>
      </div>
      <div className="text-sm leading-5 text-muted">
        {description ? description : "Job description"}
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6 text-muted text-sm">
          <div className="flex items-center gap-1">
            <IoHammer />
            <span>{jobType ? jobType : "jobType"}</span>
          </div>
          <div className="flex items-center gap-1">
            <LuUsers />
            <span>{bids ? bids : 0}/3</span>
          </div>
          <div className="flex items-center gap-1">
            <LuClock />
            <span>{jobPosted ? jobPosted.toISOString() : 1} ago</span>
          </div>
        </div>
        <SeButton btnText="View" variant="lightGray" size="sm" />
      </div>
    </div>
  );
};

export default JobCard;
