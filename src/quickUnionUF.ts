export class QuickUnionUF {
  ids: number[];

  constructor(N: number) {
    // this.ids = Array.from(Array(N).keys())
    this.ids = [];

    for (let i = 0; i < N; i++) {
      this.ids.push(i);
    }
  }

  connected(p: number, q: number): boolean {
    return this.ids[p] === this.ids[q];
  }

  root(i: number) {
    while (i !== this.ids[i]) {
      i = this.ids[i];
    }
    return i;
  }

  union(p: number, q: number) {
    const i = this.root(p);
    const j = this.root(q);

    this.ids[i] = j;
  }
}
