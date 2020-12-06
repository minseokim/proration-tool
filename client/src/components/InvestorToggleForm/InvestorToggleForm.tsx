import React from 'react';
import { Button, Form, Input, InputNumber } from 'antd';
import { MinusOutlined } from '@ant-design/icons';
import { Investor } from '../../typeDefs';

interface FieldData {
  touched: boolean;
  validating: boolean;
  errors: string[];
  name: string[];
  value: any;
}
interface InvestorToggleFormProps {
  onRemoveInvestor: (id: string) => void;
  onUpdateInvestor: (
    id: string,
    name: string,
    requestedInvestmentAmount: number,
    averageInvestmentSize: number
  ) => void;
  index: number;
  investor: Investor;
}

export const InvestorToggleForm = ({
  index,
  investor,
  onRemoveInvestor,
  onUpdateInvestor,
}: InvestorToggleFormProps) => {
  //   const onValuesChange = (evt) => {
  //     console.log('evt values change :', evt);
  //   };
  const {
    id,
    name,
    requestedInvestmentAmount,
    averageInvestmentSize,
  } = investor;

  const onFieldsChange = (allFields: FieldData[]) => {
    console.log('allFields :', allFields);
    const [
      nameField,
      requestedInvestmentAmountField,
      averageInvestmentSizeField,
    ] = allFields;
    onUpdateInvestor(
      id,
      nameField.value,
      requestedInvestmentAmountField.value,
      averageInvestmentSizeField.value
    );
  };

  // Needs to hold state for
  return (
    <Form
      layout='inline'
      onFieldsChange={(changedFields, allFields) =>
        onFieldsChange(allFields as FieldData[])
      }
      initialValues={{ name, requestedInvestmentAmount, averageInvestmentSize }}
    >
      <Form.Item label='Name' name='name'>
        <Input value={name} />
      </Form.Item>
      <Form.Item label='Requested Amount' name='requestedInvestmentAmount'>
        <InputNumber />
      </Form.Item>
      <Form.Item label='Average Amount' name='averageInvestmentSize'>
        <InputNumber />
      </Form.Item>
      {index ? (
        <Button
          onClick={() => onRemoveInvestor(id)}
          icon={<MinusOutlined />}
        ></Button>
      ) : null}
    </Form>
  );
};
