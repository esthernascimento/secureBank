import React from "react";
import { Image } from "react-native";
import styles from "./style";

export default function Logo({ size = 150, style }) {
  return (
    <Image
      source={require("../../../assets/img/secureBank-logo.png")}
      style={[
        styles.logo,
        { width: size, height: size, borderRadius: size / 2 },
        style,
      ]}
    />
  );
}