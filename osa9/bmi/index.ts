import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  if (isNaN(Number(req.query.height)) || isNaN(Number(req.query.weight))) {
    res.send({ error: 'malformatted parameters' });
  } else {
    const height: number = Number(req.query.height);
    const weight: number = Number(req.query.weight);
    res.send({ height, weight, bmi: calculateBmi(height, weight) });
  }
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  const target: number = req.body.target;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  const daily_exercises: number[] = req.body.daily_exercises;
  if (!target || !daily_exercises) {
    res.send({ error: 'parameters missing' });
  } else if (
    isNaN(Number(target)) ||
    daily_exercises.reduce((a, b) => a || isNaN(Number(b)), false)
  ) {
    res.send({ error: 'malformatted parameters' });
  } else {
    res.send(calculateExercises(daily_exercises, target));
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
