import * as SecureStore from 'expo-secure-store';
import { ExpenseProps } from '../types/types';
import Toast from 'react-native-toast-message';

export const storeExpense = async (expense: ExpenseProps) => {
    try {
        const existingExpenses = await SecureStore.getItemAsync('expenses');
        const expenses = existingExpenses ? JSON.parse(existingExpenses) : [];
        expenses.push(expense);
        await SecureStore.setItemAsync('expenses', JSON.stringify(expenses));
        Toast.show({
            type: 'success',
            text1: `Rs. ${expense?.amount} added to the expense as ${expense?.title}`,
            visibilityTime: 3000
        })
        await addToBalance(-expense?.amount)
    } catch (error) {
        Toast.show({
            type: 'error',
            text1: 'Failed to store expense',
            text2: String(error),
            visibilityTime: 3000
        })
    }
};


export const getExpenses = async () => {
    try {
        const expenses = await SecureStore.getItemAsync('expenses');
        const parsedExpenses = expenses ? JSON.parse(expenses) : [];

        const totalExpense = parsedExpenses.reduce((total: number, expense: ExpenseProps) => total + expense.amount, 0);

        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();

        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

        const dailyExpense = totalExpense / daysInMonth;

        return {
            totalExpense,
            dailyExpense,
            daysInMonth
        };
    } catch (error) {
        console.log('Failed to fetch expenses:', error);
        return { totalExpense: 0, dailyExpense: 0, daysInMonth: 0 };
    }
};



export const getLast28DaysExpenses = async () => {
    try {
        const expenses = await SecureStore.getItemAsync('expenses');
        const parsedExpenses = expenses ? JSON.parse(expenses) : [];

        const currentDate = new Date();
        const pastDate = new Date();
        pastDate.setDate(currentDate.getDate() - 28);

        const last28DaysExpenses = parsedExpenses.filter((expense: ExpenseProps) => {
            const [month, day, year] = expense.date.split('/').map(Number);
            const expenseDate = new Date(year, month - 1, day);

            return expenseDate >= pastDate && expenseDate <= currentDate;
        });

        const totalExpense = last28DaysExpenses.reduce((total: number, expense: ExpenseProps) => total + expense.amount, 0);

        return {
            totalExpense,
            last28DaysExpenses
        };
    } catch (error) {
        console.log('Failed to fetch expenses:', error);
        return { totalExpense: 0, last28DaysExpenses: [] };
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
        Toast.show({
            type: 'error',
            text1: 'Failed to store balance',
            text2: String(error),
            visibilityTime: 3000
        })
    }
};
