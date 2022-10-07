import * as React from "react";
import "./Style.css";
import CardComponent from "../Card";

const Learning = [
  {
    title: "Maths & cience",
    Image:
      "https://img.freepik.com/premium-vector/math-science-education-concept-poster-flat-style-design_88813-848.jpg?w=740",
    CardTitle: "Math & cience",
    CardParagraph:
      "A Student can learn math And Science Easily with the concentration on every Topic ",
    Cardlink: "Google.com",
  },
  {
    title: "Wbsite developmemnt ",
    Image:
      "https://img.freepik.com/free-vector/web-development-programmer-engineering-coding-website-augmented-reality-interface-screens-developer-project-engineer-programming-software-application-design-cartoon-illustration_107791-3863.jpg",
    CardTitle: "Wbsite developmemnt ",
    CardParagraph:
      "Student can learn HTML CSS Javascrippt for Webd Develepment",
    Cardlink: "Google.com",
  },
  {
    title: "Python",
    Image:
      "https://img.freepik.com/free-vector/programmer-working-web-development-code-engineer-programming-python-php-java-script-computer_90220-250.jpg",
    CardTitle: "Python",
    CardParagraph:
      "Student can learn Python with Advanced topics Like lambda expression and som Webscrapiing Techniques",
    Cardlink: "Google.com",
  },
  {
    title: "Robotics",
    Image:
      "https://img.freepik.com/premium-photo/robot-humanoid-using-tablet-computer-big-data-analytic_31965-8115.jpg",
    CardTitle: "Robotics",
    CardParagraph:
      "Student can learn Robotics with How to implement the machines with softwares",
    Cardlink: "Google.com",
  },
  {
    title: "AI/Ml",
    Image:
      "https://img.freepik.com/free-vector/brain-with-digital-circuit-programmer-with-laptop-machine-learning-artificial-intelligence-digital-brain-artificial-thinking-process-concept-vector-isolated-illustration_335657-2246.jpg",
    CardTitle: "AI/Ml",
    CardParagraph:
      "Student can learn the Artificial Intelligence And MAchine Learning that can do the automate some human tasks ",
    Cardlink: "Google.com",
  },
  {
    title: "Datascience & Drones",
    Image:
      "https://img.freepik.com/free-vector/isometric-drone-operator-composition-with-wild-outdoor-landscape-man-with-remote-device-flying-quadcopter-illustration_1284-61124.jpg",
    CardTitle: "Datascience & Drones",
    CardParagraph:
      "robotics and drones will be accustomed to teaching coding for teenagers, and also the edges of teaching coding for teenagers",
    Cardlink: "Google.com",
  },
];

const HomeWork = [
  {
    title: "Gamified Homework",
    Image:
      "https://img.freepik.com/free-vector/school-kid-boy-studying-front-computer_3446-441.jpg",
    CardTitle: "Gamified Homework",
    CardParagraph:
      "The application of typical elements of game playing (e.g., point scoring, competition with others, rules of play) to other areas of activity”.",
    Cardlink: "Google.com",
  },
  {
    title: "Perosnal dashboard",
    Image:
      "https://img.freepik.com/free-vector/modern-dashboard-admin-panel-with-flat-design_23-2147873081.jpg",
    CardTitle: "Perosnal dashboard",
    CardParagraph:
      "The dashboard provides you with insights into students performance. You will be able to search a student by his or her student registration id and filter the results by class or profile.",
    Cardlink: "Google.com",
  },
  {
    title: "Ai Based Assistant",
    Image:
      "https://img.freepik.com/free-vector/chatbot-voice-controlled-virtual-assistant-abstract-concept-illustration_335657-3681.jpg",
    CardTitle: "Ai Based Assistant",
    CardParagraph:
      "Ai Based Assistant is valuable feature that allows parents, teachers and students to quickly and easily access content that can be utilized for guided practice",
    Cardlink: "Google.com",
  },
  {
    title: "Exam Planner",
    Image:
      "https://img.freepik.com/free-photo/exam-check-quiz-knowledge-lesson-test-concept_53876-132676.jpg",
    CardTitle: "Exam Planner",
    CardParagraph:
      "Powerful but easy to use,  exam schedule maker is your ultimate solution for creating a custom exam schedule online.",
    Cardlink: "Google.com",
  },
  {
    title: "Performance managment",
    Image:
      "https://img.freepik.com/premium-vector/customer-credit-history-documents_485380-1985.jpg",
    CardTitle: "Performance managment",
    CardParagraph:
      "performance managament was designed to generate multi-measure scorecards emphasizing students' yearly academic growth,",
    Cardlink: "Google.com",
  },
  {
    title: "Practice Questions",
    Image:
      "https://img.freepik.com/free-vector/realistic-test-paper-composition-with-pencil-stack-students-paperwork-with-marks-correct-answers_1284-54249.jpg",
    CardTitle: "Practice Questions",
    CardParagraph:
      "Practice questions are gradable, question-based activities that use questions you create, or you can link to questions that already exist in an assessment or another practice question set.",
    Cardlink: "Google.com",
  },
];

const communication = [
  {
    title: "Private Classroom chats",
    Image:
      "https://www.teachmint.com/static2/images/feature/landing-page/images/fee-management.svg",
    CardTitle: "Private Classroom chats",
    CardParagraph:
      "Private and Classroom Chat. The private and classroom chat helps to build an online community, where students and teachers can stay connected. The private and classroom chat feature allows students to clear doubts. ",
    Cardlink: "Google.com",
  },
  {
    title: "Create & Share Content",
    Image:
      "https://www.teachmint.com/static2/images/feature/landing-page/images/fee-management.svg",
    CardTitle: "Private Classroom chats",
    CardParagraph:
      "By making content easily available and removing restrictions on use of that content, companies can nurture creative interactions that are likely to spread. Wikis can be used when creating an event with a network.. The private and classroom chat feature allows students to clear doubts. ",
    Cardlink: "Google.com",
  },
  {
    title: "Discuss with Teachers",
    Image:
      "https://www.teachmint.com/static2/images/feature/landing-page/images/fee-management.svg",
    CardTitle: "Discuss with Teachers",
    CardParagraph:
      "Discussion methods are a variety of forums for open-ended, collaborative exchange of ideas among a teacher and students or among students for the purpose of furthering students thinking, learning, problem solving, understanding, or literary appreciation. ",
    Cardlink: "Google.com",
  },
];
export default function Students() {
  return (
    <div>
      <span className="h3 mt-5 p-2 font-weight-bold Students__Span__text">
        Learning
      </span>
      <CardComponent data={Learning} />
      <span className="h3 mt-5 p-2 font-weight-bold Students__Span__text">
        HomeWork Assistant
      </span>
      <CardComponent data={HomeWork} />
      <span className="h3 mt-5 p-2 font-weight-bold Students__Span__text">
        Communication
      </span>
      <CardComponent data={communication} />
    </div>
  );
}
