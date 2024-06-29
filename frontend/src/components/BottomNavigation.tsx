import { AntDesign, Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface BottomNavigationProps {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

const BottomNavigation = (props: BottomNavigationProps) => {
  return (
    <View style={styles.container}>
      <Pressable
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? "rgba(0, 0, 0, 0.1)" : "transparent",
          },
          styles.categoryIcon,
          props.activeCategory === "Home" && styles.activeIcon,
        ]}
        onPress={() => props.setActiveCategory("Home")}
      >
        <Ionicons
          name="home-outline"
          size={20}
          color={props.activeCategory === "Home" ? "red" : "black"}
        />
        <Text
          style={[
            styles.categoryName,
            props.activeCategory === "Home" && styles.activeText,
          ]}
        >
          Accueil
        </Text>
      </Pressable>

      <Pressable
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? "rgba(0, 0, 0, 0.1)" : "transparent",
          },
          styles.categoryIcon,
          props.activeCategory === "Courses" && styles.activeIcon,
        ]}
        onPress={() => props.setActiveCategory("Courses")}
      >
        <Ionicons
          name="school-outline"
          size={20}
          color={props.activeCategory === "Courses" ? "red" : "black"}
        />
        <Text
          style={[
            styles.categoryName,
            props.activeCategory === "Courses" && styles.activeText,
          ]}
        >
          Cours
        </Text>
      </Pressable>

      <Pressable
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? "rgba(0, 0, 0, 0.1)" : "transparent",
          },
          styles.categoryIcon,
          props.activeCategory === "Quiz" && styles.activeIcon,
        ]}
        onPress={() => props.setActiveCategory("Quiz")}
      >
        <Ionicons
          name="extension-puzzle-outline"
          size={20}
          color={props.activeCategory === "Quiz" ? "red" : "black"}
        />
        <Text
          style={[
            styles.categoryName,
            props.activeCategory === "Quiz" && styles.activeText,
          ]}
        >
          Quiz
        </Text>
      </Pressable>

      <Pressable
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? "rgba(0, 0, 0, 0.1)" : "transparent",
          },
          styles.categoryIcon,
          props.activeCategory === "LastExam" && styles.activeIcon,
        ]}
        onPress={() => props.setActiveCategory("LastExam")}
      >
        <AntDesign
          name="copy1"
          size={20}
          color={props.activeCategory === "LastExam" ? "red" : "black"}
        />
        <Text
          style={[
            styles.categoryName,
            props.activeCategory === "LastExam" && styles.activeText,
          ]}
        >
          Anciens Sujets
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#fff",
    width: "100%",
    padding: 10,
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: "lightgray",
  },
  categoryIcon: {
    flex: 1,
    alignItems: "center",
  },
  activeIcon: {
    color: "red",
  },
  categoryName: {
    fontSize: 12,
    color: "black",
    marginTop: 5,
  },
  activeText: {
    color: "red",
  },
});

export default BottomNavigation;
