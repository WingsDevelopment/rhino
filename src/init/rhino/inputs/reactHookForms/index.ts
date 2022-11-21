import { RegisterOptions } from "react-hook-form";

export interface IOption {
  label: string;
  value: IOptionValue;
}
export type IOptionValue = string | number | undefined;

export interface IFieldProps<T> {
  name: keyof T;
  label: string;
  rules?: RegisterOptions;
}
