import { StyleSheet, View } from "react-native";
import React from "react";
import { UIDesignProps } from "../types/types";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";

const Container = ({ children, style }: UIDesignProps) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar />
      <View style={[styles.container, style]}>{children}</View>
    </SafeAreaView>
  );
};

export default Container;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
