import { Ionicons } from "@expo/vector-icons";
import {
  NavigationProp,
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import React, { useCallback } from "react";
import {
  BackHandler,
  Dimensions,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type QuizRouteParams = {
  id: number;
  questions: {
    correct: boolean;
    questionText: string;
  }[];
  score: number;
  totalTime: number;
};

type ExamenScoreScreenRouteProp = RouteProp<
  { params: QuizRouteParams },
  "params"
>;

const ExamenScore = () => {
  const route = useRoute<ExamenScoreScreenRouteProp>();
  const { questions, score, totalTime } = route.params;
  const navigation = useNavigation<NavigationProp<any>>();
  const windowWidth = Dimensions.get("window").width;
  const marginLeft = windowWidth * 0.2;

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        navigation.navigate("ExamenBlanc");
        return true;
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () => {
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
      };
    }, [navigation])
  );

  const handlePress = () => {
    navigation.navigate("Home");
  };

  const formatTime = (seconds: number) => {
    if (seconds >= 3600) {
      return `${Math.floor(seconds / 3600)} heures`;
    } else if (seconds >= 60) {
      return `${Math.floor(seconds / 60)} minutes`;
    } else {
      return `${seconds} secondes`;
    }
  };

  return (
    <>
      <View style={styles.header1}>
        <TouchableOpacity onPress={handlePress}>
          <Ionicons name="arrow-back" size={24} color="#000000" />
        </TouchableOpacity>

        <Text style={{ marginLeft, fontSize: 15, fontWeight: "bold" }}>
          Résultat
        </Text>
      </View>
      <ScrollView
        style={{
          backgroundColor: "#f0f8ff",
          height: Dimensions.get("window").height,
        }}
      >
        <View style={styles.container}>
          {questions.map(
            (question, index) =>
              index % 4 === 0 && (
                <View key={index} style={styles.row}>
                  {Array.from({ length: 4 }).map((_, i) => {
                    const currentQuestion = questions[index + i];
                    if (currentQuestion) {
                      return (
                        <View
                          key={i}
                          style={[
                            styles.questionContainer,
                            !currentQuestion.correct &&
                              styles.incorrectQuestion,
                          ]}
                        >
                          <Text style={styles.questionText}>
                            {index + i + 1}
                          </Text>
                        </View>
                      );
                    }
                    return null;
                  })}
                </View>
              )
          )}
          <Text style={styles.summaryText}>
            Durée totale: {formatTime(totalTime)}
          </Text>
          <Text style={styles.summaryText}>
            Questions réussies: {score}/{questions.length}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-evenly",
            padding: 20,
          }}
        >
          <Text style={styles.summaryText}>Mauvaises Reponses:</Text>
          <View
            style={{
              backgroundColor: "red",
              width: 35,
              height: 35,
              borderRadius: 8,
              marginTop: 15,
            }}
          ></View>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-evenly",
            padding: 20,
          }}
        >
          <Text style={styles.summaryText}>Bonnes Reponses:</Text>
          <View
            style={{
              backgroundColor: "#fff",
              width: 35,
              height: 35,
              borderRadius: 8,
              marginTop: 15,
            }}
          ></View>
        </View>
      </ScrollView>
    </>
  );
};

export default ExamenScore;

const styles = StyleSheet.create({
  header1: {
    marginTop: StatusBar.currentHeight,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  questionContainer: {
    flex: 1,
    padding: 15,
    borderRadius: 5,
    backgroundColor: "#fff",
    marginHorizontal: 5,
    alignItems: "center",
  },
  incorrectQuestion: {
    backgroundColor: "red",
  },
  questionText: {
    fontSize: 16,
  },
  summaryText: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
  },
});
