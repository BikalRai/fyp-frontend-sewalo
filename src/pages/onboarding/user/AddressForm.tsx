import SeButton from "@/components/button/SeButton";
import SeContainerMD from "@/components/container/SeContainerMD";
import SeContainerSM from "@/components/container/SeContainerSM";
import SeSectionHeader from "@/components/heading/SeSectionHeader";
import SeInput from "@/components/input/SeInput";
import SeParagraph from "@/components/paragraph/SeParagraph";
import SeStepper from "@/components/stepper/SeStepper";
import SeOnboardingLayout from "@/layouts/SeOnboardingLayout";
import { useState } from "react";
import { IoLocationOutline } from "react-icons/io5";
import { LuArrowLeft, LuArrowRight } from "react-icons/lu";

const AddressForm = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [totalSteps, setTotalSteps] = useState<number>(4);

  const handleCurrentStepBack = () => {
    setCurrentStep((prev) => {
      if (prev === 1) {
        return prev;
      } else {
        return prev - 1;
      }
    });
  };

  const handleCurrentStepforward = () => {
    setCurrentStep((prev) => {
      if (prev === totalSteps) {
        return prev;
      } else {
        return prev + 1;
      }
    });
  };
  return (
    <div className="px-5 lg:px-0">
      <SeOnboardingLayout>
        <SeContainerMD>
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted font-semibold my-5">
              HOMEOWNER SETUP
            </p>
            <div className="text-muted text-xs flex items-center gap-1">
              <span>Step</span>
              <span className="text-text-dark font-semibold">
                {currentStep}
              </span>
              <span>of {totalSteps}</span>
            </div>
          </div>
          <SeStepper currentStep={currentStep} totalSteps={totalSteps} />
          <SeContainerSM>
            <form className="grid gap-5 mt-6">
              <SeSectionHeader title="Where is home?" align="left" />
              <SeParagraph
                title="We use this to find pros within 5 km of you. Your exact address stays
              private."
                align="left"
              />
              <SeInput label="City" name="city" placeholderText="Kathmandu" />
              <SeInput
                label="Area / Tole"
                name="tole"
                Icon={IoLocationOutline}
                placeholderText="Patan Dhoka, Lalitpur"
              />

              <SeInput
                label="Street address"
                name="stress"
                placeholderText="House #42, Pulchowk"
              />

              <div className="group border border-muted/20 border-dashed rounded-xl w-full flex items-center justify-center hover:bg-accent transition-colors duration-300 py-3.5 cursor-pointer">
                <div className="flex items-center gap-2">
                  <IoLocationOutline className="stroke-accent group-hover:stroke-light" />
                  <p className="text-text-dark text-sm font-medium leading-5 group-hover:text-light">
                    Use my current location
                  </p>
                </div>
              </div>
            </form>
            <div className="flex items-center justify-between w-full mt-6">
              <SeButton
                variant="tertiary"
                btnText="Back"
                size="sm"
                icon={<LuArrowLeft />}
                iconPosition="left"
                clickFunc={handleCurrentStepBack}
              />
              <SeButton
                variant="primary"
                btnText="Continue"
                size="sm"
                clickFunc={handleCurrentStepforward}
                icon={<LuArrowRight />}
                iconPosition="right"
              />
            </div>
          </SeContainerSM>
        </SeContainerMD>
      </SeOnboardingLayout>
    </div>
  );
};

export default AddressForm;
