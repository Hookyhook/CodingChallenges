type inputObject = {
  timeStamp: string;
  isQuery: boolean;
  speed?: number;
  distance?: number;
};

const input: string = `
6
00:00:01 100
00:15:01
00:30:01
01:00:01 50
03:00:01
03:00:05 140
`;

let processedInput: inputObject[] = processInput(input);

let calculatedInput: inputObject[] = calculateDistances(processedInput);

let output: string = generateOutput(calculatedInput);
console.log(output);

//Split input at a new line
function processInput(input: string): inputObject[] {
  let sanitazedString = sanitazeInput(input);
  return convertInputToObjectArray(sanitazedString);
}

function sanitazeInput(input: string): string[] {
  let convertedInput: string[] = input.split("\n");
  convertedInput = convertedInput.filter((line) => line !== "");
  convertedInput.shift();
  return convertedInput;
}

function convertInputToObjectArray(sanitazedInput: string[]): inputObject[] {
  return sanitazedInput.map((string) => {
    const splittedString: string[] = string.split(" ");
    const timeStamp: string = splittedString[0];
    let speed: number = parseInt(splittedString?.[1]);
    if (isNaN(speed)) {
      return {
        timeStamp: timeStamp,
        isQuery: true,
      };
    }
    return {
      timeStamp: timeStamp,
      speed: speed,
      isQuery: false,
    };
  });
}

function calculateDistances(input: inputObject[]): inputObject[] {
  let currentSpeed: number = 0;
  let currentDistance: number = 0;
  let oldTimeInSeconds: number = 0;

  return input.map((inputLine: inputObject) => {
    const timeInSeconds = calculateTimeInSeconds(inputLine.timeStamp);
    const lineDistance = currentSpeed * (timeInSeconds - oldTimeInSeconds);
    oldTimeInSeconds = timeInSeconds;
    currentDistance += lineDistance;
    const calculatedInputLine: inputObject = {
      ...inputLine,
      distance: currentDistance,
    };
    if (!inputLine.isQuery) {
      currentSpeed = inputLine.speed! / 3.6 / 1000;
    }
    return calculatedInputLine;
  });
}

function calculateTimeInSeconds(timeStamp: string): number {
  const splittedTime: string[] = timeStamp.split(":");
  const hours: number = parseInt(splittedTime[0]);
  const minutes: number = parseInt(splittedTime[1]);
  const seconds: number = parseInt(splittedTime[2]);

  const calculatedTime = seconds + minutes * 60 + hours * 3600;
  return calculatedTime;
}

function generateOutput(input: inputObject[]): string {
  let output = "";
  for (const inputLine of input) {
    if (inputLine.isQuery) {
      output += `\n${inputLine.timeStamp} ${inputLine.distance!.toFixed(2)} km`;
    }
  }
  return output;
}
