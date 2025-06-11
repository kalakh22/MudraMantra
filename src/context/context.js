import React, { useReducer, createContext } from 'react';

import contextReducer from './contextReducer';

const initialState=JSON.parse(localStorage.getItem('transactions')) || [{"amount":300,"category":"Clothes","type":"Expense","date":"2025-06-11","id":"010448d2-f549-4513-b38d-d221193229e5"},{"amount":200,"category":"Food","type":"Expense","date":"2025-06-11","id":"a84b2f61-fa96-4ecc-9be0-4ddcb02fea85"},{"amount":500,"category":"Investments","type":"Income","date":"2025-06-10","id":"531e6028-cde0-4df6-aa36-2bf2d6078579"},{"amount":1000,"category":"Business","type":"Income","date":"2025-06-10","id":"09969fa1-fe9e-40f3-bb31-a5027fe9cd2e"},{"amount":200,"category":"Entertainment","type":"Expense","date":"2025-06-11","id":"a1943ba6-0373-4784-a4c8-80af7efbe633"},{"amount":100,"category":"Extra income","type":"Income","date":"2025-06-11","id":"efe780aa-3553-47dd-94e0-73d0aebd58d3"}];

export const ExpenseTrackerContext = createContext(initialState);

export const Provider = ({ children }) => {
    const [transactions, dispatch] = useReducer(contextReducer, initialState);

    const deleteTransaction = (id) => {
        dispatch({ type : 'DELETE_TRANSACTION', payload: id });
    }

    const addTransaction = (transaction) => {
        dispatch({ type : 'ADD_TRANSACTION', payload: transaction });
    }

    const balance = transactions.reduce((acc, currVal) =>
    currVal.type === 'Expense' ? acc - currVal.amount : acc + currVal.amount
    , 0);


    return (
        <ExpenseTrackerContext.Provider value={{ 
            deleteTransaction,
            addTransaction,
            transactions,
            balance
         }}>
            {children}
        </ExpenseTrackerContext.Provider>
    )
}