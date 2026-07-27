// pages/PaymentVerifyPage.tsx

import { useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useVerifyPayment } from "@/hooks/mutations/useBilling";
import SeSpinner from "@/components/spinner/SeSpinner";
import { toast } from "sonner";

const PaymentVerifyPage = () => {
  const [searchParams] = useSearchParams();
  const pidx = searchParams.get("pidx");
  const navigate = useNavigate();
  const verifyPayment = useVerifyPayment();

  // useRef prevents React StrictMode from firing the API call twice in development
  const hasAttempted = useRef(false);

  useEffect(() => {
    if (!pidx || hasAttempted.current) return;
    hasAttempted.current = true;

    toast.promise(
      verifyPayment
        .mutateAsync(pidx)
        .then(() => {
          // On success, silently redirect back to the billing page
          navigate("/dashboard/billing", { replace: true });
        })
        .catch(() => {
          // On error, still redirect back so they aren't stuck on a loading screen
          navigate("/dashboard/billing", { replace: true });
        }),
      {
        loading: "Verifying your Khalti transaction...",
        success: "Payment successful! Credits added to your wallet.",
        error: "Verification failed. If money was deducted, contact support.",
      },
    );
  }, [pidx, verifyPayment, navigate]);

  // If someone lands here without a pidx, redirect them away instantly
  useEffect(() => {
    if (!pidx) {
      navigate("/dashboard/billing", { replace: true });
    }
  }, [pidx, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <SeSpinner />
      <h2 className="mt-6 text-xl font-bold text-gray-900">
        Processing Payment...
      </h2>
      <p className="text-sm text-gray-500 mt-2">
        Please do not close this window or click back. We are verifying your
        transaction securely.
      </p>
    </div>
  );
};

export default PaymentVerifyPage;
