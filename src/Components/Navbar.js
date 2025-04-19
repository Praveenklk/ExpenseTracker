import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../Styles/Navbar.css";
//Icons Code
import { RxDashboard } from "react-icons/rx";
import { GrTransaction } from "react-icons/gr";
import { TbReport } from "react-icons/tb";
import { BsChatLeftQuote } from "react-icons/bs";
import { IoLogOutOutline } from "react-icons/io5";
import { FaHome } from "react-icons/fa";

export const Navbar = () => {
  const location = useLocation();
  const [quote, setQuote] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const Quotefetch = async () => {
    try {
      const response = await fetch("https://quotes-api-self.vercel.app/quote");
      const data = await response.json();
      console.log(data);
      setQuote(data.quote);
      setIsModalOpen(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <nav className="navbar">
      <h1 className="logo">Expense Tracker</h1>

      <ul className="nav-links">
        <li className={location.pathname === "/home" ? "active" : ""}>
          <Link to={"/home"}>
            <span className="header-icons">
              <FaHome />
            </span>
            Home
          </Link>
        </li>

        <li className={location.pathname === "/dashboard" ? "active" : ""}>
          <Link to={"/dashboard"}>
            <span className="header-icons">
              <RxDashboard />
            </span>
            Dashboard
          </Link>
        </li>

        <li className={location.pathname === "/transaction" ? "active" : ""}>
          <Link to={"/transaction"}>
            <span className="header-icons">
              <GrTransaction />
            </span>
            Transaction
          </Link>
        </li>

        <li className={location.pathname === "/Report" ? "active" : ""}>
          <Link to={"/Report"}>
            <span className="header-icons">
              <TbReport />
            </span>
            Report
          </Link>
        </li>

        <li className={location.pathname === "/getquote" ? "active" : ""}>
          <span className="header-icons">
            <BsChatLeftQuote />
          </span>
          <div onClick={Quotefetch}>getquote</div>
        </li>

        <li
          onClick={() => {
            localStorage.clear();
            alert("Logout Successfully , All Your Previous Data Cleared");
            window.location.reload();
          }}
          className={location.pathname === "/logout" ? "active" : ""}
        >
          <span className="header-icons">
            <IoLogOutOutline />
          </span>
          Clear Data
        </li>
      </ul>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p>{quote}</p>
            <button className="cls-btn" onClick={() => setIsModalOpen(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
export default Navbar;
