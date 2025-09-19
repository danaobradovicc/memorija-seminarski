import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/Dugme.css";

interface DugmeProps {
  text: string;        
  onClick?: () => void; 
  to?: string;        
  type?: "button" | "submit" | "reset";
}

const Dugme: React.FC<DugmeProps> = ({ text, onClick, to, type = "button" }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (to) {
      navigate(to);
    } else if (onClick) {
      onClick(); 
    }
  };

  return (
    <button className="custom-dugme" type={type} onClick={handleClick}>
      {text}
    </button>
  );
};

export default Dugme;
