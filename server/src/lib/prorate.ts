import { inputFour, inputOne, inputThree, inputTwo } from '../mockData/input_1';
import { InvestmentData, ProratedData, Investment } from './types';

const prorate = (
  allocationAmount: number,
  averageAmount: number,
  averageAmountSum: number
) => {
  return allocationAmount * (averageAmount / averageAmountSum);
};

export const getProratedAmount = (
  prorateData: InvestmentData
): ProratedData => {
  const proratedData: ProratedData = {};

  const {
    allocation_amount: allocationAmount,
    investor_amounts: investorAmounts,
  } = prorateData;

  const averageAmountSum = investorAmounts.reduce(
    (total, investment) => total + investment.average_amount,
    0
  );
  const requestedAmountSum = investorAmounts.reduce(
    (total, investment) => total + investment.requested_amount,
    0
  );

  const recurse = (
    allocationAmount: number,
    averageAmountSum: number,
    investorAmounts: Investment[]
  ) => {
    // Keep running total of average amounts, and left over allocation
    let newAverageAmountTotal = averageAmountSum;
    let leftOverAllocation = allocationAmount;

    // Base Case : If allocation amount is < 0, return
    if (allocationAmount <= 0) {
      return proratedData;
    }

    // Case 1: Allocation amount > sum of all requested amounts. Simply allocate to each investor exactly what they requested.
    if (allocationAmount > requestedAmountSum) {
      investorAmounts.forEach((investment) => {
        const proratedAmount = investment.requested_amount;
        let prevProratedAmount: number = proratedData[investment.name];
        proratedData[investment.name] = prevProratedAmount
          ? (prevProratedAmount += proratedAmount)
          : proratedAmount;
      });
      return proratedData;
    }

    for (const investment of investorAmounts) {
      // Skip investments that have already been allocated
      if (investment.allocation_complete) {
        continue;
      }

      let proratedAmount = prorate(
        allocationAmount,
        investment.average_amount,
        averageAmountSum
      );

      // Case 2: Prorated amount is >= requested amount.
      if (
        proratedAmount > investment.requested_amount ||
        proratedAmount === investment.requested_amount
      ) {
        // Allocate originally requested amount to investor, and subtract from new sum of average investment amounts(We want to exclude this investor from the next time we recurse)
        proratedAmount = investment.requested_amount;
        newAverageAmountTotal -= investment.average_amount;
        // Since this investment is allocated(Requested Amount has been met), mark it with 'allocation_complete' flag so we can skip it next time
        investment.allocation_complete = true;
      }
      leftOverAllocation -= proratedAmount;

      let prevProratedAmount = proratedData[investment.name];
      proratedData[investment.name] = prevProratedAmount
        ? (prevProratedAmount += proratedAmount)
        : proratedAmount;
    }

    recurse(leftOverAllocation, newAverageAmountTotal, investorAmounts);
  };

  recurse(allocationAmount, averageAmountSum, investorAmounts);
  return proratedData;
};

// getProratedAmount(inputOne);
// // console.log('--------');
// getProratedAmount(inputTwo);
// // console.log('--------');
// getProratedAmount(inputThree);
// // console.log('--------');
// getProratedAmount(inputFour);
