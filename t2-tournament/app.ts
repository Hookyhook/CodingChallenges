const playerCount: number = 16;

let matchNumber: number = 0;

calculateMatchNumber(playerCount);

console.log(matchNumber);

function calculateMatchNumber(input: number): void {
  if (input <= 1) {
    return;
  } else {
    matchNumber += Math.floor(input / 2);
    if (input % 2 === 1) {
      input = input / 2 + 1;
    } else {
      input = input / 2;
    }
    calculateMatchNumber(input);
  }
}
