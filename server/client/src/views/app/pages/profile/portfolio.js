import React, { useState } from 'react';
import {
  Row,
  Card,
  CardBody,
  Nav,
  NavItem,
  Button,
  TabContent,
  TabPane,
  Badge,
  CardTitle,
} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';
import { Colxx } from 'components/common/CustomBootstrap';
import IntlMessages from 'helpers/IntlMessages';
import SingleLightbox from 'components/pages/SingleLightbox';
import GradientWithRadialProgressCard from 'components/cards/GradientWithRadialProgressCard';
import RadialProgressCard from 'components/cards/RadialProgressCard';
import { ReactSortable } from 'react-sortablejs';

const ProfilePortfolio = () => {
  const [activeTab, setActiveTab] = useState('details');
  const [state, setState] = useState([
    {
      key: 1,
      title: 'dashboards.payment-status',
      percent: 64,
    },
    {
      key: 2,
      title: 'dashboards.work-progress',
      percent: 75,
    },
    {
      key: 3,
      title: 'dashboards.tasks-completed',
      percent: 32,
    },
    {
      key: 4,
      title: 'dashboards.payments-done',
      percent: 45,
    },
  ]);

  return (
    <>
      <Row>
        <Colxx xxs="12">
          <h1>Your Profile</h1>

          <Nav tabs className="separator-tabs ml-0 mb-5">
            <NavItem>
              <NavLink
                className={classnames({
                  active: activeTab === 'details',
                  'nav-link': true,
                })}
                onClick={() => {
                  setActiveTab('details');
                }}
                location={{}}
                to="#"
              >
                <IntlMessages id="pages.details" />
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({
                  active: activeTab === 'followers',
                  'nav-link': true,
                })}
                onClick={() => {
                  setActiveTab('followers');
                }}
                location={{}}
                to="#"
              >
                <IntlMessages id="TAB 2" />
              </NavLink>
            </NavItem>
          </Nav>

          <TabContent activeTab={activeTab}>
            <TabPane tabId="details">
              <Row>
                <Colxx xxs="12" lg="4" className="mb-4 col-left">
                  <Card className="mb-4">
                    <div className="position-absolute card-top-buttons">
                      <Button outline color="white" className="icon-button">
                        <i className="simple-icon-pencil" />
                      </Button>
                    </div>
                    <SingleLightbox
                      thumb="/assets/img/profiles/default-user.png"
                      large="/assets/img/profiles/default-user.png"
                      className="card-img-top"
                    />

                    <CardBody>
                      <h2 className="mb-3">Archit Chitre</h2>
                      <p className="text-muted text-small mb-2">
                        <IntlMessages id="Class" />
                      </p>
                      <p className="mb-3">8 - A</p>

                      <p className="text-muted text-small mb-2">
                        <IntlMessages id="Subjects" />
                      </p>
                      <p className="mb-3">
                        <Badge
                          color="outline-secondary"
                          className="mb-1 mr-1"
                          pill
                        >
                          SCIENCE
                        </Badge>
                        <Badge
                          color="outline-secondary"
                          className="mb-1 mr-1"
                          pill
                        >
                          HISTORY
                        </Badge>
                        <Badge
                          color="outline-secondary"
                          className="mb-1 mr-1"
                          pill
                        >
                          GEOGRAPHY
                        </Badge>
                        <Badge
                          color="outline-secondary"
                          className="mb-1 mr-1"
                          pill
                        >
                          ART
                        </Badge>
                      </p>
                      <p className="text-muted text-small mb-2">
                        <IntlMessages id="menu.contact" />
                      </p>
                      <p className="mb-3">7506960902 / 7977690167</p>
                      <p className="text-muted text-small mb-2">
                        <IntlMessages id="Address" />
                      </p>
                      <p className="mb-3">
                        Runwal Garden City, Thane, Maharashtra - 400608
                      </p>
                    </CardBody>
                  </Card>
                </Colxx>

                <Colxx xxs="12" lg="8" className="mb-4 col-right">
                  <div className='d-flex flex-lg-row justify-content-between align-items-center'>
                  <GradientWithRadialProgressCard
                  className='mx-5'
                    icon="iconsminds-blackboard"
                    title="Attendance"
                    detail=''
                    percent={75}
                    progressText='75%'
                  />
                  <GradientWithRadialProgressCard
                  className='mx-5'
                    icon="iconsminds-blackboard"
                    title="Attendance"
                    detail=''
                    percent={75}
                    progressText='75%'
                  />
                  </div>
                </Colxx>
                
                <Colxx xxs='12'>
                <ReactSortable
      list={state}
      setList={setState}
      options={{ handle: '.handle' }}
      className="row"
    >
      {state.map((x) => {
        return (
          <Colxx xl="3" lg="6" className="mb-4" key={x.key}>
            <RadialProgressCard
              title='title'
              percent={x.percent}
              isSortable
            />
          </Colxx>
        );
      })}
    </ReactSortable>

                </Colxx>
              </Row>
            </TabPane>
            <TabPane tabId="followers">
              <Row>
                <Colxx xxs="12" lg="8">
                  <Card>
                    <CardBody>
                      <CardTitle>
                        <IntlMessages id="A" />
                      </CardTitle>
                    </CardBody>
                  </Card>
                </Colxx>
              </Row>
            </TabPane>
          </TabContent>
        </Colxx>
      </Row>
    </>
  );
};
export default ProfilePortfolio;
