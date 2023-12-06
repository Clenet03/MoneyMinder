import { useState, useEffect } from "react";
import axios from 'axios';
import TransactionForm from './TransactionForm';

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [showTransactionForm, setShowTransactionForm] = useState(false);
  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/v1/transactions");
      const data = await response.json();
      console.log(data);
      setTransactions(data);
    } catch (error) {
      console.error(error);
    }
  };

  const addTransaction = async () => {
    // Replace this with your form data or logic to get transaction details
    const newTransaction = {
      date: "03-12-2023",
      time: "21:30",
      category: "Food",
      description: "Bought groceries",
      amount: "130.02",
      type: 1,
      user_id: 1
    };

    try {
      const response = await axios.post("http://localhost:3000/api/v1/addTransaction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: (newTransaction),
      });

      const data = await response.data;
      console.log(data);
      setTransactions([...transactions, data]);
    } catch (error) {
      console.error(error);
    }
  };
 
  return (
    <div className="w-[90%] overflow-hidden  flex flex-col space-y-2">
      <div className=" w-full h-fit flex pt-3 items-right ">
        <button className="bg-black text-white rounded-md p-3 ml-auto" onClick={() => {
          setShowTransactionForm(!showTransactionForm);
          console.log(showTransactionForm);
          }}>
          + Add transaction
        </button>
      </div>
      {/* Headers Div */}
      <div className="flex bg-slate-200 h-fit text-black-500  p-3 ">
        <div className="  w-[10%]">Date</div>
        <div className="  w-[10%]">Time</div>
        <div className="  w-[20%]">Category</div>
        <div className="  w-[40%]">Description</div>
        <div className="  w-[20%]">Amount</div>
      </div>

      {/* Transaction Data Div */}
      <div className="overflow-y-auto flex flex-col h-[500px]">
        {transactions.map((transaction, index) => (
          <div key={index} className={`flex border-b-2 p-2`}>
            <div className="w-[10%]">{new Date(transaction.date).toLocaleDateString()}</div>
            <div className="w-[10%]">{transaction.time}</div>
            <div className="w-[20%]">{transaction.category}</div>
            <div className="w-[40%]">{transaction.description}</div>
            <div
              className={`w-[20%] ${
                transaction.type ? "text-red-500" : "text-green-500"
              }`}
            >
              {transaction.amount}
            </div>
          </div>
        ))}
      </div>
      {showTransactionForm && <TransactionForm onClose={() => {setShowTransactionForm(false)}}/>}
    </div>
  );
}