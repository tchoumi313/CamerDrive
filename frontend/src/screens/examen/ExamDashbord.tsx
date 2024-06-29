import Header from "@/components/Header";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import React from "react";
import {
  Dimensions,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const ExamDashbord: React.FC = () => {
  const navigation = useNavigation<NavigationProp<any>>();

  return (
    <>
      <Header titre="Examen Blanc" />
      <ScrollView style={{ backgroundColor: "#f0f8ff" }}>
        <View style={styles.container}>
          <View style={styles.textContainer}>
            <Text style={styles.text}>
              L'examen blanc est un test type examen officiel du code de la
              route a tirage aleatoire de 40 questions s'effectuant dans les
              memes conditions que l'examen. Les corrections sont disponibles a
              la fin du test. Effectuez cet exament plusieurs fois et votre
              permis sera dans la poche
            </Text>

            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("LoadingScreen")}
            >
              <Text style={styles.buttonText}>Demarrer l'examen</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default ExamDashbord;

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    lineHeight: 30,
    marginBottom: Dimensions.get("window").height * 0.3,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: StatusBar.currentHeight!,
  },
  textContainer: {
    width: Dimensions.get("window").width * 0.8,
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
});
