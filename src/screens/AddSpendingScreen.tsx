import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useBudget } from "../context/BudgetContext";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

type RootStackParamList = {
  Home: undefined;
  Setup: undefined;
  AddSpending: undefined;
  Transactions: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, "AddSpending">;

export default function AddSpendingScreen({ navigation }: Props) {
  const { addTransaction } = useBudget();

  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const handleSubmit = () => {
    if (amount) {
      addTransaction({
        amount: parseFloat(amount),
        note,
        date,
      });
      navigation.goBack();
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Add Spending</Text>
        <Text style={styles.subtitle}>Track a new expense</Text>

        <View style={styles.form}>
          <View style={styles.amountSection}>
            <Text style={styles.label}>Amount</Text>
            <View style={styles.amountInputWrapper}>
              <Text style={styles.dollarSign}>$</Text>
              <TextInput
                style={styles.amountInput}
                value={amount}
                onChangeText={setAmount}
                placeholder="0.00"
                placeholderTextColor="#9ca3af"
                keyboardType="decimal-pad"
                autoFocus
              />
            </View>
          </View>

          <Input
            label="Note (optional)"
            value={note}
            onChangeText={setNote}
            placeholder="e.g., Lunch at cafe"
          />

          <Input
            label="Date"
            value={date}
            onChangeText={setDate}
            placeholder="YYYY-MM-DD"
          />

          <Button onPress={handleSubmit} size="lg" style={styles.submitButton}>
            Save
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flexGrow: 1,
    padding: 24,
  },
  backButton: {
    marginBottom: 32,
  },
  backButtonText: {
    fontSize: 16,
    color: "#14b8a6",
    fontWeight: "500",
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
    color: "#1f2937",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#6b7280",
    marginBottom: 32,
  },
  form: {
    flex: 1,
    gap: 24,
  },
  amountSection: {
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#374151",
    marginBottom: 8,
  },
  amountInputWrapper: {
    position: "relative",
  },
  dollarSign: {
    position: "absolute",
    left: 24,
    top: 24,
    fontSize: 36,
    color: "#6b7280",
    zIndex: 1,
  },
  amountInput: {
    backgroundColor: "#f3f4f6",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 16,
    paddingVertical: 24,
    paddingLeft: 64,
    paddingRight: 24,
    fontSize: 36,
    color: "#1f2937",
    fontWeight: "600",
  },
  submitButton: {
    marginTop: "auto",
  },
});
