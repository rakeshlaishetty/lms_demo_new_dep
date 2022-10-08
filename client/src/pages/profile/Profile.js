import React from 'react';
import {useState, useEffect} from 'react';
import { withRouter, useHistory } from "react-router-dom";
import axios from 'axios';
import swal from 'sweetalert';
import {Button} from "@material-ui/core";

const Profile = () => {

    const [adminName, setAdminName] = useState('');
    const [adminEmail, setAdminEmail] = useState('');
    const [adminId, setAdminId] = useState('');
    const [schoolName, setSchoolName] = useState('');
    const [schoolCity, setSchoolCity] = useState('');
    const [schoolLogo, setSchoolLogo] = useState('');

    const history = useHistory();

    const getAdminDetails = async () => {
        const adm = JSON.parse(window.localStorage.getItem('userdata'));
        let res = await axios.get(`/getAdminDetails?id=${adm._id}`);
        if(res.status === 200){
            setAdminId(res.data._id);
            setAdminName(res.data.name);
            setAdminEmail(res.data.email);
            setSchoolName(res.data.schoolId.name)
            setSchoolCity(res.data.schoolId.city)
        }
    }

    useEffect(() => {
        getAdminDetails();
    }, [])

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        const data = {
            id: adminId,
            adminEmail: adminEmail,
            adminName: adminName,
            schoolName: schoolName,
            schoolCity: schoolCity,
            schoolLogo: evt.target.elements.logo.value
        }

        console.log(data);

        let res = await axios.post('/admin/editAdminDetails', data);
        if (res.status === 200){
            swal('Details updated successfully', '', 'success')
            history.push('/app/dashboard');
        }
    }

    return(
        <div className='container mt-4 py-2'>
            <h1>Admin Details</h1>
            <hr/>

            <form onSubmit={handleSubmit} style={{width: '50%'}}>
            
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input value={adminEmail} type="email" className="form-control" id="email" onChange={(evt) => setAdminEmail(evt.target.value)} required/>
            </div>

            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input value={adminName} type="text" className="form-control" id="name" onChange={(evt) => setAdminName(evt.target.value)} required/>
            </div>

            <h3 className='mt-4'>School Details</h3>

            <div className="form-group mt-3">
                <label htmlFor="school-name">School name</label>
                <input value={schoolName} type="text" className="form-control" id="school-name" onChange={(evt) => setSchoolName(evt.target.value)} required/>
            </div>

            <div className="form-group mt-3">
                <label htmlFor="city">City</label>
                <input value={schoolCity} type="text" className="form-control" id="city" onChange={(evt) => setSchoolCity(evt.target.value)} required/>
            </div>

            <div className="form-group mt-3">
                <label htmlFor="image">Logo</label>
                <input name='logo' type="file" className="form-control" id="image" required/>
            </div>

            <Button variant='contained' className='mx-5 mt-4' type='submit' color="secondary">Save</Button>
            </form>
        </div>
        )
}

export default withRouter(Profile);