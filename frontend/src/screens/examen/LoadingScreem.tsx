import axiosInstance from "@/environments/axiosInstance";
import environment from "@/environments/environment";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Dimensions,
  ProgressBarAndroid,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  QuestionControllerApi,
  QuestionResponse,
} from "../../../generated/index";

interface Question {
  id: number;
  questionText: string;
}

const LoadingScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const [progress, setProgress] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [questions, setQuestions] = useState<QuestionResponse[]>([]);
  const texts: string[] = [
    "Préparation de l'examen...",
    "Chargement des questions...",
    "Vérification des images...",
    "Initialisation des réponses...",
    "Finalisation...",
  ];
  const [currentTextIndex, setCurrentTextIndex] = useState<number>(0);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const questionApi = new QuestionControllerApi(
          environment,
          environment.basePath,
          axiosInstance
        );
        const response = await questionApi.indexQuestions();
        let fetchedQuestions: QuestionResponse[] = response.data.map(
          (question: QuestionResponse) => ({
            id: question.id,
            questionText: question.libelle,
            option1: question.option1,
            option2: question.option2,
            option3: question.option3,
            option4: question.option4,
            correctOption: question.correctOption,
            image: question.image,
          })
        );

        if (fetchedQuestions.length > 40) {
          fetchedQuestions = fetchedQuestions
            .sort(() => 0.5 - Math.random())
            .slice(0, 40);
        }

        setQuestions(fetchedQuestions);
        console.log(fetchedQuestions);
      } catch (error) {
        console.error(error);
        Alert.alert("Error", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + 0.2;
          if (newProgress >= 1) {
            clearInterval(interval);
          }
          return newProgress;
        });

        setCurrentTextIndex((prev) => {
          const newIndex = (prev + 1) % texts.length;

          return newIndex;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [loading]);

  useEffect(() => {
    if (!loading) {
      navigation.navigate("ExamenDetails", { questions });
    }
  }, [loading, navigation, questions]);

  return (
    <View style={styles.container}>
      {loading ? (
        <>
          <Text style={styles.text}>{texts[currentTextIndex]}</Text>
          <ProgressBarAndroid
            styleAttr="Horizontal"
            indeterminate={false}
            progress={progress}
            style={styles.progressBar}
          />
        </>
      ) : (
        <Text style={styles.text}>Questions chargées avec succès!</Text>
      )}
    </View>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f8ff",
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
  progressBar: {
    width: Dimensions.get("window").width * 0.8,
  },
});
