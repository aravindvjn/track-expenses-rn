import { StyleSheet, Text, View } from "react-native";
import React, { Dispatch, SetStateAction, useState } from "react";
import { ExpenseProps } from "../../global/types/types";
import Typo from "../../global/ui/Typo";
import CustomButton from "../../global/ui/CustomButton";
import { globalStyles } from "../../global/constants/styles";
import { deleteExpense } from "../../global/functions/deleteData";
import { useQueryClient } from "@tanstack/react-query";
import { NavigationProp, useNavigation } from "@react-navigation/native";

type Props = {
  setEditor: Dispatch<SetStateAction<ExpenseProps | undefined>>;
  editor?: ExpenseProps;
};
const EditExpense = ({ setEditor, editor }: Props) => {
  const navigation: NavigationProp<string> = useNavigation();
  const [showEditor, setShowEditor] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const deleteHandler = async () => {
    if (editor !== undefined) {
      const res = await deleteExpense(editor);
      if (res) {
        queryClient.invalidateQueries(["expenses"]);
        queryClient.invalidateQueries(["allTransactions"]);
        navigation.navigate("Home");
      }
    }
  };
  return (
    <View style={styles.container}>
      {showEditor ? (
        <View></View>
      ) : (
        <View style={styles.innerContainer}>
          <Typo fontSize={18} fontWeight="Bold">
            {editor?.title}
            <Typo> ({editor?.date}) </Typo>
          </Typo>
          <View style={{ marginTop: 20 }}>
            <Typo>Amount : </Typo>
            <Typo fontSize={25} fontWeight="Bold">
              Rs.{editor?.amount}
            </Typo>
          </View>
          <View style={[styles.buttonContainer]}>
            <CustomButton
              style={{ width: "45%" }}
              onPress={() => setEditor(undefined)}
            >
              Cancel
            </CustomButton>
            <CustomButton
              onPress={() => setShowEditor(true)}
              style={{ width: "45%" }}
            >
              Edit
            </CustomButton>
          </View>
          <CustomButton
            onPress={deleteHandler}
            style={{ backgroundColor: "red" }}
          >
            Delete
          </CustomButton>
        </View>
      )}
    </View>
  );
};

export default EditExpense;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    right: 0,
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    zIndex: 100,
  },
  innerContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    marginTop: 100,
    marginBottom: 100,
    marginLeft: 50,
    marginRight: 50,
    gap: 10,
  },
  buttonContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    gap: 10,
  },
});
