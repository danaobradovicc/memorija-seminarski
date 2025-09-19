export interface Result {
  player1: number;
  player2: number;
  tries: number;
}

export type WinnerFilter = "svi" | "igrac1" | "igrac2" | "nereseno";

export interface IResultsStore {
  getAll(): Result[];
  add(result: Result): void;
  clear(): void;
  filter(opts: { winner?: WinnerFilter; minTries?: number; maxTries?: number }): Result[];
  paginate<T>(items: T[], page: number, perPage: number): { data: T[]; total: number; pages: number };
}

const KEY = "allResults";

export class ResultsStore implements IResultsStore {
  getAll(): Result[] {
    try {
      return JSON.parse(localStorage.getItem(KEY) || "[]");
    } catch {
      return [];
    }
  }

  add(result: Result): void {
    const all = this.getAll();
    all.push(result);
    localStorage.setItem(KEY, JSON.stringify(all));
  }

  clear(): void {
    localStorage.setItem(KEY, JSON.stringify([]));
  }

  private winnerOf(r: Result): WinnerFilter {
    if (r.player1 > r.player2) return "igrac1";
    if (r.player2 > r.player1) return "igrac2";
    return "nereseno";
  }

  filter(opts: { winner?: WinnerFilter; minTries?: number; maxTries?: number }): Result[] {
    const { winner = "svi", minTries, maxTries } = opts;
    return this.getAll().filter(r => {
      const byWinner = winner === "svi" ? true : this.winnerOf(r) === winner;
      const byMin = typeof minTries === "number" ? r.tries >= minTries : true;
      const byMax = typeof maxTries === "number" ? r.tries <= maxTries : true;
      return byWinner && byMin && byMax;
    });
  }

  paginate<T>(items: T[], page: number, perPage: number) {
    const total = items.length;
    const pages = Math.max(1, Math.ceil(total / perPage));
    const safePage = Math.min(Math.max(1, page), pages);
    const start = (safePage - 1) * perPage;
    const data = items.slice(start, start + perPage);
    return { data, total, pages };
  }
}
