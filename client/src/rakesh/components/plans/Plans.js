import React from "react";
import PlanCard from "./PlanCard";
const Basic = [
  "Teachmint Application for teachers and students",
  "Unlimited Two-Way Live Class and recording",
  "Store and share study material",
  "Online Tests (auto graded and subjective)",
  "Teacher-Student Chat & Discussions",
  "Dashboard for Institute Administration",
  "Classroom and teacher management (add/remove classroom, teacher, students)",
  "Teacher and Student Announcements",
  "Single Admin Access",
];

const Advanced = [
  "Everything in the Basic Plan",
  "Classroom Monitoring",
  "Student Attendance Tracking",
  "Student Performance Reports",
  "Insightful Statistics",
  "Fee Management",
  "Admission Management",
  "Website Builder",
  "Basic Statistics",
  "Certificate generator",
  "Yearly calendar",
  "Transport mangement",
  "Hostel management",
  "Parent Engagement App",
  "Dedicated Support Manager",
  "Periodic Teacher Product Workshop",
];
const Plans = () => {
  return (
    <div class="container">
      <div class="row">
        <div class="col-md-12 mb-5">
          <h2 class="Plans__main-head">Plans</h2>
        </div>
        <PlanCard data={Basic} />
        <PlanCard data={Advanced} />
        <PlanCard data={Basic} />
      </div>
    </div>
  );
};

export default Plans;
