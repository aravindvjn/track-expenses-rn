import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";
import React from "react";
import Typo from "../../global/ui/Typo";

export type HighlightMoney = {
  type: "Balance" | "Expense";
  heading: string;
  money: number;
};

const HighlightMoney = ({
  heading = "Total Expense",
  money = 0,
  type = "Expense",
}) => {
  let style: StyleProp<ViewStyle>;
  if (type === "Expense") {
    style = { width: "55%" };
  } else {
    style = {
      width: "42%",
      backgroundColor: "#8FBC8B",
    };
  }
  return (
    <View style={[styles.container, style]}>
      <Typo fontSize={18} style={styles.text}>
        {heading}
      </Typo>
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
