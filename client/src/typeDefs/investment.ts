import { v4 as uuidv4 } from 'uuid';
export interface Investment {
  id: string;
  name: string;
  requested_amount: number;
  average_amount: number;
}

export const createInvestment = (
  id = uuidv4(),
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
