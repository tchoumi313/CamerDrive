import { useAuth } from "@/context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  BackHandler,
  Dimensions,
  Image,
  Modal,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons"; // Assurez-vous d'avoir installé react-native-vector-icons

import {
  QuizControllerApi,
  ScoreUserQuizControllerApi,
  UserControllerApi,
} from "generated/index";
import axiosInstance from "../../environments/axiosInstance";
import environment from "../../environments/environment";

const QuizDetails = ({ route }) => {
  const { id } = route.params;
  const navigation = useNavigation();

  const [quizDetails, setQuizDetails] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [buttonText, setButtonText] = useState("Valider");
  const [optionsDisabled, setOptionsDisabled] = useState(false);
  const [emoji, setEmoji] = useState("");
  const windowWidth = Dimensions.get("window").width;
  const marginLeft = windowWidth * 0.2;
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(1);
  const { authState } = useAuth();

  const userId = authState?.user?.id;

  useEffect(() => {
    const fetchQuizDetails = async () => {
      try {
        const quizApi = new QuizControllerApi(
          environment,
          environment.basePath,
          axiosInstance
        );
        const response = await quizApi.showQuiz(id);
        setQuizDetails(response.data);
        setStartTime(new Date());
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizDetails();
  }, [id]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userApi = new UserControllerApi(
          environment,
          environment.basePath,
          axiosInstance
        );

        const response = await userApi.showUser(userId);
        setUserDetails(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [userId]);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        setModalVisible(true);
        return true;
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () => {
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
      };
    }, [])
  );

  const formatDuration = (duration) => {
    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor((duration % 3600) / 60);
    const seconds = duration % 60;
    return `${hours}:${minutes}:${seconds}`;
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizDetails.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setCurrentQuestionNumber(currentQuestionNumber + 1);
      setSelectedOption(null);
      setAnswered(false);
      setErrorMessage("");
      setButtonText("Valider");
      setOptionsDisabled(false);
      setEmoji("");
    } else {
      const endTime = new Date();
      const duration = Math.floor((endTime - startTime) / 1000);
      const formattedDuration = formatDuration(duration);

      createUserScoreQuiz(userDetails, quizDetails!, score);

      navigation.navigate("ScorePage", {
        score,
        totalQuestions: quizDetails.questions.length,
        duration: formattedDuration,
      });
    }
  };

  const handleOptionPress = (option) => {
    if (answered) return;

    setSelectedOption(option);
    setErrorMessage("");
  };

  const handleValidate = () => {
    if (!selectedOption) {
      setErrorMessage("Vous devez sélectionner une réponse.");
      return;
    }

    setAnswered(true);
    setOptionsDisabled(true);
    setButtonText("Continuer");

    if (selectedOption === currentQuestion.correctOption) {
      setScore(score + 1);
      setEmoji("😊");
    } else {
      setEmoji("😢");
    }
  };

  const handleContinue = () => {
    handleNextQuestion();
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const handlePress = () => {
    setModalVisible(true);
    return true;
  };

  const currentQuestion = quizDetails.questions[currentQuestionIndex];
  const options = [
    currentQuestion.option1,
    currentQuestion.option2,
    currentQuestion.option3,
    currentQuestion.option4,
  ].filter((option) => option);

  console.log(currentQuestion);

  return (
    <>
      <View style={styles.header1}>
        <TouchableOpacity onPress={handlePress}>
          <Ionicons name="arrow-back" size={24} color="#000000" />
        </TouchableOpacity>

        <Text
          style={{ marginLeft: marginLeft, fontSize: 15, fontWeight: "bold" }}
        >
          Question {currentQuestionNumber}/{quizDetails.questions.length}
        </Text>
      </View>

      <ScrollView>
        <View style={styles.container}>
          <View style={styles.questionContainer}>
            {currentQuestion.image && (
              <Image
                source={{
                  uri: `${environment.basePath}/files/${currentQuestion.image.id}`,
                }}
                style={styles.questionImage}
              />
            )}
            <View style={styles.detailsContainer}>
              <Text style={styles.questionText}>
                {currentQuestionIndex + 1}. {currentQuestion.libelle}
              </Text>
              <View style={styles.optionsContainer}>
                {options.map((option, index) => (
                  <Pressable
                    key={index}
                    onPress={() => handleOptionPress(option)}
                    style={[
                      styles.optionItem,
                      selectedOption === option ? styles.selectedOption : null,
                    ]}
                    disabled={optionsDisabled}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        answered &&
                        selectedOption === option &&
                        option === currentQuestion.correctOption
                          ? styles.correctText
                          : answered &&
                            selectedOption === option &&
                            option !== currentQuestion.correctOption
                          ? styles.incorrectText
                          : answered && option === currentQuestion.correctOption
                          ? styles.correctText
                          : null,
                      ]}
                    >
                      {String.fromCharCode(97 + index)}) {option}
                    </Text>
                    <View style={styles.radioButton}>
                      <View
                        style={[
                          styles.radioCircle,
                          selectedOption === option
                            ? answered
                              ? option === currentQuestion.correctOption
                                ? styles.radioCorrect
                                : styles.radioIncorrect
                              : styles.radioSelected
                            : null,
                        ]}
                      >
                        {answered && selectedOption === option && (
                          <Ionicons
                            name={
                              option === currentQuestion.correctOption
                                ? "checkmark"
                                : "close"
                            }
                            size={16}
                            color="#fff"
                          />
                        )}
                      </View>
                    </View>
                  </Pressable>
                ))}
              </View>
            </View>
          </View>
          {errorMessage ? (
            <Text style={styles.errorMessage}>{errorMessage}</Text>
          ) : null}
          <View style={styles.buttonsContainer}>
            <Pressable
              style={[
                styles.button,
                buttonText === "Valider"
                  ? styles.validateButton
                  : styles.continueButton,
              ]}
              onPress={
                buttonText === "Valider" ? handleValidate : handleContinue
              }
            >
              <Text style={styles.buttonText}>
                {buttonText}{" "}
                {buttonText === "Continuer" && (
                  <Icon name="arrow-forward" size={16} color="#fff" />
                )}
              </Text>
            </Pressable>
          </View>
          {answered && <Text style={styles.emojiText}>{emoji}</Text>}

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Icon name="arrow-back" size={30} color="#000" />
                <Text style={styles.modalText}>
                  Voulez-vous revenir au menu?
                </Text>
                <Text style={styles.modalSubText}>
                  La progression de la série sera perdue.
                </Text>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.modalButtonText}>Continuer la série</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalButton, styles.modalButtonDanger]}
                  onPress={() => {
                    setModalVisible(false);
                    navigation.navigate("Home");
                  }}
                >
                  <Text style={styles.modalButtonText}>Retourner au menu</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </ScrollView>
    </>
  );

  async function createUserScoreQuiz(user: any, quiz: any, note: any) {
    try {
      const quizScoreApi = new ScoreUserQuizControllerApi(
        environment,
        environment.basePath,
        axiosInstance
      );
      const response = await quizScoreApi.createUserQuiz({
        quiz,
        user,
        note,
      });
      console.log("Score submitted successfully:", response.data);
    } catch (error) {
      console.error("Failed to submit score:", error);
    }
  }
};

