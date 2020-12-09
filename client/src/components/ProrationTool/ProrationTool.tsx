import React, { useState } from 'react';
import { ProrationBuilder } from '../ProrationBuilder';
import { ProrationSummary } from '../ProrationSummary';
import './ProrationTool.css';
import { Row, Col } from 'antd';
import { ProrateRequest, ProratedAmount } from '../../typeDefs';
import { prorateFetch } from '../../lib';

export const ProrationTool = () => {
  const [proratedAmount, setProratedAmount] = useState<ProratedAmount>({});

  const handleProrate = (prorateRequest: ProrateRequest) => {
    prorateFetch(prorateRequest)
      .then((res) => {
        setProratedAmount(res);
      })
      .catch((err) => {
        console.error('error :', err);
      });
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
