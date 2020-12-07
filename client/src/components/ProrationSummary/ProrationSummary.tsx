import React from 'react';
import { Card } from 'antd';
import './ProrationSummary.css';
import { ProratedAmount } from '../../typeDefs';

interface ProrationSummaryProps {
  proratedAmount: ProratedAmount;
}
export const ProrationSummary = ({ proratedAmount }: ProrationSummaryProps) => {
  const investorNameList = Object.keys(proratedAmount);
  return (
    <div className='proration-summary'>
      <h1>Proration Summary</h1>
      <Card className='proration-summary--card'>
        {investorNameList.length ? (
          investorNameList.map((investorName) => {
            return (
              <p key={investorName}>
                {investorName} &ndash; &#36;{proratedAmount[investorName]}
              </p>
            );
          })
        ) : (
          <p>Add investors to get started!</p>
        )}
      </Card>
    </div>
  );
};
