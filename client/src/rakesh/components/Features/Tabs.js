import React from "react";
import Institue from "./TabsContent/Institute";
import Teachers from "./TabsContent/Teachers";
import Students from "./TabsContent/Students";
import "./TasbStyle.css";

function Tabses() {
  const data = [
    { id: "1", tabTitle: "Institues", tabContent: <Institue /> },
    { id: "2", tabTitle: "Teachers", tabContent: <Teachers /> },
    { id: "3", tabTitle: "Students", tabContent: <Students /> },
  ];
  const [visibleTab, setVisibleTab] = React.useState(data[0].id);

  const listTitles = data.map((item) => (
    <li
      onClick={() => setVisibleTab(item.id)}
      className={
        visibleTab === item.id
          ? "Tabs__tab-title Tabs__tab-title--active"
          : "Tabs__tab-title"
      }
    >
      {item.tabTitle}
    </li>
  ));

  const listContent = data.map((item) => (
    <p style={visibleTab === item.id ? {} : { display: "none" }}>
      {item.tabContent}
    </p>
  ));

  const listtitle = data.map((item) => (
    <p style={visibleTab === item.id ? {} : { display: "none" }}>
      {item.tabTitle}
    </p>
  ));

  return (
    <div className="Tabs__Tabs__Container">
      <div className="container m-auto Tabs__Title__Wrap">
        <ul className="h2"> {listTitles}</ul>
      </div>
      <div className="Tabs__Content__Wrap">
        {/* <span className="h3 text-center">{listtitle}</span> */}

        <span>{listContent}</span>
      </div>
    </div>

    // <div className="container row d-flex flex-row ">
    //   <div className="tabs">
    //     <ul className="tabs-titles">{listTitles}</ul>
    //   </div>
    // </div>
  );
}

export default Tabses;
