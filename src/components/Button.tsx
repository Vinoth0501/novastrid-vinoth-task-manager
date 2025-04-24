import React from "react";

type Props = {
  label: string;
  onClick: () => void;
  variant?: "primary" | "outline";
};

const Button = React.memo(({ label, onClick, variant = "primary" }: Props) => {
  const btnClass =
    variant === "outline" ? "btn btn-outline-primary" : "btn btn-primary";
  return (
    <button onClick={onClick} className={btnClass}>
      {label}
    </button>
  );
});

export default Button;
