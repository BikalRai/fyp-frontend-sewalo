import SeButton from "@/components/button/SeButton";
import { useState } from "react";
import {
  IoLocationOutline,
  IoTimeOutline,
  IoCashOutline,
  IoArrowBack,
  IoPersonCircleOutline,
  IoLockClosedOutline,
  IoCallOutline,
  IoCheckmarkCircleOutline,
} from "react-icons/io5";
import { useNavigate } from "react-router-dom";

type BidState = "locked" | "unlocked" | "bidding" | "submitted";

const lead = {
  id: "lead-1",
  title: "Full house plumbing inspection",
  description:
    "I recently bought an older house and need a certified plumber to do a complete walkthrough. I've noticed a slight drop in water pressure in the upstairs bathroom, and the kitchen sink drains slowly. Looking for a full assessment and a quote for any necessary repairs.",
  category: "Plumbing",
  generalLocation: "New Baneshwor (1.2 km away)",
  exactAddress: "House 14, Rose Street, Block B, New Baneshwor",
  maskedPhone: "+977 98X-XXXX-XXX",
  phoneNumber: "+977 9841234567",
  urgency: "Today",
  budget: "Rs. 2,000 - 5,000",
  postedAt: "5 mins ago",
  currentBids: 2,
  maxBids: 3,
  customerName: "Sanjay Thapa",
};

