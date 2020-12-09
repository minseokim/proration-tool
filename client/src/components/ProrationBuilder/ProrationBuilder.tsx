import React, { useState } from 'react';
import { Card, InputNumber, Form, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import {
  Investment,
  createInvestment,
  ProrateRequest,
  FieldData,
  InvestmentData,
  ProratedAmount,
} from '../../typeDefs';
import { prorateFetch } from '../../lib';

import './ProrationBuilder.css';
import { InvestorToggleForm } from '../InvestorToggleForm';

interface ProrationBuilderProps {
  onProrateClick: (proratedAmount: ProratedAmount) => void;
}

export const ProrationBuilder = ({ onProrateClick }: ProrationBuilderProps) => {
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

  const generateProrateRequest = (
    allocationAmount: number,
    investmentList: Investment[]
  ): ProrateRequest => {
    return {
      allocation_amount: allocationAmount,
      investor_amounts: investmentList.map(
        (investment): InvestmentData => {
          const { name, average_amount, requested_amount } = investment;
          return {
            name,
            average_amount,
            requested_amount,
          };
        }
      ),
    };
  };

  const handleProrate = () => {
    prorateFetch(generateProrateRequest(allocationAmount, investmentList))
      .then((res) => {
        onProrateClick(res);
      })
      .catch((err) => {
        console.log('error :', err);
      });
  };

  const handleAllocationChange = (allFields: FieldData[]) => {
    const [allocationAmountField] = allFields;
    setAllocationAmount(allocationAmountField.value);
  };

  return (
    <div className='proration-builder'>
      <h1>Proration Tool</h1>
      <Card className='proration-builder--card'>
        <Form
          layout='horizontal'
          initialValues={{ allocationAmount }}
          onFieldsChange={(changedFields, allFields) => {
            handleAllocationChange(allFields as FieldData[]);
          }}
        >
          <Form.Item label='Total Available Allocation' name='allocationAmount'>
            <InputNumber />
          </Form.Item>
        </Form>
        {/* List of Investment Forms */}
        <div className='probation-builder--form-list'>
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
        </div>

        <Button
          className='proration-builder--add-investor-btn'
          type='dashed'
          onClick={handleAddInvestment}
          block
          icon={<PlusOutlined />}
        >
          Add Investor
        </Button>
        <Button type='primary' onClick={handleProrate}>
          Prorate
        </Button>
      </Card>
    </div>
  );
};
