import React from 'react';
import { Row } from 'reactstrap';
import { Colxx } from 'components/common/CustomBootstrap';
import RadialProgressCard from 'components/cards/RadialProgressCard';

const SortableStaticticsRow = () => {
  return (
    <Row className='w-100 d-flex justify-content-around'>
      <Colxx xl="3" lg="6" className="mb-4">
        <RadialProgressCard title="Admissions" percent={64} isSortable />
      </Colxx>

      <Colxx xl="3" lg="6" className="mb-4">
        <RadialProgressCard title="Faculty" percent={75} isSortable />
      </Colxx>

      <Colxx xl="3" lg="6" className="mb-4">
        <RadialProgressCard title="Staff" percent={82} isSortable />
      </Colxx>
    </Row>
  );
};
export default SortableStaticticsRow;
