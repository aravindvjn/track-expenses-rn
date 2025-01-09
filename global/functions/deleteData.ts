import AsyncStorage from "@react-native-async-storage/async-storage";
import { ExpenseProps } from "../types/types";

export const deleteExpense = async (targetExpence: ExpenseProps) => {
    try {
        const existingExpenses = await AsyncStorage.getItem('expenses');
        const expenses = existingExpenses ? JSON.parse(existingExpenses) : [];
        const newExpenses = expenses?.filter((expense: ExpenseProps) => (expense?.id !== targetExpence?.id) && (expense?.title === targetExpence?.title))
        await AsyncStorage.setItem('expenses', JSON.stringify(newExpenses));
        if (newExpenses.length !== expenses?.length) {
            return true
        }
        return false
    } catch (error) {
        console.log("Error deleting expense:", error);
        return false
    }
};
