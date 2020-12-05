import { v4 as uuidv4 } from 'uuid';
export interface Investor {
  id: string;
  name: string;
  averageInvestmentSize: number;
  requestedInvestmentAmount: number;
}

export const createInvestor = (
  id = uuidv4(),
  name = '',
  averageInvestmentSize = 0,
  requestedInvestmentAmount = 0
): Investor => {
  return {
    id,
    name,
    averageInvestmentSize,
    requestedInvestmentAmount,
  };
};
