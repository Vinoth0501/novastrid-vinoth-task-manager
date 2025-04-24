import React from "react";

type Props = {
  label: string;
  onClick: () => void;
  variant?: "primary" | "outline";
};

const Button = React.memo(({ label, onClick, variant = "primary" }: Props) => {
  const btnClass = variant === "outline" ? "btn" : "btn";
  const style =
    variant === "outline"
      ? { border: "2px solid #202d48", color: "#202d48", fontWeight: "600" }
      : { backgroundColor: "#202d48", color: "white" };
  return (
    <button onClick={onClick} className={btnClass} style={style}>
      {label}
    </button>
  );
});

export default Button;
