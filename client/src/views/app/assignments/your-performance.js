// import React, {useState, useEffect} from 'react';

// import { Card, CardBody, CardTitle, Row } from 'reactstrap';
// import { Colxx, Separator } from 'components/common/CustomBootstrap';
// import IntlMessages from 'helpers/IntlMessages';

// const YourPerformance = ({location}) => {
//     const [data, setData] = useState([]);

//     const getAssignment = async () => {
//         let res = await axios.get(`/assignments/getAssignmentsPerformance?id=${location.state.id}`);
//         if(res.status === 200){
//             setData(res.data);
//         }
//     }

//     useEffect(() => {
//         getAssignment();
//     }, [])

//   return (
//     <>
//       <Row>
//         <Colxx xxs="12">
//           <div className="mb-2">
//             <h1>Your Performance</h1>
//           </div>
//         </Colxx>
//       </Row>
//       <Separator className="mb-2"/>

//       <Row>
//         <Colxx xxs="12" lg="8">
//             <Card>
//                 <CardBody>
//                     <CardTitle>
//                         <IntlMessages id='Rankings'/>
//                     </CardTitle>
//                 </CardBody>
//             </Card>
//         </Colxx>
//       </Row>
//     </>
//   );
// };

// export default YourPerformance;