export default QuizDetails;

const styles = StyleSheet.create({
  header1: {
    marginTop: StatusBar.currentHeight,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    //backgroundColor: "#f0f8ff",
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#f0f8ff",
    justifyContent: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  questionContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 15,

    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginTop: Dimensions.get("window").height * 0.1,
  },
  detailsContainer: {
    padding: 20,
  },
  questionText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 20,
    textAlign: "center",
  },
  questionImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    //borderRadius: 10,
    marginBottom: 20,
  },
  optionsContainer: {
    marginTop: 20,
  },
  optionItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#f8f8ff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  selectedOption: {
    backgroundColor: "#d3d3d3",
  },
  optionText: {
    flex: 1,
    fontSize: 16,
  },
  correctText: {
    color: "green",
  },
  incorrectText: {
    color: "red",
  },
  radioButton: {
    marginLeft: 10,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  radioSelected: {
    backgroundColor: "#000",
  },
  radioCorrect: {
    backgroundColor: "green",
  },
  radioIncorrect: {
    backgroundColor: "red",
  },
  errorMessage: {
    color: "red",
    textAlign: "center",
    marginTop: 10,
  },
  buttonsContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  button: {
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
  },
  validateButton: {
    backgroundColor: "#007bff",
    marginBottom: 50,
  },
  continueButton: {
    backgroundColor: "#28a745",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  emojiText: {
    fontSize: 50,
    textAlign: "center",
    marginTop: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalSubText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 20,
  },
  modalButton: {
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
    marginBottom: 10,
    backgroundColor: "#007bff",
  },
  modalButtonDanger: {
    backgroundColor: "#dc3545",
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});
