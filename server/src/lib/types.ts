export interface Investment {
  name: string;
  requested_amount: number;
  average_amount: number;
  allocation_complete?: boolean;
}

export interface InvestmentData {
  allocation_amount: number;
  investor_amounts: Investment[];
}

export interface ProratedData {
  [key: string]: number;
}
