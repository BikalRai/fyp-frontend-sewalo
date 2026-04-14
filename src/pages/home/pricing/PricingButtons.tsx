export interface IPricingProps {
  activeTab: string;
  func: (activeTab: string) => void;
}

const baseClass = `text-sm font-medium leading-4 px-4 py-2 text-muted rounded-full overflow-hidden cursor-pointer`;

const PricingButtons = ({ activeTab, func }: IPricingProps) => {
  return (
    <div className='bg-light/10 text-sm font-medium py-1.5 px-1 flex items-center justify-center h-12 w-65.5 mx-auto rounded-full'>
      <button
        onClick={() => func("monthly")}
        className={`${baseClass} ${activeTab === "monthly" ? "text-text-dark bg-light" : ""}`}
      >
        Monthly
      </button>
      <button
        onClick={() => func("yearly")}
        className={`${baseClass} flex items-center gap-2 ${activeTab === "yearly" ? "text-text-dark bg-light" : ""}`}
      >
        <span>Yearly</span>
        <span className='bg-accent text-light text-small font-bold px-1.5 py-0.5 rounded-full'>
          Save 20%
        </span>
      </button>
    </div>
  );
};

export default PricingButtons;
