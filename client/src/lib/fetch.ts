import { ProrateRequest } from '../typeDefs';

export const prorateFetch = async (reqBody: ProrateRequest) => {
  const API_URL = `/prorate`;
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(reqBody),
  });
  return response.json();
};
