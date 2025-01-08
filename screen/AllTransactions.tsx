import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import Container from "../global/ui/Container";
import Typo from "../global/ui/Typo";
import RecentExpense from "../component/cards/RecentExpense";

const AllTransactions = () => {
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
        <ScrollView style={{ maxHeight: 200 }}>
          <RecentExpense noBalance style={{ borderRadius: 0 }} />
        </ScrollView>
      </View>
      <View style={styles.givenContainer}>
        <Typo
          style={[styles.text, { textAlign: "center" }]}
          fontSize={20}
          fontWeight="SemiBold"
        >
          This Month
        </Typo>
        <ScrollView style={{ maxHeight: 200 }}>
          <RecentExpense noBalance style={{ borderRadius: 0 }} />
        </ScrollView>
        <View style={styles.totalExpense}>
          <Typo>Total Expense : Rs. 233</Typo>
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
        <ScrollView style={{ maxHeight: 200 }}>
          <RecentExpense noBalance style={{ borderRadius: 0 }} />
        </ScrollView>
        <View style={styles.totalExpense}>
          <Typo>Total Expense : Rs. 233</Typo>
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
  },
  totalExpense: {
    backgroundColor: "#f4f4f4",
    padding: 10,
  },
});
