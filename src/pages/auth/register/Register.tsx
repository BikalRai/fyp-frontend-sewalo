import { logo } from "@/uitls/images";
import { Link, useNavigate } from "react-router-dom";
import SeInput from "@/components/input/SeInput";
import {
  LuArrowRight,
  LuLock,
  LuMail,
  LuUser,
  LuBriefcase,
  LuHouse,
} from "react-icons/lu";
import SeButton from "@/components/button/SeButton";
import { useForm, useWatch } from "react-hook-form";
import { userRegisterBody, type UserRegisterType } from "@/types/user.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRegister } from "@/hooks/mutations/useAuth";
import axios from "axios";
import SeSpinner from "@/components/spinner/SeSpinner";
import GoogleAuthButton from "@/components/button/GoogleAuthButton";

const Register = () => {
  const navigate = useNavigate();
  const { mutate: registerUser, isPending } = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    control,
  } = useForm<UserRegisterType>({
    resolver: zodResolver(userRegisterBody),
    defaultValues: {
      role: "CUSTOMER",
    },
  });

  const selectedRole = useWatch({ control, name: "role" });

  const handleRegister = (data: UserRegisterType) => {
    registerUser(data, {
      onSuccess: () => {
        navigate("/auth/verify");
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
    <div className="w-full max-w-sm flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-3">
        <div className="h-8 me-auto">
          <img src={logo} alt="Sewalo logo" className="w-full h-full" />
        </div>
        <h1 className="text-3xl font-semibold text-text-dark">
          Join the neighbourhood
        </h1>
        <p className="text-sm text-muted">
          Less than a minute. No credit card. Pinky promise.
        </p>
      </div>

      {/* Role selector */}
      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => setValue("role", "CUSTOMER")}
          className={`flex-1 flex flex-col gap-1 border rounded-xl p-4.5 text-left cursor-pointer transition-colors duration-200 ${
            selectedRole === "CUSTOMER"
              ? "border-text-dark"
              : "border-gray-200 hover:border-gray-300"
          }`}
        >
          <div className="grid gap-2">
            <LuHouse
              className={`text-base ${selectedRole === "CUSTOMER" ? "stroke-accent" : "stroke-muted"}`}
            />
            <div>
              <div className="text-sm font-medium text-text-dark leading-5">
                I need help
              </div>
              <div className="text-xs text-muted leading-4">Post a job</div>
            </div>
          </div>
        </button>

        <button
          type="button"
          onClick={() => setValue("role", "PROVIDER")}
          className={`flex-1 flex flex-col gap-1 border rounded-xl p-4.5 text-left cursor-pointer transition-colors duration-200 ${
            selectedRole === "PROVIDER"
              ? "border-text-dark"
              : "border-gray-200 hover:border-gray-300"
          }`}
        >
          <div className="grid gap-2">
            <LuBriefcase
              className={`text-base ${selectedRole === "PROVIDER" ? "stroke-accent" : "stroke-muted"}`}
            />
            <div>
              <div className="text-sm font-medium text-text-dark leading-5">
                I provide services
              </div>
              <div className="text-xs text-muted leading-4">Get matched</div>
            </div>
          </div>
        </button>
      </div>

      {/* Form */}
      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit(handleRegister)}
      >
        {/* Full name */}
        <SeInput
          type="text"
          label="Full name"
          name="fullName"
          placeholderText="Ramesh Bhattarai"
          Icon={LuUser}
          registration={register("fullName")}
          error={errors.fullName?.message}
        />

        {/* Email */}
        <SeInput
          type="email"
          label="Email"
          name="email"
          placeholderText="you@example.com"
          Icon={LuMail}
          registration={register("email")}
          error={errors.email?.message}
        />

        {/* Password */}
        <SeInput
          type="password"
          label="Password"
          name="password"
          placeholderText="At least 8 characters"
          Icon={LuLock}
          registration={register("password")}
          error={errors.password?.message}
        />

        {/* Terms */}
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <input
            type="checkbox"
            className="w-4 h-4 appearance-none rounded-full border border-muted/30 checked:bg-text-dark checked:border-text-dark cursor-pointer"
          />
          <span className="text-sm text-gray-500">
            I agree to Sewalo's{" "}
            <Link
              to="/terms"
              className="text-text-dark font-medium hover:underline"
            >
              Terms
            </Link>{" "}
            and{" "}
            <Link
              to="/privacy"
              className="text-text-dark font-medium hover:underline"
            >
              Privacy Policy
            </Link>
          </span>
        </label>

        {/* Submit */}
        <SeButton
          btnText={isPending ? "Creating account " : "Create account"}
          iconPosition="right"
          icon={isPending ? <SeSpinner /> : <LuArrowRight />}
          disabled={isSubmitting || isPending}
        />

        {/* Divider */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs text-gray-400">or continue with</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* Google */}
        <GoogleAuthButton label="Signup with Google" />
      </form>

      {/* Footer */}
      <p className="text-center text-sm text-gray-400">
        Already have an account?{" "}
        <Link
          to="/auth/login"
          className="text-gray-900 font-medium hover:underline"
        >
          Log in
        </Link>
      </p>
    </div>
  );
};

export default Register;
