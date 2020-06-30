import React from 'react';
import { Headers } from './component/Headers'
import { Balance } from './component/Balance'
import { IncomeExpenses } from './component/IncomeExpenses';
import { TransactionList } from './component/TransactionList';
import { AddTransaction } from './component/AddTransaction';

import { GlobalProvider } from './context/GlobalState'

import './App.css';

function App() {
    return (

        <GlobalProvider>
            <Headers />
            <div className="container">
                <Balance />
                <IncomeExpenses />
                <TransactionList />
                <AddTransaction />

            </div>

        </GlobalProvider>
    )
};

export default App;