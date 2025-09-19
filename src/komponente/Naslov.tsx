import React from "react";
import "../css/Naslov.css";

interface NaslovProps {
  title: string;
  subtitle?: string;
}

const Naslov: React.FC<NaslovProps> = ({ title, subtitle }) => {
  return (
    <div className="naslov-container">
      <h1>{title}</h1>
      {subtitle && <p>{subtitle}</p>}
    </div>
  );
};

export default Naslov;
