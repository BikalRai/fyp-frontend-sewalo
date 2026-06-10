import SeButton from "@/components/button/SeButton";
import SeContainerMD from "@/components/container/SeContainerMD";
import SeStepper from "@/components/stepper/SeStepper";
import AboutYou from "@/features/provider/components/AboutYou";
import PersonalDetails from "@/features/provider/components/PersonalDetails";
import WorkArea from "@/features/provider/components/WorkArea";
import {
  masterProviderSchema,
  type IProviderStep,
  type MasterProviderType,
} from "@/types/provider.types";
import { useEffect, useState } from "react";
import { LuArrowLeft, LuArrowRight } from "react-icons/lu";
import SeOnboardingLayout from "./SeOnboardingLayout";
import SeSectionHeader from "@/components/heading/SeSectionHeader";
import SeParagraph from "@/components/paragraph/SeParagraph";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Services from "@/features/provider/components/Services";
import PreviewProfile from "@/features/provider/components/PreviewProfile";
import { useUpdateProviderPersonal } from "@/hooks/mutations/useProvider";
import { uploadToCloudinary } from "@/lib/uploadImage";
import { toast } from "sonner";
import axios from "axios";
import SeSpinner from "@/components/spinner/SeSpinner";
import { useNavigate } from "react-router-dom";
import { RingLoader } from "react-spinners";
import { useUserProfile } from "@/hooks/mutations/useUser";

const steps: IProviderStep[] = [
  {
    title: "Personal details",
    description: "Tell clients who they're hiring.",
    component: PersonalDetails,
    fields: ["imageUrl", "phoneNumber", "gender"],
  },
  {
    title: "Your Services",
    description: "Pick the services you offer and your experience level.",
    component: Services,
    fields: ["services", "experience"],
  },
  {
    title: "Work area",
    description: "Choose the districts where you can work.",
    component: WorkArea,
    fields: ["workArea"],
  },
  {
    title: "About you",
    description: "A short intro and your starting rate.",
    component: AboutYou,
    fields: ["bio", "pricingBasis", "startingRate"],
  },
  {
    title: "Review your profile",
    description:
      "This is how clients will see you. Make sure everything looks right.",
    component: PreviewProfile,
    fields: [],
  },
];

const TOTAL_STEPS = steps.length;

const ProviderOnboardingFlow = () => {
  const [active, setActive] = useState<number>(0);

  const { data: user } = useUserProfile();

  const methods = useForm({
    resolver: zodResolver(masterProviderSchema),
    mode: "onTouched",
  });

  const { mutate: updateProviderProfile, isPending } =
    useUpdateProviderPersonal();

  const nextStep = async (): Promise<void> => {
    const currentStepFields = steps[active].fields;

    const stepIsValid = await methods.trigger(currentStepFields);

    if (!stepIsValid) {
      // This will tell us EXACTLY what Zod is complaining about
      console.log("Zod Errors:", methods.formState.errors);
    }

    if (stepIsValid) {
      setActive((prev) => (prev < TOTAL_STEPS - 1 ? prev + 1 : prev));
    }
  };

  const prevStep = (): void => {
    setActive((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const navigate = useNavigate();

  const submitHandler = async (data: MasterProviderType) => {
    try {
      let finalImageUrl = data.imageUrl;

      if (data.imageUrl instanceof File) {
        finalImageUrl = await uploadToCloudinary(data.imageUrl);
      }

      const finalPayload = {
        ...data,
        imageUrl: finalImageUrl,
      };

      updateProviderProfile(finalPayload, {
        onSuccess: (response) => {
          toast.success("Updated profile.");

          if (response?.user?.onboarded) {
            navigate("/dashboard");
          }
        },
        onError: (error) => {
          if (axios.isAxiosError(error)) {
            const message =
              error.response?.data?.details ??
              error.response?.data?.message ??
              "Something went wrong.";
            toast.error(message);
          } else {
            toast.error("Something went wrong.");
          }
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const isLastStep: boolean = active === TOTAL_STEPS - 1;

  const currentStepComponent: IProviderStep = steps[active] ?? null;

  const StepComponent = currentStepComponent.component;

  const stepTitle: string = currentStepComponent.title;

  const stepDescription: string = currentStepComponent.description;

  useEffect(() => {
    if (user?.onboarded) {
      navigate("/dashboard");
    }
  }, []);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(submitHandler)}>
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
                  <SeStepper
                    currentStep={active + 1}
                    totalSteps={TOTAL_STEPS}
                  />
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
                <div>
                  {isPending ? (
                    <RingLoader />
                  ) : (
                    StepComponent && <StepComponent />
                  )}
                </div>
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
                    type="button"
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
                  icon={isPending ? <SeSpinner /> : <LuArrowRight />}
                  clickFunc={nextStep}
                />
              </div>
            </div>
          </SeContainerMD>
        </SeOnboardingLayout>
      </form>
    </FormProvider>
  );
};

export default ProviderOnboardingFlow;
