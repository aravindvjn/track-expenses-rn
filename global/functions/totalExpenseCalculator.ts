import { ExpenseProps } from "../types/types";

export const totalExpenseCalcuator = (expenses: ExpenseProps[]) => {
    return expenses?.reduce(
        (accumulator: number, currentValue: ExpenseProps) => {
            if (
                currentValue?.amount < 0 &&
                currentValue?.status === "+"
            ) {
                return accumulator - currentValue?.amount;
            }
            if (currentValue?.status === "+") {
                return accumulator;
            }
            return currentValue?.amount > 0
                ? currentValue?.amount + accumulator
                : accumulator - currentValue?.amount;
        },
        0
    )
}