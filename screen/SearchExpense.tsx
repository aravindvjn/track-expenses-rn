import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import Container from "../global/ui/Container";
import Typo from "../global/ui/Typo";
import { Ionicons } from "@expo/vector-icons";
import { searchExpenses } from "../global/functions/searchExpense";
import RecentExpense from "../component/cards/RecentExpense";
import { ExpenseProps } from "../global/types/types";

const SearchExpense = () => {
  const [data, setData] = useState<ExpenseProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [editor, setEditor] = useState<ExpenseProps | undefined>();
  return (
    <Container>
      <View>
        <Typo style={styles.text} fontSize={22}>
          Search Expenses
        </Typo>
        <View>
          <TextInput
            onChangeText={async (text) => {
              setIsLoading(true);
              const result = await searchExpenses(text);
              setData(result);
              setIsLoading(false);
            }}
            style={styles.textInput}
            placeholder="Search the Expenses"
          />
          <Pressable style={styles.pressable}>
            <Ionicons name="search" size={30} />
          </Pressable>
        </View>
        <View style={{ marginTop: 20 }}>
          {isLoading && (
            <ActivityIndicator
              size="large"
              color="white"
              style={{ marginTop: 20 }}
            />
          )}

          {!isLoading && data?.length > 0 ? (
            <RecentExpense setEditor={setEditor} expenses={data} />
          ) : (
            <Typo style={{textAlign:'center',color:'white'}} fontSize={20}>No expenses Found</Typo>
          )}
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
