import React, { useState } from 'react';
import {
  Row,
  Card,
  CardBody,
  Input,
  CardTitle,
  FormGroup,
  CustomInput,
  Label,
  Form,
} from 'reactstrap';
import Select from 'react-select';
import IntlMessages from 'helpers/IntlMessages';
import DatePicker from 'react-datepicker';
import ReactAutoSuggest from 'components/common/ReactAutoSuggest';
import 'react-datepicker/dist/react-datepicker.css';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import CustomSelectInput from 'components/common/CustomSelectInput';
import DropzoneComponent from 'react-dropzone-component';
import banks from '../../../data/banks';

const ReactDOMServer = require('react-dom/server');

const AdmitStudent = () => {
  const [selectedGender, setSelectedGender] = useState('');
  const [dob, setDob] = useState('');
  const [pwd, setPWD] = useState(false);
  const [bankName, setBankName] = useState('');

  const data = banks.map((item) => {
    return { name: item };
  });

  const dropzoneComponentConfig = {
    postUrl: 'https://httpbin.org/post',
  };
  const dropzoneConfig = {
    thumbnailHeight: 160,
    maxFilesize: 2,
    previewTemplate: ReactDOMServer.renderToStaticMarkup(
      <div className="dz-preview dz-file-preview mb-3">
        <div className="d-flex flex-row ">
          <div className="p-0 w-30 position-relative">
            <div className="dz-error-mark">
              <span>
                <i />{' '}
              </span>
            </div>
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
            <div className="dz-error-message">
              <span data-dz-errormessage />
            </div>
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

  return (
    <>
      <Row>
        <Colxx xxs="12">
          <h1>Admit Student</h1>
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Form>
        <Row className="mb-4">
          <Colxx xxs="12">
            <Card>
              <CardBody>
                <CardTitle>
                  <IntlMessages id="Personal Details" />
                </CardTitle>

                <FormGroup row>
                  <Colxx sm={12}>
                    <FormGroup>
                      <Label for="name">
                        <IntlMessages id="Student Name" />
                      </Label>
                      <Input type="text" name="name" id="name" />
                    </FormGroup>
                  </Colxx>
                </FormGroup>

                <FormGroup row>
                  <Colxx sm={6}>
                    <FormGroup>
                      <Label for="fatherName">
                        <IntlMessages id="Father's Name" />
                      </Label>
                      <Input type="text" name="fatherName" id="fatherName" />
                    </FormGroup>
                  </Colxx>
                  <Colxx sm={6}>
                    <FormGroup>
                      <Label for="motherName">
                        <IntlMessages id="Mother's Name" />
                      </Label>
                      <Input type="text" name="motherName" id="motherName" />
                    </FormGroup>
                  </Colxx>
                </FormGroup>

                <FormGroup row>
                  <Colxx sm={4}>
                    <Label for="motherName">
                      <IntlMessages id="Gender" />
                    </Label>
                    <Select
                      components={{ Input: CustomSelectInput }}
                      className="react-select"
                      classNamePrefix="react-select"
                      name="form-field-name"
                      value={selectedGender}
                      onChange={setSelectedGender}
                      options={[
                        { label: 'Male', value: 'male', key: 0 },
                        { label: 'Female', value: 'female', key: 1 },
                        { label: 'Other', value: 'other', key: 2 },
                      ]}
                    />
                  </Colxx>
                  <Colxx sm={4}>
                    <Label for="dob">
                      <IntlMessages id="Date of Birth" />
                    </Label>
                    <DatePicker id="dob" selected={dob} onChange={setDob} />
                  </Colxx>
                  <Colxx sm={4}>
                    <CustomInput
                      className="mt-4"
                      type="checkbox"
                      id="disability"
                      label="Person with Disability ?"
                      onChange={() => setPWD(!pwd)}
                    />
                  </Colxx>
                </FormGroup>

                <FormGroup row>
                  <Colxx sm={4}>
                    <Label for="exCustomRadio">
                      <IntlMessages id="Caste" />
                    </Label>
                    <Input type="text" name="caste" id="caste" />
                  </Colxx>
                  <Colxx sm={8}>
                    <Label for="exCustomRadio">
                      <IntlMessages id="Category" />
                    </Label>
                    <div>
                      <CustomInput
                        type="radio"
                        id="open"
                        name="category"
                        value="open"
                        label="Open Category"
                        inline
                      />
                      <CustomInput
                        type="radio"
                        id="obc"
                        name="category"
                        value="obc"
                        label="Outer Backward Class (OBC)"
                        inline
                      />
                      <CustomInput
                        type="radio"
                        id="sc-st"
                        name="category"
                        value="sc/st"
                        label="Scheduled Caste / Scheduled Tribes (SC/ST)"
                        inline
                      />
                    </div>
                  </Colxx>
                </FormGroup>

                <FormGroup row>
                  <Colxx sm={12}>
                    <FormGroup>
                      <Label for="exampleAddressGrid">
                        <IntlMessages id="forms.address" />
                      </Label>
                      <Input
                        type="text"
                        name="address"
                        id="exampleAddressGrid"
                        placeholder=""
                      />
                    </FormGroup>
                  </Colxx>

                  <Colxx sm={6}>
                    <FormGroup>
                      <Label for="exampleEmailGrid">
                        <IntlMessages id="forms.city" />
                      </Label>
                      <Input
                        type="text"
                        name="exampleTextGrid"
                        id="exampleTextGrid"
                        placeholder=""
                      />
                    </FormGroup>
                  </Colxx>

                  <Colxx sm={3}>
                    <Label for="exampleZipGrid">
                      <IntlMessages id="forms.zip" />
                    </Label>
                    <Input
                      type="text"
                      name="exampleZipGrid"
                      id="exampleZipGrid"
                      placeholder=""
                    />
                  </Colxx>
                </FormGroup>

                {/* <Button color="primary">
                  <IntlMessages id="forms.signup" />
                </Button> */}
              </CardBody>
            </Card>
          </Colxx>
        </Row>

        <Row className="mb-4">
          <Colxx xxs="12">
            <Card>
              <CardBody>
                <CardTitle>
                  <IntlMessages id="Contact Details" />
                </CardTitle>

                <FormGroup row>
                  <Colxx sm={6}>
                    <Label for="fatherContact">
                      <IntlMessages id="Father's Contact" />
                    </Label>
                    <Input
                      type="text"
                      name="fatherContact"
                      id="fatherContact"
                      placeholder=""
                    />
                  </Colxx>
                  <Colxx sm={6}>
                    <Label for="motherContact">
                      <IntlMessages id="Mother's Contact" />
                    </Label>
                    <Input
                      type="text"
                      name="motherContact"
                      id="motherContact"
                      placeholder=""
                    />
                  </Colxx>
                </FormGroup>

                <FormGroup row>
                  <Colxx sm={6}>
                    <Label for="fatherEmail">
                      <IntlMessages id="Father's Email" />
                    </Label>
                    <Input
                      type="email"
                      name="fatherEmail"
                      id="fatherEmail"
                      placeholder=""
                    />
                  </Colxx>
                  <Colxx sm={6}>
                    <Label for="motherEmail">
                      <IntlMessages id="Mother's Email" />
                    </Label>
                    <Input
                      type="email"
                      name="motherEmail"
                      id="motherEmail"
                      placeholder=""
                    />
                  </Colxx>
                </FormGroup>

                <FormGroup row>
                  <Colxx sm={6}>
                    <Label for="homeContact">
                      <IntlMessages id="Landline number" />
                    </Label>
                    <Input
                      type="text"
                      name="homeContact"
                      id="homeContact"
                      placeholder=""
                    />
                  </Colxx>
                </FormGroup>
              </CardBody>
            </Card>
          </Colxx>
        </Row>

        <Row className="mb-4">
          <Colxx xxs="12">
            <Card>
              <CardBody>
                <CardTitle>
                  <IntlMessages id="Guardian Details" />
                </CardTitle>

                <FormGroup row>
                  <Colxx sm={6}>
                    <Label for="guardianName">
                      <IntlMessages id="Guardian Name" />
                    </Label>
                    <Input
                      type="text"
                      name="guardianName"
                      id="guardianName"
                      placeholder=""
                    />
                  </Colxx>
                  <Colxx sm={6}>
                    <Label for="guardianEmail">
                      <IntlMessages id="Guardian Email" />
                    </Label>
                    <Input
                      type="email"
                      name="guardianEmail"
                      id="guardianEmail"
                      placeholder=""
                    />
                  </Colxx>
                </FormGroup>

                <FormGroup row>
                  <Colxx sm={6}>
                    <Label for="guardianNumber">
                      <IntlMessages id="Guardian Contact Number" />
                    </Label>
                    <Input
                      type="text"
                      name="guardianNumber"
                      id="guardianNumber"
                      placeholder=""
                    />
                  </Colxx>
                  <Colxx sm={6}>
                    <Label for="guardianOccupation">
                      <IntlMessages id="Guardian Occupation" />
                    </Label>
                    <Input
                      type="text"
                      name="guardianOccupation"
                      id="guardianOccupation"
                      placeholder=""
                    />
                  </Colxx>
                </FormGroup>
              </CardBody>
            </Card>
          </Colxx>
        </Row>

        <Row className="mb-4">
          <Colxx xxs="12">
            <Card>
              <CardBody>
                <CardTitle>
                  <IntlMessages id="Previous School Details" />
                </CardTitle>

                <FormGroup row>
                  <Colxx sm={12}>
                    <Label for="prevSchoolName">
                      <IntlMessages id="Previous School Name" />
                    </Label>
                    <Input
                      type="text"
                      name="prevSchoolName"
                      id="prevSchoolName"
                      placeholder=""
                    />
                  </Colxx>
                </FormGroup>

                <FormGroup row>
                  <Colxx sm={6}>
                    <Label for="prevSchoolCity">
                      <IntlMessages id="City" />
                    </Label>
                    <Input
                      type="text"
                      name="prevSchoolCity"
                      id="prevSchoolCity"
                      placeholder=""
                    />
                  </Colxx>
                  <Colxx sm={6}>
                    <Label for="prevSchoolState">
                      <IntlMessages id="State" />
                    </Label>
                    <Input
                      type="text"
                      name="prevSchoolState"
                      id="prevSchoolState"
                      placeholder=""
                    />
                  </Colxx>
                </FormGroup>
              </CardBody>
            </Card>
          </Colxx>
        </Row>

        <Row className="mb-4">
          <Colxx xxs="12">
            <Card>
              <CardBody>
                <CardTitle>
                  <IntlMessages id="Bank Details" />
                </CardTitle>

                <FormGroup row>
                  <Colxx sm={12}>
                    <Label for="bankName">
                      <IntlMessages id="Bank Name" />
                    </Label>
                    <ReactAutoSuggest
                      id="bankName"
                      value={bankName}
                      onChange={(val) => setBankName(val)}
                      data={data}
                    />
                  </Colxx>
                </FormGroup>

                <FormGroup row>
                  <Colxx sm={6}>
                    <Label for="fatherBankIfsc">
                      <IntlMessages id="IFSC Code" />
                    </Label>
                    <Input
                      type="text"
                      name="fatherBankIfsc"
                      id="fatherBankIfsc"
                      placeholder=""
                    />
                  </Colxx>
                  <Colxx sm={6}>
                    <Label for="fatherAccountNo">
                      <IntlMessages id="Account Number" />
                    </Label>
                    <Input
                      type="text"
                      name="fatherAccountNo"
                      id="fatherAccountNo"
                      placeholder=""
                    />
                  </Colxx>
                </FormGroup>

                <FormGroup row>
                    <Colxx sm={12}>
                    <Label for="fatherAccountNo">
                      <IntlMessages id="Upload cancelled check" />
                    </Label>
                  <DropzoneComponent
                    config={dropzoneComponentConfig}
                    djsConfig={dropzoneConfig}
                  />
                    </Colxx>
                </FormGroup>
              </CardBody>
            </Card>
          </Colxx>
        </Row>
      </Form>
    </>
  );
};

export default AdmitStudent;
