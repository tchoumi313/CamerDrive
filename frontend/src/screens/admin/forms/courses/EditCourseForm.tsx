import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import Header from "@/components/Header";
import { CoursControllerApi } from "../../../../../generated/index";
import axiosInstance from "../../../../environments/axiosInstance";
import environment from "../../../../environments/environment";

type EditCourseFormProps = {
  id: number;
};

const EditCourseForm = ({ id }: EditCourseFormProps) => {
  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const courseApi = new CoursControllerApi(
          environment,
          environment.basePath,
          axiosInstance
        );
        const response = await courseApi.showCours(id);
        const course = response.data;
        setTitre(course.titre);
        setDescription(course.description);
      } catch (error) {
        console.log(error);
        setMessage("Failed to fetch course data.");
        setMessageType("error");
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  if (loading) {
    return (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginTop: Dimensions.get("window").height * 0.5,
        }}
      >
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const handleSubmit = async () => {
    let hasError = false;

    if (!titre) {
      setTitleError("Le champ 'titre' est obligatoire.");
      hasError = true;
    } else {
      setTitleError("");
    }

    if (!description) {
      setDescriptionError("Vous devez sélectionner une option correcte.");
      hasError = true;
    } else {
      setDescriptionError("");
    }

    if (hasError) return;
    try {
      setIsLoading(true);
      const courseApi = new CoursControllerApi(
        environment,
        environment.basePath,
        axiosInstance
      );
      await courseApi.updateCours(
        {
          titre,
          description,
        },
        id
      );
      setIsLoading(false);
      setMessage("cours modifie avec success.");
      setMessageType("success");
      setTimeout(() => {
        navigation.goBack();
      }, 2000);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setMessage("Erreure de Modification: " + error.message);
      setMessageType("error");
    }
  };

  return (
    <>
      <Header titre={"Modifier un Cours"} />
      {message && (
        <View
          style={[
            styles.messageContainer,
            messageType === "success" ? styles.success : styles.error,
          ]}
        >
          <Text style={styles.messageText}>{message}</Text>
        </View>
      )}
      <ScrollView style={styles.scrollView}>
        <View style={styles.formContainer}>
          <View style={styles.textInputContainer}>
            <TextInput
              placeholder="Entrer le titre du cours"
              value={titre}
              onChangeText={setTitre}
              style={styles.textInput}
            />
            {titleError ? (
              <Text style={styles.errorText}>{titleError}</Text>
            ) : null}
          </View>
          <View style={styles.textInputContainer}>
            <TextInput
              placeholder="Entrer la description"
              value={description}
              onChangeText={setDescription}
              style={styles.textInput}
            />
            {descriptionError ? (
              <Text style={styles.errorText}>{descriptionError}</Text>
            ) : null}
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleSubmit}>
            <View style={styles.button}>
              {isLoading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text style={styles.buttonText}>Modifier</Text>
              )}
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  headerText: {
    marginLeft: "20%",
    fontSize: 15,
    fontWeight: "bold",
  },
  scrollView: {
    backgroundColor: "#ffffff",
  },
  formContainer: {
    marginTop: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  textInputContainer: {
    backgroundColor: "#f8f8ff",
    padding: 5,
    marginBottom: 20,
    borderRadius: 10,
    width: Dimensions.get("window").width * 0.75,
  },
  textInput: {
    paddingVertical: 5,
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 100,
  },
  button: {
    backgroundColor: "#00ced1",
    borderRadius: 20,
    padding: 10,
    width: Dimensions.get("window").width * 0.5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
  },
  messageContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    borderRadius: 10,
    padding: 20,
    width: Dimensions.get("window").width * 0.95,
    alignSelf: "center",
  },
  success: {
    backgroundColor: "#d4edda",
    borderColor: "#c3e6cb",
    color: "#155724",
  },
  error: {
    backgroundColor: "#f8d7da",
    borderColor: "#f5c6cb",
    color: "#721c24",
  },
  messageText: {
    color: "white",
  },
  dropdown: {
    height: 50,
    backgroundColor: "#f8f8ff",
    borderRadius: 12,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
});

export default EditCourseForm;
