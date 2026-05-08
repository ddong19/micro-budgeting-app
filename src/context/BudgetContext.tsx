import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface Transaction {
  id: string;
  amount: number;
  note: string;
  date: string;
}

export type CharacterType = "bud" | "ramen";

interface BudgetData {
  categoryName: string;
  monthlyBudget: number;
  transactions: Transaction[];
  isSetup: boolean;
  selectedCharacter: CharacterType;
}

interface BudgetContextType {
  budgetData: BudgetData;
  addTransaction: (transaction: Omit<Transaction, "id">) => void;
  deleteTransaction: (id: string) => void;
  setupBudget: (categoryName: string, monthlyBudget: number, character: CharacterType) => void;
  resetBudget: () => Promise<void>;
  totalSpent: number;
  remaining: number;
  spendingPercentage: number;
  isLoading: boolean;
}

const BudgetContext = createContext<BudgetContextType | undefined>(undefined);

const STORAGE_KEY = "budget-app-data";

const defaultBudgetData: BudgetData = {
  categoryName: "",
  monthlyBudget: 0,
  transactions: [],
  isSetup: false,
  selectedCharacter: "bud",
};

interface BudgetProviderProps {
  children: ReactNode;
}

export function BudgetProvider({ children }: BudgetProviderProps) {
  const [budgetData, setBudgetData] = useState<BudgetData>(defaultBudgetData);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Load data from AsyncStorage on mount
  useEffect(() => {
    loadData();
  }, []);

  // Save data to AsyncStorage whenever it changes
  useEffect(() => {
    if (!isLoading) {
      saveData();
    }
  }, [budgetData, isLoading]);

  const loadData = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);

        // Validate and ensure all fields have correct types after parsing
        const validatedData: BudgetData = {
          categoryName: typeof parsed.categoryName === 'string' ? parsed.categoryName : "",
          monthlyBudget: typeof parsed.monthlyBudget === 'number' ? parsed.monthlyBudget : 0,
          transactions: Array.isArray(parsed.transactions) ? parsed.transactions : [],
          isSetup: parsed.isSetup === true, // Strict boolean check
          selectedCharacter: (parsed.selectedCharacter === "bud" || parsed.selectedCharacter === "ramen")
            ? parsed.selectedCharacter
            : "bud",
        };

        setBudgetData(validatedData);
      }
    } catch (error) {
      console.error("Error loading data:", error);
      // If there's an error parsing, clear the corrupted data
      await AsyncStorage.removeItem(STORAGE_KEY);
    } finally {
      setIsLoading(false);
    }
  };

  const saveData = async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(budgetData));
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const addTransaction = (transaction: Omit<Transaction, "id">) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: Date.now().toString(),
    };
    setBudgetData((prev) => ({
      ...prev,
      transactions: [newTransaction, ...prev.transactions],
    }));
  };

  const deleteTransaction = (id: string) => {
    setBudgetData((prev) => ({
      ...prev,
      transactions: prev.transactions.filter((t) => t.id !== id),
    }));
  };

  const setupBudget = (categoryName: string, monthlyBudget: number, character: CharacterType) => {
    setBudgetData((prev) => ({
      ...prev,
      categoryName,
      monthlyBudget,
      selectedCharacter: character,
      isSetup: true,
    }));
  };

  const resetBudget = async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      setBudgetData(defaultBudgetData);
    } catch (error) {
      console.error("Error resetting budget:", error);
    }
  };

  const totalSpent = budgetData.transactions.reduce(
    (sum, t) => sum + t.amount,
    0
  );
  const remaining = budgetData.monthlyBudget - totalSpent;
  const spendingPercentage = budgetData.monthlyBudget > 0
    ? (totalSpent / budgetData.monthlyBudget) * 100
    : 0;

  return (
    <BudgetContext.Provider
      value={{
        budgetData,
        addTransaction,
        deleteTransaction,
        setupBudget,
        resetBudget,
        totalSpent,
        remaining,
        spendingPercentage,
        isLoading,
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
}

export function useBudget() {
  const context = useContext(BudgetContext);
  if (!context) {
    throw new Error("useBudget must be used within BudgetProvider");
  }
  return context;
}
