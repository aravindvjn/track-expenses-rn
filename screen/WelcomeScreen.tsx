import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import Container from "../global/ui/Container";
import { globalStyles } from "../global/constants/styles";
import Typo from "../global/ui/Typo";
import AsyncStorage from "@react-native-async-storage/async-storage";

const WelcomeScreen = () => {
  const handlePress = async () => {
    try {
      await AsyncStorage.setItem("isNewUser", "no");
    } catch {
      console.log("Failed to GetStarted");
    }
  };
  return (
    <Container style={globalStyles.center}>
      <View style={styles.innerContainer}>
        <View></View>
        <View>
          <Typo fontSize={25} fontWeight="Bold" style={styles.text}>
            Track Your Expenses
          </Typo>
        </View>
        <View>
          <Button onPress={handlePress} title="Get Started" />
        </View>
      </View>
    </Container>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  innerContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
    padding:30
  },
  text: {},
});
