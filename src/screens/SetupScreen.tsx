import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
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

type Props = NativeStackScreenProps<RootStackParamList, "Setup">;

export default function SetupScreen({ navigation }: Props) {
  const [categoryName, setCategoryName] = useState("");
  const [monthlyBudget, setMonthlyBudget] = useState("");
  const { setupBudget } = useBudget();

  const handleSubmit = () => {
    if (categoryName && monthlyBudget) {
      setupBudget(categoryName, parseFloat(monthlyBudget));
      navigation.replace("Home");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Text style={styles.emoji}>😊</Text>
          <Text style={styles.title}>Meet Your Budget Bud</Text>
          <Text style={styles.subtitle}>
            The more you spend, the sadder they get
          </Text>
        </View>

        <View style={styles.previewContainer}>
          <View style={styles.previewItem}>
            <Text style={styles.previewEmoji}>😊</Text>
            <Text style={styles.previewLabel}>Under budget</Text>
          </View>
          <View style={styles.previewItem}>
            <Text style={styles.previewEmoji}>😰</Text>
            <Text style={styles.previewLabel}>Getting close</Text>
          </View>
          <View style={styles.previewItem}>
            <Text style={styles.previewEmoji}>💀</Text>
            <Text style={styles.previewLabel}>Uh oh...</Text>
          </View>
        </View>

        <View style={styles.form}>
          <Input
            label="Pick a category"
            value={categoryName}
            onChangeText={setCategoryName}
            placeholder="Eating Out"
            autoCapitalize="words"
          />

          <Input
            label="Set a monthly limit"
            value={monthlyBudget}
            onChangeText={setMonthlyBudget}
            placeholder="300"
            keyboardType="decimal-pad"
            prefix="$"
          />

          <Button onPress={handleSubmit} size="lg" style={styles.button}>
            Get Started!
          </Button>
        </View>
      </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    padding: 24,
    justifyContent: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: 24,
  },
  emoji: {
    fontSize: 96,
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1f2937",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 18,
    color: "#6b7280",
    textAlign: "center",
  },
  previewContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 40,
  },
  previewItem: {
    alignItems: "center",
  },
  previewEmoji: {
    fontSize: 48,
    marginBottom: 8,
  },
  previewLabel: {
    fontSize: 12,
    color: "#6b7280",
  },
  form: {
    gap: 20,
  },
  button: {
    marginTop: 8,
  },
});
