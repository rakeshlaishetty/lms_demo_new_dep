/* eslint no-underscore-dangle: 0 */
/* eslint no-unused-vars: 0 */
/* eslint-disable react/no-array-index-key */
/* eslint no-nested-ternary: 0 */
/* eslint prefer-template: 0 */
import React, { useEffect, useState } from 'react';
import { Row, Card, CardBody, Button } from 'reactstrap';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import axios from 'axios';
import { saveAs } from 'file-saver';

import pdf from '../../../assets/img/documents/pdf.png';
import png from '../../../assets/img/documents/png.png';
import jpg from '../../../assets/img/documents/jpg.png';
import csv from '../../../assets/img/documents/csv.png';
import jpeg from '../../../assets/img/documents/jpeg.png';
import docx from '../../../assets/img/documents/docx.png';
import xlsx from '../../../assets/img/documents/xlsx.png';
import gif from '../../../assets/img/documents/gif.png';
import pptx from '../../../assets/img/documents/pptx.png';

const FileSaver = require('file-saver');

const AWS = require('aws-sdk');

const Library = () => {
  const [data, setData] = useState([]);

  const config = {
    accessKeyId: process.env.ACCESS_KEY_ID,
    accessSecretKey: process.env.SECRET_ACCESS_KEY,
    region: 'ap-south-1',
  };
  AWS.config.update(config);

  const getData = async () => {
    const classDetails = JSON.parse(
      window.localStorage.getItem('classDetails')
    );
    const res = await axios.get(
      `/documents/getDocuments?classId=${classDetails._id}`
    );
    if (res.status === 200) {
      setData(res.data);
    }else{
      alert('something went wrong')
    }
  };

  const imgs = {
    'application/pdf': pdf,
    'text/csv': csv,
    'image/jpg': jpg,
    'image/png': png,
    'image/jpeg': jpeg,
    'docx': docx,
    'pptx': pptx,
  };

  useEffect(() => {
    getData();
  }, []);

  const handleDownload = async (id, url, type) => {
    const res = await axios.get(`/documents/download-file?key=${id}`, {
      responseType: 'blob',
    });
    const blob = new Blob([res.data], { type: type });
    FileSaver.saveAs(blob, url);
    // if(res.status === 200){
    //   const blob = URL.createObjectURL(new Blob([data], {type: 'image/jpeg'}));
    //   const link = document.createElement('a');
    //   link.setAttribute('href', blob);
    //   link.setAttribute('download', url);
    //   // link.download=url;
    //   link.click();
    // }
  };

  return (
    <>
      <Row>
        <Colxx xxs="12">
          <div className="d-flex justify-content-between align-items-center">
            <h1>Your Library</h1>
            {/* <Button
              onClick={() => setModalRight(!modalRight)}
              outline
              color="primary"
              className="mb-2"
            >
              <div className="glyph-icon simple-icon-info" />
            </Button> */}
          </div>
        </Colxx>
      </Row>
      <Separator className="mb-4" />
      <Row>
        <Colxx xxs="12" className="d-flex flex-wrap">
          {data.map((item, index) => (
            <Colxx key={index} className="mb-4 mx-2" xxs="12" lg="3">
              <Card>
                <CardBody>
                  <div className="w-100 flex-column text-center">
                    <img
                      alt="file-format"
                      src={imgs[item.format]}
                      style={{ height: '70px' }}
                    />
                    <h3 className="mt-4">{item.name}</h3>
                    <div className="mt-4 text-small w-100 d-flex justify-content-between align-items-center">
                      <p style={{ fontSize: '0.9em' }} className="text-muted">
                        {item.format.split('/')[1].toUpperCase()}
                      </p>
                      <p style={{ fontSize: '0.9em' }} className="text-muted">
                        20MB
                      </p>
                      <p style={{ fontSize: '0.9em' }} className="text-muted">
                        {new Date().toLocaleDateString()}
                      </p>
                    </div>
                    {/* <a className='mt-2' href='https://res.cloudinary.com/db0vkpdye/image/upload/fl_attachment/v1665060316/Shared%20Documents/az1gysjrvbqwh0tjo9sm.jpg'><Button>Download</Button></a> */}
                    {/* <a className='mt-2' href={item.url.slice(0, 49) + `/fl_attachment:${item.name}/` + item.url.slice(49)}><Button>Download</Button></a> */}
                    <Button
                      onClick={() =>
                        handleDownload(
                          item._id,
                          item.name,
                          item.format
                        )
                      }
                    >
                      Download
                    </Button>
                  </div>
                </CardBody>
              </Card>
            </Colxx>
          ))}
        </Colxx>
      </Row>
    </>
  );
};

export default Library;
