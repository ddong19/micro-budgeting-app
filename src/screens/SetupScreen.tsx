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
import { useBudget, CharacterType } from "../context/BudgetContext";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import CharacterCarousel from "../components/CharacterCarousel";

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
  const [selectedCharacter, setSelectedCharacter] = useState<CharacterType>("bud");
  const { setupBudget } = useBudget();

  const handleSubmit = () => {
    if (categoryName && monthlyBudget) {
      setupBudget(categoryName, parseFloat(monthlyBudget), selectedCharacter);
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
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Text style={styles.welcome}>Welcome! 👋</Text>
            <Text style={styles.title}>Let's Start Your</Text>
            <Text style={styles.titleAccent}>Budget Journey!</Text>
            <Text style={styles.subtitle}>
              Pick a buddy to help you track your spending
            </Text>
          </View>

          <CharacterCarousel
            onSelectCharacter={setSelectedCharacter}
            selectedCharacter={selectedCharacter}
          />

          <View style={styles.form}>
            <View style={styles.formHeader}>
              <Text style={styles.formTitle}>Set Up Your Budget</Text>
              <Text style={styles.formSubtitle}>
                Track one category at a time
              </Text>
            </View>

            <Input
              label="What are you budgeting for?"
              value={categoryName}
              onChangeText={setCategoryName}
              placeholder="Eating Out, Coffee, Shopping..."
              autoCapitalize="words"
            />

            <Input
              label="Monthly budget limit"
              value={monthlyBudget}
              onChangeText={setMonthlyBudget}
              placeholder="300"
              keyboardType="decimal-pad"
              prefix="$"
            />

            <Button onPress={handleSubmit} size="lg" style={styles.button}>
              Start Tracking! 🚀
            </Button>

            <Text style={styles.disclaimer}>
              Your buddy will change based on how much you spend!
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fdfeff",
  },
  container: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    padding: 24,
    paddingTop: 12,
  },
  header: {
    alignItems: "center",
    marginBottom: 32,
  },
  welcome: {
    fontSize: 18,
    color: "#6b7280",
    marginBottom: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#1f2937",
    textAlign: "center",
  },
  titleAccent: {
    fontSize: 32,
    fontWeight: "800",
    color: "#14b8a6",
    textAlign: "center",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: "#6b7280",
    textAlign: "center",
    lineHeight: 22,
  },
  form: {
    gap: 20,
    marginTop: 16,
  },
  formHeader: {
    alignItems: "center",
    marginBottom: 8,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1f2937",
    marginBottom: 4,
  },
  formSubtitle: {
    fontSize: 14,
    color: "#9ca3af",
  },
  button: {
    marginTop: 8,
  },
  disclaimer: {
    fontSize: 13,
    color: "#9ca3af",
    textAlign: "center",
    marginTop: 4,
    fontStyle: "italic",
  },
});
