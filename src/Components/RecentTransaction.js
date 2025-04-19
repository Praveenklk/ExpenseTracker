import React from "react";

export const RecentTransaction = ({ transaction }) => {
  return (
    <>
      <div className="recent-transaction">
        <h2>Recent Transaction</h2>
        {transaction
          .slice(-10)
          .reverse()
          .map((transaction, index) => (
            <li className="span-list-items" key={index}>
              <span className="span-sepration">{transaction.category}</span>{" "}
              <span className="amount-span-sepration">
                {transaction.amount}
              </span>{" "}
            </li>
          ))}
      </div>
    </>
  );
};
export default RecentTransaction;
