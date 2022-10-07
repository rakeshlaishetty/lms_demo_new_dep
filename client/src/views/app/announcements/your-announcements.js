import React from 'react';
import { Row, Card, CardBody } from 'reactstrap';
import { Colxx, Separator } from 'components/common/CustomBootstrap';

import speaker from '../../../assets/img/speaker.png';

const YourAnnouncements = () => {
  return (
    <>
      <Row>
        <Colxx xxs="12">
          <div className="mb-2">
            <h1>Your Announcements</h1>
          </div>
        </Colxx>
      </Row>
      <Separator className="mb-2" />
      <Row>
        <Colxx xxs="12">
          <Card>
            <CardBody>
              <div className="d-flex flex-column justify-content-center align-items-center">
                <img
                  className="mt-4"
                  src={speaker}
                  alt="speaker"
                  style={{ height: '120px' }}
                />
                <h6 className="text-muted mt-4">No new announcements</h6>
              </div>
            </CardBody>
          </Card>
        </Colxx>
      </Row>
    </>
  );
};

export default YourAnnouncements;
