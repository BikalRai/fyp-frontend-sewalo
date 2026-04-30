import SeContainer from "@/components/container/SeContainer";
import SeContainerPadding from "@/components/container/SeContainerPadding";
import SeSectionHeader from "@/components/heading/SeSectionHeader";
import SeParagraph from "@/components/paragraph/SeParagraph";
import { FaCircle } from "react-icons/fa6";
import { LuStar } from "react-icons/lu";
import ReviewCard from "./ReviewCard";

const Reviews = () => {
  return (
    <section className="py-25.5">
      <SeContainer>
        <SeContainerPadding>
          <div>
            <div className="grid gap-4">
              <p className="text-xs font-semibold leading-4 text-accent flex items-center justify-center gap-2">
                <FaCircle className="w-1.5 h-1.5" />
                <span>Real People, Real Results</span>
              </p>
              <SeSectionHeader title="What our users say" />
              <SeParagraph title="From homeowners across Kathmandu Valley and the pros who serve them." />
            </div>
            <div className="flex items-center justify-center gap-2 mt-4">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }, (_, i) => (
                  <LuStar
                    key={i + 1}
                    className="fill-amber-300 stroke-amber-300"
                  />
                ))}
              </div>
              <p className="text-sm font-semibold text-text-dark">
                4.8 out of 5{" "}
                <span className="text-muted font-normal">
                  from 240+ reviews
                </span>
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-14">
              {Array.from({ length: 6 }, (_, i) => (
                <ReviewCard key={i + 1} />
              ))}
            </div>
          </div>
        </SeContainerPadding>
      </SeContainer>
    </section>
  );
};

export default Reviews;
