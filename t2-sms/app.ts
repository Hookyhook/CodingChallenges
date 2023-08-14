type KeyPhone = {
  [key: string]: number;
};

const input: string = "welcome to check code";

const sanitazedInput: string[] = sanitazeInput(input);

const output: number = generateOutput(sanitazedInput);

console.log(output);

function sanitazeInput(input: string): string[] {
  return input.split("");
}

function generateOutput(input: string[]): number {
  let count: number = 0;
  input.forEach((char: string) => {
    count += convertCharToButtonCount(char);
  });
  return count;
}

function convertCharToButtonCount(char: string): number {
  const keyPhone: KeyPhone = {
    a: 1,
    b: 2,
    c: 3,
    d: 1,
    e: 2,
    f: 3,
    g: 1,
    h: 2,
    i: 3,
    j: 1,
    k: 2,
    l: 3,
    m: 1,
    n: 2,
    o: 3,
    p: 1,
    q: 2,
    r: 3,
    s: 4,
    t: 1,
    u: 2,
    v: 3,
    w: 1,
    x: 2,
    y: 3,
    z: 4,
    " ": 1,
  };
  return keyPhone[char];
}
