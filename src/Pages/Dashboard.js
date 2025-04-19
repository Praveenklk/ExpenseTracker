import React, { useEffect, useState } from "react";
import "../Styles/Dashboard.css";
import { TransactionCard } from "../Components/TransactionCard";
import { RecentTransaction } from "../Components/RecentTransaction";
import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar";

export const Dashboard = () => {
  const [transaction, setTransaction] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const existingTransactions =
      JSON.parse(localStorage.getItem("transactions")) || [];
    setTransaction(existingTransactions);

    let income = 0;
    let expense = 0;

    existingTransactions.forEach((element) => {
      if (element.type === "Income") {
        income += element.amount;
      } else {
        expense += element.amount;
      }
      setTotalExpense(expense);
      setTotalIncome(income);
      setBalance(income - expense);
    });
  }, []);

  return (
    <>
      <Navbar />
      <div className="dashboard">
        <div className="dashboard-inner">
          <h2 className="dash-name">Dashboard</h2>
          <Link to="/add-transaction">
            {" "}
            <button className="add-transaction">+ Add Transaction</button>{" "}
          </Link>
        </div>
        <TransactionCard
          balance={balance}
          income={totalIncome}
          expense={totalExpense}
        />
        <div className="transaction-chart-row">
          <div className="transaction half-width">
            <RecentTransaction transaction={transaction} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
