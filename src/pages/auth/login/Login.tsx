import { logo } from "@/uitls/images";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import SeInput from "@/components/input/SeInput";
import { LuArrowRight, LuLock, LuMail } from "react-icons/lu";
import SeButton from "@/components/button/SeButton";
import { useLogin } from "@/hooks/mutations/useAuth";
import { toast } from "sonner";
import axios from "axios";
import SeSpinner from "@/components/spinner/SeSpinner";
import GoogleAuthButton from "@/components/button/GoogleAuthButton";

const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  keepSignedIn: z.boolean().optional(),
});

type LoginFormData = z.infer<typeof loginSchema>;

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const { mutate: loginUser, isPending } = useLogin();

  const handleLogin = async (data: LoginFormData) => {
    loginUser(data, {
      onSuccess: () => {
        toast.success("User authenticated!");
      },
      onError(error) {
        if (axios.isAxiosError(error)) {
          const message =
            error.response?.data?.details ??
            error.response?.data?.message ??
            "something went wrong";
          toast.error(message);
        } else {
          toast.error("Something went wrong");
          console.error(error);
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
        <h1 className="text-3xl font-semibold text-text-dark text-center">
          Welcome back, friend
        </h1>
        <p className="text-sm text-muted">
          Good to see you again. Let's find you some help.
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="flex flex-col gap-4 mt-6"
      >
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
          placeholderText="********"
          Icon={LuLock}
          registration={register("password")}
          error={errors.password?.message}
        />

        {/* Keep signed in */}
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <input
            type="checkbox"
            className="w-4 h-4 appearance-none rounded-full border border-muted/30 checked:bg-text-dark checked:border-text-dark cursor-pointer"
          />

          <span className="text-sm text-gray-500">Keep me signed in</span>
        </label>

        {/* Submit */}

        <SeButton
          btnText="Log in"
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
        <GoogleAuthButton label="Log in with Google" />
      </form>

      {/* Footer */}
      <p className="text-center text-sm text-gray-400">
        New to Sewalo?{" "}
        <Link
          to="/auth/register"
          className="text-gray-900 font-medium hover:underline"
        >
          Create account
        </Link>
      </p>
    </div>
  );
};

export default Login;
