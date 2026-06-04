import SeInput from "@/components/input/SeInput";
import ProviderUploadImage from "./ProviderUploadImage";
import { Select } from "@mantine/core";
import { Controller, useFormContext } from "react-hook-form";
const PersonalDetails = () => {
  const { register, control } = useFormContext();
  return (
    <div className="flex flex-col gap-7">
      <ProviderUploadImage />
      <SeInput
        name="phone"
        label="Phone number"
        placeholderText="+977 98XXXXXXXX"
        registration={register("phoneNumber")}
      />

      <Controller
        name="gender"
        control={control}
        render={({ field }) => (
          <Select
            {...field} // This automatically injects value, onChange, onBlur, and ref
            label="Gender"
            placeholder="Select gender"
            data={[
              { value: "male", label: "Male" },
              { value: "female", label: "Female" },
              { value: "other", label: "Other" },
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
        )}
      />
    </div>
  );
};

export default PersonalDetails;
