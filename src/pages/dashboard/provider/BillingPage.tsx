import SubscriptionGrid from "@/components/billing/SubscriptionGrid";
import SeSpinner from "@/components/spinner/SeSpinner";
import {
  useInitiatePayment,
  useProviderCredits,
  useVerifyPayment,
  useInitiateEsewa, // Make sure these eSewa hooks are exported from useBilling
  useVerifyEsewa,
} from "@/hooks/mutations/useBilling";
import { SUBSCRIPTION_PLANS } from "@/services/subscription.types";
import type {
  ISubscriptionPlan,
  PurchaseType,
  IEsewaInitiateResponse,
} from "@/types/billing.types";
import { useEffect, useState } from "react";
import { LuLock, LuEye, LuZap, LuPhone, LuShieldCheck } from "react-icons/lu";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";

// Define the available gateways
export type PaymentGateway = "KHALTI" | "ESEWA";

// --- eSewa Form Submission Helper ---
// This builds an invisible form and natively submits it to eSewa's servers
const submitEsewaForm = (payload: IEsewaInitiateResponse) => {
  const form = document.createElement("form");
  form.setAttribute("method", "POST");
  form.setAttribute("action", payload.gateway_url);

  const fields: (keyof IEsewaInitiateResponse)[] = [
    "amount",
    "tax_amount",
    "total_amount",
    "transaction_uuid",
    "product_code",
    "product_service_charge",
    "product_delivery_charge",
    "success_url",
    "failure_url",
    "signed_field_names",
    "signature",
  ];

  fields.forEach((key) => {
    if (payload[key] !== undefined) {
      const input = document.createElement("input");
      input.setAttribute("type", "hidden");
      input.setAttribute("name", key as string);
      input.setAttribute("value", payload[key] as string);
      form.appendChild(input);
    }
  });

  document.body.appendChild(form);
  form.submit();
};

const BillingPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const pidx = searchParams.get("pidx"); // Khalti verification token
  const refId = searchParams.get("refId"); // eSewa verification token

  const [selectedPackage, setSelectedPackage] = useState<number>(10);
  const [paymentGateway, setPaymentGateway] =
    useState<PaymentGateway>("KHALTI");
  const TOKEN_PACKAGES = [5, 10, 20, 50];

  const {
    data: creditsData,
    isLoading: isCreditsLoading,
    effectiveTier,
  } = useProviderCredits();

  // --- 🔒 Khalti Hooks ---
  const initiatePayment = useInitiatePayment();
  const verifyPayment = useVerifyPayment();

  // --- 🟢 eSewa Hooks ---
  const initiateEsewa = useInitiateEsewa();
  const verifyEsewa = useVerifyEsewa();

  // Handle callback verifications for BOTH Khalti and eSewa cleanly
  useEffect(() => {
    if (pidx) {
      const verificationPromise = verifyPayment
        .mutateAsync(pidx)
        .finally(() => {
          searchParams.delete("pidx");
          setSearchParams(searchParams, { replace: true });
        });

      toast.promise(verificationPromise, {
        loading: "Verifying your Khalti payment... Please wait.",
        success: "Payment verified! Your wallet has been updated.",
        error:
          "Payment verification failed. If money was deducted, contact support.",
      });
    } else if (refId) {
      const verificationPromise = verifyEsewa.mutateAsync(refId).finally(() => {
        searchParams.delete("refId");
        setSearchParams(searchParams, { replace: true });
      });

      toast.promise(verificationPromise, {
        loading: "Verifying your eSewa payment... Please wait.",
        success: "Payment verified! Your wallet has been updated.",
        error:
          "Payment verification failed. If money was deducted, contact support.",
      });
    }
  }, [pidx, refId]);

  const currentPlan = SUBSCRIPTION_PLANS.find((p) => p.tier === effectiveTier);
  const currentTokenRateRs = currentPlan?.tokenDiscountPriceRs ?? 45;
  const totalCost = selectedPackage * currentTokenRateRs;

  const handleTopUp = () => {
    if (paymentGateway === "KHALTI") {
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
    } else {
      toast.promise(
        initiateEsewa
          .mutateAsync({
            amount: totalCost,
            purchaseType: "TOKEN_TOP_UP",
          })
          .then((res) => {
            if (res) {
              submitEsewaForm(res);
            }
          }),
        {
          loading: "Connecting to eSewa...",
          error: "Failed to connect to eSewa. Please try again.",
        },
      );
    }
  };

  const handleSubscriptionUpgrade = (plan: ISubscriptionPlan) => {
    const purchaseType: PurchaseType =
      plan.tier === "PRO"
        ? "SUBSCRIPTION_PRO"
        : plan.tier === "BUSINESS"
          ? "SUBSCRIPTION_BUSINESS"
          : "TOKEN_TOP_UP";

    if (purchaseType === "TOKEN_TOP_UP") return;

    if (paymentGateway === "KHALTI") {
      toast.promise(
        initiatePayment
          .mutateAsync({
            creditsRequested: 0,
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
    } else {
      // TS FIX: Intersecting the type safely avoids the 'any' error
      // while telling TS that priceRs might exist on this object.
      const planCost =
        (plan as ISubscriptionPlan & { priceRs?: number }).priceRs || 0;

      toast.promise(
        initiateEsewa
          .mutateAsync({
            amount: planCost,
            purchaseType,
          })
          .then((res) => {
            if (res) {
              submitEsewaForm(res);
            }
          }),
        {
          loading: `Connecting to eSewa for ${plan.name}...`,
          error: "Failed to connect to eSewa. Please try again.",
        },
      );
    }
  };

  const currentBalance = creditsData?.balance || 0;

  // Disable interactions if ANY payment workflow is processing
  const isAnyLoading =
    initiatePayment.isPending ||
    verifyPayment.isPending ||
    initiateEsewa.isPending ||
    verifyEsewa.isPending;

  const features = [
    {
      icon: <LuEye size={16} className="text-primary" />,
      title: "Browse Free",
      desc: "View all requests",
    },
    {
      icon: <LuZap size={16} className="text-accent" />,
      title: "1 Credit to Bid",
      desc: "Unlock location",
    },
    {
      icon: <LuPhone size={16} className="text-primary" />,
      title: "Get Contact",
      desc: "On bid acceptance",
    },
  ];

  return (
    <div className="p-4 lg:p-8 space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-text-dark tracking-tight">
            Wallet & Billing
          </h1>
          <p className="text-sm text-muted mt-1">
            Manage your lead tokens and upgrade your visibility.
          </p>
        </div>
      </div>

      {/* Top-Up & Balance */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5 bg-card-bg rounded-2xl border border-light-gray shadow-[0_2px_16px_rgba(25,53,87,0.06)] overflow-hidden">
          {/* Balance Header */}
          <div className="bg-primary p-6 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
            <div className="relative z-10">
              <p className="text-xs font-semibold uppercase tracking-widest text-white/60 mb-2">
                Available Credits
              </p>
              {isCreditsLoading ? (
                <SeSpinner />
              ) : (
                <div className="flex items-baseline gap-3">
                  <span className="text-5xl font-bold tracking-tight">
                    {currentBalance}
                  </span>
                  <span className="text-sm font-medium text-white/70">
                    {currentBalance === 1 ? "Lead" : "Leads"}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Credit Amount Selection */}
            <div>
              <label className="block text-sm font-semibold text-text-dark mb-1">
                Buy More Credits
              </label>
              <p className="text-xs text-muted mb-3">
                Rate:{" "}
                <span className="font-bold text-primary">
                  Rs {currentTokenRateRs}
                </span>{" "}
                per credit
              </p>
              <div className="grid grid-cols-4 gap-2">
                {TOKEN_PACKAGES.map((amount) => (
                  <button
                    key={amount}
                    onClick={() => setSelectedPackage(amount)}
                    className={`py-2.5 rounded-xl text-sm font-bold border-2 transition-all duration-200 ${
                      selectedPackage === amount
                        ? "border-primary bg-primary text-white shadow-md"
                        : "border-light-gray text-muted hover:border-primary hover:text-primary hover:bg-card-label"
                    }`}
                  >
                    +{amount}
                  </button>
                ))}
              </div>
            </div>

            {/* Payment Gateway Selection */}
            <div>
              <label className="block text-sm font-semibold text-text-dark mb-3">
                Select Payment Method
              </label>
              <div className="grid grid-cols-2 gap-3">
                {/* Khalti Option */}
                <button
                  onClick={() => setPaymentGateway("KHALTI")}
                  className={`flex items-center justify-center p-3 rounded-xl border-2 transition-all duration-200 ${
                    paymentGateway === "KHALTI"
                      ? "border-purple-600 bg-purple-50"
                      : "border-light-gray hover:border-purple-300 hover:bg-purple-50/50"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-purple-600 rounded flex items-center justify-center text-white text-xs font-bold">
                      K
                    </div>
                    <span
                      className={`text-sm font-bold ${paymentGateway === "KHALTI" ? "text-purple-700" : "text-muted"}`}
                    >
                      Khalti
                    </span>
                  </div>
                </button>

                {/* eSewa Option */}
                <button
                  onClick={() => setPaymentGateway("ESEWA")}
                  className={`flex items-center justify-center p-3 rounded-xl border-2 transition-all duration-200 ${
                    paymentGateway === "ESEWA"
                      ? "border-green-600 bg-green-50"
                      : "border-light-gray hover:border-green-300 hover:bg-green-50/50"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-green-600 rounded flex items-center justify-center text-white text-xs font-bold">
                      e
                    </div>
                    <span
                      className={`text-sm font-bold ${paymentGateway === "ESEWA" ? "text-green-700" : "text-muted"}`}
                    >
                      eSewa
                    </span>
                  </div>
                </button>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={handleTopUp}
              disabled={isAnyLoading}
              className={`w-full py-3.5 rounded-xl text-white font-bold text-sm flex items-center justify-center gap-2 transition-all duration-200 shadow-md hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 ${
                paymentGateway === "KHALTI"
                  ? "bg-purple-600 hover:bg-purple-700 shadow-purple-600/30"
                  : "bg-green-600 hover:bg-green-700 shadow-green-600/30"
              }`}
            >
              <LuLock size={16} strokeWidth={2.5} />
              {isAnyLoading
                ? `Connecting to ${paymentGateway}...`
                : `Pay Rs ${totalCost} with ${paymentGateway}`}
            </button>
          </div>
        </div>

        {/* How It Works Card */}
        <div className="lg:col-span-7 bg-card-bg rounded-2xl border border-light-gray shadow-[0_2px_16px_rgba(25,53,87,0.06)] overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full -translate-y-1/3 translate-x-1/4 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/5 rounded-full translate-y-1/3 -translate-x-1/4 blur-3xl" />

          <div className="relative z-10 p-8 h-full flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 bg-card-label px-3 py-1.5 rounded-lg w-fit mb-4">
              <LuShieldCheck size={14} className="text-accent" />
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                How it works
              </span>
            </div>

            <h2 className="text-2xl font-bold text-text-dark mb-3 leading-tight">
              Invest in warm leads,
              <br />
              not cold clicks.
            </h2>
            <p className="text-muted leading-relaxed max-w-lg mb-6 text-sm">
              Browsing job requests in your area is completely free. You only
              spend a credit when you are ready to bid on a job and unlock the
              customer's exact location. Once they accept your bid, their phone
              number is revealed.
            </p>

            <div className="grid grid-cols-3 gap-4">
              {features.map((f, i) => (
                <div
                  key={i}
                  className="bg-light rounded-xl p-4 border border-light-gray"
                >
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center mb-2 ${i === 1 ? "bg-accent/10" : "bg-primary/10"}`}
                  >
                    {f.icon}
                  </div>
                  <p className="text-xs font-bold text-text-dark">{f.title}</p>
                  <p className="text-small text-muted mt-0.5">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Subscriptions */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <h2 className="text-xl font-bold text-text-dark">
              Subscription Plans
            </h2>
            <p className="text-xs text-muted mt-0.5">
              Upgrade for better rates and more visibility.
            </p>
            <p className="text-xs text-primary mt-1 font-medium italic">
              * Payments will be processed using your currently selected method
              ({paymentGateway}).
            </p>
          </div>
          <div className="flex items-center gap-2 bg-card-bg px-3 py-1.5 rounded-lg border border-light-gray w-fit">
            <span className="text-xs font-semibold text-muted">Current:</span>
            <span className="text-xs font-bold text-primary bg-card-label px-2 py-0.5 rounded">
              {effectiveTier || "FREE"}
            </span>
          </div>
        </div>

        <SubscriptionGrid
          plans={SUBSCRIPTION_PLANS}
          activeTier={effectiveTier}
          onUpgrade={handleSubscriptionUpgrade}
        />
      </div>
    </div>
  );
};

export default BillingPage;
