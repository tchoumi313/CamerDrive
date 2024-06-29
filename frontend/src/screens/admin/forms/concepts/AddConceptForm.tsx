import Header from "@/components/Header";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import {
  ConceptControllerApi,
  CoursControllerApi,
} from "../../../../../generated/index";
import axiosInstance from "../../../../environments/axiosInstance";
import environment from "../../../../environments/environment";

const AddConceptForm = () => {
  const [titre, setTitre] = useState("");
  const [contenu, setContenu] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [courses, setCourses] = useState([]);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [titleError, setTitleError] = useState("");
  const [contentError, setContentError] = useState("");
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [correctOptionError, setCorrectOptionError] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const courseApi = new CoursControllerApi(
          environment,
          environment.basePath,
          axiosInstance
        );
        const response = await courseApi.indexCours();
        const courseList = response.data.map((course) => ({
          label: course.titre,
          value: course,
        }));
        setCourses(courseList);
      } catch (error) {
        console.log(error);
        Alert.alert("Error", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handlePress = () => {
    navigation.goBack();
  };

  const handleSubmit = async () => {
    let hasError = false;

    if (!titre) {
      setTitleError("Le champ 'titre' est obligatoire.");
      hasError = true;
    } else {
      setTitleError("");
    }

    if (!contenu) {
      setContentError("Entrer un contenu.");
      hasError = true;
    } else {
      setContentError("");
    }

    if (!selectedCourse) {
      setCorrectOptionError("Veuillez sélectionner un cours.");
      hasError = true;
    } else {
      setCorrectOptionError("");
    }

    if (hasError) return;

    try {
      setIsLoading(true);
      const conceptApi = new ConceptControllerApi(
        environment,
        environment.basePath,
        axiosInstance
      );
      await conceptApi.create1({
        titre: titre,
        contenu: contenu,
        cours: selectedCourse.value,
      });
      setIsLoading(false);
      setMessage("Concept ajouté avec succès.");
      setMessageType("success");
      setTitleError("");
      setContentError("");
      setTitre("");
      setContenu("");
      setSelectedCourse(null);
      setTimeout(() => {
        navigation.goBack();
      }, 2000);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setMessage("Échec de l'ajout du concept : " + error.message);
      setMessageType("error");
      setTimeout(() => {
        navigation.goBack();
      }, 2000);
    }
  };

  return (
    <>
      <Header titre={"Ajouter un Concpet"} />
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
              placeholder="Entrer le titre du concept"
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
              placeholder="Entrer le contenu"
              value={contenu}
              onChangeText={setContenu}
              style={[styles.textInput, styles.textArea]}
              multiline
              numberOfLines={4}
            />
            {contentError ? (
              <Text style={styles.errorText}>{contentError}</Text>
            ) : null}
          </View>
          <View style={styles.textInputContainer}>
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={courses}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={
                selectedCourse ? selectedCourse.label : "Selectionner un cours"
              }
              searchPlaceholder="Search..."
              value={selectedCourse}
              onChange={(item) => {
                setSelectedCourse(item);
              }}
              renderLeftIcon={() => (
                <AntDesign
                  style={styles.icon}
                  color="black"
                  name="Safety"
                  size={20}
                />
              )}
            />
            {correctOptionError ? (
              <Text style={styles.errorText}>{correctOptionError}</Text>
            ) : null}
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleSubmit}>
            <View style={styles.button}>
              {isLoading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text style={styles.buttonText}>Ajouter</Text>
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
  textArea: {
    height: 100,
  },
  dropdownContainer: {
    width: Dimensions.get("window").width * 0.75,
    marginBottom: 20,
  },
  dropdown: {
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
  placeholderStyle: {
    fontSize: 16,
    //padding: 50,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  dropDownContainerStyle: {
    backgroundColor: "#f8f8ff",
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
    marginTop: StatusBar.currentHeight,
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
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  icon: {
    marginRight: 5,
  },
});

export default AddConceptForm;
