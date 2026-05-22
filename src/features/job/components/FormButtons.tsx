import SeButton from "@/components/button/SeButton";

const FormButtons = () => {
  return (
    <div className="flex items-center mt-30">
      <SeButton variant="tertiary" btnText="Previous" className="flex-1" />
      <SeButton variant="accentLight" btnText="Continue" className="flex-1" />
    </div>
  );
};

export default FormButtons;
