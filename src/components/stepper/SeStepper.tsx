import { Progress } from "@mantine/core";

type StepperProps = {
  currentStep: number;
  totalSteps: number;
};

const SeStepper = ({ currentStep, totalSteps }: StepperProps) => {
  const progress = (currentStep / totalSteps) * 100;
  return (
    <div>
      <Progress value={progress} size="sm" radius="xl" color="green" />
    </div>
  );
};

export default SeStepper;
