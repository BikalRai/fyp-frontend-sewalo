// CustomerOnboardingFlow.tsx

import { useState } from "react";
import { LuArrowRight } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

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

import AddressFormStep from "@/pages/onboarding/user/AddressFormStep";

import {
  useImageStore,
  useJobPostStore,
  useLocationStore,
  useUrgencyStore,
} from "@/store/jobStore";

import type { JobStep } from "@/types/job.types";

// ─── Step definitions ────────────────────────────────────────────────────────

const JOB_STEPS: JobStep[] = [
  {
    title: "What do you need help with?",
    description: "Describe what you need and get matched with verified pros",
    component: Category,
  },
  {
    title: "Tell us more about the job",
    description: "Describe what you need and get matched with verified pros",
    component: Desciptions,
  },
  {
    title: "Where should the pro come?",
    description:
      "Your exact address is only shared after a professional is matched",
    component: Location,
  },
  {
    title: "Review your request",
    description: "Confirm everything before submitting",
    component: Review,
  },
];

const ADDRESS_STEP = {
  title: "Where is home?",
  description:
    "We use this to find pros within 5 km of you. Your exact address stays private.",
};

const TOTAL_STEPS = 1 + JOB_STEPS.length;

// ─── Main component ──────────────────────────────────────────────────────────

const CustomerOnboardingFlow = () => {
  const [active, setActive] = useState<number>(0);

  const selectedCategory = useJobPostStore((s) => s.selectedCategory);

  const urgency = useUrgencyStore((s) => s.urgency);

  const { location: userLocation, phoneNumber } = useLocationStore();

  const selectedImages = useImageStore((s) => s.selectedImages);

  const navigate = useNavigate();

  // ── Navigation ─────────────────────────────────────────────────────────────

  const nextStep = (): void => {
    setActive((prev) => (prev < TOTAL_STEPS - 1 ? prev + 1 : prev));
  };

  const prevStep = (): void => {
    setActive((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleSkip = (): void => {
    navigate("/dashboard");
  };

  // ── Submit ─────────────────────────────────────────────────────────────────

  const handleSubmit = async (): Promise<void> => {
    try {
      const formData = new FormData();

      formData.append("category", selectedCategory || "");
      formData.append("urgency", urgency || "");
      formData.append("address", userLocation.address);
      formData.append("lat", String(userLocation.lat));
      formData.append("lng", String(userLocation.lng));
      formData.append("phoneNumber", phoneNumber);

      selectedImages.forEach((image: File) => {
        formData.append("images", image);
      });

      console.log("Submitting...");

      // await axios.post("/api/job-post", formData, {
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //   },
      // });

      console.log("Submitted");
    } catch (error) {
      console.error(error);
    }
  };

  // ── Continue disabled logic ────────────────────────────────────────────────

  const isContinueDisabled = (): boolean => {
    if (active === 0) return !userLocation.address;

    if (active === 1) return selectedCategory === null;

    if (active === 2) return urgency === null;

    if (active === 3) return !userLocation.address || !phoneNumber;

    return false;
  };

  const isLastStep: boolean = active === TOTAL_STEPS - 1;

  // ── Derived render values ──────────────────────────────────────────────────

  const isAddressStep: boolean = active === 0;

  const jobStepIndex: number = active - 1;

  const currentJobStep: JobStep | null = isAddressStep
    ? null
    : JOB_STEPS[jobStepIndex];

  const StepComponent = currentJobStep?.component ?? null;

  const stepTitle: string = isAddressStep
    ? ADDRESS_STEP.title
    : currentJobStep!.title;

  const stepDescription: string = isAddressStep
    ? ADDRESS_STEP.description
    : currentJobStep!.description;

  return (
    <div>
      <SeOnboardingLayout>
        <SeContainerMD className="px-5 lg:px-0">
          {/* ── Header ── */}
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted font-semibold my-5">
              HOMEOWNER SETUP
            </p>

            <div className="text-muted text-xs flex items-center gap-1">
              <span>Step</span>

              <span className="text-text-dark font-semibold">{active + 1}</span>

              <span>of {TOTAL_STEPS}</span>
            </div>
          </div>

          {/* ── Unified stepper ── */}
          <SeStepper currentStep={active + 1} totalSteps={TOTAL_STEPS} />

          <SeContainerSM>
            <div className="grid gap-6 mt-6">
              {/* ── Step title & description ── */}
              <div className="grid gap-1">
                <SeSectionHeader title={stepTitle} align="left" />

                <SeParagraph title={stepDescription} align="left" />
              </div>

              {/* ── Step content ── */}
              <div>
                {isAddressStep ? (
                  <AddressFormStep />
                ) : (
                  StepComponent && <StepComponent />
                )}
              </div>
            </div>

            {/* ── Navigation buttons ── */}
            {active === 0 ? (
              <div className="flex items-center justify-end mt-8">
                <SeButton
                  variant="accentLight"
                  btnText={isLastStep ? "Submit" : "Continue"}
                  icon={isLastStep ? undefined : <LuArrowRight />}
                  iconPosition="right"
                  clickFunc={isLastStep ? handleSubmit : nextStep}
                  // className="flex-1"
                  disabled={isContinueDisabled()}
                />
              </div>
            ) : (
              <div className="flex items-center justify-between mt-8 gap-3">
                {active === 1 ? (
                  <SeButton
                    variant="tertiary"
                    btnText="Skip for now"
                    clickFunc={handleSkip}
                  />
                ) : (
                  <SeButton
                    variant="tertiary"
                    btnText="Previous"
                    clickFunc={prevStep}
                    className="flex-1"
                  />
                )}

                <SeButton
                  variant="accentLight"
                  btnText={isLastStep ? "Submit" : "Continue"}
                  icon={isLastStep ? undefined : <LuArrowRight />}
                  iconPosition="right"
                  clickFunc={isLastStep ? handleSubmit : nextStep}
                  className="flex-1"
                  disabled={isContinueDisabled()}
                />
              </div>
            )}
          </SeContainerSM>
        </SeContainerMD>
      </SeOnboardingLayout>
    </div>
  );
};

export default CustomerOnboardingFlow;
