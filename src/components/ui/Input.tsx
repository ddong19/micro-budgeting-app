import React from "react";
import { View, Text, TextInput, StyleSheet, TextInputProps } from "react-native";

interface InputProps extends TextInputProps {
  label?: string;
  prefix?: string;
  error?: string;
}

export default function Input({
  label,
  prefix,
  error,
  style,
  ...props
}: InputProps) {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.inputWrapper}>
        {prefix && <Text style={styles.prefix}>{prefix}</Text>}
        <TextInput
          style={[
            styles.input,
            prefix && styles.inputWithPrefix,
            error && styles.inputError,
            style,
          ]}
          placeholderTextColor="#9ca3af"
          {...props}
        />
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#374151",
    marginBottom: 8,
  },
  inputWrapper: {
    position: "relative",
  },
  prefix: {
    position: "absolute",
    left: 16,
    top: 16,
    fontSize: 16,
    color: "#6b7280",
    zIndex: 1,
  },
  input: {
    backgroundColor: "#f3f4f6",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#1f2937",
  },
  inputWithPrefix: {
    paddingLeft: 36,
  },
  inputError: {
    borderColor: "#ef4444",
  },
  error: {
    marginTop: 6,
    fontSize: 12,
    color: "#ef4444",
  },
});
