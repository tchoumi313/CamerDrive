import Header from "@/components/Header";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import StatistiqueStyle from "./StatistiqueStyle";

interface ScoreDetail {
  id: number;
  note: number;
  quiz: Quiz;
  status: string;
  duration: number;
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
      // Mock data
      const mockData: ScoreDetail[] = [
        {
          id: 1,
          note: 8,
          quiz: {
            id: 101,
            questions: [
              { questionText: "Question 1" },
              { questionText: "Question 2" },
              { questionText: "Question 3" },
              { questionText: "Question 4" },
              { questionText: "Question 5" },
              { questionText: "Question 6" },
              { questionText: "Question 7" },
              { questionText: "Question 8" },
              { questionText: "Question 9" },
              { questionText: "Question 10" },
            ],
          },
          status: "PASSED",
          duration: 3,
        },
        {
          id: 2,
          note: 5,
          quiz: {
            id: 102,
            questions: [
              { questionText: "Question 1" },
              { questionText: "Question 2" },
              { questionText: "Question 3" },
              { questionText: "Question 4" },
              { questionText: "Question 5" },
              { questionText: "Question 6" },
              { questionText: "Question 7" },
              { questionText: "Question 8" },
              { questionText: "Question 9" },
              { questionText: "Question 10" },
            ],
          },
          status: "FAILED",
          duration: 4,
        },
      ];

      setTestDetails(mockData);
      setLoading(false);
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
                <Text style={StatistiqueStyle.text}>{test.duration} min</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </>
  );
};

export default Statistiques;
