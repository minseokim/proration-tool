import express from 'express';
import { outputOne } from './mockData/output_1';
const app = express();
const PORT = 8000;

app.use(express.json());
app.post('/prorate', (req, res) => {
  console.log('request :', req);
  res.send(outputOne);
});
app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
