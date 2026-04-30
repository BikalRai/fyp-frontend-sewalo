import { IoMdQuote } from "react-icons/io";
import { LuStar } from "react-icons/lu";

const ReviewCard = () => {
  return (
    <div className="h-77.5 bg-card-bg flex flex-col p-6 rounded-2xl border border-muted/10">
      <IoMdQuote className="fill-accent" />
      <p className="text-muted text-sm leading-5.5 flex-1 mt-5">
        I posted about my broken kitchen pipe and within 6 minutes I had a
        plumber calling me. The AI even told me roughly what to expect to pay
        before anyone showed up — no surprise bills. This is how it should work.
      </p>
      <div className="flex items-center mt-7">
        <div className="h-9 w-9 rounded-full border overflow-hidden">
          <img src="" alt="Avatar" />
        </div>
        <div className=" ms-3">
          <p className="leading-5 font-semibold text-sm">Sita Rai</p>
          <p className="text-[11px] text-muted">Homeowner · Lalitpur</p>
        </div>
        <div className="flex items-center gap-0.5 ms-auto">
          {Array.from({ length: 5 }, (_, i) => (
            <LuStar key={i + 1} className="fill-amber-300 stroke-amber-300" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
