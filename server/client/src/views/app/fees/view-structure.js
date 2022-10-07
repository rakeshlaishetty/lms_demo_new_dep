/* eslint no-underscore-dangle: 0 */
import React, { useState, useEffect } from 'react';
import { Row, Card, CardBody, Table } from 'reactstrap';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import axios from 'axios';
import uuid from 'react-uuid';

const FeeStructure = () => {
  const [feeStructureData, setFeeStructureData] = useState([]);

  const handleViewFeeStructure = async () => {
    const adm = JSON.parse(window.localStorage.getItem('userdata'));
    const res = await axios.get(
      `/fees/getFeeStructure?schoolId=${adm.schoolId}`
    );
    if (res.status === 200) {
      setFeeStructureData(res.data);
    }
  };

  useEffect(() => {
    handleViewFeeStructure();
  }, []);
  return (
    <>
      <Row>
        <Colxx xxs="12">
          <div className="mb-2">
            <h1>Fee Structure</h1>
          </div>
        </Colxx>
      </Row>
      <Separator className="mb-5" />
      <Row>
        <Colxx xxs="12">
          {feeStructureData.length ? (
            <Card className="mb-4">
              <CardBody>
                <Table striped>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Class</th>
                      <th>Tuition</th>
                      <th>Admission</th>
                      <th>Sports</th>
                      <th>Transport</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {feeStructureData.map((item, index) => {
                      return (
                        <tr key={uuid()}>
                          <th scope="row">{index + 1}</th>
                          <td>{item.class}</td>
                          <td>₹ {item.tuition}</td>
                          <td>₹ {item.admission}</td>
                          <td>₹ {item.sports}</td>
                          <td>₹ {item.transport}</td>
                          <td>
                            <strong>
                              ₹{' '}
                              {item.tuition +
                                item.admission +
                                item.sports +
                                item.transport}
                            </strong>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          ) : null}
        </Colxx>
      </Row>
    </>
  );
};

export default FeeStructure;
