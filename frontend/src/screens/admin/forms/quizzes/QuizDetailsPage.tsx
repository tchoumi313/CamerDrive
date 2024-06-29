import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { QuizControllerApi } from "../../../../../generated/index";
import axiosInstance from "../../../../environments/axiosInstance";
import environment from "../../../../environments/environment";

const QuizDetailsPage = ({ id }) => {
  const [quizDetails, setQuizDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuizDetails = async () => {
      try {
        const quizApi = new QuizControllerApi(
          environment,
          environment.basePath,
          axiosInstance
        );
        const response = await quizApi.showQuiz(id);
        setQuizDetails(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizDetails();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.detailsContainer}>
        <Text style={styles.titleText}>Titre du QUiz: {quizDetails.titre}</Text>
        <View style={styles.questionsContainer}>
          <Text style={styles.titleText}>Liste des Question:</Text>
          {quizDetails.questions.map((question, index) => (
            <View key={index} style={styles.questionItem}>
              <Text style={styles.questionText}>
                {index + 1}. {question.libelle}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default QuizDetailsPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  detailsContainer: {
    width: "90%",
    alignSelf: "center",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginTop: 20,
    marginBottom: 20,
  },
  titleText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  questionsContainer: {
    marginTop: 10,
  },
  questionItem: {
    marginBottom: 10,
  },
  questionText: {
    fontSize: 16,
    color: "#333",
    textAlign: "left",
  },
});
