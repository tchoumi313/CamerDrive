import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface DataType {
  id: number;
  icon: keyof typeof AntDesign.glyphMap;
  title: string;
}

const data: DataType[] = [
  {
    id: 1,
    icon: "filetext1",
    title: "Test Simulé",
  },
  {
    id: 2,
    icon: "car",
    title: "Leçons de Conduite",
  },
  {
    id: 3,
    icon: "enviromento",
    title: "Zone de Couverture",
  },
  {
    id: 4,
    icon: "team",
    title: "Instructeurs Expérimentés",
  },
];

const HorizontalView = () => {
  return (
    <View style={styles.container}>
      {data.map((item) => (
        <View key={item.id} style={styles.itemContainer}>
          <View style={styles.iconCircle}>
            <AntDesign name={item.icon} size={24} color="black" />
          </View>
          <Text style={styles.itemText}>{item.title}</Text>
        </View>
      ))}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#FFD700",
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginLeft: 30,
    borderBottomLeftRadius: 280,
    borderTopLeftRadius: 100,
    borderTopRightRadius: 270, // Fix: Use borderTopRightRadius instead of borderTopLeftRadius
  },
  itemContainer: {
    flex: 1, // Fix: Use flex: 1 to make items occupy equal space
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 5,
    marginTop: 15,
  },
  iconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  itemText: {
    marginTop: 5,
    color: "black",
    textAlign: "center",
  },
});

export default HorizontalView;
