import React, { useState } from 'react';
import { Card, InputNumber, Form, Button } from 'antd';
import { InvestorToggleForm } from '../InvestorToggleForm/InvestorToggleForm';
import {
  Investment,
  createInvestment,
  ProrateRequest,
  FieldData,
} from '../../typeDefs';

export const ProrationBuilder = () => {
  const [allocationAmount, setAllocationAmount] = useState<number>(0);
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

  const prorateFetch = async (reqBody: ProrateRequest) => {
    const API_URL = `http://localhost:8000/prorate`;
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reqBody),
    });
    return response.json();
  };

  const handleProrate = () => {
    // Turn UI state -> ProrateRequest
    // const prorateRequestBody =
    // Make API Request Here
  };

  const handleAllocationChange = (allFields: FieldData[]) => {
    const [allocationAmountField] = allFields;
    setAllocationAmount(allocationAmountField.value);
  };

  return (
    <div>
      <h1>Proration Tool</h1>
      <Card>
        <Form
          layout='vertical'
          initialValues={{ allocationAmount }}
          onFieldsChange={(changedFields, allFields) => {
            handleAllocationChange(allFields as FieldData[]);
          }}
        >
          <Form.Item label='Total Allocation Amount' name='allocationAmount'>
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
