import React from "react";
import { useNavigate } from "react-router-dom";
import Dugme from "../komponente/Dugme"; 
import "../css/Rezultati.css";
import Naslov from '../komponente/Naslov';
import Kontejner from "../komponente/Kontejner";

const Rezultati: React.FC = () => {
  const navigate = useNavigate(); 

  const allResults = JSON.parse(localStorage.getItem("allResults") || "[]");
  const lastResult = allResults[allResults.length - 1];
  let content;

  if (lastResult) {
    let winner = "";
    if (lastResult.player1 > lastResult.player2) {
      winner = "Pobednik: Igrač 1 🎉";
    } else if (lastResult.player2 > lastResult.player1) {
      winner = "Pobednik: Igrač 2 🎉";
    } else {
      winner = "Rezultat: Nerešeno 🤝";
    }

    content = (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
        <p><strong>Broj pokušaja:</strong> {lastResult.tries}</p>
        <p><strong>Igrač 1 - parovi:</strong> {lastResult.player1}</p>
        <p><strong>Igrač 2 - parovi:</strong> {lastResult.player2}</p>
        <h2>{winner}</h2>
      </div>
    );

  } else {
    content = <p>Nema rezultata.</p>;
  }

return (
  <div className="rezultati-background">
    <div style={{ position: "absolute", top: "40px", left: "40px" }}>
        <Dugme text="← Idi nazad" to="/" />
    </div>
    <Naslov title="Rezultati poslednje partije!" />

    <Kontejner>
      <div className="rezultati-content">{content}</div>

      <div style={{ marginTop: "20px", display: "flex", justifyContent: "center", gap: "20px" }}>
        <Dugme text="Nova igra" to="/igra" />
      </div>
    </Kontejner>
  </div>
);

};

export default Rezultati;
