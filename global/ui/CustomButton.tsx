import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import Typo from "./Typo";
import { UIDesignProps } from "../types/types";

const CustomButton = ({
  children,
  style,
  textStyle,
  onPress,
}: UIDesignProps) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.pressable,
        style,
        pressed && { opacity: 0.4 },
      ]}
    >
      <Typo style={[styles.text, textStyle]}>{children}</Typo>
    </Pressable>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  pressable: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#0096FF",
    borderRadius: 6,
  },
  text: {
    color: "white",
    textAlign: "center",
  },
});
