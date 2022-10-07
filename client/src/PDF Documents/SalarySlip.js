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

  // Create styles
  const styles = StyleSheet.create({
    viewer: {
        width: window.innerWidth,
        height: window.innerHeight,
    },
    page: {
      backgroundColor: '#eee',
      padding: '5%',
      backgroundColor: "white",
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
    },
    details: {
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
        fontWeight: '800',
        marginTop: '30px'
    },
    signature: {
        fontSize: '15px',
        marginTop: '30px',
    }
  });
  
  // Create Document Component
  function SalarySlip(props) {

    const [date, setDate] = useState(new Date());

    const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

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

    const history = useHistory();
    const location = useLocation();

    return (
      <PDFViewer style={styles.viewer}>
        {/* Start of the document*/}
       
            <Document title={`Salary_Slip_${location.state.data.staff.name}`}>
          {/*render a single page*/}
          <Page size="A4" style={styles.page}>
            <View>
                <Text style={styles.header}>{location.state.data.school.name}</Text>
                <Text style={styles.address}>{location.state.data.school.address}</Text>
            </View>

            <View>
                <Text style={styles.heading}>Salary Slip</Text>
            </View>

            <View style={styles.detailsSection}>
                <Text style={styles.details}><Text style={styles.bold}>Employee ID:</Text> {location.state.data.staff._id}</Text>
                <Text style={styles.details}><Text style={styles.bold}>Employee Name:</Text> {location.state.data.staff.name}</Text>
                <Text style={styles.details}><Text style={styles.bold}>Designation:</Text> {location.state.data.staff.staffType}</Text>
                <Text style={styles.details}><Text style={styles.bold}>Month & Year:</Text> {monthNames[date.getMonth()]} {date.getFullYear()}</Text>
            </View>

                
            <View>
            <Table
                data={[
                    {first: "Base pay", second: 'Rs. ' + location.state.data.staff.salary.base, third: "Provident Fund", fourth: 'Rs. ' + location.state.data.staff.salary.pf},
                    {first: "DA", second: 'Rs. ' + location.state.data.staff.salary.da, third: "TDS", fourth: 'Rs. ' + location.state.data.staff.salary.tds},
                    {first: "HRA", second: 'Rs. ' + location.state.data.staff.salary.hra, third: "Other", fourth: 'Rs. ' + location.state.data.staff.salary.other},
                    {first: "Incentives", second: 'Rs. ' + location.state.data.staff.salary.incentives, third: "", fourth: ''},
                    {first: "", second: "", third: "", fourth: ""},
                    {first: "Total earnings", second: 'Rs. ' + String(location.state.data.staff.salary.base+
                    location.state.data.staff.salary.hra+
                    location.state.data.staff.salary.da+
                    location.state.data.staff.salary.incentives), third: "Total deductions", fourth: 'Rs. ' + String(location.state.data.staff.salary.pf+
                    location.state.data.staff.salary.tds+
                    location.state.data.staff.salary.other)},
                    {first: "Net", second: 'Rs. ' + String(location.state.data.staff.salary.base+
                    location.state.data.staff.salary.hra+
                    location.state.data.staff.salary.da+
                    location.state.data.staff.salary.incentives-
                    location.state.data.staff.salary.pf-
                    location.state.data.staff.salary.tds-
                    location.state.data.staff.salary.other), third: "", fourth: ''}
                ]}
            >
                <TableHeader>
                    <TableCell style={styles.tableHeader}>
                        Earnings
                    </TableCell>
                    <TableCell style={styles.tableHeader}>
                        
                    </TableCell>
                    <TableCell style={styles.tableHeader}>
                        Deductions
                    </TableCell>
                    <TableCell style={styles.tableHeader}>
                        
                    </TableCell>
                    
                </TableHeader>
                <TableBody>
                    <DataTableCell style={styles.cell} getContent={(r) => r.first}/>
                    <DataTableCell style={styles.cell} getContent={(r) => r.second}/>
                    <DataTableCell style={styles.cell} getContent={(r) => r.third}/>
                    <DataTableCell style={styles.cell} getContent={(r) => r.fourth}/>
                </TableBody>
                
            </Table>
               
            </View>

            <View>
                <Text style={styles.words}>{inWords(location.state.data.staff.salary.base+
                    location.state.data.staff.salary.hra+
                    location.state.data.staff.salary.da+
                    location.state.data.staff.salary.incentives-
                    location.state.data.staff.salary.pf-
                    location.state.data.staff.salary.tds-
                    location.state.data.staff.salary.other) + "Rupees only."}</Text>
            </View>

            <View style={styles.bankDetails}>
                <Text style={styles.details}>Bank Name: {location.state.data.staff.bankName}</Text>
                <Text style={styles.details}>IFSC Number: {location.state.data.staff.bankIFSC}</Text>
                <Text style={styles.details}>Account Number: {location.state.data.staff.bank_acc_no}</Text>
            </View>

            <View style={styles.bankDetails}>
                <Text styles={styles.signature}>Employee Signature: _____________________</Text>
                <Text styles={styles.signature}>Director Signature: _____________________</Text>
            </View>


          </Page>
        </Document>
        
      
      </PDFViewer>
    );
  }
  export default SalarySlip;