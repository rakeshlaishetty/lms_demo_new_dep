import React from "react";
import { useState, useEffect } from "react";
import { withRouter, useHistory } from "react-router-dom";
import {
  ProSidebar,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
  MenuItem,
  SubMenu,
  Menu
} from "react-pro-sidebar";
import { FaClipboard, FaTrophy, FaPaperclip, FaBook, FaGraduationCap, FaRupeeSign, FaSchool, FaChalkboardTeacher, FaCheckCircle, FaUser } from 'react-icons/fa';
import {GiPaper, GiSpeaker} from 'react-icons/gi';
import { MdDashboard } from 'react-icons/md';
import { ImUser, ImUserCheck } from 'react-icons/im';
import { TbBallpen, TbSpeakerphone } from 'react-icons/tb';
// import "react-pro-sidebar/dist/css/styles.css";
// import './script';
import './Sidebar.css';

const SideNavbar = (props) => {

  const history = useHistory();

  

  // return (
  //   <ProSidebar style={{height: 'auto', backgroundColor: '#00363b'}}>
  //     {
  //       props.user === 'admin' ?
  //       <Menu iconShape="square">
  //         <MenuItem><h1 style={{fontWeight: 'bold'}}>L M S</h1></MenuItem>
  //         <MenuItem icon={<MdDashboard/>} className='mt-2' onClick={() => history.push('/app/dashboard')}>Dashboard</MenuItem>
  //         <SubMenu icon={<FaClipboard/>} className='mt-2' title="Admissions">
  //           <MenuItem onClick={() => history.push('/app/admit-student')}>Admit Student</MenuItem>
  //           <MenuItem onClick={() => history.push('/app/admissions')}>View admissions</MenuItem>
  //         </SubMenu>
  //         <SubMenu icon={<FaGraduationCap/>} className='mt-2' title="Students">
  //           <MenuItem onClick={() => history.push('/app/view-students')}>Search students</MenuItem>
  //         </SubMenu>
  //         <SubMenu icon={<ImUserCheck/>} className='mt-2' title="Attendance">
  //           <MenuItem onClick={() => history.push('/app/student-attendance')}>Student attendance</MenuItem>
  //           <MenuItem onClick={() => history.push('/app/teacher-attendance')}>Teacher attendance</MenuItem>
  //         </SubMenu>
  //         <SubMenu icon={<FaChalkboardTeacher/>} className='mt-2' title="Class Setup">
  //           <MenuItem onClick={() => history.push('/app/setup')}>Classes</MenuItem>
  //           <MenuItem onClick={() => history.push('/app/courses/create-course')}>Subjects</MenuItem>
  //           <MenuItem onClick={() => history.push('/app/schedule')}>Schedule</MenuItem>
  //         </SubMenu>
  //         <SubMenu icon={<FaRupeeSign/>} className='mt-2' title="Fee Management">
  //           <MenuItem onClick={() => history.push('/app/fee-structure')}>Fee structure</MenuItem>
  //           <MenuItem onClick={() => history.push('/app/fee-transactions')}>Transactions</MenuItem>
  //           <MenuItem onClick={() => history.push('/app/fee-dues')}>Dues</MenuItem>
  //         </SubMenu>
  //         <SubMenu icon={<ImUser/>} className='mt-2' title="Staff">
  //           <MenuItem onClick={() => history.push('/app/employee-list')}>Employee list</MenuItem>
  //           <MenuItem onClick={() => history.push('/app/add-staff')}>Add staff</MenuItem>
  //           <MenuItem onClick={() => history.push('/app/salary')}>Salary</MenuItem>
  //         </SubMenu>
  //       </Menu>
  //     :
  //     null
  //     }

  //     {
  //       props.user === 'teacher' ?
  //       <Menu iconShape="square">
  //           <MenuItem><h1 style={{fontWeight: 'bold'}}>L M S</h1></MenuItem>
  //           <MenuItem icon={<MdDashboard/>} className='mt-2' onClick={() => history.push('/app/dashboard')}>Dashboard</MenuItem>
  //           <SubMenu icon={<FaChalkboardTeacher/>} className='mt-2' title="Your Class">
  //             <MenuItem onClick={() => history.push('/app/class-students')}>Students</MenuItem>
  //             <MenuItem onClick={() => history.push('/app/class-subjects')}>Subjects</MenuItem>
  //             <MenuItem onClick={() => history.push('/app/teacher-schedule')}>Your Schedule</MenuItem>
  //           </SubMenu>
  //           <MenuItem icon={<FaPaperclip/>} className='mt-2' onClick={() => history.push('/app/assignments')}>Assignments</MenuItem>
  //           <SubMenu icon={<FaClipboard/>} className='mt-2' title="Attendance">
  //             <MenuItem onClick={() => history.push('/app/class-attendance')}>Class Attendance</MenuItem>
  //             {/* <MenuItem onClick={() => history.push('/app/teacher-attendance')}>Your attendance</MenuItem> */}
  //           </SubMenu>
  //           <MenuItem icon={<TbSpeakerphone/>} className='mt-2' onClick={() => history.push('/app/teacher-announcement')}>Announcement</MenuItem>
  //           <MenuItem icon={<FaBook/>} className='mt-2' onClick={() => history.push('/app/teacher-library')}>Library</MenuItem>
    
  //       </Menu>
  //       :
  //       null
  //     }

  //     {
  //       props.user === 'student' ?
  //       <Menu iconShape="square">
  //         <MenuItem><h1 style={{fontWeight: 'bold'}}>L M S</h1></MenuItem>
  //         <MenuItem icon={<MdDashboard/>} className='mt-2' onClick={() => history.push('/app/dashboard')}>Dashboard</MenuItem>
  //         <MenuItem icon={<TbSpeakerphone/>} className='mt-2' onClick={() => history.push('/app/your-announcements')}>Announcements</MenuItem>
  //         <MenuItem icon={<FaPaperclip/>} className='mt-2' onClick={() => history.push('/app/your-assignments')}>Assignments</MenuItem>
  //         <MenuItem icon={<FaClipboard/>} className='mt-2' onClick={() => history.push('/app/your-attendance')}>Attendance</MenuItem>
  //         <MenuItem icon={<FaTrophy/>} className='mt-2' onClick={() => history.push('/app/your-performance')}>Performance</MenuItem>
  //         <MenuItem icon={<FaBook/>} className='mt-2' onClick={() => history.push('/app/your-library')}>Library</MenuItem>
  //         <MenuItem icon={<FaRupeeSign/>} className='mt-2' onClick={() => history.push('/app/your-fees')}>Fees</MenuItem>
  //         <MenuItem icon={<FaUser/>} className='mt-2' onClick={() => history.push(`/app/your-profile`)}>Profile</MenuItem>
  //       </Menu>
  //       :
  //       null

  //     }
      
  //     {/* <SidebarFooter>
  //       <h6 style={{marginLeft: 'auto', marginRight: 'auto', marginTop: '5%', width: '50%'}}>© Qwings {new Date().getFullYear()}</h6>
  //     </SidebarFooter> */}
  //   </ProSidebar>
  // );
  useEffect(() => {
    if(document.querySelectorAll(".arrow")){
      let arrow = document.querySelectorAll(".arrow");
  for (var i = 0; i < arrow.length; i++) {
    arrow[i].addEventListener("click", (e)=>{
   let arrowParent = e.target.parentElement.parentElement;//selecting main parent of arrow
      console.log(arrowParent);
   arrowParent.classList.toggle("showMenu");
    });
  }
  
    }
    
  }, [])
  


  return(
    <div>
    <div class="sidebar ">
    <div class="logo-details">
      <i class='bx bxl-c-plus-plus'></i>
      <span class="logo-name">L M S</span>
    </div>
    
    {
      props.user === 'admin' ?
      <ul class="nav-links">
      <li>
        <a onClick={() => history.push('/app/dashboard')}>
          <i class='bx bx-grid-alt' ></i>
          <span class="link-name">Dashboard</span>
        </a>

      </li>
      <li className="mt-5">
        
        <ul class="">
          <li><a onClick={() => history.push('/app/admit-student')}>Admit Student</a></li>
          <li><a onClick={() => history.push('/app/view-admissions')}>View Admissions</a></li>
        </ul>
      </li>
      <li className="mt-5">
        
        <ul class="">
          <li><a onClick={() => history.push('/app/view-students')}>Search Student</a></li>
        </ul>
      </li>
      <li className="mt-5">
       
        <ul class="">
          <li><a onClick={() => history.push('/app/student-attendance')}>Student Attendance</a></li>
          <li><a onClick={() => history.push('/app/teacher-attendance')}>Teacher Attendance</a></li>
        </ul>
      </li>
      <li className="mt-5">
        
        <ul class="">
          <li><a onClick={() => history.push('/app/setup')}>Classes</a></li>
          <li><a onClick={() => history.push('/app/courses/create-course')}>Subjects</a></li>
          <li><a onClick={() => history.push('/app/schedule')}>Schedule</a></li>
        </ul>
      </li>
      <li className="mt-5">
        
        <ul class="">
          <li><a onClick={() => history.push('/app/fee-structure')}>Fee Structure</a></li>
          <li><a onClick={() => history.push('/app/fee-transactions')}>Transactions</a></li>
          <li><a onClick={() => history.push('/app/fee-dues')}>Dues</a></li>
        </ul>
      </li>
      <li className="mt-5">
        
        <ul class="">
          <li><a onClick={() => history.push('/app/employee-list')}>Employee List</a></li>
          <li><a onClick={() => history.push('/app/add-staff')}>Add Staff</a></li>
          <li><a onClick={() => history.push('/app/salary')}>Salary</a></li>
        </ul>
      </li> 
    </ul>
    :
    null
    }

    {
      props.user === 'teacher' ?
      <ul>
        <li>
        <a onClick={() => history.push('/app/dashboard')}>
          <i class='bx bx-grid-alt' ></i>
          <span class="link-name">Dashboard</span>
        </a>

      </li>
      
      <li></li>
      <li className="mt-5">
        
        <ul class="">
          <li><a onClick={() => history.push('/app/class-students')}>Students</a></li>
          <li><a onClick={() => history.push('/app/class-subjects')}>Subjects</a></li>
          <li><a onClick={() => history.push('/app/teacher-schedule')}>Your Schedule</a></li>
        </ul>
      </li>
      <li onClick={() => history.push('/app/assignments')} className="mt-5">
        <div class="icon-link">
            <span class="link-name">Assignments</span>
        </div>
      </li>
      <li className="mt-5">
        
        <ul class="">
          <li><a onClick={() => history.push('/app/class-attendance')}>Class Attendance</a></li>
          <li><a onClick={() => history.push('/app/teacher-attendance')}>Your Attendance</a></li>
        </ul>
      </li>
      <li onClick={() => history.push('/app/teacher-announcement')} className="mt-5">
        <div class="icon-link">
            <span class="link-name">Announcement</span>
        </div>
      </li>
      <li onClick={() => history.push('/app/teacher-library')} className="mt-5">
        <div class="icon-link">
            <span class="link-name">Library</span>
        </div>
      </li>
      


      </ul>
      :
      null
    }


    {
      props.user === 'student' ?
      <ul>
        <li>
        <a onClick={() => history.push('/app/dashboard')}>
          <i class='bx bx-grid-alt' ></i>
          <span class="link-name">Dashboard</span>
        </a>

      </li>

      <li onClick={() => history.push('/app/your-announcements')} className="mt-5">
        <div class="icon-link">
            <span class="link-name">Announcements</span>
        </div>
      </li>
      <li onClick={() => history.push('/app/your-assignments')} className="mt-5">
        <div class="icon-link">
            <span class="link-name">Assignments</span>
        </div>
      </li>
      <li onClick={() => history.push('/app/your-attendance')} className="mt-5">
        <div class="icon-link">
            <span class="link-name">Attendance</span>
        </div>
      </li>
      <li onClick={() => history.push('/app/your-performance')} className="mt-5">
        <div class="icon-link">
            <span class="link-name">Performance</span>
        </div>
      </li>
      <li onClick={() => history.push('/app/your-library')} className="mt-5">
        <div class="icon-link">
            <span class="link-name">Library</span>
        </div>
      </li>
      <li onClick={() => history.push('/app/your-fees')} className="mt-5">
        <div class="icon-link">
            <span class="link-name">Fees</span>
        </div>
      </li>
      <li onClick={() => history.push('/app/your-profile')} className="mt-5">
        <div class="icon-link">
            <span class="link-name">Profile</span>
        </div>
      </li>


      </ul>
      :
      null
    }

  </div>
  
  
  </div>

  )
};

export default SideNavbar;
