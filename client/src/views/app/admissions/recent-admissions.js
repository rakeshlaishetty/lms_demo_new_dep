import React, {useEffect, useState} from 'react';
import { Row, Card, CardBody, Table } from 'reactstrap';

import { Colxx, Separator } from 'components/common/CustomBootstrap';
import axios from 'axios';
import uuid from 'react-uuid';

const RecentAdmissions = () => {

    const [recentAdmissions, setRecentAdmissions] = useState([]);
    const [total, setTotal] = useState(0);

    const getRecentAdmissions = async () => {
      const adm = JSON.parse(window.localStorage.getItem('userdata'));
        const res = await axios.get(`/admission/getRecentAdmissions?schoolId=${adm.schoolId}`);
        if (res.status === 200) {
          setRecentAdmissions(res.data);
          setTotal(res.data.length);
        }
      };

      useEffect(() => {
        getRecentAdmissions();
      }, [])

  return (
    <>
      <Row>
        <Colxx xxs="12">
          <div className="d-flex justify-content-between align-items-end mb-2">
            <h1>Recent Admissions</h1>
            <p>Total: {total}</p>
          </div>
            
        </Colxx>
        
      </Row>
      <Separator className="mb-5" />
      <Row>
        <Colxx xxs="12">
        <Card className="mb-4">
            <CardBody>
              
              <Table striped>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Father&apos;s Name</th>
                    <th>Class</th>
                    <th>Contact</th>
                    <th>Email</th>
                    <th>Admission date</th>
                  </tr>
                </thead>
                <tbody>
                  {
                        recentAdmissions.map((item, index) => 
                            <tr key={uuid()}>
                                <th scope="row">{index+1}</th>
                                <td>{item.name}</td>
                                <td>{item.father_name}</td>
                                <td>{item.className}</td>
                                <td>{item.phone}</td>
                                <td>{item.email}</td>
                                <td>{(new Date(item.admissionDate)).toDateString()}</td>
                            </tr>
                        )
                  }
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Colxx>

      </Row>
    </>
  );
};

export default RecentAdmissions;
