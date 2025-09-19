import React from "react";
import Dugme from "./Dugme";

interface Props {
  page: number;
  pages: number;
  onChange: (page: number) => void;
}

const Paginacija: React.FC<Props> = ({ page, pages, onChange }) => {
  if (pages <= 1) return null;

  return (
    <div style={{ display: "flex", gap: 12, justifyContent: "center", alignItems: "center", marginTop: 16 }}>
      <Dugme text="«" onClick={() => onChange(1)} />
      <Dugme text="‹" onClick={() => onChange(Math.max(1, page - 1))} />
      <span>Strana {page} / {pages}</span>
      <Dugme text="›" onClick={() => onChange(Math.min(pages, page + 1))} />
      <Dugme text="»" onClick={() => onChange(pages)} />
    </div>
  );
};

export default Paginacija;
