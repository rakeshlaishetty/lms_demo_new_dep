import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    Font,
    PDFViewer,
    Image
  } from "@react-pdf/renderer";
  import {Table, TableHeader, TableCell, DataTableCell, TableBody} from "@david.kucsai/react-pdf-table";


  Font.register({ family: 'Quicksand', src: "https://fonts.googleapis.com/css2?family=Quicksand&display=swap" });

  const styles = StyleSheet.create({
    viewer: {
        width: window.innerWidth,
        height: window.innerHeight,
    },
    document: {
        backgroundColor: 'white',
    },
    page: {
        backgroundColor: 'white',
        padding: '5%'
      },
      header: {
          textAlign: 'center',
          fontSize: '30px',
          fontWeight: 'bold'
      },
      address: {
          textAlign: 'center',
          fontSize: '14px'
      },
      heading: {
          marginTop: '30px',
          textAlign: 'center',
          letterSpacing: '3.5px',
          fontSize: '25px'
      },
      
    detailsSection: {
        marginTop: '30px',
        marginBottom: '30px',
    },details: {
        fontSize: '12px',
        marginBottom: '10px',
        fontWeight: 'bold'
    },
    bold: {
        fontWeight: '800'
    },
    tableHeader: {
        fontWeight: '800',
        backgroundColor: "rgb(169,169,169)",
        padding: '8px'
    },
    cell: {
        padding: '8px',
        backgroundColor: '#eee'
    },
    net: {
        backgroundColor: "rgb(169,169,169)"
    },
    words: {
        marginTop: '20px',
        fontSize: '18px',
        fontWeight: 'bold'
    },
    bankDetails: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '30px'
    },
    signature: {
        display: 'inline',
        fontSize: '12px',
        marginTop: '30px',
    }
  })


  function FeeReceipt(props) {

    var a = ['','One ','Two ','Three ','Four ', 'Five ','Six ','Seven ','Eight ','Nine ','Ten ','Eleven ','Twelve ','Thirteen ','Fourteen ','Fifteen ','Sixteen ','Seventeen ','Eighteen ','Nineteen '];
var b = ['', '', 'Twenty','Thirty','Forty','Fifty', 'Sixty','Seventy','Eighty','Ninety'];

function inWords (num) {
    if ((num = num.toString()).length > 9) return 'overflow';
    let n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    if (!n) return; var str = '';
    str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'Crore ' : '';
    str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'Lakh ' : '';
    str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'Thousand ' : '';
    str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'Hundred ' : '';
    str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) : '';
    return str;
}

    const location = useLocation();

    return (
        <PDFViewer style={styles.viewer}>
          {/* Start of the document*/}
         
              <Document title={`Fee_Receipt`} style={styles.document}>
            {/*render a single page*/}
            <Page size="A4" style={styles.page}>

            <View>
                <Text style={styles.header}>{location.state.data.school.name}</Text>
                <Text style={styles.address}>{location.state.data.school.address}</Text>
            </View>

            <View>
                <Text style={styles.heading}>Fee Receipt</Text>
            </View>

            <View style={styles.detailsSection}>
                <Text style={styles.details}><Text style={styles.bold}>Student Name:</Text> {location.state.data.student.name}</Text>
                <Text style={styles.details}><Text style={styles.bold}>Class:</Text> {location.state.data.student.className} - {location.state.data.student.division}</Text>
                <Text style={styles.details}><Text style={styles.bold}>Date of payment:</Text> {(new Date(location.state.data.feeData.date)).toDateString()}</Text>
                <Text style={styles.details}><Text style={styles.bold}>Transaction ID:</Text> {location.state.data.feeData._id}</Text>

            </View>
            
            <View>
                <Table
                    data={[
                        {first: '1', second: 'Admission Fee', third: location.state.data.student.fees.admission},
                        {first: '2', second: 'Tuition Fee', third: location.state.data.student.fees.tuition},
                        {first: '3', second: 'Sports Fee', third: location.state.data.student.fees.sports},
                        {first: '4', second: 'Transport Fee', third: location.state.data.student.fees.transport},
                        {first: '', second: '', third: 'Total: ' + String(location.state.data.student.fees.admission
                            +location.state.data.student.fees.tuition+location.state.data.student.fees.sports+location.state.data.student.fees.transport)},
                    ]}
                >

<TableHeader>
                    <TableCell style={styles.tableHeader}>
                        Sr No.
                    </TableCell>
                    <TableCell style={styles.tableHeader}>
                        Particulars
                    </TableCell>
                    <TableCell style={styles.tableHeader}>
                        Amount
                    </TableCell>
                    
                </TableHeader>

                <TableBody>
                    <DataTableCell style={styles.cell} getContent={(r) => r.first}/>
                    <DataTableCell style={styles.cell} getContent={(r) => r.second}/>
                    <DataTableCell style={styles.cell} getContent={(r) => r.third}/>
                </TableBody>

                </Table>
            </View>
            
            <View style={styles.bankDetails}>
                <Text style={styles.details}>Fee payment type: {location.state.data.student.paymentType}</Text>
                <Text style={styles.details}>Amount payable: {location.state.data.feeData.amount}</Text>
                <Text style={styles.details}>Amount in words: {inWords(location.state.data.student.fees.admission
                            +location.state.data.student.fees.tuition+location.state.data.student.fees.sports+location.state.data.student.fees.transport) + "Rupees only."}</Text>
                <Text style={styles.details}>Paid by: Cash</Text>
                <Text style={styles.details}>Installment number: {location.state.data.installmentNumber}</Text>
            </View>

            <View className='d-flex' style={styles.bankDetails}>
                <Text styles={styles.signature}>Parent Signature: _____________________</Text>
                <Text styles={styles.signature}>Admin Signature: _____________________</Text>
            </View>

            </Page>

            </Document>

        </PDFViewer>
    )
  }

  export default FeeReceipt;