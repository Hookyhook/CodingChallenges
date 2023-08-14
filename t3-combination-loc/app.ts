const input: string = "4 1234 2546";

const sanitazedInput: string[] = sanitazeInput(input);

const priorCombination: string[] = [...sanitazedInput[1]];
const nextCombination: string[] = [...sanitazedInput[2]];

console.log(generateOutput(priorCombination, nextCombination));

function sanitazeInput(input: string): string[] {
  return input.split(" ");
}

function getCount(start: number, end: number): number {
  const leftRound: number = Math.abs(start - end);
  const rightRound: number = Math.abs(10 - leftRound);
  return Math.min(leftRound, rightRound);
}

function generateOutput(current: string[], next: string[]): number {
  return current.reduce((acc, value, index) => {
    const currentValue = parseInt(value); // Parse the value into a number
    const nextValue = parseInt(next[index]); // Parse the next value into a number
    return (acc += getCount(currentValue, nextValue));
  }, 0);
}
