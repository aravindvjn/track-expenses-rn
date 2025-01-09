import {
  Button,
  Pressable,
  StyleSheet,
  Switch,
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
import { ExpenseProps } from "../global/types/types";
import CustomButton from "../global/ui/CustomButton";
import Toast from "react-native-toast-message";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addMoneyToBeGiven, storeExpense } from "../global/functions/fetchData";

const AddExpense = () => {
  const { height } = useWindowDimensions();
  const [isDatePickerVisible, setDatePickerVisibility] =
    useState<boolean>(false);
  const [inputs, setInputs] = useState<ExpenseProps>({
    title: "",
    date: new Date().toLocaleDateString(),
    amount: 0,
    balance: 0,
    status: "-",
    id: Date.now(),
  });

  const [isToBeGiven, setIsToBeGiven] = useState<boolean>(false);

  const queryClient = useQueryClient();
  const mutation = useMutation<void, Error, ExpenseProps>(storeExpense, {
    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: "Expense added successfully!",
        visibilityTime: 3000,
      });
      setInputs({
        title: "",
        date: new Date().toLocaleDateString(),
        amount: 0,
        balance: 0,
        status: "-",
        id: Date.now(),
      });
      queryClient.invalidateQueries(["expenses"]);
      queryClient.invalidateQueries(["allTransactions"]);
    },
    onError: (error) => {
      Toast.show({
        type: "error",
        text1: "Failed to add expense",
        text2: error.message,
        visibilityTime: 3000,
      });
    },
  });

  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);

  const handleConfirm = (date: Date) => {
    setInputs((prev: ExpenseProps) => ({
      ...prev,
      date: date.toLocaleDateString(),
    }));
    hideDatePicker();
  };

  const handleAddExpense = () => {
    if (!inputs.amount || !inputs.title) {
      Toast.show({
        type: "error",
        text1: "Please fill all the inputs.",
        visibilityTime: 3000,
      });
    } else if (!inputs.date) {
      Toast.show({
        type: "error",
        text1: "Please select the date.",
        visibilityTime: 3000,
      });
    } else {
      if (isToBeGiven) {
        async function isToBeGivenFn() {
          const results = await addMoneyToBeGiven(inputs);
          if (results) {
            Toast.show({
              type: "success",
              text1: "To Be Given is added successfully!",
              visibilityTime: 3000,
            });
            setInputs({
              title: "",
              date: new Date().toLocaleDateString(),
              amount: 0,
              balance: 0,
              status: "-",
              id: Date.now(),
            });
            queryClient.invalidateQueries(["allTransactions"]);
          }
        }
        isToBeGivenFn();
      } else {
        mutation.mutate(inputs);
      }
    }
  };

  return (
    <Container>
      <View style={[styles.outerContainer, { minHeight: height - 120 }]}>
        <View style={styles.container}>
          <View>
            <Typo fontSize={22} fontWeight="Bold">
              Add {!isToBeGiven ? "Expense" : "To Be Given Amount"}
            </Typo>
            <View
              style={[
                {
                  justifyContent: "flex-start",
                  flexDirection: "row",
                  alignItems: "center",
                  width: 400,
                  marginTop: 10,
                },
              ]}
            >
              <CustomButton
                textStyle={{ fontSize: 10, color: "black" }}
                style={{ backgroundColor: "#dcdcdc" }}
                onPress={() => setIsToBeGiven((prev) => !prev)}
              >
                Click here to add{" "}
                {isToBeGiven ? "Expense" : "To Be Given Amount"}
              </CustomButton>
            </View>
          </View>
          <Typo style={styles.label}>Title</Typo>
          <TextInput
            value={inputs.title}
            onChangeText={(text: string) =>
              setInputs((prev: ExpenseProps) => ({ ...prev, title: text }))
            }
            style={styles.textInput}
            placeholder="Enter the Title"
          />
          <Typo style={styles.label}>Amount</Typo>
          <TextInput
            value={String(inputs.amount)}
            keyboardType="decimal-pad"
            onChangeText={(text: string) =>
              setInputs((prev: ExpenseProps) => ({
                ...prev,
                amount: Number(text),
              }))
            }
            style={styles.textInput}
            placeholder="Enter amount"
          />
          <View style={[globalStyles.row, styles.dateContainer]}>
            <Typo style={[styles.label, { marginTop: 0 }]}>
              Select Date: {inputs.date}
            </Typo>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
            <Pressable
              style={({ pressed }: { pressed: boolean }) => [
                styles.pressable,
                pressed && { opacity: 0.4 },
              ]}
              onPress={showDatePicker}
            >
              <Ionicons name="calendar" size={20} />
            </Pressable>
          </View>
          <CustomButton onPress={handleAddExpense}>
            {isToBeGiven ? "Add To Be Given" : "Add Expense"}
          </CustomButton>
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
    elevation: 4,
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
    alignItems: "center",
    gap: 10,
  },
  pressable: {
    padding: 10,
    borderRadius: 6,
    backgroundColor: "#f4f4f4",
  },
});
