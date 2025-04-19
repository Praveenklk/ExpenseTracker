import React from "react";
import Navbar from "../Components/Navbar";

export const Report = () => {
  return (
    <div>
      <Navbar />
      <h1 className="Report-content-title">Report</h1>
      <p className="report-para-first">
        This is the report page. <br></br>Here you can view your financial
        reports and analytics.
      </p>

      <img
        className="report-img"
        src="/expense-tracker.webp"
        alt="Expense Tracker"
      />
    </div>
  );
};
export default Report;
