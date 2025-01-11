import AsyncStorage from '@react-native-async-storage/async-storage';
import { ExpenseProps } from '../types/types';

export const storeExpense = async (expense: ExpenseProps) => {
    try {
        const existingExpenses = await AsyncStorage.getItem('expenses');
        const expenses = existingExpenses ? JSON.parse(existingExpenses) : [];
        const lastBalance = expenses[expenses?.length - 1]?.balance || 0;
        expenses.push({
            ...expense,
            balance: expense?.status === "+" ? lastBalance + expense?.amount : lastBalance - expense?.amount
        });
        await AsyncStorage.setItem('expenses', JSON.stringify(expenses));
    } catch (error) {
        console.log("Error storing expense:", error);
    }
};

export const editMoneyToBeGiven = async (expense: ExpenseProps) => {
    try {
        const existingExpenses = await AsyncStorage.getItem('MoneyToBeGiven');
        const expenses = existingExpenses ? JSON.parse(existingExpenses) : [];
        console.log(expenses)
        const oneExpenseIndex = expenses.findIndex((item: ExpenseProps) => (item.id === expense.id) && (item.title === expense.title) && (item.balance === expense.balance));

        if (oneExpenseIndex !== -1) {
            expenses[oneExpenseIndex] = expense;
            await AsyncStorage.setItem('MoneyToBeGiven', JSON.stringify(expenses));
            return true
        } else {
            return false
        }
    } catch (error) {
        console.log("Error storing expense:", error);
        return false
    }
};

export const getExpenses = async (type = '28Days') => {
    try {
        const expenses = await AsyncStorage.getItem('expenses');
        const parsedExpenses = expenses ? JSON.parse(expenses) : [];

        const currentDate = new Date();
        let startDate: Date;

        // Determine the start date based on the type
        if (type === 'thisMonth') {
            startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        } else if (type === 'lastMonth') {
            startDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
        } else if (type === 'thisYear') {
            startDate = new Date(currentDate.getFullYear(), 0, 1);
        } else {
            startDate = new Date();
            startDate.setDate(currentDate.getDate() - 28);
        }

        const filteredExpenses = parsedExpenses.filter((expense: ExpenseProps) => {
            const [month, day, year] = expense.date.split('/').map(Number);
            const expenseDate = new Date(year, month - 1, day);

            return expenseDate >= startDate && expenseDate <= currentDate;
        }).reverse();

        const totalExpense = filteredExpenses.reduce((total: number, expense: ExpenseProps) => total + expense.amount, 0);

        return {
            totalExpense: totalExpense || 0,
            filteredExpenses: filteredExpenses || [],
        };
    } catch (error) {
        console.log('Failed to fetch expenses:', error);
        return { totalExpense: 0, filteredExpenses: [] };
    }
};

export const addMoneyToBeGiven = async (amountToGive: ExpenseProps) => {
    try {
        const existingMoney = await AsyncStorage.getItem('MoneyToBeGiven');
        const moneyArray = existingMoney ? JSON.parse(existingMoney) : [];

        moneyArray.push(amountToGive);

        await AsyncStorage.setItem('MoneyToBeGiven', JSON.stringify(moneyArray));

        return true;
    } catch (error) {
        console.log('Failed to fetch or store money to be given:', error);
        return false;
    }
};

export const getStoredMoneyToBeGiven = async () => {
    try {
        const storedMoney = await AsyncStorage.getItem('MoneyToBeGiven');
        if (storedMoney) {
            try {
                return JSON.parse(storedMoney);
            } catch (e) {
                console.log('Error parsing stored money:', e);
                return [];
            }
        } else {
            return [];
        }
    } catch (error) {
        console.log('Failed to fetch stored money:', error);
        return [];
    }
};
