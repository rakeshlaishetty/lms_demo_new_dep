/* eslint no-underscore-dangle: 0 */
/* eslint-disable react/no-array-index-key */
/* eslint no-nested-ternary: 0 */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import {
  CardBody,
  Row,
  Card,
  Button,
  FormGroup,
  Input,
  Form,
} from 'reactstrap';
import { Separator, Colxx } from 'components/common/CustomBootstrap';
import { NotificationManager } from 'components/common/react-notifications';
import Rating from 'components/common/Rating';
import IntlMessages from 'helpers/IntlMessages';
import axios from 'axios';

const Feedback = () => {
  const [data, setData] = useState([]);
  const [ratings, setRatings] = useState({});

  const createNotification = (type, className, msg) => {
    const cName = className || '';
    switch (type) {
      case 'primary':
        NotificationManager.primary(
          'This is a notification!',
          'Primary Notification',
          3000,
          null,
          null,
          cName
        );
        break;
      case 'secondary':
        NotificationManager.secondary(
          'This is a notification!',
          'Secondary Notification',
          3000,
          null,
          null,
          cName
        );
        break;
      case 'info':
        NotificationManager.info('Info message', '', 3000, null, null, cName);
        break;
      case 'success':
        NotificationManager.success(msg, 'Success', 3000, null, null, cName);
        break;
      case 'warning':
        NotificationManager.warning(
          'Warning message',
          'Close after 3000ms',
          3000,
          null,
          null,
          cName
        );
        break;
      case 'error':
        NotificationManager.error(
          msg,
          'Error',
          5000,
          () => {
            alert('callback');
          },
          null,
          cName
        );
        break;
      default:
        NotificationManager.info('Info message');
        break;
    }
  };

  const handleRating = (id, evt, category) => {
    const temp = ratings;
    if (category === 'preparedness') {
      temp[id].preparedness = evt.rating;
    }
    if (category === 'attitude') {
      temp[id].attitude = evt.rating;
    }
    if (category === 'timing') {
      temp[id].timing = evt.rating;
    }
    setRatings(temp);
  };

  const getData = async () => {
    const user = JSON.parse(window.localStorage.getItem('userdata'));
    const res = await axios.get(`/getClassSubjects?classId=${user.class}`);
    if (res.status === 200) {
      setData(res.data);
    }
  };

  const submit = async (evt) => {
    evt.preventDefault();

    const user = JSON.parse(window.localStorage.getItem('userdata'));
    const info = {
      studentId: user._id,
      ratings: ratings,
    };
    const res = await axios.post('/feedback/setRating', info);
    if (res.status === 200) {
      createNotification('success', 'filled', 'Rating saved successfully!');
    } else {
      createNotification(
        'error',
        'filled',
        'Something went wrong! Please try again.'
      );
    }
  };

  const getRatings = async () => {
    const user = JSON.parse(window.localStorage.getItem('userdata'));
    const teachers = [];
    for (let i = 0; i < data.length; i += 1) {
      teachers.push(data[i].faculty._id);
    }
    const res = await axios.get(
      `/feedback/getRatingsFromStudent?teachers[]=${teachers}&studentId=${user._id}`
    );
    if (res.status === 200) {
      const temp = {};
      for (let i = 0; i < res.data.length; i += 1) {
        const t = {
          attitude: res.data[i].attitude,
          preparedness: res.data[i].preparedness,
          timing: res.data[i].timing,
        };
        temp[String(res.data[i].teacherId)] = t;
      }
      setRatings(temp);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (data.length) getRatings();
  }, [data]);

  return (
    <>
      <Row>
        <Colxx xxs="12">
          <div className="mb-2">
            <h1>Teacher Feedback</h1>
          </div>
        </Colxx>
      </Row>
      <Separator className="mb-4" />
      {data.length && ratings ? (
        <Form onSubmit={submit}>
          <Row className="equal-height-container">
            {data.map((item, index) => (
              <Colxx md="12" xl="6" className="mb-4 col-item" key={index}>
                <Card>
                  <CardBody>
                    <div className="text-center">
                      <h3 className="mb-0 font-weight-semibold color-theme-1 mb-4">
                        {item.faculty.name}
                      </h3>
                      <h6 className="text-muted">{item.subject.name}</h6>
                    </div>
                    <div className="pl-3 pr-3 pt-3 pb-0 d-flex flex-column flex-grow-1">
                      <FormGroup>
                        <label>
                          <IntlMessages id="Preparedness" />
                        </label>
                        <Rating
                          total={5}
                          rating={
                            typeof ratings[item.faculty._id] !== 'undefined'
                              ? ratings[item.faculty._id].preparedness
                              : 0
                          }
                          onRate={(rating) => {
                            handleRating(
                              item.faculty._id,
                              rating,
                              'preparedness'
                            );
                          }}
                        />
                      </FormGroup>
                      <FormGroup>
                        <label>
                          <IntlMessages id="Attitude" />
                        </label>
                        <Rating
                          total={5}
                          rating={
                            typeof ratings[item.faculty._id] !== 'undefined'
                              ? ratings[item.faculty._id].attitude
                              : 0
                          }
                          onRate={(rating) => {
                            handleRating(item.faculty._id, rating, 'attitude');
                          }}
                        />
                      </FormGroup>

                      <FormGroup>
                        <label>
                          <IntlMessages id="On-time syllabus completion" />
                        </label>
                        <Rating
                          total={5}
                          rating={
                            typeof ratings[item.faculty._id] !== 'undefined'
                              ? ratings[item.faculty._id].timing
                              : 0
                          }
                          onRate={(rating) => {
                            handleRating(item.faculty._id, rating, 'timing');
                          }}
                        />
                      </FormGroup>

                      <FormGroup>
                        <label htmlFor="comments">
                          <IntlMessages id="Comments (optional)" />
                        </label>
                        <Input id="comments" type="textarea" />
                      </FormGroup>
                    </div>
                  </CardBody>
                </Card>
              </Colxx>
            ))}
          </Row>
          <div className="d-flex w-100 justify-content-center align-items-center">
            <Button className="mb-4" type="submit">
              Save
            </Button>
          </div>
        </Form>
      ) : null}
    </>
  );
};

export default Feedback;
