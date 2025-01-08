import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";
import React, { ReactNode } from "react";
import Typo from "../../global/ui/Typo";
import { globalStyles } from "../../global/constants/styles";
import { ExpenseProps } from "../../global/types/types";

export type HighlightMoney = {
  type: "Balance" | "Expense";
  heading: string;
  money: number;
  children?: ReactNode;
};

const HighlightMoney = ({
  heading = "Total Expense",
  money = 0,
  type = "Expense",
  children,
}: HighlightMoney) => {
  let style: StyleProp<ViewStyle>;
  if (type === "Expense") {
    style = { width: "57%" };
  } else {
    style = {
      width: "41%",
      backgroundColor: money < 0 ? "red" : "#8FBC8B",
    };
  }
  return (
    <View style={[styles.container, style]}>
      <View style={[globalStyles.row, globalStyles.center]}>
        <Typo fontSize={18} style={styles.text}>
          {heading}
        </Typo>
        {children}
      </View>
      <Typo fontSize={24} fontWeight="Bold" style={styles.text}>
        Rs. {money}
      </Typo>
    </View>
  );
};

export default HighlightMoney;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#1CAC78",
    borderRadius: 10,
    width: "50%",
  },
  text: {
    color: "white",
  },
});
