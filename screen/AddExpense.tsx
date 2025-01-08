import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from "react-native";
import React from "react";
import Container from "../global/ui/Container";
import Typo from "../global/ui/Typo";

const AddExpense = () => {
  const { height } = useWindowDimensions();
  return (
    <Container>
      <View style={[styles.outerContainer, { minHeight: height - 200 }]}>
        <View style={styles.container}>
          <Typo fontSize={23} fontWeight="Bold">
            Add Expense
          </Typo>
          <Typo style={[styles.label]}>Title</Typo>
          <TextInput style={styles.textInput} placeholder="Enter the Title" />
          <Typo style={[styles.label]}>Amount</Typo>
          <TextInput style={styles.textInput} placeholder="Enter amount" />
          <Typo style={[styles.label]}>Date</Typo>
          <TextInput style={styles.textInput} placeholder="01/11/2021" />
          <Button title="Add Expense" />
        </View>
      </View>
    </Container>
  );
};

export default AddExpense;

const styles = StyleSheet.create({
  outerContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    margin: 5,
    padding: 15,
    borderRadius: 10,
    backgroundColor: "white",
    width: "100%",
  },
  label: {
    marginVertical: 7,
    marginTop: 10,
  },
  textInput: {
    padding: 10,
    borderRadius: 6,
    marginBottom: 10,
    backgroundColor: "#f4f4f4",
    paddingVertical: 15,
  },
});
