import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {useNavigate} from 'react-router-dom';
import AxiosInstance from '../components/AxiosInstance'; // Adjust the import path as necessary

const TransactionForm = () => {
  const {handleSubmit, register} = useForm();
  const navigate = useNavigate();
  const [msg, setMsg] = useState('');

  const submission2 = (data) => {
    // Log the data being sent
    console.log("Data being sent:", {
      sender: data.sender,
      receiver: data.receiver,
      amount: parseFloat(data.amount),
    });

    AxiosInstance.post('transactions/', {
      sender: data.sender,
      receiver: data.receiver,
      amount: parseFloat(data.amount),
    }, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(response => {
        console.log("Transaction successful:", response.data);
        setMsg('Transaction successfull'); // Clear any previous errors
        // navigate(`/transactions`);
      })
      .catch(error => {
        console.error('Error:', error.message);
        setMsg('An error occurred. Please try again.');
      });
  };

  return (
    <div>
      <p>Relges : sender exists , receiver exists, ammount plus que balance dans le compte </p>
      <form onSubmit={handleSubmit(submission2)}>
        <div>
          <label>Sender Email:</label>
          <input type="email" {...register('sender', {required: true})} />
        </div>
        <div>
          <label>Receiver Email:</label>
          <input type="email" {...register('receiver', {required: true})} />
        </div>
        <div>
          <label>Amount:</label>
          <input type="number" {...register('amount', {required: true})} />
        </div>
        <button type="submit">Send</button>
        {msg && <div className="error">{msg}</div>}
      </form>
    </div>
  );
};

export default TransactionForm;
