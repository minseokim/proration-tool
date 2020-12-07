import React, { useState } from 'react';
import { Card, InputNumber, Form, Button, Input, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

import {
  Investment,
  createInvestment,
  ProrateRequest,
  FieldData,
  InvestmentData,
} from '../../typeDefs';
import { prorateFetch } from '../../lib';

import './ProrationBuilder.css';

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
        console.log('result :', res);
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
          {/* List of Investment Forms */}
          <Form.List name='investments'>
            {(fields, { add, remove }) => {
              return (
                <>
                  {investmentList?.map((investment, index) => {
                    return (
                      <div key={investment.id} className='form-list'>
                        <Space>
                          <Form.Item label='Name' name='name'>
                            <Input value={investment.name} />
                          </Form.Item>
                          <Form.Item
                            label='Requested Amount'
                            name='requested_amount'
                          >
                            <InputNumber />
                          </Form.Item>
                          <Form.Item
                            label='Average Amount'
                            name='average_amount'
                          >
                            <InputNumber />
                          </Form.Item>
                          <Form.Item>
                            {index ? (
                              <Button
                                icon={<MinusCircleOutlined />}
                                onClick={() => {
                                  handleRemoveInvestment(investment.id);
                                }}
                              ></Button>
                            ) : null}
                          </Form.Item>
                        </Space>
                      </div>
                    );
                  })}
                  <Form.Item>
                    <Button
                      type='dashed'
                      onClick={handleAddInvestment}
                      block
                      icon={<PlusOutlined />}
                    >
                      Add Investor
                    </Button>
                  </Form.Item>
                </>
              );
            }}
          </Form.List>
          <Form.Item>
            <Button type='primary' onClick={handleProrate}>
              Prorate
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};
