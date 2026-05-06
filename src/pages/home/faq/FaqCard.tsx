import { IoIosArrowUp } from "react-icons/io";

export type FaqTypes = {
  id: number;
  question: string;
  answer: string;
  setActive: (id: number) => void;
  isActive: boolean;
};

const FaqCard = ({ id, question, answer, isActive, setActive }: FaqTypes) => {
  return (
    <div className="bg-card-bg rounded-xl border border-muted/20 px-6">
      <div
        onClick={() => setActive(id)}
        className="flex items-center justify-between pt-3 cursor-pointer"
      >
        <h4 className="font-semibold text-sm leading-5 cursor-pointer">
          {question}
        </h4>
        <IoIosArrowUp
          className={`transition duration-300 ${isActive ? "rotate-0" : "rotate-180"}`}
        />
      </div>

      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out pb-3 ${isActive ? "max-h-125 opacity-100" : "max-h-0 opacity-0 pointer-events-none"}`}
      >
        <div
          className={`transform transition-transform duration-500 ease-in-out ${isActive ? "translate-y-0" : "-translate-y-2"}`}
        >
          <p className={`text-sm text-muted leading-5 mt-3`}>{answer}</p>
        </div>
      </div>
    </div>
  );
};

export default FaqCard;
