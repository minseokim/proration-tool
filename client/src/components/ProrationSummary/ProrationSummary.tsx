import React from 'react';
import { Card } from 'antd';
import './ProrationSummary.css';
export const ProrationSummary = () => {
  return (
    <div className='proration-summary'>
      <h1>Proration Summary</h1>
      <Card className='proration-summary--card'>
        <p>Display Prorated Investment Sizes Here</p>
      </Card>
    </div>
  );
};
