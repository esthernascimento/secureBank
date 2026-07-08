import React from "react";
import { Pressable, Text } from "react-native";
import styles from "./style";

export default function PrimaryButton({
  title,
  onPress,
  disabled = false,
}) {
  return (
    <Pressable
      style={[
        styles.button,
        disabled && styles.buttonDisabled,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}