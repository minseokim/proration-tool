import React, { useState } from 'react';
import { Card, InputNumber, Form, Button } from 'antd';
import { InvestorToggleForm } from '../InvestorToggleForm/InvestorToggleForm';
import { Investment, createInvestment } from '../../typeDefs';

export const ProrationBuilder = () => {
  const [investmentList, setInvestmentList] = useState<Investment[]>([
    createInvestment(),
  ]);

  const handleRemoveInvestment = (id: string) => {
    setInvestmentList(investmentList.filter((investor) => investor.id !== id));
  };

  const handleAddInvestment = () => {
    setInvestmentList([...investmentList, createInvestment()]);
  };

  const handleUpdateInvestment = (
    id: string,
    name: string,
    requestedAmount: number,
    averageAmount: number
  ) => {
    const newInvestorList = investmentList.map((investor) => {
      if (investor.id === id) {
        return createInvestment(id, name, requestedAmount, averageAmount);
      }
      return investor;
    });
    setInvestmentList(newInvestorList);
  };

  const handleProrate = () => {
    // Make API Request Here, and update the state
  };

  return (
    <div>
      <h1>Proration Tool</h1>
      <Card>
        <Form layout='vertical'>
          <Form.Item label='Total Allocation Amount' name='allocation'>
            <InputNumber />
          </Form.Item>
        </Form>
        {/* List of Investment Forms */}
        {investmentList?.map((investment, index) => {
          return (
            <InvestorToggleForm
              key={investment.id}
              index={index}
              investment={investment}
              onRemoveInvestment={handleRemoveInvestment}
              onUpdateInvestment={handleUpdateInvestment}
            />
          );
        })}
        <Form.Item>
          <Button type='primary'>Prorate</Button>
          <Button onClick={handleAddInvestment} type='primary'>
            Add Investor
          </Button>
        </Form.Item>
      </Card>
    </div>
  );
};