const JobLeadDetailsPage = () => {
  const navigate = useNavigate();
  const [bidState, setBidState] = useState<BidState>("locked");
  const [quote, setQuote] = useState("");
  const [message, setMessage] = useState("");

  const isFormValid = quote.trim().length > 0 && message.trim().length >= 10;

  const handleUnlock = () => {
    setBidState("unlocked");
  };

  const handleSubmitQuote = () => {
    setBidState("submitted");
  };

  return (
    <div className="max-w-5xl mx-auto pt-8 pb-12 px-4">
      <button
        className="flex items-center gap-2 text-muted hover:text-primary transition-colors text-sm font-medium mb-8 group cursor-pointer"
        onClick={() => navigate(-1)}
      >
        <IoArrowBack
          size={20}
          className="group-hover:-translate-x-1 transition-transform shrink-0"
        />
        <span>Back to Lead Feed</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card-bg border border-light-gray rounded-2xl p-8 shadow-sm">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-xs font-bold tracking-wider uppercase text-primary bg-card-label px-3 py-1 rounded-full">
                {lead.category}
              </span>
              <span className="text-sm text-muted font-medium">
                Posted {lead.postedAt}
              </span>
            </div>

            <h1 className="text-3xl font-bold text-primary mb-8 leading-tight">
              {lead.title}
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-6 border-y border-light-gray mb-8">
              <div className="flex flex-col gap-1">
                <span className="text-xs font-bold text-muted uppercase tracking-wider">
                  Location
                </span>
                <div className="flex items-center gap-2 text-text-dark font-medium">
                  <IoLocationOutline className="text-primary text-lg shrink-0" />
                  {/* Fixed: was referencing isUnlocked, now uses bidState */}
                  <span>
                    {bidState !== "locked"
                      ? lead.exactAddress
                      : lead.generalLocation}
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs font-bold text-muted uppercase tracking-wider">
                  Timeline
                </span>
                <div className="flex items-center gap-2 text-text-dark font-medium">
                  <IoTimeOutline className="text-primary text-lg shrink-0" />
                  {lead.urgency}
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs font-bold text-muted uppercase tracking-wider">
                  Budget
                </span>
                <div className="flex items-center gap-2 text-text-dark font-medium">
                  <IoCashOutline className="text-primary text-lg shrink-0" />
                  {lead.budget}
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-primary mb-3">
                Job Description
              </h3>
              <p className="text-text-dark leading-relaxed">
                {lead.description}
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-card-bg border border-light-gray rounded-2xl p-6 shadow-sm sticky top-24">
            {/* Scarcity bar — always visible */}
            <div className="mb-6">
              <div className="flex justify-between items-end mb-2">
                <h3 className="text-lg font-bold text-primary">Bid Status</h3>
                <span className="text-sm font-bold text-soft-danger">
                  {bidState === "submitted"
                    ? `${lead.maxBids} / ${lead.maxBids}`
                    : `${lead.currentBids} / ${lead.maxBids}`}{" "}
                  Filled
                </span>
              </div>
              <div className="w-full bg-light-gray h-2.5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-accent transition-all duration-500 ease-in-out"
                  style={{
                    width:
                      bidState === "submitted"
                        ? "100%"
                        : `${(lead.currentBids / lead.maxBids) * 100}%`,
                  }}
                />
              </div>
              <p className="text-xs text-muted mt-3">
                {bidState === "submitted"
                  ? "You've submitted a quote."
                  : bidState === "bidding"
                    ? `You're filling spot ${lead.currentBids + 1} of ${lead.maxBids}.`
                    : `Only ${lead.maxBids - lead.currentBids} spot(s) remaining.`}
              </p>
            </div>

            {/* State: locked */}
            {bidState === "locked" && (
              <>
                <SeButton
                  btnText="Unlock Lead (1 Token)"
                  variant="outline"
                  clickFunc={handleUnlock}
                  icon={<IoLockClosedOutline className="text-lg" />}
                  iconPosition="left"
                  className="w-full justify-center py-3.5 rounded-xl text-[15px] font-semibold"
                />
                <p className="text-xs text-muted text-center mt-3">
                  Reveals contact details and lets you place a bid.
                </p>
              </>
            )}

            {/* State: unlocked */}
            {bidState === "unlocked" && (
              <SeButton
                btnText="Place Bid"
                variant="accentLight"
                clickFunc={() => setBidState("bidding")}
                className="w-full justify-center py-3.5 rounded-xl text-[15px] font-semibold"
              />
            )}

            {/* State: bidding */}
            {bidState === "bidding" && (
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-muted uppercase tracking-wider">
                    Your Quote
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted pointer-events-none">
                      Rs.
                    </span>
                    <input
                      type="number"
                      value={quote}
                      onChange={(e) => setQuote(e.target.value)}
                      placeholder="2500"
                      className="w-full h-10.5 pl-9 pr-3 rounded-lg border border-light-gray bg-card-bg text-text-dark text-sm focus:border-accent focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-muted uppercase tracking-wider">
                    Your Message
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Briefly introduce yourself and why you're the right fit for this job..."
                    maxLength={300}
                    rows={4}
                    className="w-full p-3 rounded-lg border border-light-gray bg-card-bg text-text-dark text-sm focus:border-accent focus:outline-none resize-none"
                  />
                  <span className="text-xs text-muted text-right">
                    {300 - message.length} characters left
                  </span>
                </div>

                <SeButton
                  btnText="Submit Quote"
                  variant="accentLight"
                  clickFunc={handleSubmitQuote}
                  disabled={!isFormValid}
                  className="w-full justify-center py-3.5 rounded-xl text-[15px] font-semibold"
                />
              </div>
            )}

            {/* State: submitted */}
            {bidState === "submitted" && (
              <div className="flex flex-col items-center text-center gap-2">
                <div className="w-11 h-11 rounded-full bg-green-100 flex items-center justify-center mb-1">
                  <IoCheckmarkCircleOutline className="text-green-600 text-2xl" />
                </div>
                <p className="text-base font-bold text-primary">Quote sent</p>
                <p className="text-sm text-muted leading-relaxed">
                  {lead.customerName} will be notified. You'll hear back if
                  they're interested.
                </p>
                <div className="w-full bg-light-gray/50 rounded-xl p-4 mt-2 text-sm text-left flex flex-col gap-2">
                  <div className="flex justify-between">
                    <span className="text-muted">Your quote</span>
                    <span className="font-bold text-primary">Rs. {quote}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted">Spot</span>
                    <span className="font-bold text-primary">
                      {lead.currentBids + 1} of {lead.maxBids}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Contact — visible in all states except locked */}
            {bidState !== "locked" && (
              <div className="mt-6 pt-6 border-t border-light-gray">
                <div className="flex items-center gap-3 mb-4">
                  <IoPersonCircleOutline className="text-4xl text-muted/50 shrink-0" />
                  <div>
                    <p className="text-xs text-muted font-medium uppercase tracking-wider">
                      Posted By
                    </p>
                    <p className="text-sm font-bold text-text-dark">
                      {lead.customerName}
                    </p>
                  </div>
                </div>
                <div className="bg-light p-4 rounded-xl border border-light-gray/50">
                  <p className="text-xs font-bold text-muted uppercase tracking-wider mb-2">
                    Contact Number
                  </p>

                  <a
                    href={`tel:${lead.phoneNumber}`}
                    className="flex items-center gap-2 text-primary font-bold hover:text-accent transition-colors text-lg"
                  >
                    <IoCallOutline />
                    {lead.phoneNumber}
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobLeadDetailsPage;
