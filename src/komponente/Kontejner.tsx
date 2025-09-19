import React, { ReactNode } from "react";
import "../css/Kontejner.css";

interface KontejnerProps {
  children: ReactNode;
  className?: string; // za dodatni CSS ako treba
}

const Kontejner: React.FC<KontejnerProps> = ({ children, className }) => {
  return <div className={`kontejner ${className || ""}`}>{children}</div>;
};

export default Kontejner;
