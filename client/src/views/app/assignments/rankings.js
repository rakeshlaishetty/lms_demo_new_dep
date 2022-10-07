/* eslint no-underscore-dangle: 0 */
/* eslint-disable react/no-array-index-key */
/* eslint no-nested-ternary: 0 */ import React, {
  useState,
  useEffect,
} from 'react';

import { Card, CardBody, CardTitle, Row } from 'reactstrap';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import IntlMessages from 'helpers/IntlMessages';
import { AreaChart } from 'components/charts';
import { ThemeColors } from 'helpers/ThemeColors';
import axios from 'axios';

import gold from '../../../assets/img/1.png';
import silver from '../../../assets/img/2.png';
import bronze from '../../../assets/img/3.png';

const Rankings = ({ location }) => {
  const [data, setData] = useState([]);
  const [dataset, setDataset] = useState([]);
  const [maxMarks, setMaxMarks] = useState('');
  const [minMarks, setMinMarks] = useState('');
  const [average, setAverage] = useState('');

  const colors = ThemeColors();

  const chartData = {
    labels: [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
      22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39,
      40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57,
      58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75,
      76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93,
      94, 95, 96, 97, 98, 99, 100,
    ],
    datasets: [
      {
        label: 'Number of students',
        data: dataset,
        borderColor: colors.themeColor1,
        pointBackgroundColor: colors.foregroundColor,
        pointBorderColor: colors.themeColor1,
        pointHoverBackgroundColor: colors.themeColor1,
        pointHoverBorderColor: colors.foregroundColor,
        fill: true,
        borderWidth: 2,
        backgroundColor: colors.themeColor1_10,
      },
    ],
  };

  const getAssignment = async () => {
    const res = await axios.get(
      `/assignments/getAssignmentsPerformance?id=${location.state.id}`
    );
    if (res.status === 200) {
      setData(res.data);
      const temp = {};
      for (let i = 0; i < res.data.length; i += 1) {
        if (typeof temp[res.data[i].marks] !== 'undefined') {
          temp[res.data[i].marks] += 1;
        } else {
          temp[res.data[i].marks] = 1;
        }
      }
      const arr = [];
      for (let i = 1; i <= 100; i += 1) {
        if (typeof temp[i] !== 'undefined') {
          arr.push(temp[i]);
        } else {
          arr.push(0);
        }
      }
      setDataset(arr);

      let max = 0
      let min = 10000000000
      for(let i=0; i<res.data.length; i+=1){
        if(res.data[i].marks > max) max = res.data[i].marks;
        if(res.data[i].marks < min) min = res.data[i].marks;
      }
      setMaxMarks(max);
      setMinMarks(min);

      let avg = 0;
      for(let i=0; i<res.data.length; i+=1){
        avg += res.data[i].marks;
      }
      avg /= res.data.length;
      setAverage(avg);
    }
  };

  useEffect(() => {
    getAssignment();
  }, []);

  return (
    <>
      <Row>
        <Colxx xxs="12">
          <div className="mb-2">
            <h1>Rankings</h1>
          </div>
        </Colxx>
      </Row>
      <Separator className="mb-2" />

      <Row>
        <Colxx xxs="12" lg="8">
          <Card>
            <CardBody>
              <CardTitle>
                <IntlMessages id="Rankings" />
              </CardTitle>
              <table className="table table-striped">
                <thead>
                  <tr className="schedule-heading">
                    <th scope="col">Rank</th>
                    <th scope="col">Name</th>
                    <th scope="col">Marks</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => (
                    <tr key={index}>
                      <td>
                        {index + 1 === 1 ? (
                          <img
                            alt="gold"
                            className="medal thumbnail"
                            style={{ height: '25px' }}
                            src={gold}
                          />
                        ) : index + 1 === 2 ? (
                          <img
                            alt="silver"
                            className="medal thumbnail"
                            style={{ height: '25px' }}
                            src={silver}
                          />
                        ) : index + 1 === 3 ? (
                          <img
                            alt="bronze"
                            className="medal thumbnail"
                            style={{ height: '25px' }}
                            src={bronze}
                          />
                        ) : (
                          index + 1
                        )}
                      </td>
                      <td>{item.name}</td>
                      <td>{item.marks}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardBody>
          </Card>
        </Colxx>
        <Colxx xxs="12" lg="4">
          <Row>
            <Colxx xxs="6" className="mb-4">
              <Card className="dashboard-small-chart">
                <CardBody>
                  <div className="py-3" style={{ textAlign: 'center' }}>
                    <p className="lead color-theme-1 mb-1 value">{maxMarks}%</p>
                    <p className="mb-0 label text-small">Maximum scored</p>
                  </div>
                </CardBody>
              </Card>
            </Colxx>
            <Colxx xxs="6" className="mb-4">
              <Card className="dashboard-small-chart">
                <CardBody>
                  <div className="py-3" style={{ textAlign: 'center' }}>
                    <p className="lead color-theme-1 mb-1 value">{minMarks}%</p>
                    <p className="mb-0 label text-small">Least scored</p>
                  </div>
                </CardBody>
              </Card>
            </Colxx>
            <Colxx xxs="6" className="mb-4">
              <Card className="dashboard-small-chart">
                <CardBody>
                  <div className="py-3" style={{ textAlign: 'center' }}>
                    <p className="lead color-theme-1 mb-1 value">{parseInt(average,10)}%</p>
                    <p className="mb-0 label text-small">Average</p>
                  </div>
                </CardBody>
              </Card>
            </Colxx>
          </Row>
        </Colxx>
      </Row>
      <Row className="mt-5">
        <Colxx xxs="12" lg="8">
          <Card>
            <CardBody>
              <CardTitle>
                <IntlMessages id="Frequency distribution" />
                <div className="chart card-body pt-0 mt-3">
                  <AreaChart shadow data={chartData} />
                </div>
              </CardTitle>
            </CardBody>
          </Card>
        </Colxx>
      </Row>
    </>
  );
};

export default Rankings;
