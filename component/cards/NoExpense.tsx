import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Typo from "../../global/ui/Typo";
import CustomButton from "../../global/ui/CustomButton";
import AppFeatures from "../Features/AppFeatures";
import { NavigationProp, useNavigation } from "@react-navigation/native";

const NoExpense = () => {
  const navigation: NavigationProp<"AddExpense"> = useNavigation();
  return (
    <>
      <View style={[styles.container, { padding: 20, paddingBottom: 20 }]}>
        <Typo
          fontSize={18}
          fontWeight="SemiBold"
          style={{ textAlign: "center", marginBottom: 10 }}
        >
          No Expenses Yet.
        </Typo>
        <CustomButton onPress={() => navigation.navigate("AddExpense")}>
          Add Expenses
        </CustomButton>
      </View>
      <AppFeatures />
    </>
  );
};


export default NoExpense;

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    backgroundColor: "white",
    overflow: "hidden",
    paddingBottom: 10,
    elevation: 4,
  },
});
