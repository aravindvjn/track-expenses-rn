import {
  Button,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from "react-native";
import React, { useState } from "react";
import Container from "../global/ui/Container";
import Typo from "../global/ui/Typo";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { globalStyles } from "../global/constants/styles";
import { Ionicons } from "@expo/vector-icons";

const AddExpense = () => {
  const { height } = useWindowDimensions();

  const [isDatePickerVisible, setDatePickerVisibility] =
    useState<boolean>(false);

  const [selectedDate, setSelectedDate] = useState<String>("");

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    setSelectedDate(date.toLocaleDateString());
    hideDatePicker();
  };
  return (
    <Container>
      <View style={[styles.outerContainer, { minHeight: height - 120 }]}>
        <View style={styles.container}>
          <Typo fontSize={23} fontWeight="Bold">
            Add Expense
          </Typo>
          <Typo style={[styles.label]}>Title</Typo>
          <TextInput style={styles.textInput} placeholder="Enter the Title" />
          <Typo style={[styles.label]}>Amount</Typo>
          <TextInput style={styles.textInput} placeholder="Enter amount" />
          <View style={[globalStyles.row, styles.dateContainer]}>
            <Typo style={[styles.label, { marginTop: 0 }]}>
              Select Date: {selectedDate}
            </Typo>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
            <Pressable
              style={({ pressed }) => [
                styles.pressable,
                pressed && { opacity: 0.4 },
              ]}
              onPress={showDatePicker}
            >
              <Ionicons name="calendar" size={20} />
            </Pressable>
          </View>
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
    minHeight: 50,
  },
  dateContainer: {
    marginTop: 10,
    marginBottom: 20,
    alignItems:'center',
    gap:10
  },
  pressable: {
    padding: 10,
    borderRadius: 6,
    backgroundColor: "#f4f4f4",
  },
});
