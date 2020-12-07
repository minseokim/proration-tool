import express from 'express';
import { getProratedAmount } from './lib/prorate';
import { InvestmentData } from './lib/types';
const app = express();
const PORT = 8000;

app.use(express.json());
app.post('/prorate', (req, res) => {
  const { body }: { body: InvestmentData } = req;
  const proratedAmount = getProratedAmount(body);
  res.send(proratedAmount);
});
app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
