import React from 'react';

import { CardTitle, Row, Card, CardBody } from 'reactstrap';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import IntlMessages from 'helpers/IntlMessages';
import { Gender } from 'components/charts';


const Analytics = () => {

  return (
    <>
      <Row>
        <Colxx xxs="12">
          <h1>Analytics</h1>
        </Colxx>
      </Row>
      <Separator className="mb-2" />

      <Row>
        <Colxx xxs="12" lg="8">
          Card 1
        </Colxx>
        <Colxx xxs="12" lg="4">
          <Card>
            <CardBody>
              <CardTitle>
                <IntlMessages id="Gender Distribution" />
              </CardTitle>
              <div className="chart-container">
                <Gender shadow />
              </div>
            </CardBody>
          </Card>
        </Colxx>
      </Row>
    </>
  );
};

export default Analytics;
