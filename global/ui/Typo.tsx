import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import React from "react";
import { UIDesignProps } from "../types/types";
import * as Font from "expo-font";
import { useEffect, useState } from "react";

const fetchFonts = () => {
  return Font.loadAsync({
    Regular: require("../../assets/fonts/Raleway-Regular.ttf"),
    Thin: require("../../assets/fonts/Raleway-Thin.ttf"),
    Light: require("../../assets/fonts/Raleway-Light.ttf"),
    Bold: require("../../assets/fonts/Raleway-Bold.ttf"),
    Medium: require("../../assets/fonts/Raleway-Medium.ttf"),
    SemiBold: require("../../assets/fonts/Raleway-SemiBold.ttf"),
  });
};

const Typo = ({
  children,
  style,
  fontSize = 13,
  fontWeight = "SemiBold",
}: UIDesignProps) => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const { width } = useWindowDimensions();

  useEffect(() => {
    fetchFonts()
      .then(() => setFontsLoaded(true))
      .catch(console.warn);
  }, []);

  const styles = StyleSheet.create({
    text: {
      fontFamily: fontWeight,
      fontSize: width > 350 ? fontSize : fontSize - 2,
    },
  });

  if (!fontsLoaded) {
    return null;
  }

  return <Text style={[styles.text, style]}>{children}</Text>;
};

export default Typo;
