import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { LuCreditCard } from "react-icons/lu";
import PricingLabel from "./PricingLabel";
import { FiCheckCircle } from "react-icons/fi";

const labels = [
  { id: 1, icon: FiCheckCircle, name: "Cancel anytime" },
  { id: 2, icon: IoShieldCheckmarkOutline, name: "0% commission on jobs" },
  { id: 3, icon: LuCreditCard, name: "Pay via eSewa & Khalti" },
  { id: 4, icon: FiCheckCircle, name: "No hidden charges" },
];

const PricingLabels = () => {
  return (
    <div className='flex justify-center items-center gap-8 flex-wrap'>
      {labels.map((label) => (
        <PricingLabel key={label.id} Icon={label.icon} name={label.name} />
      ))}
    </div>
  );
};

export default PricingLabels;
