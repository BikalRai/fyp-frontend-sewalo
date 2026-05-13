import type { UseFormRegisterReturn } from "react-hook-form";

export interface IInput {
  type?: "text" | "password" | "email";
  label?: string;
  name: string;
  Icon: React.ElementType;
  placeholderText?: string;
  registration?: UseFormRegisterReturn;
  error?: string;
}
