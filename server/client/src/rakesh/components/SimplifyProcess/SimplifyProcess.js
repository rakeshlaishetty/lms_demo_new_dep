import React from "react";
import "./Style.css";
import SimplifyCard from "./SimplifyCard";
const SimplifyProcess = () => {
  const data1 = [
    {
      headertext: "Finance Management",
      subHeadtext:
        "Keep track, reduce costs and eliminate administrative hassle",
      headpara1: "Simplified fee management",
      subhead1:
        "Customize fee structures and provide discounts and offers with ease",
      headpara2: "Enable dynamic fee structures",
      subhead2: "Manage fees, payments, reminders and invoices seamlessly",
      headpara3: "Access intelligent reports",
      subhead3:
        "Stay on top of all your expenses and receivables with insightful financial reports",
      link: "#",
      iseven: false,
    },
    {
      headertext: "Finance Management",
      subHeadtext:
        "Keep track, reduce costs and eliminate administrative hassle",
      headpara1: "Simplified fee management",
      subhead1:
        "Customize fee structures and provide discounts and offers with ease",
      headpara2: "Enable dynamic fee structures",
      subhead2: "Manage fees, payments, reminders and invoices seamlessly",
      headpara3: "Access intelligent reports",
      subhead3:
        "Stay on top of all your expenses and receivables with insightful financial reports",
      link: "#",
      iseven: true,
    },
  ];
  return (
    <>
      <div class="SimplifyProcess__parent container">
        <div class="SimplifyProcess__parent__sticky__header SimplifyProcess__parent__is-sticky">
          <h1 style={{ "z-index": 99 }}>
            Simplify processes and <br /> intelligently manage your institute
          </h1>
        </div>
        <SimplifyCard data={data1} />
      </div>
    </>
  );
};

export default SimplifyProcess;
