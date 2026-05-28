import SeButton from "@/components/button/SeButton";
import SeContainerMD from "@/components/container/SeContainerMD";
import SeStepper from "@/components/stepper/SeStepper";
import AboutYou from "@/features/provider/components/AboutYou";
import PersonalDetails from "@/features/provider/components/PersonalDetails";
import WorkArea from "@/features/provider/components/WorkArea";
import type { IProviderStep } from "@/types/provider.types";
import { useState } from "react";
import { LuArrowLeft, LuArrowRight } from "react-icons/lu";
import SeOnboardingLayout from "./SeOnboardingLayout";
import SeSectionHeader from "@/components/heading/SeSectionHeader";
import SeParagraph from "@/components/paragraph/SeParagraph";

const steps: IProviderStep[] = [
  {
    title: "Personal details",
    description: "Tell clients who they're hiring.",
    component: PersonalDetails,
  },
  {
    title: "Your Services",
    description: "Pick the services you offer and your experience level.",
    component: PersonalDetails,
  },
  {
    title: "Work area",
    description: "Choose the districts where you can work.",
    component: WorkArea,
  },
  {
    title: "About you",
    description: "A short intro and your starting rate.",
    component: AboutYou,
  },
];

const TOTAL_STEPS = steps.length;

const ProviderOnboardingFlow = () => {
  const [active, setActive] = useState<number>(0);

  const nextStep = (): void => {
    setActive((prev) => (prev < TOTAL_STEPS - 1 ? prev + 1 : prev));
  };

  const prevStep = (): void => {
    setActive((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const isLastStep: boolean = active === TOTAL_STEPS - 1;

  const currentStepComponent: IProviderStep = steps[active] ?? null;

  const StepComponent = currentStepComponent.component;

  const stepTitle: string = currentStepComponent.title;

  const stepDescription: string = currentStepComponent.description;

  return (
    <div>
      <SeOnboardingLayout>
        <SeContainerMD className="px-5 lg:px-0">
          <div className="min-h-screen flex flex-col gap-28">
            <div className="flex flex-col gap-5 mt-12">
              <div>
                <div className="flex items-center justify-between text-xs font-medium text-text-dark/70">
                  <div>
                    Step {active + 1} of {TOTAL_STEPS}
                  </div>
                  <div>{((active + 1) / TOTAL_STEPS) * 100}%</div>
                </div>
                <SeStepper currentStep={active + 1} totalSteps={TOTAL_STEPS} />
              </div>

              {/* components */}
              <div className="grid gap-1">
                <SeSectionHeader title={stepTitle} align="left" />

                <SeParagraph
                  title={stepDescription}
                  align="left"
                  className="h-8 max-h-8"
                />
              </div>
              <div>{StepComponent && <StepComponent />}</div>
            </div>

            {/* navigation */}
            <div
              className={`flex items-center mt-8 gap-3 w-full ${
                active === 0 ? "justify-end" : "justify-between"
              }`}
            >
              {/* Only show Back button if we are past the first step */}
              {active > 0 && (
                <SeButton
                  btnText="Back"
                  variant="tertiary"
                  iconPosition="left"
                  icon={<LuArrowLeft />}
                  clickFunc={prevStep}
                />
              )}

              {/* Continue / Submit button remains exactly the same element across all steps */}
              <SeButton
                btnText={isLastStep ? "Submit" : "Continue"}
                variant="primary"
                iconPosition="right"
                icon={isLastStep ? undefined : <LuArrowRight />}
                clickFunc={nextStep}
              />
            </div>
          </div>
        </SeContainerMD>
      </SeOnboardingLayout>
    </div>
  );
};

export default ProviderOnboardingFlow;
