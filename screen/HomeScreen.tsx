import { Pressable, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import Typo from "../global/ui/Typo";
import Container from "../global/ui/Container";
import HighlightMoney from "../component/cards/HighlightMoney";
import RecentExpense from "../component/cards/RecentExpense";
import { Ionicons } from "@expo/vector-icons";
import { getExpenses } from "../global/functions/fetchData";
import AddMoney from "../component/Prompts/AddMoney";
import { useQuery } from "@tanstack/react-query";

const HomeScreen = () => {
  const [showAddMoney, setShowAddMoney] = useState<boolean>(false);

  const fetchExpenses = async () => {
    const results = await getExpenses();
    return results;
  };

  const { data: expenses, isLoading } = useQuery({
    queryKey: ["expenses"],
    queryFn: fetchExpenses,
  });
  if (isLoading) {
    return <Container></Container>;
  }
  return (
    <>
      {showAddMoney && <AddMoney setShowAddMoney={setShowAddMoney} />}
      <Container>
        <View>
          <Typo fontWeight="Bold" fontSize={26} style={styles.heading}>
            Expense Tracker
          </Typo>
        </View>
        <Typo fontSize={18} style={styles.subheading}>
          Last 28 Days
        </Typo>
        <View style={styles.highlightContainer}>
          <HighlightMoney
            type="Expense"
            heading="Total Expense"
            money={expenses?.totalExpense}
          />
          <HighlightMoney
            type="Balance"
            heading="Balance"
            money={expenses?.filteredExpenses[0]?.balance}
          >
            <Pressable
              onPress={() => setShowAddMoney(true)}
              style={[{ transform: [{ translateY: 3 }], paddingLeft: 5 }]}
            >
              <Ionicons name="add-circle" size={20} color={"white"} />
            </Pressable>
          </HighlightMoney>
        </View>
        <RecentExpense showFull expenses={expenses?.filteredExpenses} />
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
    marginBottom: 20,
  },
  subheading: {
    marginTop: 10,
    marginBottom: 5,
    color: "white",
  },
});
