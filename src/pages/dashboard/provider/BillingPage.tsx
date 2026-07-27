import SubscriptionGrid from "@/components/billing/SubscriptionGrid";
import SeSpinner from "@/components/spinner/SeSpinner";
import {
  useInitiatePayment,
  useProviderCredits,
  useVerifyPayment,
} from "@/hooks/mutations/useBilling";
import { SUBSCRIPTION_PLANS } from "@/services/subscription.types";
import type { ISubscriptionPlan, PurchaseType } from "@/types/billing.types";
import { useEffect, useState } from "react";
import { LuCoins, LuLock } from "react-icons/lu";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";

const BillingPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const pidx = searchParams.get("pidx");

  // State for the raw token top-up selector
  const [selectedPackage, setSelectedPackage] = useState<number>(10);
  const TOKEN_PACKAGES = [5, 10, 20, 50];

  // TanStack Query Hooks
  const { data: creditsData, isLoading: isCreditsLoading } =
    useProviderCredits();
  const initiatePayment = useInitiatePayment();
  const verifyPayment = useVerifyPayment();

  // Handle returning from Khalti using toast.promise
  useEffect(() => {
    if (pidx) {
      // We use mutateAsync here because toast.promise expects a Promise
      const verificationPromise = verifyPayment
        .mutateAsync(pidx)
        .finally(() => {
          // Clean the URL when done to prevent infinite loops on page refresh
          searchParams.delete("pidx");
          setSearchParams(searchParams, { replace: true });
        });

      toast.promise(verificationPromise, {
        loading: "Verifying your Khalti payment... Please wait.",
        success: "Payment verified! Your wallet has been updated.",
        error:
          "Payment verification failed. If money was deducted, contact support.",
      });
    }
  }, [pidx]); // Only runs when pidx is present

  // 1. Handle Raw Token Top-Up
  const handleTopUp = () => {
    toast.promise(
      initiatePayment
        .mutateAsync({
          creditsRequested: selectedPackage,
          purchaseType: "TOKEN_TOP_UP",
        })
        .then((res) => {
          if (res?.payment_url) {
            window.location.href = res.payment_url;
          }
        }),
      {
        loading: "Connecting to Khalti...",
        error: "Failed to connect to Khalti. Please try again.",
      },
    );
  };

  // 2. Handle Subscription Upgrade
  const handleSubscriptionUpgrade = (plan: ISubscriptionPlan) => {
    const purchaseType: PurchaseType =
      plan.tier === "PRO"
        ? "SUBSCRIPTION_PRO"
        : plan.tier === "BUSINESS"
          ? "SUBSCRIPTION_BUSINESS"
          : "TOKEN_TOP_UP";

    if (purchaseType === "TOKEN_TOP_UP") return; // FREE plan doesn't trigger payment

    toast.promise(
      initiatePayment
        .mutateAsync({
          creditsRequested: 0, // Backend automatically grants plan tokens
          purchaseType,
        })
        .then((res) => {
          if (res?.payment_url) {
            window.location.href = res.payment_url;
          }
        }),
      {
        loading: `Connecting to Khalti for ${plan.name}...`,
        error: "Failed to connect to Khalti. Please try again.",
      },
    );
  };

  const currentBalance = creditsData?.balance || 0;
  // Hardcoded for now until backend subscription logic is ready
  const currentTokenRateRs = 45;

  return (
    <div className="max-w-5xl mx-auto p-4 lg:p-8 space-y-10">
      {/* --- Section 2: Page Header --- */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Wallet & Billing</h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage your lead tokens and upgrade your visibility.
        </p>
      </div>

      {/* --- Section 3: Token Top-Up & Balance --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Wallet Card */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-gray-100 pb-6">
            <div>
              <p className="text-xs font-semibold uppercase text-gray-400 tracking-wider">
                Available Credits
              </p>
              {isCreditsLoading ? (
                <SeSpinner />
              ) : (
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-4xl font-bold text-gray-900">
                    {currentBalance}
                  </span>
                  <span className="text-sm font-medium text-gray-500">
                    {currentBalance === 1 ? "Lead" : "Leads"}
                  </span>
                </div>
              )}
            </div>
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <LuCoins size={24} />
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Buy More Credits (Rs {currentTokenRateRs}/ea)
            </label>
            <div className="grid grid-cols-4 gap-2 mb-6">
              {TOKEN_PACKAGES.map((amount) => (
                <button
                  key={amount}
                  onClick={() => setSelectedPackage(amount)}
                  className={`py-2 rounded-lg text-sm font-semibold transition-all border ${
                    selectedPackage === amount
                      ? "border-primary bg-primary text-white shadow-sm"
                      : "border-gray-200 text-gray-600 hover:border-gray-300 bg-gray-50 hover:bg-gray-100"
                  }`}
                >
                  +{amount}
                </button>
              ))}
            </div>

            <button
              onClick={handleTopUp}
              disabled={initiatePayment.isPending || verifyPayment.isPending}
              className="w-full py-3 px-4 rounded-lg bg-[#5C2D91] hover:bg-[#4a2475] text-white font-medium text-sm flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <LuLock size={16} />
              {initiatePayment.isPending
                ? "Connecting to Khalti..."
                : `Pay Rs ${selectedPackage * currentTokenRateRs} with Khalti`}
            </button>
          </div>
        </div>

        {/* Info Banner */}
        <div className="lg:col-span-2 bg-linear-to-br from-primary/5 to-primary/10 rounded-xl p-8 border border-primary/20 flex flex-col justify-center">
          <span className="text-xs font-bold uppercase tracking-wider text-primary mb-2">
            How it works
          </span>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Invest in warm leads, not cold clicks.
          </h2>
          <p className="text-gray-600 leading-relaxed max-w-xl mb-6">
            Browsing job requests in your area is completely free. You only
            spend a credit when you are ready to bid on a job and unlock the
            customer's exact location. Once they accept your bid, their phone
            number is revealed.
          </p>
        </div>
      </div>

      <SubscriptionGrid
        plans={SUBSCRIPTION_PLANS}
        activeTier="FREE" // Hardcoded to FREE until backend is ready
        onUpgrade={handleSubscriptionUpgrade}
      />
    </div>
  );
};

export default BillingPage;
