import React, { useState } from 'react';
import { Button, Form, Input, InputNumber } from 'antd';
import { MinusCircleOutlined } from '@ant-design/icons';
import { Investment, FieldData } from '../../typeDefs';
import './InvestorToggleForm.css';
interface InvestorToggleFormProps {
  onRemoveInvestment: (id: string) => void;
  onUpdateInvestment: (
    id: string,
    name: string,
    requestedAmount: number,
    averageAmount: number
  ) => void;
  index: number;
  investment: Investment;
}

export const InvestorToggleForm = ({
  index,
  investment,
  onRemoveInvestment,
  onUpdateInvestment,
}: InvestorToggleFormProps) => {
  const { id, name, requested_amount, average_amount } = investment;

  const onFieldsChange = (allFields: FieldData[]) => {
    const [nameField, requestedAmountField, averageAmountField] = allFields;
    onUpdateInvestment(
      id,
      nameField.value,
      requestedAmountField.value,
      averageAmountField.value
    );
  };

  return (
    <Form
      className='investor-toggle-form'
      layout='inline'
      onFieldsChange={(changedFields, allFields) =>
        onFieldsChange(allFields as FieldData[])
      }
      initialValues={{ name, requested_amount, average_amount }}
    >
      <Form.Item label='Name' name='name'>
        <Input value={name} />
      </Form.Item>
      <Form.Item label='Requested Amount' name='requested_amount'>
        <InputNumber />
      </Form.Item>
      <Form.Item label='Average Amount' name='average_amount'>
        <InputNumber />
      </Form.Item>
      {index ? (
        <Button
          onClick={() => onRemoveInvestment(id)}
          icon={<MinusCircleOutlined />}
        ></Button>
      ) : null}
    </Form>
  );
};
