import React from 'react';
import { Button, Form, Input, InputNumber } from 'antd';
import { MinusOutlined } from '@ant-design/icons';
import { Investment, FieldData } from '../../typeDefs';

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
  //   const onValuesChange = (evt) => {
  //     console.log('evt values change :', evt);
  //   };
  const { id, name, requested_amount, average_amount } = investment;

  const onFieldsChange = (allFields: FieldData[]) => {
    console.log('allFields :', allFields);
    const [nameField, requestedAmountField, averageAmountField] = allFields;
    onUpdateInvestment(
      id,
      nameField.value,
      requestedAmountField.value,
      averageAmountField.value
    );
  };

  // Needs to hold state for
  return (
    <>
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
          icon={<MinusOutlined />}
        ></Button>
      ) : null}
    </>
  );
};
