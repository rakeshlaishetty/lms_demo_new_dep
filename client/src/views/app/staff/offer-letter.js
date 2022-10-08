/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unneeded-ternary */
/* eslint new-cap: 0 */
/* eslint no-unused-vars: 0 */
import React, { useState } from 'react';
import { Row, Card, CardBody, FormGroup, Label, Input, Button } from 'reactstrap';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import IntlMessages from 'helpers/IntlMessages';
import ApplicationMenu from 'components/common/ApplicationMenu';
import PerfectScrollbar from 'react-perfect-scrollbar';
import DatePicker from 'react-datepicker';
import { jsPDF } from "jspdf";
import 'react-datepicker/dist/react-datepicker.css';


const Offer = () => {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [email, setEmail] = useState('');
  const [sender, setSender] = useState('');

  const handleClick = () => {
            const doc = new jsPDF("p", "mm", [300, 300]);
            const makePDF = document.querySelector("#makepdf");
            console.log(makePDF)
            // fromHTML Method
            doc.html(makePDF);
            doc.save("output.pdf");
    
  }

  return (
    <>
      <Row>
        <Colxx xxs="9">
          <div className="d-flex flex-lg-row justify-content-between align-items-center">
            <h1>Offer Letter</h1>

             <Button className="submit mx-5" onClick={handleClick}>Download</Button>
          </div>
          <Separator className="mb-2" />
        </Colxx>
      </Row>

      <Row>
        <Colxx xxs="12" lg="8">
          <Card className="mb-5 mt-3 invoice-contents">
            <CardBody className="d-flex flex-column justify-content-between">
              <div className="d-flex flex-column" id='makepdf'>
                <div className="d-flex flex-row justify-content-between pt-2 pb-2">
                  <div className="d-flex align-self-center">
                    <img
                      style={{ height: '60px' }}
                      src="https://singhaniaschool.org/img/Sulochna-devi-logo.png"
                      alt="Logo"
                    />
                  </div>
                  <div className="d-flex w-30 text-right align-self-center">
                    <p className="text-small text-semi-muted mb-0">
                      Jekegram, Pokharan Rd Number 1, Thane, Maharashtra
                      <br />
                      784 451 12 47
                    </p>
                  </div>
                </div>

                <div className="border-bottom pt-4 mb-5" />

                <div className="mt-4">
                  <h6 className="mb-3">
                    Dear{' '}
                    {name ? (
                      name
                    ) : (
                      <span className="text-danger">[Candidate name]</span>
                    )}
                    ,
                  </h6>

                  <p
                    style={{
                      color: '#8f8f8f',
                      fontSize: '14px',
                      paddingBottom: '20px',
                      lineHeight: '1.4',
                    }}
                  >
                    It is with great pleasure that we inform you of your
                    selection for the post of Assistant Teacher of Physics with
                    effect from{' '}
                    {date ? (
                      (new Date(date).toLocaleDateString())
                    ) : (
                      <span className="text-danger">[Joining date]</span>
                    )}
                    . Based upon your interaction with us we feel you would be
                    the best choice for this position. All the terms and
                    conditions, salary structure with other benefits have been
                    mentioned in the attached employee agreement form.
                  </p>

                  <p
                    style={{
                      color: '#8f8f8f',
                      fontSize: '14px',
                      paddingBottom: '20px',
                      lineHeight: '1.4',
                    }}
                  >
                    If you wish to accept this offer of appointment under the
                    conditions set out in the attached file, please sign this
                    letter and send it back to {email ? email : <span className='text-danger'>[Contact email]</span>}, so we can inform
                    you of the following procedures. Should you have any doubts
                    that need to be clarified, please feel free to email your
                    queries to {email ? email : <span className='text-danger'>[Contact email]</span>}.
                  </p>

                  <p
                    style={{
                      color: '#8f8f8f',
                      fontSize: '14px',
                      paddingBottom: '20px',
                      lineHeight: '1.4',
                    }}
                  >
                    I congratulate you and welcome you on behalf of all the
                    teaching and administration staff at Smt. Sulochanadevi
                    Singhania School and we are sure that you will prove to be a
                    great addition to our esteemed instituition. We are looking
                    forward to work with you.
                  </p>

                  <p
                    style={{
                      color: '#8f8f8f',
                      fontSize: '14px',
                      lineHeight: '1.4',
                    }}
                  >
                    Regards,
                  </p>
                  <p
                    style={{
                      color: '#8f8f8f',
                      fontSize: '14px',
                      lineHeight: '1.4',
                    }}
                  >
                    {sender ? sender : <span className='text-danger'>[Sender]</span>}
                  </p>

                  <div className="mt-5 mb-4 w-100 d-flex justify-content-around align-items-center">
                    <div className="d-flex flex-column justify-content-center align-items-center">
                      <p
                        style={{
                          color: '#8f8f8f',
                          fontSize: '14px',
                          lineHeight: '1.4',
                        }}
                      >
                        __________________________
                      </p>
                      <p
                        style={{
                          color: '#8f8f8f',
                          fontSize: '14px',
                          lineHeight: '1.4',
                        }}
                      >
                        Principal
                      </p>
                    </div>
                    <div className="d-flex flex-column justify-content-center align-items-center">
                      <p
                        style={{
                          color: '#8f8f8f',
                          fontSize: '14px',
                          lineHeight: '1.4',
                        }}
                      >
                        __________________________
                      </p>
                      <p
                        style={{
                          color: '#8f8f8f',
                          fontSize: '14px',
                          lineHeight: '1.4',
                        }}
                      >
                        Your signature
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </Colxx>
        <Colxx xxs="12" lg="4">
          <ApplicationMenu>
            <PerfectScrollbar
              options={{ suppressScrollX: true, wheelPropagation: false }}
            >
              <div className="p-4">
                <h5 className="text-muted">Details</h5>

                <FormGroup className="mt-5">
                  <Label for="name">
                    <IntlMessages id="Candidate name" />
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    onChange={(evt) => setName(evt.target.value)}
                  />
                </FormGroup>

                <FormGroup className="mt-4">
                  <Label for="date">
                    <IntlMessages id="Joining date" />
                  </Label>
                  <DatePicker
                  id='date'
                    selected={date}
                    onChange={(val) => setDate(val)}
                  />
                </FormGroup>

                <FormGroup>
                    <Label for='email'>
                    <IntlMessages id="Contact email" />
                    </Label>
                    <Input
                    id="email"
                    type="text"
                    onChange={(evt) => setEmail(evt.target.value)}
                  />
                </FormGroup>

                <FormGroup>
                    <Label for='sender'>
                        <IntlMessages id='Sender'/>
                    </Label>
                    <Input type="text" onChange={(evt) => setSender(evt.target.value)}/>
                </FormGroup>
              </div>
            </PerfectScrollbar>
          </ApplicationMenu>
        </Colxx>
      </Row>
    </>
  );
};

export default Offer;
