import {
  Button,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import React from "react";
import Container from "../global/ui/Container";
import Typo from "../global/ui/Typo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationProp } from "@react-navigation/native";

const WelcomeScreen = ({
  navigation,
}: {
  navigation?: NavigationProp<"WelcomeScreen">;
}) => {
  const handlePress = async () => {
    try {
      await AsyncStorage.setItem("isNewUser", "no");
      navigation?.navigate("Home");
      console.log("Stored isNewUser as 'no'");
    } catch (error) {
      console.log("Failed to GetStarted", error);
    }
  };

  const { height } = useWindowDimensions();
  return (
    <Container style={styles.container}>
      <View style={[styles.innerContainer, { height: height - 60 }]}>
        <View></View>
        <View>
          <Typo fontSize={25} fontWeight="Bold" style={styles.text}>
            Track Your Expenses
          </Typo>
        </View>
        <View>
          <Button
            onPress={handlePress}
            title="Get Started"
            accessibilityLabel="Start tracking your expenses"
          />
        </View>
      </View>
    </Container>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 30,
  },
  text: {
    color: "white",
    marginBottom: 20,
  },
});
