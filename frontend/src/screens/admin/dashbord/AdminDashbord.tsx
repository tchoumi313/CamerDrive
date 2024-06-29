import { Ionicons } from "@expo/vector-icons";
import {
  NavigationProp,
  useFocusEffect,
  useNavigation,
} from "@react-navigation/native";
import React, { useCallback } from "react";
import {
  Alert,
  AlertOptions,
  BackHandler,
  Dimensions,
  Pressable,
  ScrollView,
  Text,
  View,
  ViewStyle,
} from "react-native";
import { useAuth } from "../../../context/AuthContext";
import AdminDashbordStyle from "./AdminDahbordStyle";
import tasks, { Task } from "./Tasks";

declare interface CustomAlertOptions extends AlertOptions {
  alertContainerStyle?: ViewStyle;
}

const AdminDashbord: React.FC = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const { onLogout } = useAuth();

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        createTwoButtonAlertQuit();
        return true;
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () => {
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
      };
    }, [])
  );

  const createTwoButtonAlertQuit = () =>
    Alert.alert(
      "Confirmer la sortie",
      "Êtes-vous sûr de vouloir quitter ?",
      [
        {
          text: "Annuler",
          style: "cancel",
        },
        {
          text: "OUI",
          onPress: () => {
            BackHandler.exitApp();
          },
        },
      ],
      {
        alertContainerStyle: AdminDashbordStyle.alertContainer,
      } as CustomAlertOptions
    );

  const windowWidth = Dimensions.get("window").width;
  const marginLeft = windowWidth * 0.1;

  const handleTaskPress = (task: Task) => {
    switch (task.text) {
      case "Gestion des questions":
        navigation.navigate("QuestionDetails", { type: "questions" });
        break;
      case "Gestion des utilisateurs":
        navigation.navigate("QuestionDetails", { type: "users" });
        break;
      case "Gestion des cours":
        navigation.navigate("QuestionDetails", { type: "courses" });
        break;
      case "Gestion des concepts":
        navigation.navigate("QuestionDetails", { type: "concepts" });
        break;
      case "Gestion des quiz":
        navigation.navigate("QuestionDetails", { type: "quizzes" });
        break;
      default:
        break;
    }
  };

  const createTwoButtonAlert = () =>
    Alert.alert(
      "Confirmer la déconnexion",
      "Êtes-vous sûr de vouloir vous déconnecter ?",
      [
        {
          text: "Annuler",
          style: "cancel",
        },
        {
          text: "OUI",
          onPress: () => {
            if (onLogout) {
              onLogout();
            } else {
              console.error("La fonction de déconnexion n'est pas définie");
            }
          },
        },
      ],
      {
        alertContainerStyle: AdminDashbordStyle.alertContainer,
      } as CustomAlertOptions
    );

  return (
    <>
      <View style={AdminDashbordStyle.header1}>
        <Text style={{ fontSize: 20, fontWeight: "bold", color: "#fff" }}>Accueil</Text>
        <Pressable onPress={createTwoButtonAlert}>
          <Ionicons name="log-out" size={30} color="#fff" />
        </Pressable>
      </View>
      <ScrollView>
        <View style={AdminDashbordStyle.container}>
          <Text style={AdminDashbordStyle.textBelowLine}>
            Vous pouvez effectuer les tâches suivantes
          </Text>
          <View style={AdminDashbordStyle.tasksContainer}>
            {Array.from({ length: Math.ceil(tasks.length / 2) }).map(
              (_, rowIndex) => (
                <View style={AdminDashbordStyle.tasksRow} key={rowIndex}>
                  {tasks
                    .slice(rowIndex * 2, (rowIndex + 1) * 2)
                    .map((item, index) => (
                      <Pressable
                        key={index}
                        style={AdminDashbordStyle.tasksIconContainer}
                        onPress={() => handleTaskPress(item)}
                      >
                        <View style={AdminDashbordStyle.tasksIcon}>
                          <Ionicons name={item.icon} size={24} color="white" />
                          <Text style={AdminDashbordStyle.tasksText}>
                            {item.text}
                          </Text>
                        </View>
                      </Pressable>
                    ))}
                </View>
              )
            )}
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default AdminDashbord;
