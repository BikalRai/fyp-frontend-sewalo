import { Select } from "@mantine/core";
import { useState } from "react";

const services = [
  "Plumbing",
  "Electrical",
  "Cleaning",
  "Carpentry",
  "Painting",
  "Moving",
  "Tutoring",
  "Beauty",
];

const Services = () => {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const handleToggle = (service: string) => {
    setSelectedServices((prev) => {
      if (prev.includes(service)) {
        return prev.filter((item) => item !== service);
      }

      return [...prev, service];
    });
  };

  return (
    <div className="w-full text-text-dark flex flex-col gap-3">
      <label className="text-sm font-medium leading-3.5">
        <span>Services you offer</span>
      </label>
      <div className="flex items-center flex-wrap gap-2">
        {services.map((service, i) => {
          const isSelected = selectedServices.includes(service);
          return (
            <button
              type="button"
              key={i + 1}
              onClick={() => handleToggle(service)}
              className={`leading-5 max-h-9.5 border flex items-center border-muted/20 rounded-full py-2.5 px-4.5 active:shadow-md ${isSelected ? "bg-primary text-light" : "bg-bg/20"} hover:border-muted transition-colors duration-150 cursor-pointer`}
            >
              {service}
            </button>
          );
        })}
      </div>
      <Select
        label="Years of experience"
        placeholder="Select experience level"
        data={[
          { value: "1-2", label: "1-2 years" },
          { value: "3-5", label: "3-5 years" },
          { value: "5-10", label: "5-10 years" },
          { value: "10+", label: "10+ years" },
        ]}
        radius="md"
        size="md"
        rightSectionPointerEvents="none"
        styles={{
          label: {
            fontSize: "14px",
            fontWeight: 500,
            marginBottom: "6px",
            color: "#1e3a5f",
          },

          input: {
            height: "44px",
            border: "1px solid #d9dee7",
            backgroundColor: "#ffffff",
            color: "#64748b",
            fontSize: "16px",
            paddingLeft: "14px",

            "&:focus": {
              borderColor: "#d9dee7",
            },
          },

          dropdown: {
            border: "1px solid #d9dee7",
            borderRadius: "12px",
          },

          option: {
            fontSize: "15px",
            padding: "10px 14px",
          },
        }}
      />
    </div>
  );
};

export default Services;
