import Header from "@/components/Header";
import axiosInstance from "@/environments/axiosInstance";
import environment from "@/environments/environment";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import {
  QuizControllerApi,
  ScoreUserQuizControllerApi,
} from "../../../generated/index";
import StatistiqueStyle from "./StatistiqueStyle";

interface ScoreDetail {
  id: number;
  note: number;
  quiz: Quiz;
  status: string;
}

interface Quiz {
  id: number;
  questions: Array<Question>;
}

interface Question {
  questionText: string;
}

const Statistiques: React.FC = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const [testDetails, setTestDetails] = useState<ScoreDetail[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAllScores = async () => {
      const scoreQuizApi = new ScoreUserQuizControllerApi(
        environment,
        environment.basePath,
        axiosInstance
      );
      try {
        const scoresResponse = await scoreQuizApi.indexScoreUserQuiz();
        const scores = scoresResponse.data;
        const detailedScores = await Promise.all(
          scores.map(async (score: any) => {
            const quizResponse = await new QuizControllerApi(
              environment,
              environment.basePath,
              axiosInstance
            ).showQuiz(score.quiz.id);
            const quiz = quizResponse.data;
            const status =
              score.note >= quiz.questions!.length / 2 ? "PASSED" : "FAILED";
            return {
              ...score,
              quiz,
              status,
              quizQuestionsTotal: quiz.questions!.length,
            };
          })
        );
        setTestDetails(detailedScores);
      } catch (error) {
        console.error("Error fetching details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllScores();
  }, []);

  if (loading) {
    return (
      <View style={StatistiqueStyle.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <>
      <Header titre="Historique des Tests" />
      <ScrollView>
        <View style={{ marginTop: 15 }}>
          <Text style={{ fontSize: 20, marginLeft: 20 }}>Vue d'ensemble</Text>
        </View>
        <View style={StatistiqueStyle.container}>
          {testDetails.map((test) => (
            <View
              key={test.id}
              style={[
                StatistiqueStyle.testContainer,
                {
                  backgroundColor:
                    test.status === "FAILED" ? "#ffb6c1" : "#e0ffff",
                },
              ]}
            >
              <View style={StatistiqueStyle.testItemContainer}>
                <Text style={StatistiqueStyle.text}>Status du test:</Text>
                <Text
                  style={[
                    StatistiqueStyle.text,
                    { color: test.status === "FAILED" ? "red" : "green" },
                  ]}
                >
                  {test.status}
                </Text>
              </View>
              <View style={StatistiqueStyle.testItemContainer}>
                <Text style={StatistiqueStyle.text}>Numero du Test:</Text>
                <Text style={StatistiqueStyle.text}>{test.quiz.id}</Text>
              </View>
              <View style={StatistiqueStyle.testItemContainer}>
                <Text style={StatistiqueStyle.text}>
                  Nombre de réponses justes:
                </Text>
                <Text style={StatistiqueStyle.text}>
                  {test.note}/{test.quiz.questions.length}
                </Text>
              </View>
              <View style={StatistiqueStyle.testItemContainer}>
                <Text style={StatistiqueStyle.text}>Durée Totale:</Text>
                <Text style={StatistiqueStyle.text}> min</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </>
  );
};

export default Statistiques;
