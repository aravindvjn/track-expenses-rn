import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import Typo from "../global/ui/Typo";
import Container from "../global/ui/Container";
import HighlightMoney from "../component/cards/HighlightMoney";
import RecentExpense from "../component/cards/RecentExpense";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { getBalance } from "../global/functions/fetchData";

const HomeScreen = () => {
  const [showAddMoney, setShowAddMoney] = useState<boolean>(false);
  const [balance, setBalance] = useState<number>(0);
  useFocusEffect(() => {
    const fetchBalance = async () => {
      const results = await getBalance();
      setBalance(results);
    };
    fetchBalance();
  });
  return (
    <Container>
      <View>
        <Typo fontWeight="Bold" fontSize={26} style={styles.heading}>
          Expense Tracker
        </Typo>
      </View>
      <View style={styles.highlightContainer}>
        <HighlightMoney type="Expense" heading="Total Expense" money={219041} />
        <HighlightMoney type="Balance" heading="Balance" money={balance}>
          <Pressable
            onPress={() => setShowAddMoney(true)}
            style={[{ transform: [{ translateY: 3 }], paddingLeft: 5 }]}
          >
            <Ionicons name="add-circle" size={20} color={"white"} />
          </Pressable>
        </HighlightMoney>
      </View>
      <RecentExpense />
    </Container>
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
