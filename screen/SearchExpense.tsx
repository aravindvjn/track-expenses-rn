import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import Container from "../global/ui/Container";
import Typo from "../global/ui/Typo";
import { Ionicons } from "@expo/vector-icons";

const SearchExpense = () => {
  return (
    <Container>
      <View>
        <Typo style={styles.text} fontSize={22}>
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
    paddingLeft: 20,
    borderRadius: 10,
    backgroundColor: "#f4f4f4",
    minHeight: 45,
    marginTop: 20,
  },
  pressable: {
    position: "absolute",
    right: 10,
    top: 27,
  },
});
