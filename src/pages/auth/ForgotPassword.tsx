import { useState } from "react";
import { Link } from "react-router-dom";
import { LuMail, LuArrowLeft, LuLock } from "react-icons/lu";
import { toast } from "sonner";
import SeSpinner from "@/components/spinner/SeSpinner"; // Adjust path if necessary

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendResetEmail = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      return toast.error("Please enter your email address");
    }

    setIsLoading(true);
    try {
      // TODO: Replace with your actual API call to send the reset email
      // await sendPasswordResetEmail(email);

      // Simulating network delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success("If an account exists, a reset link has been sent!");
      setEmail(""); // Clear the input after success
    } catch (error) {
      toast.error("Failed to send reset email. Please try again.");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const inputClass =
    "w-full pl-10 pr-4 py-3 rounded-xl border border-light-gray text-sm text-text-dark outline-none transition-colors bg-white focus:border-accent focus:ring-1 focus:ring-accent/20";

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg p-4">
      <div className="w-full max-w-md bg-card-bg rounded-3xl border border-light-gray shadow-[0_4px_24px_rgba(25,53,87,0.05)] p-8">
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
            <LuLock className="text-primary text-xl" />
          </div>
          <h1 className="text-2xl font-bold text-text-dark mb-2">
            Forgot Password?
          </h1>
          <p className="text-sm text-muted mb-8">
            No worries, we'll send you reset instructions. Please enter the
            email associated with your account.
          </p>

          <form onSubmit={handleSendResetEmail} className="space-y-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted">
                <LuMail size={18} />
              </div>
              <input
                type="email"
                required
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClass}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-xl bg-accent hover:bg-accent/90 text-white font-bold text-sm flex items-center justify-center transition-all shadow-sm disabled:opacity-70"
            >
              {isLoading ? (
                <SeSpinner className="w-5 h-5 border-white" />
              ) : (
                "Send Reset Link"
              )}
            </button>
          </form>

          <Link
            to="/login"
            className="mt-8 flex items-center justify-center gap-2 text-sm font-medium text-muted hover:text-primary transition-colors"
          >
            <LuArrowLeft size={16} />
            Back to log in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
