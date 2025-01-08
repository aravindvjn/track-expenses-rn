import { ReactNode } from "react"

export type UIDesignProps = {
    children?: ReactNode;
    style?: {};
    fontSize?: number;
    fontWeight?: 'Regular' | 'Thin' | 'Light' | 'Bold' | 'Medium' | 'SemiBold';
}
export type ExpenseProps = {
    title: string;
    date: Date;
    amount: number;

}