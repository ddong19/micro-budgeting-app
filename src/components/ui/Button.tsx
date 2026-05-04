import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from "react-native";

interface ButtonProps {
  onPress?: () => void;
  children: React.ReactNode;
  variant?: "default" | "outline" | "ghost";
  size?: "sm" | "default" | "lg";
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export default function Button({
  onPress,
  children,
  variant = "default",
  size = "default",
  disabled = false,
  loading = false,
  style,
  textStyle,
}: ButtonProps) {
  const buttonStyles = [
    styles.base,
    variant === "default" && styles.default,
    variant === "outline" && styles.outline,
    variant === "ghost" && styles.ghost,
    size === "sm" && styles.size_sm,
    size === "default" && styles.size_default,
    size === "lg" && styles.size_lg,
    (disabled || loading) && styles.disabled,
    style,
  ];

  const textStyleArray = [
    styles.text,
    variant === "default" && styles.text_default,
    variant === "outline" && styles.text_outline,
    variant === "ghost" && styles.text_ghost,
    size === "sm" && styles.text_sm,
    size === "lg" && styles.text_lg,
    textStyle,
  ];

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={buttonStyles}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === "default" ? "#fff" : "#14b8a6"}
        />
      ) : (
        <Text style={textStyleArray}>
          {children}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  default: {
    backgroundColor: "#14b8a6",
  },
  outline: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  ghost: {
    backgroundColor: "transparent",
  },
  size_sm: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  size_default: {
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  size_lg: {
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    fontWeight: "600",
  },
  text_default: {
    color: "#fff",
  },
  text_outline: {
    color: "#1f2937",
  },
  text_ghost: {
    color: "#1f2937",
  },
  text_sm: {
    fontSize: 14,
  },
  text_lg: {
    fontSize: 18,
  },
});
