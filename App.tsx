import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { BudgetProvider } from "./src/context/BudgetContext";
import HomeScreen from "./src/screens/HomeScreen";
import SetupScreen from "./src/screens/SetupScreen";
import AddSpendingScreen from "./src/screens/AddSpendingScreen";
import TransactionsScreen from "./src/screens/TransactionsScreen";

export type RootStackParamList = {
  Home: undefined;
  Setup: undefined;
  AddSpending: undefined;
  Transactions: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <SafeAreaProvider>
      <BudgetProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: "#fff" },
            }}
          >
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Setup" component={SetupScreen} />
            <Stack.Screen name="AddSpending" component={AddSpendingScreen} />
            <Stack.Screen name="Transactions" component={TransactionsScreen} />
          </Stack.Navigator>
        </NavigationContainer>
        <StatusBar style="dark" />
      </BudgetProvider>
    </SafeAreaProvider>
  );
}
