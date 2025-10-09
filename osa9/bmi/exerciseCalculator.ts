interface ExerciseValues {
  target: number;
  days: number[];
}

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const parseExerciseArguments = (args: string[]): ExerciseValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  const [target, ...days] = args.slice(2).map((a) => {
    if (isNaN(Number(a))) {
      throw new Error('Provided values were not numbers!');
    } else {
      return Number(a);
    }
  });

  return { target, days };
};

export const calculateExercises = (days: number[], target: number): Result => {
  const periodLength: number = days.length;
  const trainingDays: number = days.filter((a) => a > 0).length;
  const total: number = days.reduce((a, b) => a + b);
  const average: number = total / periodLength;
  const rating: number = Math.min(Math.max(3 + average - target, 1), 3);
  let success: boolean = false;
  let ratingDescription: string = '';
  if (rating === 3) {
    success = true;
    ratingDescription = 'perfect';
  } else if (rating >= 2) {
    ratingDescription = 'close';
  } else {
    ratingDescription = 'far';
  }
  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

if (require.main === module) {
  try {
    const { target, days } = parseExerciseArguments(process.argv);
    console.log(calculateExercises(days, target));
  } catch (error: unknown) {
    let errorMessage = 'fail';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
  }
}
