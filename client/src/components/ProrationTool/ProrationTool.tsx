import React, { useState } from 'react';
import { ProrationBuilder } from '../ProrationBuilder';
import { ProrationSummary } from '../ProrationSummary';
import './ProrationTool.css';
import { Row, Col } from 'antd';
import { ProratedAmount } from '../../typeDefs';

export const ProrationTool = () => {
  const [proratedAmount, setProratedAmount] = useState<ProratedAmount>({});

  const handleProrate = (proratedAmount: ProratedAmount) => {
    setProratedAmount(proratedAmount);
  };

  return (
    <div className='container'>
      <Row className='row-full-height'>
        <Col flex={7}>
          <ProrationBuilder onProrateClick={handleProrate} />
        </Col>
        <Col flex={3}>
          <ProrationSummary proratedAmount={proratedAmount} />
        </Col>
      </Row>
    </div>
  );
};
