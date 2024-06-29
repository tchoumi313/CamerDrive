import Header from "@/components/Header";
import { AntDesign } from "@expo/vector-icons";
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
import { MultiSelect } from "react-native-element-dropdown";
import {
  QuestionControllerApi,
  QuizControllerApi,
} from "../../../../../generated/index";
import axiosInstance from "../../../../environments/axiosInstance";
import environment from "../../../../environments/environment";

type EditQuizFormProps = {
  id: number;
};

const EditQuizForm = ({ id }: EditQuizFormProps) => {
  const [title, setTitle] = useState("");
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [allQuestions, setAllQuestions] = useState([]);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const quizApi = new QuizControllerApi(
          environment,
          environment.basePath,
          axiosInstance
        );
        const response = await quizApi.showQuiz(id);
        const quiz = response.data;
        setTitle(quiz.titre);
        setSelectedQuestions(quiz.questions.map((q) => q.id));
      } catch (error) {
        console.log(error);
        setMessage("Erreur de recuperation des donnees.");
        setMessageType("error");
      } finally {
        setLoading(false);
      }
    };

    const fetchQuestions = async () => {
      try {
        const questionApi = new QuestionControllerApi(
          environment,
          environment.basePath,
          axiosInstance
        );
        const response = await questionApi.indexQuestions();
        setAllQuestions(
          response.data.map((question) => ({
            label: question.libelle,
            value: question.id,
          }))
        );
      } catch (error) {
        console.log(error);
      }
    };

    fetchQuiz();
    fetchQuestions();
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

  const getQuestionById = async (id) => {
    try {
      const questionApi = new QuestionControllerApi(
        environment,
        environment.basePath,
        axiosInstance
      );
      const response = await questionApi.showQuestion(id);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async () => {
    if (!title) {
      setMessage("Le champ 'title' est obligatoire.");
      setMessageType("error");
      return;
    }

    try {
      const quizApi = new QuizControllerApi(
        environment,
        environment.basePath,
        axiosInstance
      );

      const updatedQuestions = [];
      for (let i = 0; i < selectedQuestions.length; i++) {
        const id = selectedQuestions[i];
        const questionApi = new QuestionControllerApi(
          environment,
          environment.basePath,
          axiosInstance
        );
        const question = await questionApi.showQuestion(id);
        updatedQuestions.push(question.data);
      }

      await quizApi.updateQuiz(
        {
          titre: title,
          questions: updatedQuestions,
        },
        id
      );

      console.log("updated question", updatedQuestions);
      console.log(title);
      console.log(selectedQuestions);
      setMessage("Quiz modifie avec success.");
      setMessageType("success");
      setTimeout(() => {
        navigation.goBack();
      }, 2000);
    } catch (error) {
      console.log(selectedQuestions);
      console.log(error);
      setMessage("Erreure de modification: " + error.message);
      setMessageType("error");
    }
  };

  const handlePress = () => {
    navigation.goBack();
  };

  return (
    <>
      <Header titre={"Modifier un Quiz"} />
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
              placeholder="Entrer le titre du quiz"
              value={title}
              onChangeText={setTitle}
              style={styles.textInput}
            />
          </View>
          <View style={styles.textInputContainer}>
            <MultiSelect
              style={styles.multiSelect}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={allQuestions}
              labelField="label"
              valueField="value"
              placeholder="Selectionner questions"
              search
              searchPlaceholder="Search..."
              value={selectedQuestions}
              onChange={(item) => {
                setSelectedQuestions(item);
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
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleSubmit}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Modifier</Text>
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
  multiSelect: {
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
});

export default EditQuizForm;
