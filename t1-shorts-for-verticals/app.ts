type verticalObject = {
  vertical: string;
  size: string;
};

const input: string = `
XXLSMXSLXXSXXXL
7
Hotel XXL
Energie S
Pauschal XXXL
Reise M
Factory XS
Pferdeversicherung L
Shopping XXS
`;

let sanitazedInput: string[] = sanitazeInput(input);

let sizes: string = sanitazedInput.shift() as string;

let verticals: verticalObject[] = createVerticalObject(sanitazedInput);

let output: string = generateOutput(verticals, sizes);

console.log(output);

function sanitazeInput(input: string): string[] {
  let convertedInput: string[] = input.split("\n");
  convertedInput = convertedInput.filter((line) => line !== "");
  return convertedInput;
}

function createVerticalObject(input: string[]): verticalObject[] {
  input.shift();
  let verticals: verticalObject[] = [];
  for (let i = 0; i < input.length; i++) {
    let vertical: string = input[i].split(" ")[0];
    let size: string = input[i].split(" ")[1];
    verticals.push({ vertical, size });
  }
  return verticals;
}

function generateOutput(verticals: verticalObject[], sizes: string): string {
  let output: string = "";

  for (let i = 0; i < verticals.length; i++) {
    for (const vertical of verticals) {
      const size = vertical.size;
      const splittedSizes = sizes.substring(0, size.length);
      const sizesMatching = size === splittedSizes;
      if (sizesMatching) {
        output += "\n" + vertical.vertical;
        sizes = sizes.substring(size.length, sizes.length);
      }
    }
  }
  output = output.substring(1, output.length);
  return output;
}
