import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Container from "../global/ui/Container";
import Typo from "../global/ui/Typo";
import { useQueryClient } from "@tanstack/react-query";
import { useAllTransactions } from "../hook/dataHooks";
import { totalExpenseCalcuator } from "../global/functions/totalExpenseCalculator";

const Account = () => {
  const { data } = useAllTransactions();
  return (
    <Container>
      <Typo fontSize={22} style={styles.text}>
        Account Analysis
      </Typo>
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <Typo fontSize={18}>Aravind Vijayan</Typo>
        </View>
        <View style={[styles.innerContainer, { backgroundColor: "white" }]}>
          <Typo>Account Details : </Typo>
          <Typo>
            Total Expense in this Month :{" "}
            {totalExpenseCalcuator(data?.thisMonth?.filteredExpenses)}
          </Typo>
          <Typo>
            Total Expense in this Year :{" "}
            {totalExpenseCalcuator(data?.thisYear?.filteredExpenses)}
          </Typo>
        </View>
      </View>
    </Container>
  );
};

export default Account;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 10,
    overflow: "hidden",
  },
  text: {
    color: "white",
    marginBottom: 20,
  },
  innerContainer: {
    backgroundColor: "#f4f4f4",
    padding: 10,
  },
});
