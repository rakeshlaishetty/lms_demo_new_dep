import React, { useState, useEffect, useRef, createRef } from "react";
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import TopMenu from "../../components/TopMenu/TopMenu";

import "../../styles/styles.css";
import { MdOutlineViewDay } from "react-icons/md";
import { FaUser } from "react-icons/fa";

const TeacherTimetable = (props) => {
  const [toggle, setToggle] = useState("view");
  const [data, setData] = useState({});
  const [schedule, setSchedule] = useState([
    [
      ["", ""],
      ["", ""],
      ["", ""],
      ["", ""],
      ["", ""],
      ["", ""],
      ["", ""],
    ],
    [
      ["", ""],
      ["", ""],
      ["", ""],
      ["", ""],
      ["", ""],
      ["", ""],
      ["", ""],
    ],
    [
      ["", ""],
      ["", ""],
      ["", ""],
      ["", ""],
      ["", ""],
      ["", ""],
      ["", ""],
    ],
    [
      ["", ""],
      ["", ""],
      ["", ""],
      ["", ""],
      ["", ""],
      ["", ""],
      ["", ""],
    ],
    [
      ["", ""],
      ["", ""],
      ["", ""],
      ["", ""],
      ["", ""],
      ["", ""],
      ["", ""],
    ],
    [
      ["", ""],
      ["", ""],
      ["", ""],
      ["", ""],
      ["", ""],
      ["", ""],
      ["", ""],
    ],
    [
      ["", ""],
      ["", ""],
      ["", ""],
      ["", ""],
      ["", ""],
      ["", ""],
      ["", ""],
    ],
    [
      ["", ""],
      ["", ""],
      ["", ""],
      ["", ""],
      ["", ""],
      ["", ""],
      ["", ""],
    ],
    [
      ["", ""],
      ["", ""],
      ["", ""],
      ["", ""],
      ["", ""],
      ["", ""],
      ["", ""],
    ],
  ]);

  const history = useHistory();

  const days = {
    0: "Monday",
    1: "Tuesday",
    2: "Wednesday",
    3: "Thursday",
    4: "Friday",
    5: "Saturday",
    6: "Sunday",
  };

  const times = {
    0: "8am - 9am",
    1: "9am - 10am",
    2: "10am - 11am",
    3: "11am - 12pm",
    4: "12pm - 1pm",
    5: "1pm - 2pm",
    6: "2pm - 3pm",
    7: "3pm - 4pm",
    8: "4pm - 5pm",
  };

  const toggleToView = () => {
    setToggle("view");
  };

  const items = [
    { name: "View schedule", click: toggleToView }
  ];

  

  const getSchedule = async () => {
    const teacher = JSON.parse(window.localStorage.getItem("userdata"));
    let res = await axios.get(`/timetable/getTeacherSchedule?teacherId=${teacher._id}&schoolId=${teacher.schoolId}`);
    if (res.status === 200) {
        let temp = [
            [
              ["", ""],
              ["", ""],
              ["", ""],
              ["", ""],
              ["", ""],
              ["", ""],
              ["", ""],
            ],
            [
              ["", ""],
              ["", ""],
              ["", ""],
              ["", ""],
              ["", ""],
              ["", ""],
              ["", ""],
            ],
            [
              ["", ""],
              ["", ""],
              ["", ""],
              ["", ""],
              ["", ""],
              ["", ""],
              ["", ""],
            ],
            [
              ["", ""],
              ["", ""],
              ["", ""],
              ["", ""],
              ["", ""],
              ["", ""],
              ["", ""],
            ],
            [
              ["", ""],
              ["", ""],
              ["", ""],
              ["", ""],
              ["", ""],
              ["", ""],
              ["", ""],
            ],
            [
              ["", ""],
              ["", ""],
              ["", ""],
              ["", ""],
              ["", ""],
              ["", ""],
              ["", ""],
            ],
            [
              ["", ""],
              ["", ""],
              ["", ""],
              ["", ""],
              ["", ""],
              ["", ""],
              ["", ""],
            ],
            [
              ["", ""],
              ["", ""],
              ["", ""],
              ["", ""],
              ["", ""],
              ["", ""],
              ["", ""],
            ],
            [
              ["", ""],
              ["", ""],
              ["", ""],
              ["", ""],
              ["", ""],
              ["", ""],
              ["", ""],
            ],
          ];
        for(let item of res.data){
            temp[item.timeSlot][item.day][0] = item.subject;
            temp[item.timeSlot][item.day][1] = String(item.class) + '-' + item.division.toUpperCase();
        }

        setSchedule(temp);
      
    //   for (let item of res.data.schedule) {
    //     cells[item.timeSlot][item.day][0] = item.subjectId.name;
    //     cells[item.timeSlot][item.day][1] =
    //       "Prof. " + temp[item.subjectId._id].faculty.name;
        
    //   }
    }
  };

  useEffect(() => {
    getSchedule();
  }, [])

  return(
    <div>
      <h1 className="title">YOUR SCHEDULE</h1>
      <TopMenu items={items} />

      <div
        className="main"
        style={{
          width: "95%",
          padding: "5%",
          paddingLeft: "6%",
          background: "white",
          borderRadius: "12px",
          boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
        }}
      >

        {
            toggle === 'view' ?
            <div>
                
            
            <div className="mt-5">
              <table class="table table-bordered">
                <thead>
                  <tr className="schedule-heading">
                    <th scope="col"></th>
                    <th scope="col">Monday</th>
                    <th scope="col">Tuesday</th>
                    <th scope="col">Wednesday</th>
                    <th scope="col">Thursday</th>
                    <th scope="col">Friday</th>
                    <th scope="col">Saturday</th>
                    <th scope="col">Sunday</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">8am-9am</th>
                    <td
                      className={schedule[0][0][0] ? "cell-border" : null}
                      id="00"
                    >
                      <p className="subject-name">{schedule[0][0][0]}</p>{" "}
                      <p>{schedule[0][0][1]}</p>
                    </td>
                    <td
                      className={schedule[0][1][0] ? "cell-border" : null}
                      id="01"
                    >
                      <p className="subject-name">{schedule[0][1][0]}</p>{" "}
                      <p>{schedule[0][1][1]}</p>
                    </td>
                    <td
                      className={schedule[0][2][0] ? "cell-border" : null}
                      id="02"
                    >
                      <p className="subject-name">{schedule[0][2][0]}</p>{" "}
                      <p>{schedule[0][2][1]}</p>
                    </td>
                    <td
                      className={schedule[0][3][0] ? "cell-border" : null}
                      id="03"
                    >
                      <p className="subject-name">{schedule[0][3][0]}</p>{" "}
                      <p>{schedule[0][3][1]}</p>
                    </td>
                    <td
                      className={schedule[0][4][0] ? "cell-border" : null}
                      id="04"
                    >
                      <p className="subject-name">{schedule[0][4][0]}</p>{" "}
                      <p>{schedule[0][4][1]}</p>
                    </td>
                    <td
                      className={schedule[0][5][0] ? "cell-border" : null}
                      id="05"
                    >
                      <p className="subject-name">{schedule[0][5][0]}</p>{" "}
                      <p>{schedule[0][5][1]}</p>
                    </td>
                    <td
                      className={schedule[0][6][0] ? "cell-border" : null}
                      id="06"
                    >
                      <p className="subject-name">{schedule[0][6][0]}</p>{" "}
                      <p>{schedule[0][6][1]}</p>
                    </td>
                  </tr>

                  <tr>
                    <th scope="row">9am-10am</th>
                    <td
                      className={schedule[1][0][0] ? "cell-border" : null}
                      id="10"
                    >
                      <p className="subject-name">{schedule[1][0][0]}</p>{" "}
                      <p>{schedule[1][0][1]}</p>
                    </td>
                    <td
                      className={schedule[1][1][0] ? "cell-border" : null}
                      id="11"
                    >
                      <p className="subject-name">{schedule[1][1][0]}</p>{" "}
                      <p>{schedule[1][1][1]}</p>
                    </td>
                    <td
                      className={schedule[1][2][0] ? "cell-border" : null}
                      id="12"
                    >
                      <p className="subject-name">{schedule[1][2][0]}</p>{" "}
                      <p>{schedule[1][2][1]}</p>
                    </td>
                    <td
                      className={schedule[1][3][0] ? "cell-border" : null}
                      id="13"
                    >
                      <p className="subject-name">{schedule[1][3][0]}</p>{" "}
                      <p>{schedule[1][3][1]}</p>
                    </td>
                    <td
                      className={schedule[1][4][0] ? "cell-border" : null}
                      id="14"
                    >
                      <p className="subject-name">{schedule[1][4][0]}</p>{" "}
                      <p>{schedule[1][4][1]}</p>
                    </td>
                    <td
                      className={schedule[1][5][0] ? "cell-border" : null}
                      id="15"
                    >
                      <p className="subject-name">{schedule[1][5][0]}</p>{" "}
                      <p>{schedule[1][5][1]}</p>
                    </td>
                    <td
                      className={schedule[1][6][0] ? "cell-border" : null}
                      id="16"
                    >
                      <p className="subject-name">{schedule[1][6][0]}</p>{" "}
                      <p>{schedule[1][6][1]}</p>
                    </td>
                  </tr>

                  <tr>
                    <th scope="row">10am-11am</th>
                    <td
                      className={schedule[2][0][0] ? "cell-border" : null}
                      id="20"
                    >
                      <p className="subject-name">{schedule[2][0][0]}</p>{" "}
                      <p>{schedule[2][0][1]}</p>
                    </td>
                    <td
                      className={schedule[2][1][0] ? "cell-border" : null}
                      id="21"
                    >
                      <p className="subject-name">{schedule[2][1][0]}</p>{" "}
                      <p>{schedule[2][1][1]}</p>
                    </td>
                    <td
                      className={schedule[2][2][0] ? "cell-border" : null}
                      id="22"
                    >
                      <p className="subject-name">{schedule[2][2][0]}</p>{" "}
                      <p>{schedule[2][2][1]}</p>
                    </td>
                    <td
                      className={schedule[2][3][0] ? "cell-border" : null}
                      id="23"
                    >
                      <p className="subject-name">{schedule[2][3][0]}</p>{" "}
                      <p>{schedule[2][3][1]}</p>
                    </td>
                    <td
                      className={schedule[2][4][0] ? "cell-border" : null}
                      id="24"
                    >
                      <p className="subject-name">{schedule[2][4][0]}</p>{" "}
                      <p>{schedule[2][4][1]}</p>
                    </td>
                    <td
                      className={schedule[2][5][0] ? "cell-border" : null}
                      id="25"
                    >
                      <p className="subject-name">{schedule[2][5][0]}</p>{" "}
                      <p>{schedule[2][5][1]}</p>
                    </td>
                    <td
                      className={schedule[2][6][0] ? "cell-border" : null}
                      id="26"
                    >
                      <p className="subject-name">{schedule[2][6][0]}</p>{" "}
                      <p>{schedule[2][6][1]}</p>
                    </td>
                  </tr>

                  <tr>
                    <th scope="row">11am-12pm</th>
                    <td
                      className={schedule[3][0][0] ? "cell-border" : null}
                      id="30"
                    >
                      <p className="subject-name">{schedule[3][0][0]}</p>{" "}
                      <p>{schedule[3][0][1]}</p>
                    </td>
                    <td
                      className={schedule[3][1][0] ? "cell-border" : null}
                      id="31"
                    >
                      <p className="subject-name">{schedule[3][1][0]}</p>{" "}
                      <p>{schedule[3][1][1]}</p>
                    </td>
                    <td
                      className={schedule[3][2][0] ? "cell-border" : null}
                      id="32"
                    >
                      <p className="subject-name">{schedule[3][2][0]}</p>{" "}
                      <p>{schedule[3][2][1]}</p>
                    </td>
                    <td
                      className={schedule[3][3][0] ? "cell-border" : null}
                      id="33"
                    >
                      <p className="subject-name">{schedule[3][3][0]}</p>{" "}
                      <p>{schedule[3][3][1]}</p>
                    </td>
                    <td
                      className={schedule[3][4][0] ? "cell-border" : null}
                      id="34"
                    >
                      <p className="subject-name">{schedule[3][4][0]}</p>{" "}
                      <p>{schedule[3][4][1]}</p>
                    </td>
                    <td
                      className={schedule[3][5][0] ? "cell-border" : null}
                      id="35"
                    >
                      <p className="subject-name">{schedule[3][5][0]}</p>{" "}
                      <p>{schedule[3][5][1]}</p>
                    </td>
                    <td
                      className={schedule[3][6][0] ? "cell-border" : null}
                      id="36"
                    >
                      <p className="subject-name">{schedule[3][6][0]}</p>{" "}
                      <p>{schedule[3][6][1]}</p>
                    </td>
                  </tr>

                  <tr>
                    <th scope="row">12pm-1pm</th>
                    <td
                      className={schedule[4][0][0] ? "cell-border" : null}
                      id="40"
                    >
                      <p className="subject-name">{schedule[4][0][0]}</p>{" "}
                      <p>{schedule[4][0][1]}</p>
                    </td>
                    <td
                      className={schedule[4][1][0] ? "cell-border" : null}
                      id="41"
                    >
                      <p className="subject-name">{schedule[4][1][0]}</p>{" "}
                      <p>{schedule[4][1][1]}</p>
                    </td>
                    <td
                      className={schedule[4][2][0] ? "cell-border" : null}
                      id="42"
                    >
                      <p className="subject-name">{schedule[4][2][0]}</p>{" "}
                      <p>{schedule[4][2][1]}</p>
                    </td>
                    <td
                      className={schedule[4][3][0] ? "cell-border" : null}
                      id="43"
                    >
                      <p className="subject-name">{schedule[4][3][0]}</p>{" "}
                      <p>{schedule[4][3][1]}</p>
                    </td>
                    <td
                      className={schedule[4][4][0] ? "cell-border" : null}
                      id="44"
                    >
                      <p className="subject-name">{schedule[4][4][0]}</p>{" "}
                      <p>{schedule[4][4][1]}</p>
                    </td>
                    <td
                      className={schedule[4][5][0] ? "cell-border" : null}
                      id="45"
                    >
                      <p className="subject-name">{schedule[4][5][0]}</p>{" "}
                      <p>{schedule[4][5][1]}</p>
                    </td>
                    <td
                      className={schedule[4][6][0] ? "cell-border" : null}
                      id="46"
                    >
                      <p className="subject-name">{schedule[4][6][0]}</p>{" "}
                      <p>{schedule[4][6][1]}</p>
                    </td>
                  </tr>

                  <tr>
                    <th scope="row">1pm-2pm</th>
                    <td
                      className={schedule[5][0][0] ? "cell-border" : null}
                      id="50"
                    >
                      <p className="subject-name">{schedule[5][0][0]}</p>{" "}
                      <p>{schedule[5][0][1]}</p>
                    </td>
                    <td
                      className={schedule[5][1][0] ? "cell-border" : null}
                      id="51"
                    >
                      <p className="subject-name">{schedule[5][1][0]}</p>{" "}
                      <p>{schedule[5][1][1]}</p>
                    </td>
                    <td
                      className={schedule[5][2][0] ? "cell-border" : null}
                      id="52"
                    >
                      <p className="subject-name">{schedule[5][2][0]}</p>{" "}
                      <p>{schedule[5][2][1]}</p>
                    </td>
                    <td
                      className={schedule[5][3][0] ? "cell-border" : null}
                      id="53"
                    >
                      <p className="subject-name">{schedule[5][3][0]}</p>{" "}
                      <p>{schedule[5][3][1]}</p>
                    </td>
                    <td
                      className={schedule[5][4][0] ? "cell-border" : null}
                      id="54"
                    >
                      <p className="subject-name">{schedule[5][4][0]}</p>{" "}
                      <p>{schedule[5][4][1]}</p>
                    </td>
                    <td
                      className={schedule[5][5][0] ? "cell-border" : null}
                      id="55"
                    >
                      <p className="subject-name">{schedule[5][5][0]}</p>{" "}
                      <p>{schedule[5][5][1]}</p>
                    </td>
                    <td
                      className={schedule[5][6][0] ? "cell-border" : null}
                      id="56"
                    >
                      <p className="subject-name">{schedule[5][6][0]}</p>{" "}
                      <p>{schedule[5][6][1]}</p>
                    </td>
                  </tr>

                  <tr>
                    <th scope="row">2pm-3pm</th>
                    <td
                      className={schedule[6][0][0] ? "cell-border" : null}
                      id="60"
                    >
                      <p className="subject-name">{schedule[6][0][0]}</p>{" "}
                      <p>{schedule[6][0][1]}</p>
                    </td>
                    <td
                      className={schedule[6][1][0] ? "cell-border" : null}
                      id="61"
                    >
                      <p className="subject-name">{schedule[6][1][0]}</p>{" "}
                      <p>{schedule[6][1][1]}</p>
                    </td>
                    <td
                      className={schedule[6][2][0] ? "cell-border" : null}
                      id="62"
                    >
                      <p className="subject-name">{schedule[6][2][0]}</p>{" "}
                      <p>{schedule[6][2][1]}</p>
                    </td>
                    <td
                      className={schedule[6][3][0] ? "cell-border" : null}
                      id="63"
                    >
                      <p className="subject-name">{schedule[6][3][0]}</p>{" "}
                      <p>{schedule[6][3][1]}</p>
                    </td>
                    <td
                      className={schedule[6][4][0] ? "cell-border" : null}
                      id="64"
                    >
                      <p className="subject-name">{schedule[6][4][0]}</p>{" "}
                      <p>{schedule[6][4][1]}</p>
                    </td>
                    <td
                      className={schedule[6][5][0] ? "cell-border" : null}
                      id="65"
                    >
                      <p className="subject-name">{schedule[6][5][0]}</p>{" "}
                      <p>{schedule[6][5][1]}</p>
                    </td>
                    <td
                      className={schedule[6][6][0] ? "cell-border" : null}
                      id="66"
                    >
                      <p className="subject-name">{schedule[6][6][0]}</p>{" "}
                      <p>{schedule[6][6][1]}</p>
                    </td>
                  </tr>

                  <tr>
                    <th scope="row">3pm-4pm</th>
                    <td
                      className={schedule[7][0][0] ? "cell-border" : null}
                      id="70"
                    >
                      <p className="subject-name">{schedule[7][0][0]}</p>{" "}
                      <p>{schedule[7][0][1]}</p>
                    </td>
                    <td
                      className={schedule[7][1][0] ? "cell-border" : null}
                      id="71"
                    >
                      <p className="subject-name">{schedule[7][1][0]}</p>{" "}
                      <p>{schedule[7][1][1]}</p>
                    </td>
                    <td
                      className={schedule[7][2][0] ? "cell-border" : null}
                      id="72"
                    >
                      <p className="subject-name">{schedule[7][2][0]}</p>{" "}
                      <p>{schedule[7][2][1]}</p>
                    </td>
                    <td
                      className={schedule[7][3][0] ? "cell-border" : null}
                      id="73"
                    >
                      <p className="subject-name">{schedule[7][3][0]}</p>{" "}
                      <p>{schedule[7][3][1]}</p>
                    </td>
                    <td
                      className={schedule[7][4][0] ? "cell-border" : null}
                      id="74"
                    >
                      <p className="subject-name">{schedule[7][4][0]}</p>{" "}
                      <p>{schedule[7][4][1]}</p>
                    </td>
                    <td
                      className={schedule[7][5][0] ? "cell-border" : null}
                      id="75"
                    >
                      <p className="subject-name">{schedule[7][5][0]}</p>{" "}
                      <p>{schedule[7][5][1]}</p>
                    </td>
                    <td
                      className={schedule[7][6][0] ? "cell-border" : null}
                      id="76"
                    >
                      <p className="subject-name">{schedule[7][6][0]}</p>{" "}
                      <p>{schedule[7][6][1]}</p>
                    </td>
                  </tr>

                  <tr>
                    <th scope="row">4pm-5pm</th>
                    <td
                      className={schedule[8][0][0] ? "cell-border" : null}
                      id="80"
                    >
                      <p className="subject-name">{schedule[8][0][0]}</p>{" "}
                      <p>{schedule[8][0][1]}</p>
                    </td>
                    <td
                      className={schedule[8][1][0] ? "cell-border" : null}
                      id="81"
                    >
                      <p className="subject-name">{schedule[8][1][0]}</p>{" "}
                      <p>{schedule[8][1][1]}</p>
                    </td>
                    <td
                      className={schedule[8][2][0] ? "cell-border" : null}
                      id="82"
                    >
                      <p className="subject-name">{schedule[8][2][0]}</p>{" "}
                      <p>{schedule[8][2][1]}</p>
                    </td>
                    <td
                      className={schedule[8][3][0] ? "cell-border" : null}
                      id="83"
                    >
                      <p className="subject-name">{schedule[8][3][0]}</p>{" "}
                      <p>{schedule[8][3][1]}</p>
                    </td>
                    <td
                      className={schedule[8][4][0] ? "cell-border" : null}
                      id="84"
                    >
                      <p className="subject-name">{schedule[8][4][0]}</p>{" "}
                      <p>{schedule[8][4][1]}</p>
                    </td>
                    <td
                      className={schedule[8][5][0] ? "cell-border" : null}
                      id="85"
                    >
                      <p className="subject-name">{schedule[8][5][0]}</p>{" "}
                      <p>{schedule[8][5][1]}</p>
                    </td>
                    <td
                      className={schedule[8][6][0] ? "cell-border" : null}
                      id="86"
                    >
                      <p className="subject-name">{schedule[8][6][0]}</p>{" "}
                      <p>{schedule[8][6][1]}</p>
                    </td>
                  </tr>
                </tbody>
              </table>
              </div>
            </div>
            :
            null
        }
      </div>
    </div>
  )

}

export default TeacherTimetable;