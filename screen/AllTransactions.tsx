import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import Container from "../global/ui/Container";
import Typo from "../global/ui/Typo";
import RecentExpense from "../component/cards/RecentExpense";
import { useQuery } from "@tanstack/react-query";
import {
  getExpenses,
  getStoredMoneyToBeGiven,
} from "../global/functions/fetchData";

const AllTransactions = () => {
  const fetchAllData = async () => {
    const thisMonth = await getExpenses("thisMonth");
    const lastYear = await getExpenses("thisYear");
    const toBeGiven = await getStoredMoneyToBeGiven();
    console.log(toBeGiven);
    return {
      thisMonth,
      lastYear,
      toBeGiven,
    };
  };

  const { data: allTransactions } = useQuery({
    queryKey: ["allTransactions"],
    queryFn: fetchAllData,
  });

  return (
    <Container>
      <Typo style={styles.text} fontSize={26} fontWeight="Bold">
        All Transactions
      </Typo>
      <View style={styles.givenContainer}>
        <Typo
          style={[styles.text, { textAlign: "center" }]}
          fontSize={20}
          fontWeight="SemiBold"
        >
          To Be Given
        </Typo>

        <View>
          <RecentExpense
            // expenses={allTransactions?.toBeGiven}
            noBalance
            style={{ borderRadius: 0 }}
          />
        </View>
      </View>
      <View style={styles.givenContainer}>
        <Typo
          style={[styles.text, { textAlign: "center" }]}
          fontSize={20}
          fontWeight="SemiBold"
        >
          This Month
        </Typo>
        <View>
          <RecentExpense
            expenses={allTransactions?.thisMonth?.filteredExpenses}
            style={{ borderRadius: 0 }}
          />
        </View>
        <View style={styles.totalExpense}>
          <Typo>
            Total Expense : Rs. {allTransactions?.thisMonth?.totalExpense}
          </Typo>
        </View>
      </View>
      <View style={styles.givenContainer}>
        <Typo
          style={[styles.text, { textAlign: "center" }]}
          fontSize={20}
          fontWeight="SemiBold"
        >
          This Year
        </Typo>
        <View>
          <RecentExpense
            expenses={allTransactions?.lastYear?.filteredExpenses}
            style={{ borderRadius: 0 }}
          />
        </View>
        <View style={styles.totalExpense}>
          <Typo>
            Total Expense : Rs. {allTransactions?.lastYear?.totalExpense}
          </Typo>
        </View>
      </View>
    </Container>
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
