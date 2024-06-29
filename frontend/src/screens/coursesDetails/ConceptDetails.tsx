import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  ConceptControllerApi,
  ConceptResponse,
} from "../../../generated/index";

import axiosInstance from "../../environments/axiosInstance";
import environment from "../../environments/environment";

const ConceptDetails: React.FC = () => {
  const route = useRoute();
  const { id } = route.params as { id: number };
  const [concept, setConcept] = useState<ConceptResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchConcept = async () => {
      const conceptApi = new ConceptControllerApi(
        environment,
        environment.basePath,
        axiosInstance
      );
      try {
        const response = await conceptApi.showConcept(id);
        setConcept(response.data);
      } catch (error: any) {
        console.error("Error fetching concept details:", error);
        Alert.alert("Error", error.message || "An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchConcept();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.fullScreenContainer}>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.titleText}>{concept?.titre}</Text>
          <Text style={styles.contentText}>{concept?.contenu}</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  fullScreenContainer: {
    backgroundColor: "#f0f8ff",
    height: Dimensions.get("window").height,
  },
  container: {
    flex: 1,
    backgroundColor: "#f0f8ff",
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  titleText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
    textAlign: "center",
  },
  contentText: {
    fontSize: 16,
    color: "#555",
    textAlign: "justify",
  },
});

export default ConceptDetails;
