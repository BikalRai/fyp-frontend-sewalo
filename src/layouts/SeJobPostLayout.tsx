import SeButton from "@/components/button/SeButton";
import SeContainerSM from "@/components/container/SeContainerSM";
import SeSectionHeader from "@/components/heading/SeSectionHeader";
import SeLogo from "@/components/logo/SeLogo";
import SeParagraph from "@/components/paragraph/SeParagraph";
import Category from "@/features/job/components/Category";
import Desciptions from "@/features/job/components/Desciptions";
import Location from "@/features/job/components/Location";
import Review from "@/features/job/components/Review";
import {
  useImageStore,
  useJobPostStore,
  useLocationStore,
  useUrgencyStore,
} from "@/store/jobStore";
import { Stepper } from "@mantine/core";
import { useState } from "react";
import { LuArrowLeft } from "react-icons/lu";
import { useLocation, useNavigate } from "react-router-dom";

const steps = [
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

const SeJobPostLayout = () => {
  const [active, setActive] = useState(0);
  const selectedCategory = useJobPostStore((s) => s.selectedCategory);
  const urgency = useUrgencyStore((s) => s.urgency);
  const { location: userLocation, phoneNumber } = useLocationStore();
  const selectedImages = useImageStore((s) => s.selectedImages);

  const location = useLocation();
  const navigate = useNavigate();

  const nextStep = () =>
    setActive((prev) => (prev === steps.length - 1 ? prev : prev + 1));
  const prevStep = () => {
    if (active === 0 && location.pathname.includes("/onboarding")) {
      navigate("/onboarding/address");
      setActive((prev) => (prev === 0 ? prev : prev - 1));
    } else {
      if (!location.pathname.includes("/onboarding")) {
        navigate(-1);
      }
      setActive((prev) => (prev === 0 ? prev : prev - 1));
    }
  };

  const handleClickSkip = () => {
    navigate("/dashboard");
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();

      formData.append("category", selectedCategory || "");
      formData.append("urgency", urgency || "");
      formData.append("address", userLocation.address);
      formData.append("lat", String(userLocation.lat));
      formData.append("lng", String(userLocation.lng));
      formData.append("phoneNumber", phoneNumber);

      selectedImages.forEach((image) => {
        formData.append("images", image);
      });

      console.log("Submitting...");

      // axios/fetch request here

      /*
    await axios.post("/api/job-post", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    */

      console.log("Submitted");
    } catch (error) {
      console.error(error);
    }
  };

  const currentStep = steps[active];
  const StepComponent = currentStep.component;

  const isContinueDisabled = () => {
    if (active === 0) return selectedCategory === null;

    if (active === 1) return urgency === null;

    if (active === 2) return !userLocation.address || !phoneNumber;

    return false;
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-light py-5">
        <SeContainerSM className="px-4 lg:px-0">
          <div className="flex items-center justify-between">
            <SeLogo />
            <SeButton
              btnText="Back to home"
              icon={<LuArrowLeft />}
              iconPosition="left"
              variant="tertiary"
              size="sm"
            />
          </div>
        </SeContainerSM>
      </div>
      <div className="mt-8">
        <SeContainerSM className="px-4 lg:px-0">
          <div>
            <Stepper
              active={active}
              onStepClick={setActive}
              allowNextStepsSelect={false}
              color="green"
              size="xs"
            >
              <Stepper.Step label="Category" />
              <Stepper.Step label="Details" />
              <Stepper.Step label="Contact" />
            </Stepper>
          </div>
          <div className="mt-8">
            {currentStep && (
              <div className="grid gap-6">
                <div className="grid gap-1">
                  <SeSectionHeader title={currentStep.title} align="left" />
                  <SeParagraph title={currentStep.description} align="left" />
                </div>
                <div>{<StepComponent />}</div>
              </div>
            )}
          </div>

          <div className="flex items-center mt-30">
            {location.pathname.includes("/onboarding") ? (
              <SeButton
                variant="tertiary"
                btnText="Previous"
                clickFunc={prevStep}
                className="flex-1"
              />
            ) : (
              <SeButton btnText="Skip for now" clickFunc={handleClickSkip} />
            )}

            <SeButton
              variant="accentLight"
              btnText={active === steps.length - 1 ? "Submit" : "Continue"}
              clickFunc={active === steps.length - 1 ? handleSubmit : nextStep}
              className="flex-1"
              disabled={isContinueDisabled()}
            />
          </div>
        </SeContainerSM>
      </div>
    </div>
  );
};

export default SeJobPostLayout;
