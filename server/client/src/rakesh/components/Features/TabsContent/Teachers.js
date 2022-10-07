import * as React from "react";
import "./Style.css";
import CardComponent from "../Card";

const data = [
  {
    title: "Management",
    Image:
      "https://www.teachmint.com/static2/images/feature/landing-page/images/fee-management.svg",
    CardTitle: "Fee management",
    CardParagraph: "lorem ipsum GEnerator",
    Cardlink: "Google.com",
  },
  {
    title: "Management",
    Image:
      "https://www.teachmint.com/static2/images/feature/landing-page/images/fee-management.svg",
    CardTitle: "Fee management",
    CardParagraph: "lorem ipsum GEnerator",
    Cardlink: "Google.com",
  },
  {
    title: "Management",
    Image:
      "https://www.teachmint.com/static2/images/feature/landing-page/images/fee-management.svg",
    CardTitle: "Fee management",
    CardParagraph: "lorem ipsum GEnerator",
    Cardlink: "Google.com",
  },
];

const communication = [
  {
    title: "Live Classes and Class Recording",
    Image:
      "https://www.teachmint.com/static2/images/feature/landing-page/images/live-recording.svg",
    CardTitle: "Fee management",
    CardParagraph:
      "Conduct live lectures and record the live classes to give the best learning experience to students. Share the recorded lectures with students and ensure effective learning.",
    Cardlink: "Google.com",
  },
  {
    title: "Classroom and Private Chat",
    Image:
      "https://www.teachmint.com/static2/images/feature/landing-page/images/communicate.svg",
    CardTitle: "Fee management",
    CardParagraph:
      "Connect with students and parents effortlessly & efficiently. Solve all queries and maintain transparency. Know more here.",
    Cardlink: "Google.com",
  },
  {
    title: "Online Whiteboard",
    Image:
      "https://www.teachmint.com/static2/images/feature/landing-page/images/white-bord.svg",
    CardTitle: "Fee management",
    CardParagraph:
      "Teach with drawings, examples, graphs, and more. Ensure student engagement and enjoy hassle-free teaching with the online whiteboard. Know more here.",
    Cardlink: "Google.com",
  },
  {
    title: "Share Study Materials",
    Image:
      "https://www.teachmint.com/static2/images/feature/landing-page/images/study-material.svg",
    CardTitle: "Fee management",
    CardParagraph:
      "Share study materials with ease and ensure effective learning. From images to docs to PDFs, share resources in any form with students effortlessly. Learn more now.",
    Cardlink: "Google.com",
  },
];

const Assessment = [
  {
    title: "Create Tests Within Seconds",
    Image:
      "https://www.teachmint.com/static2/images/feature/landing-page/images/tests.svg",
    CardTitle: "Create Tests Within Seconds",
    CardParagraph:
      "Choose from over 20L+ subjective and objective questions and create your test within seconds! Plan, Conduct & Evaluate Exams with Ease",
    Cardlink: "Google.com",
  },
  {
    title: "Homework & Student Engagement",
    Image:
      "https://www.teachmint.com/static2/images/feature/landing-page/images/evaluate-homework.svg",
    CardTitle: "Homework & Student Engagement",
    CardParagraph:
      "Assign and grade homework effectively and efficiently. Set deadlines, be notified during submissions, and more! Learn more now.",
    Cardlink: "Google.com",
  },
  {
    title: "Practice Questions",
    Image:
      "https://www.teachmint.com/static2/images/feature/landing-page/images/practice-questions.svg",
    CardTitle: "Practice Questions",
    CardParagraph:
      "Leverage instant evaluation, quick solutions, sharable question links, E-books, and more with a wide range of practice questions - learn more here.",
    Cardlink: "Google.com",
  },
];

export default function Teachers() {
  return (
    <div>
      <span className="h3 mt-5 p-2 font-weight-bold Students__Span__text">
        Communication & Engagement
      </span>
      <CardComponent data={communication} />
      <span className="h3 mt-5 p-2 font-weight-bold Students__Span__text">
        Assessment
      </span>
      <CardComponent data={Assessment} />
    </div>
  );
}
