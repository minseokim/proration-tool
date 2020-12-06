import React, { useState } from 'react';
import { Card, InputNumber, Form, Button } from 'antd';
import { InvestorToggleForm } from '../InvestorToggleForm/InvestorToggleForm';
import { Investor, createInvestor } from '../../typeDefs';

export const ProrationBuilder = () => {
  const [investorList, setInvestorList] = useState<Investor[]>([
    createInvestor(),
  ]);

  const handleRemoveInvestor = (id: string) => {
    setInvestorList(investorList.filter((investor) => investor.id !== id));
  };

  const handleAddInvestor = () => {
    setInvestorList([...investorList, createInvestor()]);
  };

  const handleUpdateInvestor = (
    id: string,
    name: string,
    requestedInvestmentAmount: number,
    averageInvestmentSize: number
  ) => {
    const newInvestorList = investorList.map((investor) => {
      if (investor.id === id) {
        return createInvestor(
          id,
          name,
          requestedInvestmentAmount,
          averageInvestmentSize
        );
      }
      return investor;
    });
    setInvestorList(newInvestorList);
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
        {/* List of Investor Forms */}
        {investorList?.map((investor, index) => {
          return (
            <InvestorToggleForm
              key={investor.id}
              index={index}
              investor={investor}
              onRemoveInvestor={handleRemoveInvestor}
              onUpdateInvestor={handleUpdateInvestor}
            />
          );
        })}
        <Form.Item>
          <Button type='primary'>Prorate</Button>
          <Button onClick={handleAddInvestor} type='primary'>
            Add Investor
          </Button>
        </Form.Item>
      </Card>
    </div>
  );
};
