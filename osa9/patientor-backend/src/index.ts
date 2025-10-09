import express from 'express';
import cors from 'cors';
import router from './routes/patients';

const app = express();
app.use(express.json());
app.use(cors());
app.use('/api', router);

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
