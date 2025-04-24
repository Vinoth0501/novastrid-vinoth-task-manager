import React from "react";
type Props = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPress?: () => void;
  placeholder?: string;
};

const Input = React.memo(
  ({ value, onChange, onKeyPress, placeholder }: Props) => (
    <input
      type="text"
      className="form-control"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyPress}
    />
  )
);

export default Input;
