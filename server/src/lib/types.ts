export interface Investment {
  name: string;
  requested_amount: number;
  average_amount: number;
}

export interface ProrateRequest {
  allocation_amount: number;
  investor_amounts: Investment[];
}
