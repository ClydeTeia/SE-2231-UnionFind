import { WQUPC } from "./WQUPC";

export class Percolation {
  private size: number;
  private uf: WQUPC;
  private topUF: WQUPC;
  opened: boolean[];

  constructor(N: number) {
    this.size = N;
    this.uf = new WQUPC(N * N + 2);
    this.topUF = new WQUPC(N * N + 2);
    this.opened = Array(N * N).fill(false);
  }

  private xyTo1D(i: number, j: number): number {
    return this.size * (i - 1) + j;
  }

  openRandom(): void {
    let i = Math.floor(Math.random() * this.size + 1);
    let j = Math.floor(Math.random() * this.size + 1);

    if (this.isOpen(i, j)) {
      this.openRandom();
    } else {
      this.open(i, j);
    }
  }

  open(i: number, j: number): void {
    this.opened[this.xyTo1D(i, j)] = true;

    if (i !== 1 && this.isOpen(i - 1, j)) {
      this.uf.union(this.xyTo1D(i, j), this.xyTo1D(i - 1, j));
      this.topUF.union(this.xyTo1D(i, j), this.xyTo1D(i - 1, j));
    }
    if (i !== this.size && this.isOpen(i + 1, j)) {
      this.uf.union(this.xyTo1D(i, j), this.xyTo1D(i + 1, j));
      this.topUF.union(this.xyTo1D(i, j), this.xyTo1D(i + 1, j));
    }
    if (j !== 1 && this.isOpen(i, j - 1)) {
      this.uf.union(this.xyTo1D(i, j), this.xyTo1D(i, j - 1));
      this.topUF.union(this.xyTo1D(i, j), this.xyTo1D(i, j - 1));
    }
    if (j !== this.size && this.isOpen(i, j + 1)) {
      this.uf.union(this.xyTo1D(i, j), this.xyTo1D(i, j + 1));
      this.topUF.union(this.xyTo1D(i, j), this.xyTo1D(i, j + 1));
    }

    if (i === 1) {
      this.uf.union(this.xyTo1D(i, j), 0);
      this.topUF.union(this.xyTo1D(i, j), 0);
    }
    if (i === this.size) {
      this.uf.union(this.xyTo1D(i, j), this.size * this.size + 1);
    }
  }

  isOpen(i: number, j: number): boolean {
    return this.opened[this.xyTo1D(i, j)];
  }

  isFull(i: number, j: number): boolean {
    return this.topUF.connected(this.xyTo1D(i, j), 0);
  }

  percolates(): boolean {
    return this.uf.connected(0, this.size * this.size + 1);
  }
}
