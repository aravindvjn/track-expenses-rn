import { useQuery } from "@tanstack/react-query";
import { getExpenses, getStoredMoneyToBeGiven } from "../global/functions/fetchData";
import { searchExpenses } from "../global/functions/searchExpense";

export const useLatestExpense = () => {
    return useQuery({
        queryKey: ["expenses"],
        queryFn: async () => await getExpenses(),
    });
}

export const useAllTransactions = () => {
    return useQuery({
        queryKey: ["allTransactions"],
        queryFn: async () => {
            const thisMonth = await getExpenses("thisMonth");
            const thisYear = await getExpenses("thisYear");
            const toBeGiven = await getStoredMoneyToBeGiven();
            return {
                thisMonth,
                thisYear,
                toBeGiven,
            };
        },
    });

}
