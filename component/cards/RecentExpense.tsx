import {
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import React, { Dispatch, SetStateAction, useState } from "react";
import Typo from "../../global/ui/Typo";
import { ExpenseProps } from "../../global/types/types";
import { useRoute } from "@react-navigation/native";
import NoExpense from "./NoExpense";
import { getColor } from "../../global/functions/getColors";

const RecentExpense = ({
  style,
  noBalance,
  expenses = [],
  showFull,
  setEditor,
}: {
  style?: StyleProp<ViewStyle>;
  noBalance?: boolean;
  expenses?: ExpenseProps[];
  showFull?: boolean;
  setEditor: Dispatch<SetStateAction<ExpenseProps | undefined>>;
}) => {
  const { name } = useRoute();
  let limit = showFull ? 10 : 5;
  const [count, setCount] = useState<number>(limit);
  let date: string;
  if (expenses?.length === 0 && name === "Home") {
    return <NoExpense />;
  }
  let info = null;
  if (expenses?.length === 0) {
    info = (
      <Typo
        fontSize={14}
        fontWeight="SemiBold"
        style={{ textAlign: "center", marginBottom: 10, paddingVertical: 10 }}
      >
        No Expenses Yet.
      </Typo>
    );
  }
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
        {!noBalance && (
          <Typo style={[styles.tableCell, styles.headerCell, styles.money]}>
            Balance
          </Typo>
        )}
      </View>
      {info}
      {expenses?.slice(0, count)?.map((row, index) => {
        let dateComponent = null;
        if (date !== row?.date) {
          date = row?.date;
          dateComponent = (
            <View style={{ backgroundColor: "#eaeaea", padding: 10 }}>
              <Typo style={{ textAlign: "center" }}>{row?.date}</Typo>
            </View>
          );
        }
        return (
          <Pressable onPress={() => setEditor(row)} key={index}>
            {dateComponent}
            <View
              key={index}
              style={[
                styles.tableRow,
                {
                  backgroundColor:
                    row?.status === "+" && row?.balance >= 0
                      ? "#98FF98"
                      : row?.balance < 0
                      ? getColor(row?.balance)
                      : "",
                },
              ]}
            >
              <Typo style={[styles.tableCell, styles.slno]}>{index + 1}</Typo>
              <Typo style={[styles.tableCell, styles.title]}>{row.title}</Typo>
              <Typo style={[styles.tableCell, styles.money]}>{row.amount}</Typo>
              {!noBalance && (
                <Typo style={[styles.tableCell, styles.money]}>
                  {row?.balance}
                </Typo>
              )}
            </View>
          </Pressable>
        );
      })}
      {expenses?.length > limit && (
        <View style={styles.pressableContainer}>
          {expenses?.length > count ? (
            <Pressable
              style={styles.pressable}
              onPress={() => setCount((prev) => prev + 5)}
            >
              <Typo fontSize={14}>Load More</Typo>
            </Pressable>
          ) : (
            <View></View>
          )}
          {count > limit && (
            <Pressable
              style={[
                styles.pressable,
                {
                  borderRadius: 0,
                  borderTopLeftRadius: 6,
                  borderBottomLeftRadius: 6,
                },
              ]}
              onPress={() =>
                setCount((prev) =>
                  prev > limit ? (prev - limit < 10 ? 10 : prev - limit) : prev
                )
              }
            >
              <Typo fontSize={14}>Load Less</Typo>
            </Pressable>
          )}
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
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
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
    flex: 4,
  },
  money: {
    flex: 2,
  },
  pressableContainer: {
    width: "100%",
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 10,
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
