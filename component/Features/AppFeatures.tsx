import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Typo from "../../global/ui/Typo";

const AppFeatures = () => {
  const features = [
    "Track Your Expenses: Easily add, edit, and view your daily expenses.",
    "View Reports by Time: Check your spending for the last 28 days, this month, last month, or the whole year.",
    "Manage Your Balance: Keep an eye on your balance as it updates automatically with each expense or income.",
    "Data Saved Locally: Your expense and balance data stay safe, even if you close the app.",
    "Easy to Use: Simple and clear interface for smooth navigation and managing expenses.",
    "Helpful Notifications: Get alerts and messages for important actions like saving data or updating your balance.",
    "Quick Performance: Access your expense records fast with no delays.",
    "Secure Data: Your data is stored safely, keeping your information private.",
    "Works on All Phones: Enjoy a smooth experience on any mobile device, big or small.",
  ];

  return (
    <View
      style={{
        borderRadius: 10,
        elevation: 4,
        padding: 20,
        backgroundColor: "white",
        marginTop:20
      }}
    >
      <Text style={{ fontWeight: "bold", fontSize: 18, marginBottom: 10 }}>
        Features :
      </Text>
      <View>
        {features?.map((feature, index) => (
          <View key={index} style={{ flexDirection: "row", marginBottom: 5 }}>
            <Text style={{ fontSize: 16, marginRight: 10 }}>•</Text>
            <Text style={{ fontSize: 16, flex: 1 }}>{feature}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default AppFeatures;

const styles = StyleSheet.create({});
