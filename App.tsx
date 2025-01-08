import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";
import HomeScreen from "./screen/HomeScreen";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import WelcomeScreen from "./screen/WelcomeScreen";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export default function App() {
  const [isNewUser, setIsNewUser] = useState<boolean>(false);
  const [fontsLoaded, setFontsLoaded] = useState<boolean>(false);

  const fetchFonts = () => {
    return Font.loadAsync({
      Regular: require("./assets/fonts/Raleway-Regular.ttf"),
      Thin: require("./assets/fonts/Raleway-Thin.ttf"),
      Light: require("./assets/fonts/Raleway-Light.ttf"),
      Bold: require("./assets/fonts/Raleway-Bold.ttf"),
    });
  };

  const checkNewUser = async () => {
    try {
      const value = await AsyncStorage.getItem("isNewUser");
      if (value !== null) {
        console.log("Data retrieved:", value);
        setIsNewUser(false);
      } else {
        setIsNewUser(true);
        console.log("New User");
      }
    } catch (e) {
      console.error("Failed to retrieve data", e);
    }
  };

  useEffect(() => {
    checkNewUser();
    fetchFonts()
      .then(() => setFontsLoaded(true))
      .catch(console.warn);
  }, []);
  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
          {isNewUser && (
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
          )}
          <Stack.Screen name="Home" component={DrawerComponent} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export const DrawerComponent = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerTitleStyle: {
          fontFamily: "Thin",
        },
      }}
    >
      <Drawer.Screen name="home" component={HomeScreen} />
    </Drawer.Navigator>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
