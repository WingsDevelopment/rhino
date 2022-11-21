import React from "react";
import { FieldProps } from ".";

interface TextFieldProps extends FieldProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  value: string;
}

export const TextField: React.FC<TextFieldProps> = ({
  name,
  label,
  value,
  onChange,
  error,
  required,
  placeholder,
}) => {
  return (
    <div>
      <label>{label}</label>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
      />
      {error && <p>{error}</p>}
    </div>
  );
};
