import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom"; 
import "../css/Igra.css";
import Dugme from "../komponente/Dugme";
import { Game } from "../klase/Igra"; 

type Card = {
  id: number;
  image: string;
  uniqueId: number;
  matched?: boolean;
};

export default function Igra() {
  const gameRef = useRef<Game>(new Game()); 
  const game = gameRef.current;
  const navigate = useNavigate();
  const [cards, setCards] = useState<Card[]>([]);
  const [firstCard, setFirstCard] = useState<Card | null>(null);
  const [secondCard, setSecondCard] = useState<Card | null>(null);
  const [lockBoard, setLockBoard] = useState(false);
  const [playerTurn, setPlayerTurn] = useState<1 | 2>(1);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [totalPairs, setTotalPairs] = useState(0);

  const cardImages = [
    { id: 1, image: "/img/apple.png" },
    { id: 2, image: "/img/cherry.png" },
    { id: 3, image: "/img/blueberry.png" },
    { id: 4, image: "/img/lemon.png" },
    { id: 5, image: "/img/strawberry.png" },
    { id: 6, image: "/img/plum.png" },
  ];

  useEffect(() => {
    let uniqueId = 0;
    const duplicated: Card[] = [...cardImages, ...cardImages].map(c => ({
      ...c,
      uniqueId: uniqueId++,
      matched: false
    }));
    setCards(shuffleArray(duplicated));
    setTotalPairs(cardImages.length);
  }, []);

  const shuffleArray = (array: Card[]) => array.sort(() => 0.5 - Math.random());

  const handleChoice = (card: Card) => {
    if (lockBoard || card.matched) return;
    if (firstCard && firstCard.uniqueId === card.uniqueId) return;

    if (!firstCard) {
      setFirstCard(card);
    } else if (!secondCard) {
      setSecondCard(card);
      game.incrementTries(); 
      setLockBoard(true);
    }
  };

  useEffect(() => {
    if (firstCard && secondCard) {
      if (firstCard.id === secondCard.id) {
        setCards(prev =>
          prev.map(c =>
            c.id === firstCard.id &&
            (c.uniqueId === firstCard.uniqueId || c.uniqueId === secondCard.uniqueId)
              ? { ...c, matched: true }
              : c
          )
        );
        game.addPoint(playerTurn); 
        setMatchedPairs(p => p + 1);
        resetBoard();
      } else {
        setTimeout(() => {
          setPlayerTurn(prev => (prev === 1 ? 2 : 1));
          resetBoard();
        }, 1000);
      }
    }
  }, [secondCard]);

  useEffect(() => {
    if (matchedPairs === totalPairs && totalPairs > 0) {
      endGame();
    }
  }, [matchedPairs, totalPairs]);

  const resetBoard = () => {
    setFirstCard(null);
    setSecondCard(null);
    setLockBoard(false);
  };

  const endGame = () => {
    const allResults = JSON.parse(localStorage.getItem("allResults") || "[]");
    allResults.push(game.getResult()); 
    localStorage.setItem("allResults", JSON.stringify(allResults));
    navigate("/rezultati");
  };

  return (
        <div className="background">

    <div className="Igra" style={{ marginTop: "40px" }}>  
      <div style={{ position: "absolute", top: "40px", left: "40px" }}>
        <Dugme text="← Idi nazad" to="/" />
      </div>
      <h1>Igrica Memorije</h1>

      <div className="score-board">
        <h2>Na potezu: Igrač {playerTurn}</h2>
        <p>Igrač 1: {game.getResult().player1}</p>
        <p>Igrač 2: {game.getResult().player2}</p>
      </div>

      <div className="game-board">
        {cards.map((card) => {
          const isFlipped =
            card.matched ||
            card.uniqueId === firstCard?.uniqueId ||
            card.uniqueId === secondCard?.uniqueId;

          return (
            <div
              key={card.uniqueId}
              className={`memory-card ${isFlipped ? "flip" : ""}`}
              onClick={() => handleChoice(card)}
            >
              <img className="front-face" src={card.image} alt="card" />
              <div
                className="back-face"
                style={{
                  background: `url(${process.env.PUBLIC_URL + "/img/memory.png"}) center center / cover no-repeat`
                }}
              ></div>
            </div>
          );
        })}
      </div>
      <div style={{ marginTop: "20px", marginBottom:"40px"}}>
        <Dugme text="Završi partiju" onClick={endGame} />
      </div>
    </div>
    </div>
  );
}
