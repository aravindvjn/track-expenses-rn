import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";
import HomeScreen from "./screen/HomeScreen";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import WelcomeScreen from "./screen/WelcomeScreen";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AllTransactions from "./screen/AllTransactions";
import AddExpense from "./screen/AddExpense";
import SearchExpense from "./screen/SearchExpense";
import Account from "./screen/Account";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Ionicons } from "@expo/vector-icons";


SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

export default function App() {
  const [isNewUser, setIsNewUser] = useState<boolean>(false);
  const [fontsLoaded, setFontsLoaded] = useState<boolean>(false);

  const fetchFonts = async () => {
    await Font.loadAsync({
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
    async function prepare() {
      try {
        await checkNewUser();
        await fetchFonts();
      } catch (e) {
        console.warn(e);
      } finally {
        setFontsLoaded(true);
        SplashScreen.hideAsync();
      }
    }
    prepare();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isNewUser && <Stack.Screen name="Welcome" component={WelcomeScreen} />}
        <Stack.Screen name="Home" component={BottomTabComponents} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export const BottomTabComponents = () => {
  return (
    <BottomTabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = "home";
          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "AllTransaction") {
            return (
              <MaterialCommunityIcons
                name="transfer"
                size={size + 5}
                color={color}
              />
            );
          } else if (route.name === "AddExpense") {
            return <Ionicons name={"add"} size={size + 7} color={color} />;
          } else if (route.name === "Search") {
            iconName = "search";
          } else if (route.name === "Account") {
            iconName = "person";
          }

          return <Ionicons name={iconName} size={size + 2} color={color} />;
        },
        tabBarLabel: () => null,
        tabBarStyle: {
          height: 60,
          paddingTop: 7,
        },
        headerShown: false,
      })}
    >
      <BottomTabs.Screen name="Home" component={HomeScreen} />
      <BottomTabs.Screen name="AllTransaction" component={AllTransactions} />
      <BottomTabs.Screen name="AddExpense" component={AddExpense} />
      <BottomTabs.Screen name="Search" component={SearchExpense} />
      <BottomTabs.Screen name="Account" component={Account} />
    </BottomTabs.Navigator>
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
