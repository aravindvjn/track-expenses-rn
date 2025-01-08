import { ScrollView, StyleSheet, View } from "react-native";
import React from "react";
import Typo from "../global/ui/Typo";
import Container from "../global/ui/Container";
import HighlightMoney from "../component/cards/HighlightMoney";
import RecentExpense from "../component/cards/RecentExpense";

const HomeScreen = () => {
  return (
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
            money={219041}
          />
          <HighlightMoney
            type="Balance"
            heading="Your Balance"
            money={219041}
          />
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
