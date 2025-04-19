import React, { useEffect, useState } from "react";
import "../Styles/Transaction.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";

export const Transaction = () => {
  const navigate = useNavigate();

  const [transaction, setTransaction] = useState([]);

  // Fetch transactions from local storage
  useEffect(() => {
    const existingTransactions =
      JSON.parse(localStorage.getItem("transactions")) || [];
    setTransaction(existingTransactions);
  }, []);

  // Handle Edit
  const handleEdit = (index) => {
    const editTransaction = transaction[index];
    navigate("/add-transaction", {
      state: { transaction: { ...editTransaction, index } },
    });
  };

  // Handle Delete
  const handleDelete = (index) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this transaction?"
    );
    if (!confirmDelete) return;

    const updatedTransactions = [...transaction];
    updatedTransactions.splice(index, 1);

    localStorage.setItem("transactions", JSON.stringify(updatedTransactions));
    setTransaction(updatedTransactions);
    alert("Transaction deleted successfully!");
  };

  return (
    <>
      <Navbar />
      <div className="Full-transaction-table">
        <table className="transaction-table">
          <caption>Transaction History</caption>
          <thead>
            <tr>
              <th>Category</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Type</th>
              <th colSpan="2">Action</th>
            </tr>
          </thead>
          <tbody>
            {transaction.map((item, index) => (
              <tr key={index}>
                <td>{item.category}</td>
                <td>{item.description || "No Description"}</td>
                <td className={item.type === "Income" ? "income" : "expense"}>
                  {item.amount.toLocaleString("en-US", {
                    style: "currency",
                    currency: "INR",
                  })}
                </td>
                <td>{item.date}</td>
                <td>{item.type}</td>
                <td>
                  <button
                    className="edit-btn"
                    onClick={() => handleEdit(index)}
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(index)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Transaction;
