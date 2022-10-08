/* eslint no-underscore-dangle: 0 */
/* eslint no-unused-vars: 0 */
/* eslint-disable jsx-a11y/label-has-for */
import React, { useState, useEffect } from 'react';
import {
  Row,
  Label,
  Form,
  Input,
  NavLink,
  Nav,
  NavItem,
  FormGroup,
  Button,
  Card,
  Modal,
  ModalHeader,
  ModalBody,
  CardBody,
} from 'reactstrap';
import classnames from 'classnames';
import Select from 'react-select';
import DropzoneComponent from 'react-dropzone-component';
import { Colxx } from 'components/common/CustomBootstrap';
import { NotificationManager } from 'components/common/react-notifications';
import CustomSelectInput from 'components/common/CustomSelectInput';
import IntlMessages from 'helpers/IntlMessages';
import axios from 'axios';

const ReactDOMServer = require('react-dom/server');

const Library = () => {
  const [activeTab, setActiveTab] = useState('Students');
  const [modalRight, setModalRight] = useState(false);
  const [classes, setClasses] = useState([]);
  const [classesData, setClassesData] = useState([]);
  const [name, setName] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const dropzoneComponentConfig = {
    iconFiletypes: ['.jpg', '.png', '.gif'],
    showFiletypeIcon: true,
    postUrl: 'no-url',
  };
  const dropzoneConfig = {
    thumbnailHeight: 160,
    maxFilesize: 2,
    previewTemplate: ReactDOMServer.renderToStaticMarkup(
      <div className="dz-preview dz-file-preview mb-3">
        <div className="d-flex flex-row ">
          <div className="p-0 w-30 position-relative">
            {/* <div className="dz-error-mark">
              <span>
                <i />{' '}
              </span>
            </div> */}
            <div className="dz-success-mark">
              <span>
                <i />
              </span>
            </div>
            <div className="preview-container">
              {/*  eslint-disable-next-line jsx-a11y/alt-text */}
              <img data-dz-thumbnail className="img-thumbnail border-0" />
              <i className="simple-icon-doc preview-icon" />
            </div>
          </div>
          <div className="pl-3 pt-2 pr-2 pb-1 w-70 dz-details position-relative">
            <div>
              {' '}
              <span data-dz-name />{' '}
            </div>
            <div className="text-primary text-extra-small" data-dz-size />
            <div className="dz-progress">
              <span className="dz-upload" data-dz-uploadprogress />
            </div>
            {/* <div className="dz-error-message">
              <span data-dz-errormessage />
            </div> */}
          </div>
        </div>
        <a href="#/" className="remove" data-dz-remove>
          {' '}
          <i className="glyph-icon simple-icon-trash" />{' '}
        </a>
      </div>
    ),
    headers: { 'My-Awesome-Header': 'header value' },
  };

  const createNotification = (type, className, msg, title) => {
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
        NotificationManager.success(msg, title, 3000, null, null, cName);
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
          title,
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

  const categoryData = [
    { label: 'Textbook', value: 'Textbook', key: 0 },
    { label: 'Reference book', value: 'Reference book', key: 1 },
    { label: 'Assignment', value: 'Assignment', key: 2 },
    { label: 'Worksheet', value: 'Worksheet', key: 3 },
    { label: 'Map', value: 'Map', key: 4 },
    { label: 'Presentation', value: 'Presentation', key: 5 },
    { label: 'Exam results', value: 'Exam results', key: 6 },
    { label: 'Certificate', value: 'Certificate', key: 7 },
    { label: 'Other', value: 'Other', key: 8 },
  ];

  const getClasses = async () => {
    const teacher = JSON.parse(window.localStorage.getItem('userdata'));
    const res = await axios.get(
      `/classes/getClasses?schoolId=${teacher.schoolId}`
    );
    if (res.status === 200) {
      setClasses(res.data);
    }
  };

  useEffect(() => {
    getClasses();
  }, []);

  useEffect(() => {
    if (classes.length) {
      const temp = [];
      for (let i = 0; i < classes.length; i += 1) {
        temp.push({
          label: `${classes[i].class} ${classes[i].division}`,
          value: classes[i]._id,
          key: i,
        });
      }
      setClassesData(temp);
    }
  }, [classes]);

  const setFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (e) => {
      setSelectedFile(e.target.result);
    };
  };

  const submit = async (evt) => {
    evt.preventDefault();

    const formData = {
      name: name,
      category: selectedCategory.value,
      classId: selectedClass.value,
      file: selectedFile,
    };

    const res = await axios.post('/documents/share-document', formData);
    if (res.status === 200) {
      createNotification(
        'success',
        'filled',
        'Students will be able to see your shared file.',
        'File shared successfully!'
      );
    }
  };

  return (
    <>
      <Row>
        <Colxx xxs="12">
          <div className="d-flex justify-content-between align-items-center">
            <h1>Library</h1>
            <Button
              onClick={() => setModalRight(!modalRight)}
              outline
              color="primary"
              className="mb-2"
            >
              <div className="glyph-icon simple-icon-info" />
            </Button>
          </div>

          <Nav tabs className="separator-tabs ml-0 mb-5">
            <NavItem>
              <NavLink
                location={{}}
                to="#"
                className={classnames({
                  active: activeTab === 'Students',
                  'nav-link': true,
                })}
                onClick={() => setActiveTab('Students')}
              >
                <IntlMessages id="SHARE WITH STUDENTS" />
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                location={{}}
                to="#"
                className={classnames({
                  active: activeTab === 'Teachers',
                  'nav-link': true,
                })}
                onClick={() => setActiveTab('Teachers')}
              >
                <IntlMessages id="SHARE WITH TEACHERS" />
              </NavLink>
            </NavItem>
          </Nav>
        </Colxx>
      </Row>

      {activeTab === 'Students' ? (
        <Card>
          <CardBody>
            <Form className="mt-3" onSubmit={submit}>
              <FormGroup row>
                <Colxx xxs="3">
                  <Label for="name">
                    <IntlMessages id="File Name" />
                  </Label>
                </Colxx>
                <Colxx xxs="9">
                  <Input
                    value={name}
                    onChange={(evt) => setName(evt.target.value)}
                    name="name"
                    placeholder="Ex. A Brief History of Time - by Stephen Hawkings"
                    type="text"
                  />
                </Colxx>
              </FormGroup>
              <FormGroup row>
                <Colxx xxs="3">
                  <Label for="class">
                    <IntlMessages id="Class" />
                  </Label>
                </Colxx>
                <Colxx xxs="9">
                  <Select
                    components={{ Input: CustomSelectInput }}
                    className="react-select"
                    classNamePrefix="react-select"
                    name="class"
                    value={selectedClass}
                    onChange={(val) => setSelectedClass(val)}
                    options={classesData}
                  />
                </Colxx>
              </FormGroup>
              <FormGroup row>
                <Colxx xxs="3">
                  <Label for="category">
                    <IntlMessages id="File Category" />
                  </Label>
                </Colxx>
                <Colxx xxs="9">
                  <Select
                    components={{ Input: CustomSelectInput }}
                    className="react-select"
                    classNamePrefix="react-select"
                    name="category"
                    value={selectedCategory}
                    onChange={(val) => setSelectedCategory(val)}
                    options={categoryData}
                  />
                </Colxx>
              </FormGroup>
              {/* <FormGroup className="mt-2" row>
                <Colxx xxs="3">
                  <Label for="file">
                    <IntlMessages id="Choose file" />
                  </Label>
                </Colxx>
                <Colxx xxs="9">
                  <Input
                    accept="image/jpeg,image/gif,image/png,application/pdf,image/x-eps"
                    onChange={(evt) => setFile(evt.target.files[0])}
                    type="file"
                    name="file"
                    id="file"
                  />
                </Colxx>
              </FormGroup> */}

              <FormGroup>
                <Colxx xxs="12">
                  <DropzoneComponent
                    config={dropzoneComponentConfig}
                    djsConfig={dropzoneConfig}
                    eventHandlers={{
                      addedfile: (file) => {
                        setFile(file);
                      },
                    }}
                  />
                </Colxx>
              </FormGroup>

              <div className="w-100 mt-3 d-flex justify-content-center align-items-center">
                <Button type="submit" onClick={submit}>
                  <IntlMessages id="Share" />
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      ) : (
        <Card>
          <CardBody>Share with teachers</CardBody>
        </Card>
      )}

      <Modal
        isOpen={modalRight}
        toggle={() => setModalRight(!modalRight)}
        wrapClassName="modal-right"
      >
        <ModalHeader>Documents sharing</ModalHeader>
        <ModalBody>
          <p>
            The Library is a facility to share digital documents with your
            students.
          </p>
          <p>
            You can share textbooks, study materials, scanned worksheets,
            assignments or other academic material. Supported file formats are
            PDF, JPEG, JPG, PNG.
          </p>

          <p>
            Just choose the class you want to share your material with, select
            the document, give it a name and finally select an appropriate tag.
            Click in the Share button to upload your document.
          </p>
          <p>
            Please ensure that your documents are not more than 50MB in size.
          </p>
        </ModalBody>
      </Modal>
    </>
  );
};

export default Library;
