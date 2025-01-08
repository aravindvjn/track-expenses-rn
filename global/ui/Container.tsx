import { ScrollView, StyleSheet, View } from "react-native";
import React from "react";
import { UIDesignProps } from "../types/types";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

const Container = ({ children, style }: UIDesignProps) => {
  return (
    <LinearGradient
      style={styles.gradient}
      colors={["#192f6a", "#3b5998", "#ffffff"]}
    >
      <ScrollView>
        <SafeAreaView style={{ flex: 1 }}>
          <StatusBar style="light" />
          <View style={[styles.container, style]}>{children}</View>
        </SafeAreaView>
      </ScrollView>
    </LinearGradient>
  );
};

export default Container;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  gradient: {
    flex: 1,
    paddingTop: 20,
    padding: 10,
  },
});
