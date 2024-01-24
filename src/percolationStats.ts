import { Percolation } from "./percolation";

const CONFIDENCE_95 = 1.96;

export class PercolationStats {
  private experimentsCount: number;
  private fractions: number[];

  constructor(n: number, t: number) {
    if (n <= 0 || t <= 0) {
      throw new Error("Given N <= 0 || T <= 0");
    }
    this.experimentsCount = t;
    this.fractions = [];
    for (let expNum = 0; expNum < this.experimentsCount; expNum++) {
      let pr = new Percolation(n);

      let openedSites = 0;
      while (!pr.percolates()) {
        let i = Math.floor(Math.random() * n) + 1;
        let j = Math.floor(Math.random() * n) + 1;
        if (!pr.isOpen(i, j)) {
          pr.open(i, j);
          openedSites++;
          console.log(pr.opened, "grids");
        }
      }
      let fraction = openedSites / (n * n);
      this.fractions.push(fraction);
    }
  }

  mean(): number {
    return (
      this.fractions.reduce((sum, current) => sum + current, 0) /
      this.fractions.length
    );
  }

  stddev(): number {
    let mean = this.mean();
    let variance =
      this.fractions
        .map((num) => Math.pow(num - mean, 2))
        .reduce((sum, current) => sum + current, 0) / this.fractions.length;
    return Math.sqrt(variance);
  }

  confidenceLo(): number {
    return (
      this.mean() -
      (CONFIDENCE_95 * this.stddev()) / Math.sqrt(this.experimentsCount)
    );
  }

  confidenceHi(): number {
    return (
      this.mean() +
      (CONFIDENCE_95 * this.stddev()) / Math.sqrt(this.experimentsCount)
    );
  }
}
