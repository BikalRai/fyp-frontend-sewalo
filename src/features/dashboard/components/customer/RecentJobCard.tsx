import { LuDot } from "react-icons/lu";

const RecentJobCard = () => {
  return (
    <div className="bg-muted/5 rounded-xl p-3">
      <div className="flex items-center justify-between">
        <div>
          <div className="font-medium leading-6">
            Kitchen pipe leak + tap fix
            <span className="ms-2 text-xs font-semibold py-1 px-3 rounded-full bg-primary">
              Matched
            </span>
          </div>
          <div className="flex items-center gap-3 leading-4 text-sm text-primary/50 mt-1">
            <span>Plumbing</span>
            <LuDot />
            <span>Rs. 1,200 – 2,800</span>
            <LuDot />
            <span>2 hours ago</span>
          </div>
        </div>
        <div className="text-xs text-muted leading-4">3 pros </div>
      </div>
    </div>
  );
};

export default RecentJobCard;
