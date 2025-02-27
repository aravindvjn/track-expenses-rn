import { ScrollView, StyleSheet, View } from "react-native";
import React from "react";
import { UIDesignProps } from "../types/types";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import Toast from "react-native-toast-message";

const Container = ({ children, style }: UIDesignProps) => {
  return (
    <LinearGradient
      style={styles.gradient}
      colors={["#192f6a", "#3b5998", "#ffffff"]}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <SafeAreaView style={{ flex: 1 }}>
          <StatusBar style="light" />
          <View style={[styles.container, style]}>{children}</View>
        </SafeAreaView>
      </ScrollView>
      <Toast />
    </LinearGradient>
  );
};

export default Container;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  gradient: {
    flex: 1,
    paddingTop: 20,
    padding: 10,
  },
});
