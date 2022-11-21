import React from "react";

interface Props {
  value: any;
  label: string;
}

export const DefaultReadOnlyTextField: React.FC<Props> = ({ value, label }) => {
  return (
    <div>
      <label>{label}</label>
      <div>
        <input type="text" readOnly value={value} />
      </div>
    </div>
  );
};
