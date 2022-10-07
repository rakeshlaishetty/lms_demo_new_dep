import React, {useState, useEffect} from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import classnames from "classnames";

// styles
import useStyles from "./styles";

// components
import Sidebar from "../Sidebar/Sidebar";

// pages
import Dashboard from "../../pages/dashboard";
import Admissions from "../../pages/admissions/Admissions";
import AdmitStudent from "../../pages/admit-student/AdmitStudent";
import Attendance from "../../pages/attendance/Attendance";
import TeacherAttendance from "../../pages/teacher-attendance/TeacherAttendance";
import FeeStructure from "../../pages/fee-structure/FeeStructure";
import FeeTransactions from "../../pages/fee-transactions/FeeTransactions";
import Dues from "../../pages/dues/Dues";
import EmployeeList from "../../pages/employee-list/EmployeeList";
import AddStaff from "../../pages/add-staff/AddStaff";
import Salary from "../../pages/salary/Salary";
import Setup from "../../pages/setup/Setup";
import ClassAttendance from "../../pages/class-attendance/ClassAttendance";
import YourAttendance from "../../pages/your-attendance/YourAttendance";
import YourAnnouncements from "../../pages/your-announcements/YourAnnouncements";
import YourProfile from "../../pages/your-profile/YourProfile";
import Performance from '../../pages/performance/Performance';
import ClassStudents from "../../pages/class-students/ClassStudents";
import StudentProfile from "../../pages/student-profile/StudentProfile";
import ClassDetails from "../../pages/class-details/ClassDetails";
import Subjects from "../../pages/subjects/Subjects";
import ViewStudents from "../../pages/view-students/ViewStudents";
import Timetable from "../../pages/timetable/Timetable";
import TeacherTimetable from "../../pages/teacher-timetable/TeacherTimetable";
import Typography from "../../pages/typography";
import Notifications from "../../pages/notifications";
import Assignment from "../../pages/assignment/Assignment";
import YourAssignments from "../../pages/your-assignments/YourAssignments";
import AssignmentDetails from "../../pages/assignment/AssignmentDetails";
import Solve from "../../pages/solve/Solve";
import Rank from "../../pages/rank/Rank";
import Maps from "../../pages/maps";
import Tables from "../../pages/tables";
import Icons from "../../pages/icons";
import Charts from "../../pages/charts";
import  TeacherAnnouncementView from "../../pages/teacherAnnouncementSection/teacherAnnouncementView";
import TeacherLibrary from "../../pages/library/teacherLibrary.js"
import Library from '../../pages/library/StudentLibrary';
import YourFees from '../../pages/your-fees/YourFees';

// context
import { useLayoutState } from "../../context/LayoutContext";

function Layout(props) {
  var classes = useStyles();

  const [user, setUser] = useState('');

  useEffect(() => {
    const u = window.localStorage.getItem("user");
    setUser(u);
  }, [])

  // global
  var layoutState = useLayoutState();

  return (
    <div className={classes.root}>
      <>
        
        <Sidebar user={user}/>
        <div
          className={classnames(classes.content, {
            [classes.contentShift]: layoutState.isSidebarOpened,
          })}
        >
          <div className={classes.fakeToolbar} />
          <Switch>
            <Route exact path="/app/dashboard" component={Dashboard} />
            <Route exact path="/app/admissions" component={Admissions} />
            <Route exact path="/app/admit-student" component={AdmitStudent} />
            <Route exact path="/app/student-attendance" component={Attendance} />
            <Route exact path="/app/teacher-attendance" component={TeacherAttendance} />
            <Route exact path="/app/fee-structure" component={FeeStructure} />
            <Route exact path="/app/fee-transactions" component={FeeTransactions} />
            <Route exact path="/app/fee-dues" component={Dues} />
            <Route exact path="/app/employee-list" component={EmployeeList} />
            <Route exact path="/app/add-staff" component={AddStaff} />
            <Route exact path="/app/salary" component={Salary} />
            <Route exact path="/app/setup" component={Setup} />
            <Route exact path="/app/class-attendance" component={ClassAttendance} />
            <Route exact path="/app/class-students" component={ClassStudents} />
            <Route exact path="/app/student-profile/:id" component={StudentProfile} />
            <Route exact path="/app/class-details/:id/:class/:division" render={(routeProps) => <ClassDetails class={routeProps.match.params.class} division={routeProps.match.params.division} id={routeProps.match.params.id}/>} />
            <Route exact path="/app/courses/create-course" component={Subjects} />
            <Route exact path="/app/view-students" component={ViewStudents} />
            <Route exact path="/app/schedule" component={Timetable} />
            <Route exact path="/app/teacher-schedule" component={TeacherTimetable} />
            <Route exact path="/app/typography" component={Typography} />
            <Route exact path="/app/tables" component={Tables} />
            <Route exact path="/app/notifications" component={Notifications} />
            <Route exact path="/app/assignments" component={Assignment} />
            <Route exact path="/app/assignments/:id" render={(routeProps) => <AssignmentDetails id={routeProps.match.params.id}/>} />
            <Route exact path="/app/:option/:name" component={Assignment} />
            <Route exact path="/app/teacher-announcement" component={TeacherAnnouncementView}/>
            <Route exact path="/app/teacher-library" component={TeacherLibrary}/>

            <Route exact path="/app/your-assignments" component={YourAssignments}/>
            <Route exact path="/app/assignment/solve/:id" render={(routeProps) => <Solve id={routeProps.match.params.id}/>} />
            <Route exact path="/app/your-attendance" component={YourAttendance}/>
            <Route exact path="/app/your-profile" component={YourProfile}/>
            <Route exact path="/app/your-announcements" component={YourAnnouncements}/>
            <Route exact path="/app/your-performance" component={Performance}/>
            <Route exact path="/app/your-performance/rank/:id" render={(routeProps) => <Rank id={routeProps.match.params.id}/>}/>
            <Route exact path="/app/your-library" component={Library}/>
            <Route exact path="/app/your-fees" component={YourFees}/>

            <Route
              exact
              path="/app/ui"
              render={() => <Redirect to="/app/ui/icons" />}
            />
            <Route path="/app/ui/maps" component={Maps} />
            <Route path="/app/ui/icons" component={Icons} />
            <Route path="/app/ui/charts" component={Charts} />
          </Switch>
        </div>
      </>
    </div>
  );
}

export default withRouter(Layout);
