import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
import axios from "axios";

// initial state
const initialState = {
  transactions: [],
  error: null,
  loading: true
};

// Create Context
// exporting bc we're going to be bringing this into other files

export const GlobalContext = createContext(initialState);

// Provider component
// all our components have to ve wrapped inside a provider component to communicate with context
// when you wrap stuff, they become `children`

export const GlobalProvider = ({ children }) => {
  // whenever you want to call a reducer action, you need `dispatch`
  const [state, dispatch] = useReducer(AppReducer, initialState);

  async function getTransactions() {
    try {
      const res = await axios.get('/api/v1/transactions');

      dispatch({
        type: 'GET_TRANSACTIONS',
        payload: res.data.data
      });
    } catch (err) {
      dispatch({
        type: 'TRANSACTION_ERROR',
        payload: err.response.data.error
      });
    }
  }

  // action type = `DELETE_TRANSACTION` in `AppReducer.js`
  async function deleteTransaction(id) {
      try {

          await axios.delete(`/api/v1/transactions/${id}`);

          dispatch({
            type: "DELETE_TRANSACTION",
            payload: id
          });
      } catch (err) {
        dispatch({
            type: 'TRANSACTION_ERROR',
            payload: err.response.data.error
          });
      }
  }

  async function addTransaction(transaction) {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    try {
      const res = await axios.post('/api/v1/transactions', transaction, config);

      dispatch({
        type: 'ADD_TRANSACTION',
        payload: res.data.data
      });
    } catch (err) {
      dispatch({
        type: 'TRANSACTION_ERROR',
        payload: err.response.data.error
      });
    }
  }

  // provider `provides` state, action, etc
  return (
    <GlobalContext.Provider
      value={{
          transactions: state.transactions,
          loading: state.loading,
          error: state.error,
          getTransactions,
          deleteTransaction,
          addTransaction,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
