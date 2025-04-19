import React from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/HomePage.css";

export const HomePage = () => {
  const navigate = useNavigate();

  const handleDashboardRedirect = () => {
    navigate("/dashboard");
  };

  return (
    <div className="home-page-container">
      <header className="home-page-header">
        <h1 className="home-page-title">
          Your life's work, <br />
          powered by our life's work
        </h1>
        <p className="home-page-subtitle">
          Track your expenses and manage your budget effectively.
        </p>
      </header>

      <div className="home-page-content">
        <img
          className="expense-img"
          src="/expense-tracker.webp"
          alt="Expense Tracker"
        />
        <p className="home-page-access">
          Use the navigation bar to access different features.
        </p>
        <button className="home-page-button" onClick={handleDashboardRedirect}>
          Go to Dashboard
        </button>
      </div>

      <footer className="home-page-footer">
        <hr className="hr-line" />
        <p className="footer-text">Start managing your finances today!</p>
      </footer>
    </div>
  );
};

export default HomePage;
