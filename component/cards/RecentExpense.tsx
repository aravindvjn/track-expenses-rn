import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";
import React, { useState } from "react";
import Typo from "../../global/ui/Typo";
import { ExpenseProps } from "../../global/types/types";

const RecentExpense = ({
  style,
  noBalance,
  expenses = [],
}: {
  style?: StyleProp<ViewStyle>;
  noBalance?: boolean;
  expenses?: ExpenseProps[];
}) => {
  const [count, setCount] = useState<number>(5);

  return (
    <View style={[styles.container, style]}>
      <View style={styles.tableRow}>
        <Typo style={[styles.tableCell, styles.headerCell, styles.slno]}>
          Sl No.
        </Typo>
        <Typo style={[styles.tableCell, styles.headerCell, styles.title]}>
          Title
        </Typo>
        <Typo style={[styles.tableCell, styles.headerCell, styles.money]}>
          Amount
        </Typo>
        {/* {!noBalance && (
          <Typo style={[styles.tableCell, styles.headerCell, styles.money]}>
            Balance
          </Typo>
        )} */}
      </View>

      {/* Table Data */}
      {expenses?.slice(0, count)?.map((row, index) => {
        return (
          <View key={index} style={styles.tableRow}>
            <Typo style={[styles.tableCell, styles.slno]}>{index + 1}</Typo>
            <Typo style={[styles.tableCell, styles.title]}>{row.title}</Typo>
            <Typo style={[styles.tableCell, styles.money]}>{row.amount}</Typo>
            {/* {!noBalance && (
              <Typo style={[styles.tableCell, styles.money]}>
                {balance - row.amount}
              </Typo>
            )} */}
          </View>
        );
      })}
      {expenses?.length > count && (
        <View style={styles.pressableContainer}>
          <Pressable
            style={styles.pressable}
            onPress={() => setCount((prev) => prev + 5)}
          >
            <Typo fontSize={14}>Load More</Typo>
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default RecentExpense;

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    backgroundColor: "white",
    overflow: "hidden",
    paddingBottom: 10,
    elevation: 5,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableCell: {
    flex: 1,
    padding: 10,
    textAlign: "center",
  },
  headerCell: {
    fontWeight: "bold",
    backgroundColor: "#f4f4f4",
  },
  slno: {
    flex: 1,
  },
  title: {
    flex: 3,
  },
  money: {
    flex: 2,
  },
  pressableContainer: {
    width: "100%",
  },
  pressable: {
    backgroundColor: "#ececec",
    padding: 5,
    paddingHorizontal: 10,
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
    width: 95,
  },
});
