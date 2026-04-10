import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', message: 'Darija API is running' });
});

// Placeholder: lessons route
app.get('/api/lessons', (_req, res) => {
  res.json({ lessons: [], message: 'Lessons endpoint — coming soon' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
