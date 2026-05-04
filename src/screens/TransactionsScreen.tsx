import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useBudget } from "../context/BudgetContext";
import Card from "../components/ui/Card";

type RootStackParamList = {
  Home: undefined;
  Setup: undefined;
  AddSpending: undefined;
  Transactions: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, "Transactions">;

export default function TransactionsScreen({ navigation }: Props) {
  const { budgetData, deleteTransaction, totalSpent } = useBudget();

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>

        <View style={styles.header}>
          <Text style={styles.title}>All Transactions</Text>
          <View style={styles.totalRow}>
            <Text style={styles.totalAmount}>${totalSpent.toFixed(2)}</Text>
            <Text style={styles.totalLabel}>total spent</Text>
          </View>
        </View>

        {budgetData.transactions.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emoji}>📋</Text>
            <Text style={styles.emptyText}>No transactions yet</Text>
          </View>
        ) : (
          <View style={styles.transactionsList}>
            {budgetData.transactions.map((transaction) => (
              <Card key={transaction.id} style={styles.transactionCard}>
                <View style={styles.transactionContent}>
                  <View style={styles.transactionInfo}>
                    <View style={styles.transactionRow}>
                      <Text style={styles.transactionAmount}>
                        ${transaction.amount.toFixed(2)}
                      </Text>
                      <Text style={styles.transactionDate}>
                        {new Date(transaction.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </Text>
                    </View>
                    {transaction.note && (
                      <Text style={styles.transactionNote}>
                        {transaction.note}
                      </Text>
                    )}
                  </View>
                  <TouchableOpacity
                    onPress={() => deleteTransaction(transaction.id)}
                    style={styles.deleteButton}
                  >
                    <Text style={styles.deleteButtonText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </Card>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
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
  backButton: {
    marginBottom: 32,
  },
  backButtonText: {
    fontSize: 16,
    color: "#14b8a6",
    fontWeight: "500",
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
    color: "#1f2937",
    marginBottom: 8,
  },
  totalRow: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 8,
  },
  totalAmount: {
    fontSize: 24,
    fontWeight: "600",
    color: "#1f2937",
  },
  totalLabel: {
    fontSize: 16,
    color: "#6b7280",
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: 64,
  },
  emoji: {
    fontSize: 60,
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 16,
    color: "#9ca3af",
  },
  transactionsList: {
    gap: 12,
    paddingBottom: 24,
  },
  transactionCard: {
    padding: 12,
  },
  transactionContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  transactionInfo: {
    flex: 1,
  },
  transactionRow: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 12,
  },
  transactionAmount: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1f2937",
  },
  transactionDate: {
    fontSize: 14,
    color: "#9ca3af",
  },
  transactionNote: {
    fontSize: 14,
    color: "#6b7280",
    marginTop: 4,
  },
  deleteButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#fef2f2",
    borderRadius: 12,
  },
  deleteButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#ef4444",
  },
});
