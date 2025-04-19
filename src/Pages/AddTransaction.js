import React, { useState, useEffect } from "react";
import "../Styles/AddTransaction.css";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";

const AddTransaction = () => {
  const [type, setType] = useState("Expense");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [transaction, setTransaction] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [categories, setCategories] = useState([
    "Salary",
    "Groceries",
    "Dining",
    "Transport",
    "Entertainment",
  ]);

  const location = useLocation();
  const navigate = useNavigate(); // ✅ for programmatic navigation

  useEffect(() => {
    const existingTransactions =
      JSON.parse(localStorage.getItem("transactions")) || [];
    setTransaction(existingTransactions);

    if (location.state && location.state.transaction) {
      const t = location.state.transaction;
      setType(t.type);
      setAmount(t.amount);
      setCategory(t.category);
      setDescription(t.description);
      setDate(t.date);
      setEditIndex(t.index);
    }
  }, [location]);

  const handleAddTransaction = (e) => {
    e.preventDefault();

    // ✅ Basic validation
    if (!amount || !category || !date) {
      return alert("Please fill all the fields!");
    }

    const currentTransaction = {
      type,
      amount: parseFloat(amount),
      category,
      description,
      date,
    };

    let updatedTransactions;

    if (editIndex !== null) {
      updatedTransactions = [...transaction];
      updatedTransactions[editIndex] = currentTransaction;
      alert("Transaction updated successfully!");
    } else {
      updatedTransactions = [...transaction, currentTransaction];
      alert("Transaction added successfully!");
    }

    localStorage.setItem("transactions", JSON.stringify(updatedTransactions));
    setTransaction(updatedTransactions);

    // ✅ Clear form
    setDescription("");
    setAmount("");
    setCategory("");
    setType("Expense");
    setDate("");
    setEditIndex(null);

    // ✅ Redirect only after successful submission
    navigate("/transaction");
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleAddCategory = () => {
    const newCat = prompt("Enter new category name:");
    if (newCat && !categories.includes(newCat)) {
      setCategories([...categories, newCat]);
      setCategory(newCat);
    } else if (categories.includes(newCat)) {
      alert("Category already exists!");
    }
  };

  return (
    <>
      <Navbar />
      <div className="add-transaction-container">
        <h2>{editIndex !== null ? "Edit Transaction" : "Add Transaction"}</h2>

        <div className="transaction-box">
          <div className="transaction-type">
            <label>
              <input
                type="radio"
                value="Expense"
                checked={type === "Expense"}
                onChange={() => setType("Expense")}
              />
              Expense
            </label>
            <label>
              <input
                type="radio"
                value="Income"
                checked={type === "Income"}
                onChange={() => setType("Income")}
              />
              Income
            </label>
          </div>

          <input
            type="number"
            value={amount}
            placeholder="Amount (₹)"
            onChange={(e) => setAmount(e.target.value)}
          />

          <div className="category-row">
            <select value={category} onChange={handleCategoryChange}>
              <option value="">Select Category</option>
              {categories.map((cat, index) => (
                <option key={index} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <button
              type="button"
              className="add-category-btn"
              onClick={handleAddCategory}
            >
              +
            </button>
          </div>

          <textarea
            value={description}
            placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <button className="transaction-btn" onClick={handleAddTransaction}>
            <div className="btn-sumbit-trans">
              {editIndex !== null ? "Update Transaction" : "Add Transaction"}
            </div>
          </button>
        </div>
      </div>
    </>
  );
};

export default AddTransaction;
