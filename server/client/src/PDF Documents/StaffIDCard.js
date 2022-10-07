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
  const styles = StyleSheet.create({
    page: {
      backgroundColor: "white"
    },
    card: {
      backgroundColor: '#E0FFFF',
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: 50,
      padding: 10,
      border: '1px solid black',
      borderRadius: '8px',
      width: '300px',
      height: '400px',
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
      color: 'blue'
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
  function IDCard(props) {

    const history = useHistory();

    return (
      <PDFViewer style={styles.viewer}>
        {/* Start of the document*/}
        <Document title={`${history.location.state.data.name}_ID_Card`}>
          {/*render a single page*/}
          <Page size="A4" style={styles.page}>
            <View className='d-flex' style={styles.card}>
                  <Text style={styles.heading}>Hiranandani Foundation School</Text>
                  <Text style={styles.headingAddress}>Orchard Avenue Road, Hiranandani Gardens, MHADA Colony 20, Powai, Mumbai, Maharashtra 400076</Text>
                  <Image style={styles.image} src={defaultUser}/>
                  <View style={styles.infoSection}>
                      <Text style={styles.info}>Employee ID: {history.location.state.data._id}</Text>
                      <Text style={styles.info}>Name: {history.location.state.data.name}</Text>
                      <Text style={styles.info}>Designation: {history.location.state.data.staffType}</Text>
                      <Text style={styles.info}>Contact: {history.location.state.data.phone}</Text>
                      <Text style={styles.info}>Email ID: {history.location.state.data.email}</Text>
                      <Text style={styles.info}>Joined: {history.location.state.data.joined}</Text>
                  </View>
            </View>
          </Page>
        </Document>
      </PDFViewer>
    );
  }
  export default IDCard;