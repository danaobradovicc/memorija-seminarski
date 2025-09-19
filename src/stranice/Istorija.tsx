import React, { useState, useMemo } from "react";
import { ResultsStore, WinnerFilter, Result } from "../klase/ResultsStore"; 
import Paginacija from "../komponente/Paginacija";
import Dugme from "../komponente/Dugme";
import "../css/Istorija.css";

const store = new ResultsStore();

const Istorija: React.FC = () => {
  const [page, setPage] = useState(1);
  const [winner, setWinner] = useState<WinnerFilter>("svi");
  const [minTries, setMinTries] = useState<number | undefined>();
  const [maxTries, setMaxTries] = useState<number | undefined>();
  const [refresh, setRefresh] = useState(0); // trigger za rerender

  // filtrirani rezultati
  const filtered = useMemo(() => {
    return store.filter({ winner, minTries, maxTries });
  }, [winner, minTries, maxTries, refresh]);

  // paginacija
  const { data, pages } = store.paginate(filtered, page, 5);

  return (
    <div className="rezultati-background">
      <div className="rezultati-content">
      <div style={{ position: "absolute", top: "40px", left: "40px" }}>
        <Dugme text="← Idi nazad" to="/" />
      </div>
        <h1>📜 Istorija igara</h1>

        {/* Filteri */}
        <div className="istorija-filters" style={{ marginBottom: "20px" }}>
          <label> 
            Pobednik:
            <select value={winner} onChange={e => setWinner(e.target.value as WinnerFilter)}>
              <option value="svi">Svi</option>
              <option value="igrac1">Igrač 1</option>
              <option value="igrac2">Igrač 2</option>
              <option value="nereseno">Nerešeno</option>
            </select>
          </label>
          <label>
            Min pokušaja:
            <input 
              type="number" 
              value={minTries ?? ""} 
              onChange={e => setMinTries(e.target.value ? Number(e.target.value) : undefined)} 
            />
          </label>
          <label>
            Max pokušaja:
            <input 
              type="number" 
              value={maxTries ?? ""} 
              onChange={e => setMaxTries(e.target.value ? Number(e.target.value) : undefined)} 
            />
          </label>
          <Dugme 
            text="Resetuj filtere" 
            onClick={() => { 
              setWinner("svi"); 
              setMinTries(undefined); 
              setMaxTries(undefined); 
            }} 
          />
        </div>

        {/* Tabela rezultata */}
        <table border={1} cellPadding={8} style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>#</th>
              <th>Igrač 1</th>
              <th>Igrač 2</th>
              <th>Pokušaji</th>
              <th>Pobednik</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 && (
              <tr>
                <td colSpan={5} style={{ textAlign: "center" }}>Nema rezultata</td>
              </tr>
            )}
            {data.map((r: Result, i: number) => (
              <tr key={i}>
                <td>{(page - 1) * 5 + i + 1}</td>
                <td>{r.player1}</td>
                <td>{r.player2}</td>
                <td>{r.tries}</td>
                <td>
                  {r.player1 > r.player2 ? "Igrač 1" : r.player2 > r.player1 ? "Igrač 2" : "Nerešeno"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Paginacija page={page} pages={pages} onChange={setPage} />

        <div style={{ marginTop: 20 }}>
          <Dugme 
            text="Obriši sve rezultate" 
            onClick={() => { 
              store.clear(); 
              setPage(1); 
              setRefresh(x => x + 1); // forsira rerender
            }} 
          />
        </div>
      </div>
    </div>
  );
};

export default Istorija;
