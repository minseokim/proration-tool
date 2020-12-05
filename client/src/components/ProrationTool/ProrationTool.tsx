import React from 'react';
import { ProrationBuilder } from '../ProrationBuilder';
import { ProrationSummary } from '../ProrationSummary';
import './ProrationTool.css';
import { Row, Col } from 'antd';

export const ProrationTool = () => {
  return (
    <div className='container'>
      <Row>
        <Col flex={7}>
          <ProrationBuilder />
        </Col>
        <Col flex={3}>
          <ProrationSummary />
        </Col>
      </Row>
    </div>
  );
};
