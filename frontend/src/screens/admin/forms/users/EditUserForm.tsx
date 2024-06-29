import Header from "@/components/Header";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { UserControllerApi } from "../../../../../generated/index";
import axiosInstance from "../../../../environments/axiosInstance";
import environment from "../../../../environments/environment";

type EditCourseFormProps = {
  id: number;
};

const EditUserForm = ({ id }: EditCourseFormProps) => {
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [dateNaiss, setDateNaiss] = useState<Date | null>(null);
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [emailError, setEmailError] = useState("");
  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userApi = new UserControllerApi(
          environment,
          environment.basePath,
          axiosInstance
        );
        const response = await userApi.showUser(id);
        const user = response.data;
        console.log(user.dateNaiss);
        setUsername(user.username);
        setEmail(user.email);
        setDateNaiss(user.dateNaiss);
        setPassword(user.password);
      } catch (error) {
        console.log(error);
        setMessage(
          "Echec lors de la recuperation des donnees de l'utilisateur."
        );
        setMessageType("error");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  const handleSubmit = async () => {
    let hasError = false;

    if (!username) {
      setNameError("Le champ name est obligatoire.");
      hasError = true;
    } else {
      setNameError("");
    }

    if (!email) {
      setEmailError("Le champ email est obligatoire.");
      hasError = true;
    } else if (!email.endsWith("@gmail.com")) {
      setEmailError("Entrer une adresse email valide");
      hasError = true;
    } else {
      setEmailError("");
    }

    if (!password) {
      setPasswordError("Entrer votre mot de passe.");
      hasError = true;
    } else if (password.length < 8 || !/\d/.test(password)) {
      setPasswordError(
        "Le mot de passe doit comporter au moins 8 caractères, inclure au moins une lettre majuscule, un chiffre et un caractère spécial.."
      );
      hasError = true;
    } else {
      setPasswordError("");
    }
    if (!confirmPassword) {
      setConfirmPasswordError("Les mots de passe ne correspondent pas");
      hasError = true;
    } else {
      setConfirmPasswordError("");
    }

    if (hasError) return;
    try {
      setIsLoading(true);
      const userApi = new UserControllerApi(
        environment,
        environment.basePath,
        axiosInstance
      );
      await userApi.updateUser(
        {
          username,
          email,
          dateNaiss,
          password,
        },
        id
      );
      setIsLoading(false);
      setMessage("Utilisateur modifie avec success.");
      setMessageType("success");
      setNameError("");
      setEmailError("");
      setPasswordError("");
      setConfirmPasswordError("");
      setTimeout(() => {
        navigation.goBack();
      }, 2000);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setMessage(
        "Echec lors de la modification de la question: " + error.message
      );
      setMessageType("error");
    }
  };

  const handleDateChange = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || dateNaiss;
    setShowDatePicker(false);
    setDateNaiss(currentDate);
  };

  const handlePress = () => {
    navigation.goBack();
  };

  return (
    <>
      <Header titre={"Modifier un Utilisateur"} />
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
              placeholder="Enter le nom d'utilisateur ici"
              value={username}
              onChangeText={setUsername}
              style={styles.textInput}
            />
            {nameError ? (
              <Text style={styles.errorText}>{nameError}</Text>
            ) : null}
          </View>
          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.textInput}
              value={email}
              placeholder="Entrer l'adresse Email ici..."
              onChangeText={(text) => setEmail(text)}
            />
            {emailError ? (
              <Text style={styles.errorText}>{emailError}</Text>
            ) : null}
          </View>
          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.textInput}
              value={password}
              placeholder="Entrer le mot de passe ici ..."
              keyboardType="default"
              textContentType="password"
              secureTextEntry={true}
              onChangeText={(text) => setPassword(text)}
              maxLength={20}
            />
            {passwordError ? (
              <Text style={styles.errorText}>{passwordError}</Text>
            ) : null}
          </View>
          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Confirmer le mot de passe ici ..."
              keyboardType="default"
              textContentType="password"
              secureTextEntry={true}
              value={confirmPassword}
              onChangeText={(text) => setConfirmPassword(text)}
              maxLength={20}
            />
            {confirmPasswordError ? (
              <Text style={styles.errorText}>{confirmPasswordError}</Text>
            ) : null}
          </View>
          <View style={styles.textInputContainer}>
            <View>
              <Pressable onPress={() => setShowDatePicker(true)}>
                <Text style={styles.textInput}>
                  {dateNaiss ? formatDate(dateNaiss) : "Selectionner une date"}
                </Text>
              </Pressable>

              {showDatePicker && (
                <DateTimePicker
                  value={dateNaiss || new Date()}
                  mode="date"
                  display="default"
                  onChange={handleDateChange}
                />
              )}
            </View>
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

export default EditUserForm;
