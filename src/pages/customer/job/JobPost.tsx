import { useEffect, useState } from "react";
import { LuArrowLeft, LuArrowRight } from "react-icons/lu";

import SeButton from "@/components/button/SeButton";
import SeContainerMD from "@/components/container/SeContainerMD";
import SeContainerSM from "@/components/container/SeContainerSM";
import SeSectionHeader from "@/components/heading/SeSectionHeader";
import SeParagraph from "@/components/paragraph/SeParagraph";
import SeStepper from "@/components/stepper/SeStepper";

import SeOnboardingLayout from "@/layouts/SeOnboardingLayout";

import Category from "@/features/job/components/Category";
import Desciptions from "@/features/job/components/Desciptions";
import Location from "@/features/job/components/Location";
import Review from "@/features/job/components/Review";

import {
  useJobPostStore,
  useLocationStore,
  useUrgencyStore,
} from "@/store/jobStore";

import type { JobStep } from "@/types/job.types";
import { useUserProfile } from "@/hooks/mutations/useUser";

const JOB_STEPS: JobStep[] = [
  {
    title: "What do you need help with?",
    description: "Select the category that best fits your needs.",
    component: Category,
  },
  {
    title: "Tell us more about the job",
    description: "Describe what you need and set your urgency.",
    component: Desciptions,
  },
  {
    title: "Where should the pro come?",
    description:
      "Your exact address is only shared after a professional is matched.",
    component: Location,
  },
  {
    title: "Review your request",
    description: "Confirm everything looks good before submitting.",
    component: Review,
  },
];

const TOTAL_STEPS = JOB_STEPS.length;

const PostJob = () => {
  const [active, setActive] = useState<number>(0);

  const { data: user } = useUserProfile();
  const selectedCategory = useJobPostStore((s) => s.selectedCategory);
  const urgency = useUrgencyStore((s) => s.urgency);
  const {
    location: userLocation,
    phoneNumber,
    setLocation,
  } = useLocationStore();

  useEffect(() => {
    if (user && !userLocation.address) {
      setLocation(user.lat, user.lng, user.address);
    }
  }, [user, userLocation.address, setLocation]);

  const nextStep = (): void =>
    setActive((prev) => (prev < TOTAL_STEPS - 1 ? prev + 1 : prev));
  const prevStep = (): void =>
    setActive((prev) => (prev > 0 ? prev - 1 : prev));

  const isContinueDisabled = (): boolean => {
    if (active === 0) return selectedCategory === null;
    if (active === 1) return urgency === null;
    if (active === 2) return !userLocation.address || !phoneNumber;
    return false;
  };

  const isLastStep: boolean = active === TOTAL_STEPS - 1;
  const currentJobStep = JOB_STEPS[active];
  const StepComponent = currentJobStep.component;

  return (
    <SeOnboardingLayout>
      <SeContainerMD className="px-5 lg:px-0">
        <div className="flex items-center justify-between">
          <p className="text-xs text-muted font-semibold my-5">
            NEW JOB REQUEST
          </p>
          <div className="text-muted text-xs flex items-center gap-1">
            <span>Step</span>
            <span className="text-text-dark font-semibold">{active + 1}</span>
            <span>of {TOTAL_STEPS}</span>
          </div>
        </div>

        <SeStepper currentStep={active + 1} totalSteps={TOTAL_STEPS} />

        <SeContainerSM>
          <div className="grid gap-6 mt-6">
            <div className="grid gap-1">
              <SeSectionHeader title={currentJobStep.title} align="left" />
              <SeParagraph title={currentJobStep.description} align="left" />
            </div>

            <div>
              <StepComponent />
            </div>
          </div>

          <div
            className={`flex items-center mt-8 gap-3 w-full ${active === 0 ? "justify-end" : "justify-between"}`}
          >
            {/* Previous button stays visible on all steps after the first */}
            {active > 0 && (
              <SeButton
                variant="tertiary"
                btnText="Previous"
                icon={<LuArrowLeft />}
                iconPosition="left"
                clickFunc={prevStep}
              />
            )}

            {/* WHY: We hide the Stepper's continue button entirely on the last step so Review.tsx can take over */}
            {!isLastStep && (
              <SeButton
                variant="accentLight"
                btnText="Continue"
                icon={<LuArrowRight />}
                iconPosition="right"
                clickFunc={nextStep}
                disabled={isContinueDisabled()}
              />
            )}
          </div>
        </SeContainerSM>
      </SeContainerMD>
    </SeOnboardingLayout>
  );
};

export default PostJob;
