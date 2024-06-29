import DateTimePicker from "@react-native-community/datetimepicker";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../context/AuthContext";

const SignUp = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null);
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [registerError, setRegisterError] = useState<string | null>(null);
  const { onRegister } = useAuth();

  const [errors, setErrors] = useState<{
    name: string | null;
    email: string | null;
    dateOfBirth: string | null;
    password: string | null;
    confirmPassword: string | null;
  }>({
    name: null,
    email: null,
    dateOfBirth: null,
    password: null,
    confirmPassword: null,
  });

  const navigation = useNavigation<NavigationProp<any>>();

  const handleRegister = async () => {
    try {
      setIsLoading(true);

      // Validation des champs
      const validationErrors: any = {};

      if (!name) {
        validationErrors.name = "Entrer votre nom d'utilisateur.";
      }

      if (!email) {
        validationErrors.email = "Entrer votre adresse email.";
      } else if (!email.endsWith("@gmail.com")) {
        validationErrors.email = "Entrer une adresse email valide.";
      }

      if (!dateOfBirth) {
        validationErrors.dateOfBirth = "Selectionner votre date de naissance.";
      }

      if (!password) {
        validationErrors.password = "Entrer votre mot de passe.";
      } else if (
        password.length < 8 ||
        !/[A-Z]/.test(password) ||
        !/\d/.test(password) ||
        !/[!@#$%^&*]/.test(password)
      ) {
        validationErrors.password =
          "Le mot de passe doit comporter au moins 8 caractères, inclure au moins une lettre majuscule, un chiffre et un caractère spécial.";
      }

      if (!confirmPassword) {
        validationErrors.confirmPassword = "Confimer votre mot de passe.";
      } else if (password !== confirmPassword) {
        validationErrors.confirmPassword =
          "lLes mots de passe ne correspondent pas.";
      }

      setErrors(validationErrors);

      // Vérification des erreurs
      if (Object.keys(validationErrors).length > 0) {
        return;
      }

      const result = await onRegister!(name, email, dateOfBirth!, password);

      if (result && !result.success) {
        setRegisterError(result.error);
      } else {
        setRegisterError(null);

        navigation.navigate("SignIn");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleDateChange = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || dateOfBirth;
    setShowDatePicker(false);
    setDateOfBirth(currentDate);
  };

  const maxDate = new Date(2007, 11, 31);

  return (
    <SafeAreaView style={styles.SafeAreaView}>
      <ScrollView>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Image
            source={require("./../../../assets/auth/createAccount.png")}
            style={styles.Image}
          ></Image>
          <Text style={styles.createAccountText}>Creation du Compte</Text>
        </View>
        <View style={styles.Informationview}>
          <View>
            {registerError && (
              <Text style={styles.errorText}>{registerError}</Text>
            )}
            <Text style={styles.Text}>Nom d'utilisateur:</Text>
            <TextInput
              style={styles.TextInput}
              value={name}
              placeholder="Entrer votre nom d'utilisateur ici ..."
              placeholderTextColor="#fff"
              onChangeText={(text) => setName(text)}
            />
            {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
          </View>
          <View>
            <Text style={styles.Text}>Email:</Text>
            <TextInput
              style={styles.TextInput}
              value={email}
              placeholder="Entrer votre adresse email ici ..."
              placeholderTextColor="#fff"
              onChangeText={(text) => setEmail(text)}
            />
            {errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}
          </View>
          <View>
            <Text style={styles.Text}>Date de naissance:</Text>
            <Pressable onPress={() => setShowDatePicker(true)}>
              <Text style={styles.dateText}>
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
                maximumDate={maxDate}
              />
            )}
            {errors.dateOfBirth && (
              <Text style={styles.errorText}>{errors.dateOfBirth}</Text>
            )}
          </View>

          <View>
            <Text style={styles.Text}>Mot de passe:</Text>
            <TextInput
              style={styles.TextInput}
              value={password}
              placeholder="Entrer votre mot de passe ici ..."
              placeholderTextColor="#fff"
              keyboardType="default"
              textContentType="password"
              secureTextEntry={true}
              onChangeText={(text) => setPassword(text)}
              maxLength={20}
            />
            {errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}
          </View>
          <View>
            <Text style={styles.Text}>Confirmer mot de passe :</Text>
            <TextInput
              style={styles.TextInput}
              placeholder="Confirmer votre mot de passe ici ..."
              placeholderTextColor="#fff"
              keyboardType="default"
              textContentType="password"
              secureTextEntry={true}
              value={confirmPassword}
              onChangeText={(text) => setConfirmPassword(text)}
              maxLength={20}
            />
            {errors.confirmPassword && (
              <Text style={styles.errorText}>{errors.confirmPassword}</Text>
            )}
          </View>
        </View>
        <View style={styles.ViewPressable}>
          <Pressable style={styles.Pressable} onPress={handleRegister}>
            {isLoading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text style={styles.TextRegister}>S'enregistrer</Text>
            )}
          </Pressable>
          <Pressable
            onPress={() => {
              navigation.navigate("SignIn");
            }}
          >
            <Text style={styles.textSignUp}>
              Vous avez deja un compte ? Se connecter
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  SafeAreaView: {
    flex: 1,
    backgroundColor: "#1C202F",
  },
  Pressable: {
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    width: Dimensions.get("window").width * 0.6,
    borderRadius: 20,
    elevation: 3,
    backgroundColor: "#3AAF9F",
    marginBottom: 10,
  },
  ViewPressable: {
    alignItems: "center",
  },
  TextRegister: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  Informationview: {
    width: Dimensions.get("window").width * 0.8,
    marginBottom: 20,
    marginLeft: Dimensions.get("window").width * 0.1,
  },
  Text: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
    marginLeft: 10,
    marginBottom: 10,
  },
  TextInput: {
    borderWidth: 2,
    borderColor: "#3AAF9F",
    borderRadius: 15,
    height: 55,
    alignItems: "center",
    paddingLeft: 15,
    marginBottom: 20,
    color: "white",
  },
  Image: {
    width: 300,
    height: 200,
  },
  createAccountText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 30,
    marginTop: 20,
  },
  dateText: {
    borderWidth: 2,
    borderColor: "#3AAF9F",
    borderRadius: 15,
    height: 55,
    paddingLeft: 15,
    marginBottom: 20,
    color: "#fff",
    textAlignVertical: "center",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginLeft: 10,
  },
  textSignUp: {
    textAlign: "right",
    color: "#fff",
    //fontWeight: "bold",
    //marginLeft: "20",
    fontSize: 15,
    marginBottom: 20,
  },
});

export default SignUp;
