import Header from "@/components/Header";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";

const AboutUs = () => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.goBack(); // Revenir à la page précédente
  };

  const windowWidth = Dimensions.get("window").width;
  const marginLeft = windowWidth * 0.2;

  return (
    <>
      <Header titre={"A Propos"} />

      <ScrollView style={styles.container}>
        <View style={styles.header1}>
          <Image
            source={require("../../assets/logo.png")} // Replace with your app's logo
            style={styles.logo}
          />
          <Text style={styles.appName}>CarmerDrive</Text>
        </View>

        <View>
          <Text style={styles.aboutTitle}>À propos de nous</Text>

          <Text style={styles.aboutText}>
            Chez CarmerDrive, nous sommes passionnés par l'autonomisation des
            individus pour atteindre leurs aspirations en matière de conduite.
            Nous comprenons que le parcours pour obtenir un permis de conduire
            peut être difficile, et nous nous engageons à fournir une expérience
            d'apprentissage complète et engageante qui simplifie le processus et
            augmente vos chances de réussite.
          </Text>

          <Text style={styles.aboutTitle}>Notre mission</Text>

          <Text style={styles.aboutText}>
            Notre mission est de révolutionner l'éducation à la conduite en la
            rendant accessible, abordable et efficace. Nous croyons que tout le
            monde mérite la possibilité d'apprendre à conduire et de gagner
            l'indépendance et la liberté qui en découlent.
          </Text>

          <Text style={styles.aboutTitle}>Notre équipe</Text>

          <Text style={styles.aboutText}>
            Notre équipe d'instructeurs expérimentés, passionnés par la sécurité
            routière et l'éducation à la conduite, est dédiée à vous fournir le
            soutien et l'orientation dont vous avez besoin pour exceller dans
            vos tests de conduite. Nous nous engageons à rester à l'avant-garde
            de la technologie et des méthodologies de l'éducation à la conduite
            pour nous assurer que vous recevez une formation à jour et efficace.
          </Text>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
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
    backgroundColor: "#fff",
    padding: 20,
  },
  header1: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  appName: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 20,
  },
  aboutTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  aboutText: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
    //textIndent: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    //textIndent: 20, // Indent the first line by 20 pixels
  },
});

export default AboutUs;
