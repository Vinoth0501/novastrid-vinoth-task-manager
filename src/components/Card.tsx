import React from "react";

interface CardProps {
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ children }) => {
  return (
    <div
      className="p-3"
      style={{
        backgroundColor: "#f4f8ff",
        borderRadius: "16px",
        border: "1px solid #dbeafe",
        minWidth: "100px",
      }}
    >
      <div
        className="p-3 bg-white"
        style={{
          border: "1px solid #dbeafe",
          borderRadius: "12px",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Card;
