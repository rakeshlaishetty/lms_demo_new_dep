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
  import defaultStudent from '../images/default-student.png'
  // Create styles
  const styles = StyleSheet.create({
    page: {
      backgroundColor: "white"
    },
    card: {
      backgroundColor: 'moccasin',
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: 50,
      padding: 10,
      borderRadius: '8px',
      width: '400px',
      height: '250px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    imageSection: {
      width: '30%',
    },
    image: {
      height: '100px',
      width: '100px',
      marginBottom: '30px'
    },
    heading: {
      fontWeight: '800',
      color: 'blue',
      marginTop: '8px'
    },
    heading2: {
        fontWeight: '800',
        letterSpacing: '2px',
        marginTop: '10px'
    },
    headingAddress: {
      fontSize: '10px',
      color: 'black',
      marginBottom: '20px',
      textAlign: 'center'
    },
    infoSection: {
      width: '65%',
      marginRight: 'auto',
      marginLeft: 'auto',
      textAlign: 'left'
    },
    info: {
      fontSize: '15px',
      marginBottom: '10px'
    },
    viewer: {
      width: window.innerWidth, //the pdf viewer will take up all of the width and height
      height: window.innerHeight,
    },
  });
  
  // Create Document Component
  function ParentPass(props) {

    const history = useHistory();

    return (
      <PDFViewer style={styles.viewer}>
        {/* Start of the document*/}
        <Document title={`${history.location.state.name}_ID_Card`}>
          {/*render a single page*/}
          <Page size="A4" style={styles.page}>
            <View className='d-flex' style={styles.card}>
                  <Text style={styles.heading2}>PARENT PASS</Text>
                  <Text style={styles.heading}>Hiranandani Foundation School</Text>
                  <Text style={styles.headingAddress}>Orchard Avenue Road, Hiranandani Gardens, MHADA Colony 20, Powai, Mumbai, Maharashtra 400076</Text>
                  <View style={styles.infoSection}>
                      <Text style={styles.info}>Father's name: {history.location.state.father}</Text>
                      <Text style={styles.info}>Mother's name: {history.location.state.mother}</Text>
                      <Text style={styles.info}>Contact number: {history.location.state.phone}</Text>
                      <Text style={styles.info}>Address: {history.location.state.address}</Text>
                  </View>
            </View>
          </Page>
        </Document>
      </PDFViewer>
    );
  }
  export default ParentPass;