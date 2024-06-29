import Header from "@/components/Header";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
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

const AddUserForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [nameError, setNameError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const navigation = useNavigation();
  const [dropdownOptions, setDropdownOptions] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null);
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const handlePress = () => {
    navigation.goBack();
  };

  const handleSubmit = async () => {
    let hasError = false;

    if (!name) {
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
      setPasswordError("Entrer votre nom d'utilisateur.");
      hasError = true;
    } else if (password.length < 8 || !/\d/.test(password)) {
      setPasswordError(
        "Le mot de passe doit comporter au moins 8 caractères, inclure au moins une lettre majuscule, un chiffre et un caractère spécial."
      );
      hasError = true;
    } else {
      setPasswordError("");
    }
    if (!confirmPassword) {
      setConfirmPasswordError("le mot de passe ne correspond pas");
      hasError = true;
    } else {
      setConfirmPasswordError("");
    }

    if (hasError) return;

    try {
      setLoading(true);
      const userApi = new UserControllerApi(
        environment,
        environment.basePath,
        axiosInstance
      );
      await userApi.createUser({
        username: name,
        email: email,
        password: password,
        dateNaiss: dateOfBirth,
      });
      setSuccess(true);
      setLoading(false);
      setNameError("");
      setEmailError("");
      setPasswordError("");
      setConfirmPasswordError("");
      navigation.goBack();
    } catch (error) {
      console.log(error);
      setLoading(false);
      setSuccess(false);
      setError(error.message);
    }
  };

  const handleDateChange = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || dateOfBirth;
    setShowDatePicker(false);
    setDateOfBirth(currentDate);
  };

  return (
    <>
      <Header titre={"Ajouter un Utilisateur"} />
      <ScrollView style={styles.scrollView}>
        <View style={styles.formContainer}>
          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.textInput}
              value={name}
              placeholder="Entrer votre nom d'utilisateur ici ..."
              onChangeText={(text) => setName(text)}
            />
            {nameError ? (
              <Text style={styles.errorText}>{nameError}</Text>
            ) : null}
          </View>
          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.textInput}
              value={email}
              placeholder="Entrer votre adresse email ici ..."
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
              placeholder="Entrer votre mot de passe ici ..."
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
              placeholder="Confirmer votre mot de passe ici ..."
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
                  {dateOfBirth
                    ? dateOfBirth.toDateString()
                    : "Selectionner une date"}
                </Text>
              </Pressable>
              {showDatePicker && (
                <DateTimePicker
                  value={dateOfBirth || new Date()}
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
              {loading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text style={styles.buttonText}>Ajouter</Text>
              )}
            </View>
          </TouchableOpacity>
        </View>
        {success && (
          <View style={[styles.messageContainer, styles.success]}>
            <Text style={styles.messageText}>
              Utilisateur Ajoute avec success
            </Text>
          </View>
        )}
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
    padding: 10,
    width: Dimensions.get("window").width * 0.75,
  },
  success: {
    backgroundColor: "green",
  },
  error: {
    backgroundColor: "red",
  },
  messageText: {
    color: "white",
  },
  dropdown: {
    margin: 16,
    //height: 50,
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
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

export default AddUserForm;
