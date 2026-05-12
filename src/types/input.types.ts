export interface IInput {
  type?: "text" | "password" | "email";
  label: string;
  name: string;
  Icon: React.ElementType;
  placeholderText: string;
}
