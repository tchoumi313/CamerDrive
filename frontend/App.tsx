import { NavigationContainer } from "@react-navigation/native";
import { useEffect } from "react";
import { LogBox, StyleSheet } from "react-native";
import { AuthProvider } from "./src/context/AuthContext";

import { createTables } from "@/services/database";
import Index from "./src/screens/Index";

export default function App() {
  LogBox.ignoreAllLogs();
  LogBox.ignoreAllLogs();
  useEffect(() => {
    const initialize = async () => {
      await createTables();
    };
    initialize();
  }, []);
  return (
    <NavigationContainer>
      <AuthProvider>
        <Index />
      </AuthProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
