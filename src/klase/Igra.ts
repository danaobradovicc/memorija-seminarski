export interface Result {
  player1: number;
  player2: number;
  tries: number;
}

export interface InterfejsIgra {
  addPoint(player: 1 | 2): void;
  incrementTries(): void;
  getResult(): Result;
  getWinner(): string;
}

export class Game implements InterfejsIgra {
  private player1Score: number;
  private player2Score: number;
  private tries: number;

  constructor() {
    this.player1Score = 0;
    this.player2Score = 0;
    this.tries = 0;
  }

  addPoint(player: 1 | 2) {
    if (player === 1) this.player1Score += 1;
    else this.player2Score += 1;
  }

  incrementTries() {
    this.tries += 1;
  }

  getResult(): Result {
    return {
      player1: this.player1Score,
      player2: this.player2Score,
      tries: this.tries,
    };
  }

  getWinner(): string {
    if (this.player1Score > this.player2Score) return "Igrač 1 🎉";
    if (this.player2Score > this.player1Score) return "Igrač 2 🎉";
    return "Nerešeno 🤝";
  }
}
