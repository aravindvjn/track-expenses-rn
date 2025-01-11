import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import Container from "../global/ui/Container";
import Typo from "../global/ui/Typo";
import RecentExpense from "../component/cards/RecentExpense";
import { useQuery } from "@tanstack/react-query";
import {
  getExpenses,
  getStoredMoneyToBeGiven,
} from "../global/functions/fetchData";
import { ExpenseProps } from "../global/types/types";
import { totalExpenseCalcuator } from "../global/functions/totalExpenseCalculator";
import EditExpense from "../component/Prompts/EditExpense";
import { useAllTransactions } from "../hook/dataHooks";

const AllTransactions = () => {
  const [editor, setEditor] = useState<ExpenseProps | undefined>();
  const { data: allTransactions, isLoading, isError } = useAllTransactions();
  if (isLoading) {
    return (
      <Container>
        <ActivityIndicator color="white" size="large" />
      </Container>
    );
  }
  if (isError) {
    return (
      <Container>
        <ActivityIndicator color="white" size="large" />
      </Container>
    );
  }
  return (
    <>
      {editor && <EditExpense editor={editor} setEditor={setEditor} />}
      <Container>
        <Typo style={styles.text} fontSize={22} fontWeight="Bold">
          All Transactions
        </Typo>
        <View style={styles.givenContainer}>
          <Typo
            style={[styles.text, { textAlign: "center" }]}
            fontSize={18}
            fontWeight="SemiBold"
          >
            To Be Given
          </Typo>

          <View>
            <RecentExpense
              setEditor={setEditor}
              expenses={allTransactions?.toBeGiven}
              noBalance
              style={{ borderRadius: 0 }}
            />
          </View>
          <View style={styles.totalExpense}>
            <Typo>
              Total Expense :
              <Typo fontSize={18} fontWeight="Bold">
                Rs.{" "}
                {allTransactions?.toBeGiven?.reduce(
                  (accumulator: number, currentValue: ExpenseProps) => {
                    return currentValue?.amount > 0
                      ? currentValue?.amount + accumulator
                      : accumulator - currentValue?.amount;
                  },
                  0
                )}
              </Typo>
            </Typo>
          </View>
        </View>

        <View style={styles.givenContainer}>
          <Typo
            style={[styles.text, { textAlign: "center" }]}
            fontSize={18}
            fontWeight="SemiBold"
          >
            This Month
          </Typo>
          <View>
            <RecentExpense
              setEditor={setEditor}
              expenses={allTransactions?.thisMonth?.filteredExpenses}
              style={{ borderRadius: 0 }}
            />
          </View>
          <View style={styles.totalExpense}>
            <Typo>
              Total Expense :
              <Typo fontSize={18} fontWeight="Bold">
                Rs.{" "}
                {totalExpenseCalcuator(
                  allTransactions?.thisMonth?.filteredExpenses
                )}
              </Typo>
            </Typo>
          </View>
        </View>
        <View style={styles.givenContainer}>
          <Typo
            style={[styles.text, { textAlign: "center" }]}
            fontSize={18}
            fontWeight="SemiBold"
          >
            This Year
          </Typo>
          <View>
            <RecentExpense
              setEditor={setEditor}
              expenses={allTransactions?.thisYear?.filteredExpenses}
              style={{ borderRadius: 0 }}
            />
          </View>
          <View style={styles.totalExpense}>
            <Typo>
              Total Expense :{" "}
              <Typo fontSize={18} fontWeight="Bold">
                Rs.{" "}
                {totalExpenseCalcuator(
                  allTransactions?.thisYear?.filteredExpenses
                )}
              </Typo>
            </Typo>
          </View>
        </View>
      </Container>
    </>
  );
};

export default AllTransactions;

const styles = StyleSheet.create({
  text: {
    color: "white",
    paddingVertical: 5,
  },
  givenContainer: {
    backgroundColor: "#29AB87",
    borderRadius: 10,
    overflow: "hidden",
    marginVertical: 10,
    elevation: 4,
  },
  totalExpense: {
    backgroundColor: "#f4f4f4",
    padding: 10,
  },
});
