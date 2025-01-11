import AsyncStorage from "@react-native-async-storage/async-storage";
import { ExpenseProps } from "../types/types";

export const searchExpenses = async (searchItem: string) => {
    try {
        const expenses = await AsyncStorage.getItem('expenses');
        const parsedExpenses: ExpenseProps[] = expenses ? JSON.parse(expenses) : [];

        const result = parsedExpenses.filter((expense) =>
            expense.title.toLowerCase().includes(searchItem.toLowerCase())
        );
        return result
    } catch (error) {
        console.error('Failed to fetch expenses:', error);
        return []
    }
};
