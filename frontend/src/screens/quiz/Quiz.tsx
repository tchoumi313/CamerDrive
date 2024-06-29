import { NavigationProp, useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { QuizControllerApi } from "../../../generated/index";
import axiosInstance from "../../environments/axiosInstance";
import environment from "../../environments/environment";

interface Quiz {
  id: number;
  titre: string;
  questions: any[];
}

const Quizzes = () => {
  const navigation = useNavigation<NavigationProp<any>>();

  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);

  const AllQuizzes = async () => {
    try {
      const quizApi = new QuizControllerApi(
        environment,
        environment.basePath,
        axiosInstance
      );
      const response = await quizApi.indexQuizzes();
      const quizzes = response.data.map((quiz: any) => ({
        id: quiz.id,
        titre: quiz.titre,
        questions: quiz.questions,
      }));
      setQuizzes(quizzes);
    } catch (error: any) {
      console.error("Erreur lors de la récupération des quizzes :", error);
      Alert.alert("Erreur", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    AllQuizzes();
  }, []);

  const handleQuizPress = (id: number) => {
    navigation.navigate("QuizDetails", { id });
  };

  if (loading) {
    return (
      <View style={QuizStyle.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View
      style={{
        backgroundColor: "#f0f8ff",
        height: Dimensions.get("window").height,
      }}
    >
      <FlatList
        data={quizzes}
        keyExtractor={(item) => item.id.toString()}
        style={{
          backgroundColor: "#f0f8ff",
          borderTopRightRadius: 10,
          marginBottom: 40,
        }}
        renderItem={({ item }) => (
          <View style={QuizStyle.container}>
            <TouchableOpacity onPress={() => handleQuizPress(item.id)}>
              <View style={QuizStyle.itemContainer}>
                <Text style={QuizStyle.title}>{item.titre}</Text>
                <Text style={QuizStyle.questionCount}>
                  {item.questions.length} questions
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

export default Quizzes;

const QuizStyle = StyleSheet.create({
  container: {
    backgroundColor: "white",
    marginBottom: 15,
    marginLeft: 20,
    marginRight: 20,
    marginTop: StatusBar.currentHeight! - 10,
    borderRadius: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: Dimensions.get("window").height * 0.4,
  },

  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    overflow: "hidden",
  },

  title: {
    width: Dimensions.get("window").width * 0.5,
    fontWeight: "bold",
  },

  questionCount: {
    marginLeft: 10,
    color: "gray",
  },
});
