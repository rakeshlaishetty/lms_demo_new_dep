import React from "react";
import { useHistory } from "react-router-dom";
import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    PDFViewer,
    Image,
  } from "@react-pdf/renderer";
  import defaultUser from '../images/default.jpg'
  // Create styles
  // const styles = StyleSheet.create({
  //   page: {
  //     backgroundColor: "white",
  //     padding: 30
  //   },
  //   heading: {
  //     fontWeight: '800',
  //     color: 'blue'
  //   },
  //   headingAddress: {
  //     fontSize: '10px',
  //     color: 'black',
  //     marginBottom: '20px',
  //     textAlign: 'left'
  //   },
  //   infoSection: {
  //     width: '65%',
  //     marginRight: 'auto',
  //     marginLeft: 'auto',
  //     textAlign: 'left'
  //   },
  //   info: {
  //     fontSize: '15px',
  //     marginBottom: '10px'
  //   },
  //   viewer: {
  //     width: window.innerWidth, //the pdf viewer will take up all of the width and height
  //     height: window.innerHeight,
  //   },
  // });
  const styles = StyleSheet.create({
    page: {
      backgroundColor: "white",
      marginRight: 40,
      padding: 40,
      border: "1px solid black",
    },
    heading: {
      fontWeight: 980,
      color: "blue",
      letterSpacing: "1.5px",
      wordSpacing: "10px",
      fontSize: "30px",
      margingBottom: "4px",
    },
    headingAddress: {
      fontSize: "11px",
      color: "black",
      textAlign: "left",
    },
    infoSection: {
      width: "73%",
      marginRight: "auto",
      marginLeft: "auto",
      textAlign: "left",
    },
    info: {
      fontSize: "15px",
      marginBottom: "10px",
    },
    viewer: {
      width: window.innerWidth, //the pdf viewer will take up all of the width and height
      height: window.innerHeight,
      padding: "30",
      boxSizing: "border-box",
    },
    subHeading: {
      marginTop: "12px",
      paddingTop: "7px",
      paddingBottom: "7px",
      fontSize: "22px",
      border: "1px solid #ff5c95",
      color: "white",
      backgroundColor: "#ff5c93",
      fontWeight: "800",
      paddingLeft: "7px",
    },
  });
  
  // Create Document Component
  function AdmissionDoc(props) {

    const history = useHistory();

    return (
      // <PDFViewer style={styles.viewer}>
      //   {/* Start of the document*/}
      //   <Document title={`${history.location.state.name}_ID_Card`}>
      //     {/*render a single page*/}
      //     <Page size="A4" style={styles.page}>
      //       <Text style={styles.heading}>Hiranandani Foundation School</Text>
      //       <Text style={styles.headingAddress}>Orchard Avenue Road, Hiranandani Gardens, MHADA Colony 20, Powai, Mumbai, Maharashtra 400076</Text>
                  
      //       <View className='d-flex'>
      //             <View style={styles.infoSection}>
      //                 <Text style={styles.info}>Student ID: {history.location.state.id}</Text>
      //                 <hr/>
      //                 <Text style={styles.info}>Name: {history.location.state.name}</Text>
      //                 <Text style={styles.info}>Email ID: {history.location.state.email}</Text>
      //                 <Text style={styles.info}>Contact number: {history.location.state.phone}</Text>
      //                 <Text style={styles.info}>Father's name: {history.location.state.father_name}</Text>
      //                 <Text style={styles.info}>Mother's name: {history.location.state.mother_name}</Text>
      //                 <Text style={styles.info}>Address: {history.location.state.address}</Text>
      //                 <Text style={styles.info}>Age: {history.location.state.age}</Text>
      //                 <Text style={styles.info}>Class: {history.location.state.class}</Text>
      //                 <Text style={styles.info}>Division: {history.location.state.division.toUpperCase()}</Text>
      //             </View>
      //       </View>
      //     </Page>
      //   </Document>
      // </PDFViewer>
      <PDFViewer style={styles.viewer}>
      {/* Start of the document*/}
      <Document title={`${history.location.state.name}_ID_Card`}>
        {/*render a single page*/}
        <Page size="A4" style={styles.page}>
          <div style={{ marginBottom: "10%" }}>
            <Text style={styles.heading}>Hiranandani Foundation School</Text>
            <Text style={styles.headingAddress}>
              Orchard Avenue Road, Hiranandani Gardens, MHADA Colony 20,
            </Text>
            <Text style={styles.headingAddress}>
              {" "}
              Powai, Mumbai, Maharashtra 400076
            </Text>
          </div>

          <div>
            <div style={{ padding: "10px 0px" }}>
              <Text style={styles.subHeading}>Personal Info</Text>
            </div>
            <View className="d-flex">
              <View style={styles.infoSection}>
                {/* <Text style={styles.info}>Student ID: {history.location.state.id}</Text> */}

                <Text style={styles.info}>
                  Name: {history.location.state.name}
                </Text>
                {/* <Text style={styles.info}>Email ID: {history.location.state.email}</Text> */}
                {/* <Text style={styles.info}>Contact number: {history.location.state.phone}</Text> */}
                <Text style={styles.info}>
                  Father's name: {history.location.state.father_name}
                </Text>
                <Text style={styles.info}>
                  Mother's name: {history.location.state.mother_name}
                </Text>
                {/* <Text style={styles.info}>Address: {history.location.state.address}</Text> */}
                <Text style={styles.info}>
                  Age: {history.location.state.age}
                </Text>
                {/* <Text style={styles.info}>Class: {history.location.state.class}</Text> */}
                {/* <Text style={styles.info}>Division: {history.location.state.division.toUpperCase()}</Text> */}
              </View>
            </View>
          </div>
          <div>
            <div style={{ padding: "10px 0px" }}>
              <Text style={styles.subHeading}>Academic Info</Text>
            </div>
            <View className="d-flex">
              <View style={styles.infoSection}>
                <Text style={styles.info}>
                  Student ID: {history.location.state.id}
                </Text>

                {/* <Text style={styles.info}>Name: {history.location.state.name}</Text> */}
                {/* <Text style={styles.info}>Email ID: {history.location.state.email}</Text> */}
                {/* <Text style={styles.info}>Contact number: {history.location.state.phone}</Text> */}
                {/* <Text style={styles.info}>Father's name: {history.location.state.father_name}</Text> */}
                {/* <Text style={styles.info}>Mother's name: {history.location.state.mother_name}</Text> */}
                {/* <Text style={styles.info}>Address: {history.location.state.address}</Text> */}
                {/* <Text style={styles.info}>Age: {history.location.state.age}</Text> */}
                <Text style={styles.info}>
                  Class: {history.location.state.class}
                </Text>
                <Text style={styles.info}>
                  Division: {history.location.state.division.toUpperCase()}
                </Text>
              </View>
            </View>
          </div>
          <div>
            <div style={{ padding: "10px 0px" }}>
              <Text style={styles.subHeading}>Contact Info</Text>
            </div>
            <View className="d-flex">
              <View style={styles.infoSection}>
                {/* <Text style={styles.info}>Student ID: {history.location.state.id}</Text> */}

                {/* <Text style={styles.info}>Name: {history.location.state.name}</Text> */}
                <Text style={styles.info}>
                  Contact number: {history.location.state.phone}
                </Text>
                <Text style={styles.info}>
                  Email ID: {history.location.state.email}
                </Text>
                {/* <Text style={styles.info}>Father's name: {history.location.state.father_name}</Text> */}
                {/* <Text style={styles.info}>Mother's name: {history.location.state.mother_name}</Text> */}
                <Text style={styles.info}>
                  Address: {history.location.state.address}
                </Text>
                {/* <Text style={styles.info}>Age: {history.location.state.age}</Text> */}
                {/* <Text style={styles.info}>Class: {history.location.state.class}</Text> */}
                {/* <Text style={styles.info}>Division: {history.location.state.division.toUpperCase()}</Text> */}
              </View>
            </View>
          </div>
        </Page>
      </Document>
    </PDFViewer>
    );
  }
  export default AdmissionDoc;