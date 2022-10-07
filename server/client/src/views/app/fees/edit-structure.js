import React, { useState, useEffect } from 'react';
import {
  Row,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  InputGroup,
  InputGroupAddon,
  Card,
  Input,
  CardBody,
  FormGroup,
  Label,
  Button,
  Form,
} from 'reactstrap';
import { NotificationManager } from 'components/common/react-notifications';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import IntlMessages from 'helpers/IntlMessages';
import axios from 'axios';

const EditStructure = () => {
  const [selectedClass, setSelectedClass] = useState(null);
  const [data, setData] = useState(null);
  const [tuition, setTuition] = useState('');
  const [admission, setAdmission] = useState('');
  const [sports, setSports] = useState('');
  const [transport, setTransport] = useState('');

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
        NotificationManager.success(
          msg,
          'Success',
          3000,
          null,
          null,
          cName
        );
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


  const getData = async () => {
    const adm = JSON.parse(window.localStorage.getItem('userdata'));
    const res = await axios.get(
      `/fees/getFeeStructureClass?schoolId=${adm.schoolId}&class=${selectedClass}`
    );
    if (res.status === 200) {
      setData(res.data);
      setTuition(res.data.tuition);
      setAdmission(res.data.admission);
      setSports(res.data.sports);
      setTransport(res.data.transport);
    }
  };

  useEffect(() => {
    if (selectedClass) {
      getData();
    }
  }, [selectedClass]);

  const handleSubmit = async () => {
    if (
      Number.isNaN(tuition) ||
      Number.isNaN(admission) ||
      Number.isNaN(sports) ||
      Number.isNaN(transport)
    ) {
        createNotification('error', 'filled', 'Please enter numeric values for all fields!')
    }
    const submit = {
      class: selectedClass,
      tuition: tuition,
      admission: admission,
      sports: sports,
      transport: transport,
    };
    try {
      const res = await axios.post('/fees/editFeeStructure', submit);
      if (res.status === 200) {
        createNotification('success', 'filled', `Fee structure for class ${selectedClass} updated.`)
      }
    } catch (err) {
      if (err) {
        createNotification('error', 'filled', 'Something went wrong, please try again.')
      }
    }
  };

  return (
    <>
      <Row>
        <Colxx sm="12">
          <div className="">
            <h1>Edit Fee Structure</h1>
          </div>

          <div className="d-flex justify-content-start align-items-start pt-1">
            <UncontrolledDropdown className="mr-1 float-md-left btn-group mb-1">
              <DropdownToggle caret color="outline-dark" size="l">
                <IntlMessages id="Class: " />
                {selectedClass}
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem onClick={() => setSelectedClass(5)}>
                  5
                </DropdownItem>
                <DropdownItem onClick={() => setSelectedClass(6)}>
                  6
                </DropdownItem>
                <DropdownItem onClick={() => setSelectedClass(7)}>
                  7
                </DropdownItem>
                <DropdownItem onClick={() => setSelectedClass(8)}>
                  8
                </DropdownItem>
                <DropdownItem onClick={() => setSelectedClass(9)}>
                  9
                </DropdownItem>
                <DropdownItem onClick={() => setSelectedClass(10)}>
                  10
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        </Colxx>
      </Row>
      <Separator className="mb-5" />
      {data ? (
        <Row>
          <Colxx xxs="12">
            <Card className="mb-4">
              <CardBody>
                <Form>
                  <FormGroup row>
                    <Label for="tuition" sm={2}>
                      <IntlMessages id="Tuition" />
                    </Label>
                    <Colxx sm={10}>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">₹</InputGroupAddon>
                        <Input
                          onChange={(evt) => setTuition(evt.target.value)}
                          value={tuition}
                          type="text"
                          name="tuition"
                          id="tuition"
                        />
                      </InputGroup>
                    </Colxx>
                  </FormGroup>

                  <FormGroup row>
                    <Label for="admission" sm={2}>
                      <IntlMessages id="Admission" />
                    </Label>
                    <Colxx sm={10}>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">₹</InputGroupAddon>
                        <Input
                          onChange={(evt) => setAdmission(evt.target.value)}
                          value={admission}
                          type="text"
                          name="admission"
                          id="admission"
                        />
                      </InputGroup>
                    </Colxx>
                  </FormGroup>

                  <FormGroup row>
                    <Label for="sports" sm={2}>
                      <IntlMessages id="Sports" />
                    </Label>
                    <Colxx sm={10}>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">₹</InputGroupAddon>
                        <Input
                          onChange={(evt) => setSports(evt.target.value)}
                          value={sports}
                          type="text"
                          name="sports"
                          id="sports"
                        />
                      </InputGroup>
                    </Colxx>
                  </FormGroup>

                  <FormGroup row>
                    <Label for="transport" sm={2}>
                      <IntlMessages id="Transport" />
                    </Label>
                    <Colxx sm={10}>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">₹</InputGroupAddon>
                        <Input
                          onChange={(evt) => setTransport(evt.target.value)}
                          value={transport}
                          type="text"
                          name="transport"
                          id="transport"
                        />
                      </InputGroup>
                    </Colxx>
                  </FormGroup>

                  <Button onClick={handleSubmit} color="primary">
                    <IntlMessages id="Save" />
                  </Button>
                </Form>
              </CardBody>
            </Card>
          </Colxx>
        </Row>
      ) : null}
    </>
  );
};

export default EditStructure;
