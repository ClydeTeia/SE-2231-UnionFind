import readline from 'readline-sync';
import { WeightedQuickUnion } from './weightedQuickUnionUF';

let N = readline.questionInt('input initial number of elements: ');
let uf = new WeightedQuickUnion(N);
let input = readline.question("input two numbers you'd like to connect: ");

while (input !== '') {
  let p = parseInt(input.split(' ')[0]);
  let q = parseInt(input.split(' ')[1]);

  if (!uf.connected(p, q)) {
    uf.union(p, q);
    console.log(`${p} and ${q} are connected!`);
  }

  console.log(uf.ids);
  console.log(uf.sz);

  input = readline.question();
}
