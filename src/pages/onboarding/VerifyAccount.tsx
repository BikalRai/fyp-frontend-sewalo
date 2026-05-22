import SeButton from "@/components/button/SeButton";
import SeContainerMD from "@/components/container/SeContainerMD";
import SeSectionHeader from "@/components/heading/SeSectionHeader";
import SeOTPInput from "@/components/input/SeOTPInput";
import SeOnboardingLayout from "@/layouts/SeOnboardingLayout";
import { LuArrowLeft, LuArrowRight, LuMail } from "react-icons/lu";

const VerifyAccount = () => {
  return (
    <SeOnboardingLayout>
      {/* <div className="flex-1 flex w-full items-center justify-between"> */}
      <SeContainerMD>
        <form className="w-full flex flex-col items-center ">
          <div className="flex flex-col items-center gap-5">
            <div className="w-16 h-16 bg-accent/20 rounded-2xl flex items-center justify-center">
              <LuMail className="stroke-accent h-7 w-7" />
            </div>
            <SeSectionHeader title="Check your inbox" />
            <h3>
              <span className="text-muted">We sent a 6-digit code to </span>
              <span className="font-medium text-text-dark">
                you@example.com.
              </span>
            </h3>
          </div>
          <div className="w-full grid gap-5 mt-5">
            <SeOTPInput onComplete={() => {}} />
            <div className="text-sm flex items-center justify-center gap-2">
              <span className="text-muted">Didn't get it?</span>
              <button className="text-text-dark font-medium cursor-pointer hover:underline">
                Resend code
              </button>
            </div>
            <div className="flex items-center justify-between">
              <SeButton
                variant="tertiary"
                btnText="Back"
                icon={<LuArrowLeft />}
                iconPosition="left"
              />
              <SeButton
                variant="primary"
                btnText="Verify & continue"
                icon={<LuArrowRight />}
                iconPosition="right"
              />
            </div>
          </div>
        </form>
      </SeContainerMD>
      {/* </div> */}
    </SeOnboardingLayout>
  );
};

export default VerifyAccount;
