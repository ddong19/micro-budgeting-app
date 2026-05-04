import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useBudget } from "../context/BudgetContext";
import Character from "../components/Character";
import ProgressBar from "../components/ProgressBar";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

type RootStackParamList = {
  Home: undefined;
  Setup: undefined;
  AddSpending: undefined;
  Transactions: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export default function HomeScreen({ navigation }: Props) {
  const { budgetData, totalSpent, remaining, spendingPercentage, isLoading } = useBudget();

  useEffect(() => {
    if (!isLoading && !budgetData.isSetup) {
      navigation.replace("Setup");
    }
  }, [budgetData.isSetup, isLoading, navigation]);

  if (isLoading || !budgetData.isSetup) {
    return null;
  }

  const recentTransactions = budgetData.transactions.slice(0, 3);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Character spendingPercentage={spendingPercentage} />

      <Card style={styles.card}>
        <Text style={styles.categoryName}>{budgetData.categoryName}</Text>

        <ProgressBar percentage={spendingPercentage} />

        <View style={styles.amountRow}>
          <View>
            <Text style={styles.totalSpent}>${totalSpent.toFixed(2)}</Text>
            <Text style={styles.budgetText}>
              of ${budgetData.monthlyBudget.toFixed(2)}
            </Text>
          </View>
          <View style={styles.remainingContainer}>
            <Text
              style={[
                styles.remaining,
                { color: remaining >= 0 ? "#14b8a6" : "#ef4444" },
              ]}
            >
              ${Math.abs(remaining).toFixed(2)}
            </Text>
            <Text style={styles.remainingText}>
              {remaining >= 0 ? "remaining" : "over budget"}
            </Text>
          </View>
        </View>
      </Card>

      <Button
        onPress={() => navigation.navigate("AddSpending")}
        size="lg"
        style={styles.addButton}
      >
        Add Spending
      </Button>

      <View style={styles.transactionsSection}>
        <View style={styles.transactionsHeader}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
          {budgetData.transactions.length > 0 && (
            <TouchableOpacity onPress={() => navigation.navigate("Transactions")}>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          )}
        </View>

        {recentTransactions.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emoji}>🎯</Text>
            <Text style={styles.emptyText}>No spending yet!</Text>
            <Text style={styles.emptySubtext}>You're off to a great start</Text>
          </View>
        ) : (
          <View style={styles.transactionsList}>
            {recentTransactions.map((transaction) => (
              <View key={transaction.id} style={styles.transactionItem}>
                <View>
                  <Text style={styles.transactionAmount}>
                    ${transaction.amount.toFixed(2)}
                  </Text>
                  {transaction.note && (
                    <Text style={styles.transactionNote}>
                      {transaction.note}
                    </Text>
                  )}
                </View>
                <Text style={styles.transactionDate}>
                  {new Date(transaction.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </Text>
              </View>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    padding: 24,
  },
  card: {
    marginBottom: 24,
  },
  categoryName: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 16,
  },
  amountRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginTop: 16,
  },
  totalSpent: {
    fontSize: 30,
    fontWeight: "700",
    color: "#1f2937",
  },
  budgetText: {
    fontSize: 14,
    color: "#6b7280",
    marginTop: 4,
  },
  remainingContainer: {
    alignItems: "flex-end",
  },
  remaining: {
    fontSize: 24,
    fontWeight: "700",
  },
  remainingText: {
    fontSize: 14,
    color: "#6b7280",
    marginTop: 4,
  },
  addButton: {
    width: "100%",
    marginBottom: 32,
  },
  transactionsSection: {
    flex: 1,
  },
  transactionsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1f2937",
  },
  viewAllText: {
    fontSize: 14,
    color: "#14b8a6",
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: 48,
  },
  emoji: {
    fontSize: 60,
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 16,
    color: "#9ca3af",
  },
  emptySubtext: {
    fontSize: 14,
    color: "#9ca3af",
    marginTop: 4,
  },
  transactionsList: {
    gap: 12,
  },
  transactionItem: {
    backgroundColor: "#f9fafb",
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1f2937",
  },
  transactionNote: {
    fontSize: 14,
    color: "#6b7280",
    marginTop: 4,
  },
  transactionDate: {
    fontSize: 14,
    color: "#9ca3af",
  },
});
