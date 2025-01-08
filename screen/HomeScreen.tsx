import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import Typo from "../global/ui/Typo";
import Container from "../global/ui/Container";
import HighlightMoney from "../component/cards/HighlightMoney";
import RecentExpense from "../component/cards/RecentExpense";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import {
  getBalance,
  getLast28DaysExpenses,
} from "../global/functions/fetchData";
import AddMoney from "../component/Prompts/AddMoney";
import { ExpenseProps } from "../global/types/types";

const HomeScreen = () => {
  const [showAddMoney, setShowAddMoney] = useState<boolean>(false);
  const [balance, setBalance] = useState<number>(0);
  const [expenses, setExpenses] = useState<ExpenseProps[]>([]);
  const [totalExpense, setTotalExpense] = useState<number>(0);
  useFocusEffect(() => {
    const fetchBalance = async () => {
      const results = await getBalance();
      setBalance(results);
    };
    fetchBalance();

    const fetchExpense = async () => {
      const results = await getLast28DaysExpenses();
      setExpenses(results?.last28DaysExpenses);
      setTotalExpense(results?.totalExpense);
    };
    fetchExpense();
  });
  return (
    <>
      {showAddMoney && <AddMoney setShowAddMoney={setShowAddMoney} />}
      <Container>
        <View>
          <Typo fontWeight="Bold" fontSize={26} style={styles.heading}>
            Expense Tracker
          </Typo>
        </View>
        <View style={styles.highlightContainer}>
          <HighlightMoney
            type="Expense"
            heading="Total Expense"
            money={totalExpense}
          />
          <HighlightMoney type="Balance" heading="Balance" money={balance}>
            <Pressable
              onPress={() => setShowAddMoney(true)}
              style={[{ transform: [{ translateY: 3 }], paddingLeft: 5 }]}
            >
              <Ionicons name="add-circle" size={20} color={"white"} />
            </Pressable>
          </HighlightMoney>
        </View>
        <RecentExpense
          expenses={expenses}
        />
      </Container>
    </>
  );
};

export default HomeScreen;
const styles = StyleSheet.create({
  heading: {
    color: "white",
  },
  highlightContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
  },
});
