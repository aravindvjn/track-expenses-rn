import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { Dispatch, SetStateAction, useState } from "react";
import Typo from "../../global/ui/Typo";
import CustomButton from "../../global/ui/CustomButton";
import { globalStyles } from "../../global/constants/styles";
import { addToBalance } from "../../global/functions/fetchData";

const AddMoney = ({
  setShowAddMoney,
}: {
  setShowAddMoney: Dispatch<SetStateAction<boolean>>;
}) => {
  const [amount, setAmount] = useState<number>(0);
  const addMoneyHandler = async () => {
    await addToBalance(amount);
    setShowAddMoney(false);
  };
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Typo fontSize={26} fontWeight="Bold" style={styles.heading}>
          Add Money
        </Typo>
        <Typo>Amount</Typo>
        <TextInput
          onChangeText={(text) => setAmount(Number(text))}
          keyboardType="decimal-pad"
          placeholder="Enter the Amount"
          style={styles.input}
        />
        <View
          style={[
            globalStyles.row,
            { justifyContent: "space-between", marginVertical: 10 },
          ]}
        >
          <CustomButton onPress={() => setShowAddMoney(false)}>
            Cancel
          </CustomButton>
          <CustomButton onPress={addMoneyHandler}>Save</CustomButton>
        </View>
      </View>
    </View>
  );
};

export default AddMoney;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    zIndex: 10,
    justifyContent: "center",
    alignItems: "center",
    right: 0,
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  heading: {
    textAlign: "center",
  },
  innerContainer: {
    borderRadius: 10,
    padding: 20,
    backgroundColor: "white",
    minWidth: "80%",
  },
  input: {
    backgroundColor: "#f4f4f4",
    padding: 10,
    minHeight: 45,
    borderRadius: 10,
    marginVertical: 10,
  },
});
