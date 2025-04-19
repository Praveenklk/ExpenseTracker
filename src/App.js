import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";

import { Dashboard } from "./Pages/Dashboard";
import { Transaction } from "./Pages/Transaction";
import { Report } from "./Pages/Report";
import { NotFound } from "./Pages/NotFound";
import AddTransaction from "./Pages/AddTransaction";
import { HomePage } from "./Components/HomePage";

export const Main = () => {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/transaction" element={<Transaction />} />
          <Route path="/report" element={<Report />} />
          <Route path="/add-transaction" element={<AddTransaction />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default Main;
