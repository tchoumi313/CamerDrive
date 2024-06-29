import { Ionicons } from "@expo/vector-icons";
import {
  NavigationProp,
  useFocusEffect,
  useNavigation,
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
import Svg, { Circle } from "react-native-svg";

interface ScorePageProps {
  route: {
    params: {
      score: number;
      duration: string;
      totalQuestions: number;
    };
  };
}

const ScorePage: React.FC<ScorePageProps> = ({ route }) => {
  const { score, duration, totalQuestions } = route.params;
  const navigation = useNavigation<NavigationProp<any>>();
  const percentage = (score / totalQuestions) * 100;
  const isPassed = percentage >= 50;
  const roundedPercentage = Math.floor(percentage);

  const radius = 40;
  const strokeWidth = 15;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    circumference - (circumference * roundedPercentage) / 100;

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        navigation.navigate("Home");
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

  const windowWidth = Dimensions.get("window").width;
  const marginLeft = windowWidth * 0.2;

  return (
    <>
      <View style={styles.header1}>
        <TouchableOpacity onPress={handlePress}>
          <Ionicons name="arrow-back" size={24} color="#000000" />
        </TouchableOpacity>

        <Text
          style={{ marginLeft: marginLeft, fontSize: 15, fontWeight: "bold" }}
        >
          Resultat
        </Text>
      </View>
      <ScrollView style={{ backgroundColor: "#f0f8ff" }}>
        <View style={styles.container}>
          <View style={styles.statusContainer}>
            <Text style={styles.Text}>
              {isPassed ? "Felicitations!" : "Whoops, desolee...."}
            </Text>

            <View style={styles.percentageContainer}>
              <Svg width="150" height="150" viewBox="0 0 100 100">
                <Circle
                  cx="50"
                  cy="50"
                  r={radius}
                  stroke="lightgray"
                  strokeWidth={strokeWidth}
                  fill="none"
                />
                <Circle
                  cx="50"
                  cy="50"
                  r={radius}
                  stroke={isPassed ? "green" : "yellow"}
                  strokeWidth={strokeWidth}
                  fill="none"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                />
              </Svg>
              <Text style={styles.percentageText}>{roundedPercentage}%</Text>
            </View>
            <Text style={styles.statusText}>
              {isPassed ? "Driving Test Passed" : "Driving Test Failed"}
            </Text>
          </View>
        </View>

        <View style={styles.resultContainer}>
          <Text style={styles.result}>
            {score}/{totalQuestions}
          </Text>
          <Text style={styles.result}>{duration}</Text>
        </View>
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>Resultat</Text>
          <Text style={styles.resultText}>Temps</Text>
        </View>
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Home")}
          >
            <Text style={styles.buttonText}>Retour à l'accueil</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

export default ScorePage;

const styles = StyleSheet.create({
  header1: {
    marginTop: StatusBar.currentHeight,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#dddddd",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f8ff",
    marginTop: StatusBar.currentHeight! + 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  score: {
    fontSize: 48,
    fontWeight: "bold",
    color: "green",
    marginBottom: 40,
  },
  duration: {
    fontSize: 18,
    color: "#333",
    marginBottom: 20,
  },
  statusContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  statusText: {
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 60,
    color: "#6495ed",
  },
  percentageContainer: {
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  percentageText: {
    fontSize: 24,
    fontWeight: "bold",
    position: "absolute",
    color: "#6495ed",
  },
  button: {
    backgroundColor: "#6495ed",
    padding: 15,
    borderRadius: 20,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
  Text: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 60,
  },
  resultContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  resultText: {
    fontSize: 20,
  },
  result: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
