import SeButton from "@/components/button/SeButton";
import SeContainerMD from "@/components/container/SeContainerMD";
import SeSectionHeader from "@/components/heading/SeSectionHeader";
import SeParagraph from "@/components/paragraph/SeParagraph";
import SeSpinner from "@/components/spinner/SeSpinner";
import { useGoogleSetRole } from "@/hooks/mutations/useAuth";
import SeOnboardingLayout from "@/layouts/SeOnboardingLayout";
import { roleEnumSchema } from "@/types/user.types";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm, useWatch } from "react-hook-form";
import { LuArrowRight, LuBriefcase, LuHouse } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

const roleFormSchema = z.object({
  role: roleEnumSchema,
});

export type RoleFormType = z.infer<typeof roleFormSchema>;

const roles = [
  {
    value: "CUSTOMER" as const,
    icon: LuHouse,
    label: "I need help",
    subtitle: "Post a job",
    description:
      "Find trusted local professionals for home repairs, cleaning, and more.",
  },
  {
    value: "PROVIDER" as const,
    icon: LuBriefcase,
    label: "I provide services",
    subtitle: "Get matched",
    description:
      "Offer your skills and grow your client base in your neighbourhood.",
  },
];

const GoogleAuthSetRole = () => {
  const {
    setValue,
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<RoleFormType>({
    resolver: zodResolver(roleFormSchema),
    defaultValues: {
      role: "CUSTOMER",
    },
  });

  const navigate = useNavigate();

  const selectedRole = useWatch({ control, name: "role" });

  const { mutate: setRole, isPending } = useGoogleSetRole();

  const formSubmit = (data: RoleFormType) => {
    setRole(data, {
      onSuccess: () => {
        navigate("/dashboard");
        toast.success("Account created. Please check your email.");
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
  };

  return (
    <SeOnboardingLayout>
      <SeContainerMD>
        <form
          onSubmit={handleSubmit(formSubmit)}
          className="flex flex-col gap-8"
        >
          <div className="mt-20">
            <SeSectionHeader title="What brings you here?" />
            <SeParagraph title="We'll set things up based on how you use Sewalo." />
          </div>

          {/* Role selector */}
          <div className="flex gap-3">
            {roles.map(
              ({ value, icon: Icon, label, subtitle, description }) => {
                const isSelected = selectedRole === value;
                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setValue("role", value)}
                    className={`flex-1 flex flex-col gap-4 border rounded-xl p-5 text-left cursor-pointer transition-all duration-200 ${
                      isSelected
                        ? "border-text-dark bg-gray-50"
                        : "border-gray-200 hover:border-gray-300 bg-white"
                    }`}
                  >
                    {/* Top row: icon + check */}
                    <div className="flex items-center justify-between">
                      <div
                        className={`p-2 rounded-lg transition-colors duration-200 ${
                          isSelected ? "bg-accent/10" : "bg-gray-100"
                        }`}
                      >
                        <Icon
                          className={`text-lg transition-colors duration-200 ${
                            isSelected ? "stroke-accent" : "stroke-muted"
                          }`}
                        />
                      </div>

                      {/* Selection indicator */}
                      <div
                        className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors duration-200 ${
                          isSelected
                            ? "bg-text-dark border-text-dark"
                            : "border-gray-300"
                        }`}
                      >
                        {isSelected && (
                          <svg
                            viewBox="0 0 12 12"
                            className="w-2.5 h-2.5 stroke-white fill-none stroke-2"
                          >
                            <polyline points="2,6 5,9 10,3" />
                          </svg>
                        )}
                      </div>
                    </div>

                    {/* Text */}
                    <div className="flex flex-col gap-0.5">
                      <div className="text-sm font-medium text-text-dark leading-5">
                        {label}
                      </div>
                      <div className="text-xs text-muted leading-4">
                        {subtitle}
                      </div>
                      <div className="text-xs text-muted/70 leading-relaxed mt-1">
                        {description}
                      </div>
                    </div>
                  </button>
                );
              },
            )}
          </div>

          <SeButton
            btnText="Continue"
            icon={isSubmitting ? <SeSpinner /> : <LuArrowRight />}
            disabled={isPending || isSubmitting}
          />
        </form>
      </SeContainerMD>
    </SeOnboardingLayout>
  );
};

export default GoogleAuthSetRole;
