import { ReactNode } from "react"
import { StyleProp, TextStyle, ViewStyle } from "react-native";

export type UIDesignProps = {
    children?: ReactNode;
    style?: StyleProp<ViewStyle | TextStyle>;
    fontSize?: number;
    fontWeight?: 'Regular' | 'Thin' | 'Light' | 'Bold' | 'Medium' | 'SemiBold';
    textStyle?: StyleProp<TextStyle>
    onPress?: () => any;
}
export type ExpenseProps = {
    title: string;
    date: string;
    amount: number;

}