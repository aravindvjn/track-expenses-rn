import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import Container from "../global/ui/Container";
import Typo from "../global/ui/Typo";
import { Ionicons } from "@expo/vector-icons";

const SearchExpense = () => {
  return (
    <Container>
      <View>
        <Typo style={styles.text} fontSize={26}>
          Search Expenses
        </Typo>
        <View>
          <TextInput
            style={styles.textInput}
            placeholder="Search the Expenses"
          />
          <Pressable style={styles.pressable}>
            <Ionicons name="search" size={30} />
          </Pressable>
        </View>
      </View>
    </Container>
  );
};

export default SearchExpense;

const styles = StyleSheet.create({
  text: {
    color: "white",
  },
  textInput: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#f4f4f4",
    minHeight: 40,
    marginTop: 10,
  },
  pressable: {
    position: "absolute",
    right: 10,
    top: 14,
  },
});
