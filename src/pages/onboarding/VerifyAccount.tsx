import SeButton from "@/components/button/SeButton";
import SeContainerMD from "@/components/container/SeContainerMD";
import SeSectionHeader from "@/components/heading/SeSectionHeader";
import SeOTPInput from "@/components/input/SeOTPInput";
import { useResendCode, useVerify } from "@/hooks/mutations/useAuth";
import SeOnboardingLayout from "@/layouts/SeOnboardingLayout";
import { useAuthStore } from "@/store/authStore";
import axios from "axios";
import { useEffect, useState } from "react";
import { LuArrowLeft, LuArrowRight, LuMail } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { SyncLoader } from "react-spinners";

// Import your user profile hook to check DB status
import { useUserProfile } from "@/hooks/mutations/useUser";

const VerifyAccount = () => {
  const [otpToken, setOtpToken] = useState<string>("");
  const navigate = useNavigate();
  const { mutate: resendCode } = useResendCode();
  const { mutate: verifyAccount, isPending } = useVerify();

  const userId = useAuthStore((state) => state.userId);

  // Fetch the user's current status from the database
  const { data: user, isLoading } = useUserProfile();

  // ─── The Route Guard ───────────────────────────────────────────────────────
  useEffect(() => {
    // 1. Wait for the database to respond (!isLoading)
    // 2. Check if their account is already marked as active
    if (!isLoading && user?.isActive) {
      // Adjust 'isActive' to match your exact DB field
      // If they are active, bounce them out.
      // Use replace: true so they can't hit the "Back" button and get stuck here.
      navigate("/dashboard", { replace: true });
    }
  }, [isLoading, user?.isActive, navigate]);
  // ───────────────────────────────────────────────────────────────────────────

  const handleResendCode = () => {
    if (!userId) {
      console.error("No user found in store");
      return;
    }

    resendCode(userId, {
      onSuccess: () => {
        toast.success("Verification code has been sent to your email.");
      },
      onError(error) {
        if (axios.isAxiosError(error)) {
          const message =
            error.response?.data?.details ??
            error.response?.data?.message ??
            "Something went wrong";
          toast.error(message);
        } else {
          toast.error("Something went wrong");
          console.error(error);
        }
      },
    });
  };

  const handleVerification = (e: React.FormEvent) => {
    // Switched to FormEvent for standard HTML forms
    e.preventDefault();

    verifyAccount(otpToken, {
      onSuccess: () => {
        toast.success("Account verified.");
      },
      onError(error) {
        if (axios.isAxiosError(error)) {
          const message =
            error.response?.data?.details ??
            error.response?.data?.message ??
            "Invalid verification code";
          toast.error(message);
        } else {
          toast.error("Something went wrong");
          console.error(error);
        }
      },
    });
  };

  return (
    <SeOnboardingLayout>
      <SeContainerMD>
        <form
          className="w-full flex flex-col items-center mt-40"
          onSubmit={handleVerification}
        >
          {/* ... all your existing UI code remains exactly the same ... */}
          <div className="flex flex-col items-center gap-5">
            <div className="w-16 h-16 bg-accent/20 rounded-2xl flex items-center justify-center">
              <LuMail className="stroke-accent h-7 w-7" />
            </div>
            <SeSectionHeader title="Check your inbox" />
            <h3>
              <span className="text-muted">We sent a 6-digit code to </span>
              <span className="font-medium text-text-dark">
                {user?.email || "your email"}.{" "}
                {/* Pro-tip: dynamically show their email here! */}
              </span>
            </h3>
          </div>

          <div className="w-full grid gap-5 mt-5">
            <SeOTPInput onComplete={(val) => setOtpToken(val)} />

            <div className="text-sm flex items-center justify-center gap-2">
              <span className="text-muted">Didn't get it?</span>
              <button
                type="button"
                onClick={handleResendCode}
                className="text-text-dark font-medium cursor-pointer hover:underline"
              >
                Resend code
              </button>
            </div>

            <div className="flex items-center justify-between mt-20">
              <SeButton
                type="button"
                variant="tertiary"
                btnText="Back"
                icon={<LuArrowLeft />}
                iconPosition="left"
                clickFunc={() => navigate("/auth/login")}
              />
              <SeButton
                type="submit" // Changed to type="submit" so hitting Enter on the keyboard works
                variant="primary"
                btnText={isPending ? "Verifying..." : "Verify & continue"}
                icon={
                  isPending ? (
                    <SyncLoader size={3} color="#f9fafb" />
                  ) : (
                    <LuArrowRight />
                  )
                }
                iconPosition="right"
                disabled={isPending || otpToken.length < 6} // Prevent submission if token isn't fully typed
              />
            </div>
          </div>
        </form>
      </SeContainerMD>
    </SeOnboardingLayout>
  );
};

export default VerifyAccount;
