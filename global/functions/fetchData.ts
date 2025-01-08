import * as SecureStore from 'expo-secure-store';
import { ExpenseProps } from '../types/types';

export const storeExpense = async (expense: ExpenseProps) => {
    try {
        const existingExpenses = await SecureStore.getItemAsync('expenses');
        const expenses = existingExpenses ? JSON.parse(existingExpenses) : [];
        expenses.push(expense);
        await SecureStore.setItemAsync('expenses', JSON.stringify(expenses));
    } catch (error) {
        console.log('Failed to store expense:', error);
    }
};

export const getExpenses = async () => {
    try {
        const expenses = await SecureStore.getItemAsync('expenses');
        return expenses ? JSON.parse(expenses) : [];
    } catch (error) {
        console.log('Failed to fetch expenses:', error);
    }
};

export const getBalance = async () => {
    try {
        const balance = await SecureStore.getItemAsync('balance');
        return balance ? JSON.parse(balance) : 0;
    } catch (error) {
        console.log('Failed to fetch balance:', error);
    }
};

export const addToBalance = async (amount: number) => {
    try {
        const existingBalance = await SecureStore.getItemAsync('balance');
        let balance = existingBalance ? JSON.parse(existingBalance) : 0;
        balance += amount;
        await SecureStore.setItemAsync('balance', JSON.stringify(balance));
    } catch (error) {
        console.log('Failed to store balance:', error);
    }
};
