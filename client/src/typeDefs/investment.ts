import { nanoid } from 'nanoid';

export interface Investment {
  id: string;
  name: string;
  requested_amount: number;
  average_amount: number;
}

export const createInvestment = (
  // Generate unique ID for each new investment
  id = nanoid(),
  name = '',
  requested_amount = 0,
  average_amount = 0
): Investment => {
  return {
    id,
    name,
    requested_amount,
    average_amount,
  };
};

export interface InvestmentData {
  name: string;
  requested_amount: number;
  average_amount: number;
}

export interface ProrateRequest {
  allocation_amount: number;
  investor_amounts: InvestmentData[];
}

export interface ProratedAmount {
  [key: string]: number;
}
