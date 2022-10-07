import * as React from "react";
import "./Style.css";
import CardComponent from "../Card";

const data = [
  {
    Image:
      "https://www.teachmint.com/static2/images/feature/landing-page/images/fee-management.svg",
    CardTitle: "Fee Management",
    CardParagraph:
      "Send automated reminders, customize your fee receipts, installment options, and much more! Fee management has never been easier. Learn more here!",
    Cardlink: "Google.com",
  },
  {
    Image:
      "https://www.teachmint.com/static2/images/feature/landing-page/images/admission-management.svg",
    CardTitle: "Admission Management",
    CardParagraph:
      "Avoid the hassles of maintaining a queue outside the admission counter with the admission management system. Streamline the traditional admission processes and offer convenience to parents, students, and other stakeholders. Click here to know more!",
    Cardlink: "Google.com",
  },
  {
    Image:
      "https://www.teachmint.com/static2/images/feature/landing-page/images/manage-school.svg",
    CardTitle: "Comprehensive School Structure",
    CardParagraph:
      "Premium suite of school management tools that can help administrators manage their schools effectively without any hiccups along the way. Learn more about this feature here.",
    Cardlink: "Google.com",
  },
  {
    Image:
      "https://www.teachmint.com/static2/images/feature/landing-page/images/school-planner.svg",
    CardTitle: "School Yearly Calendar Planner",
    CardParagraph:
      "Everything from annual day to annual exams is planned as per the school's yearly calendar, and so the calendar should be impeccable and completely error-free. Read more about how Teachmint can help you plan your calendar year with ease and precision.",
    Cardlink: "Google.com",
  },
  {
    Image:
      "https://www.teachmint.com/static2/images/feature/landing-page/images/classroom-management.svg",
    CardTitle: "User Management",
    CardParagraph:
      "Manage multiple admins, get quick access to information, ensure transparency in work, and more. Learn more about user management here.",
    Cardlink: "Google.com",
  },
  {
    Image:
      "https://www.teachmint.com/static2/images/feature/landing-page/images/offline-attendance.svg",
    CardTitle: "Attendance Management",
    CardParagraph:
      "Keep track of your students like never before. Get detailed attendance reports and individual student information with Teachmint - click here to learn more about the feature.",
    Cardlink: "Google.com",
  },
];

const Assessment = [
  {
    Image:
      "https://www.teachmint.com/static2/images/feature/landing-page/images/school-planner.svg",
    CardTitle: "Exam Planner",
    CardParagraph:
      "Set up exam schedules, generate automated rank boards, create subject-wise exam plans, and more - learn more here.",
    Cardlink: "Google.com",
  },
  {
    Image:
      "https://www.teachmint.com/static2/images/feature/landing-page/images/performance.svg",
    CardTitle: "Performance Management",
    CardParagraph:
      "Get a detailed report of students' performance and help in their holistic development with the performance report. Identify the knowledge and skills gap and provide them the required support after analyzing their performance.",
    Cardlink: "Google.com",
  },
  {
    Image:
      "https://www.teachmint.com/static2/images/feature/landing-page/images/practice-questions.svg",
    CardTitle: "Practice Questions",
    CardParagraph:
      "Leverage instant evaluation, quick solutions, sharable question links, E-books, and more with a wide range of practice questions - learn more here.",
    Cardlink: "Google.com",
  },
];

const Communication = [
  {
    Image:
      "https://www.teachmint.com/static2/images/feature/landing-page/images/communication-module.svg",
    CardTitle: "Communication Module",
    CardParagraph:
      "Maintain transparency in your institute with the communication module. Use this module to make necessary announcements and provide information in real-time. Get started now to connect effortlessly.",
    Cardlink: "Google.com",
  },
  {
    Image:
      "https://www.teachmint.com/static2/images/feature/landing-page/images/communicate.svg",
    CardTitle: "Private and classroom chat",
    CardParagraph:
      "With the private and classroom chat features, add attachments to make communication in an online classroom easier. Send out quick announcements and reminders to students with this feature!",
    Cardlink: "Google.com",
  },
  {
    Image:
      "https://www.teachmint.com/static2/images/feature/landing-page/images/live-poll.svg",
    CardTitle: "Live Polls",
    CardParagraph:
      "Engage students in the class like never before with live polls. Click here to read more about how you can use it to make your classes lively and engaging.",
    Cardlink: "Google.com",
  },
  {
    Image:
      "https://www.teachmint.com/static2/images/feature/landing-page/images/website-builder.svg",
    CardTitle: "Website Builder",
    CardParagraph:
      "Select templates, graphics, and website themes in accordance with your institute type. Create an online image for your institution with the website builder feature. Increase your visibility now!",
    Cardlink: "Google.com",
  },
];

export default function Institue() {
  return (
    <div>
      <span className="h3 mt-5 p-2 font-weight-bold Students__Span__text">
        Management
      </span>
      <CardComponent data={data} />
      <span className="h3 mt-5 p-2 font-weight-bold Students__Span__text">
        Assessment
      </span>
      <CardComponent data={Assessment} />
      <span className="h3 mt-5 p-2 font-weight-bold Students__Span__text">
        Communication & Engagement
      </span>
      <CardComponent data={Communication} />
    </div>
  );
}
