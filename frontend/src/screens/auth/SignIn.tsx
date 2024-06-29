import { Ionicons } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { withExpoSnack } from "nativewind";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuth } from "../../context/AuthContext";

const SignIn = () => {
  const navigation = useNavigation<NavigationProp<any>>();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  const { onLogin } = useAuth();

  const handleLogin = async () => {
    setValidationError(null);
    setLoginError(null);

    if (!name) {
      setValidationError("Le nom d'utilisateur est requis.");
      return;
    }
    if (!password) {
      setValidationError("Le mot de passe est requis.");
      return;
    }

    try {
      setIsLoading(true);

      const result = await onLogin!(name, password);
      console.log("Login result:", result);

      if (result && !result.success) {
        setLoginError(result.error);
      } else {
        setLoginError(null);
        // Navigation vers l'écran suivant en cas de succès
        navigation.navigate("HomeScreen" as never);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.header}>
          <Image
            source={require("./../../../assets/auth/loginImg.png")}
            style={styles.headerImage}
          />
          <Text style={styles.headerText}>CamerDrive</Text>
        </View>
        <View style={styles.informationView}>
          {loginError && <Text style={styles.errorText}>{loginError}</Text>}
          <Text style={styles.textInfo}>Nom d'utilisateur:</Text>
          <TextInput
            style={styles.textInput}
            value={name}
            placeholder="Entrer votre nom d'utilisateur..."
            placeholderTextColor="#aaa"
            onChangeText={(text) => setName(text)}
          />
          <Text style={styles.textInfo}>Mot de passe:</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Entrer votre mot de passe..."
              placeholderTextColor="#aaa"
              value={password}
              onChangeText={(text) => setPassword(text)}
              keyboardType="default"
              textContentType="password"
              secureTextEntry={!showPassword}
              maxLength={20}
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Ionicons
                name={showPassword ? "eye-off" : "eye"}
                size={24}
                color="#aaa"
              />
            </TouchableOpacity>
          </View>
          {validationError && (
            <Text style={styles.errorText}>{validationError}</Text>
          )}
          <Pressable style={styles.pressable} onPress={handleLogin}>
            {isLoading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text style={styles.pressableText}>Se connecter</Text>
            )}
          </Pressable>
          <TouchableOpacity
            style={styles.signUpLink}
            onPress={() => {
              navigation.navigate("SignUp", { screen: "SignUp" });
            }}
          >
            <Text style={{ color: "#ffffff", }}>
              Pas de compte?
            </Text>
            <Text style={styles.textSignUp}>
              {" S'enregistrer"}
            </Text>
          </TouchableOpacity>
          <Text style={styles.orText}>Ou, se connecter avec ...</Text>
          <View style={styles.imageContainer}>
          <TouchableOpacity onPress={() => { }}>
            <Image
              source={require("./../../../assets/auth/icons8-google-logo-96.png")}
              style={styles.image}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { }}>
            <Image
              source={require("./../../../assets/auth/icons8-facebook-logo-96.png")}
              style={styles.image}
            />
          </TouchableOpacity>
          {/* <TouchableOpacity onPress={() => { }}>
            <Image
              source={require("./../../../assets/auth/icons8-linkedin-logo-96.png")}
              style={styles.image}
            />
          </TouchableOpacity> */}
        </View>
        </View>
        
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1C202F",
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  headerImage: {
    width: 200,
    height: 100,
  },
  headerText: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 20,
  },
  informationView: {
    width: "100%",
    backgroundColor: "#2A2E43",
    borderRadius: 20,
    padding: 20,
    marginBottom: 30,
  },
  textInfo: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
    marginBottom: 10,
  },
  textInput: {
    height: 50,
    borderColor: "#3AAF9F",
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 15,
    color: "#fff",
    backgroundColor: "#1C202F",
    marginBottom: 20,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#3AAF9F",
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: "#1C202F",
    marginBottom: 20,
  },
  passwordInput: {
    flex: 1,
    color: "#fff",
    paddingHorizontal: 15,
    height: 50,
  },
  eyeIcon: {
    padding: 10,
  },
  pressable: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    borderRadius: 10,
    backgroundColor: "#3AAF9F",
    marginBottom: 20,
  },
  pressableText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  signUpLink: {
    
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  textSignUp: {
    textAlign: "center",
    color: "#3AAF9F",
    fontWeight: "bold",
    fontSize: 15,
  },
  orText: {
    textAlign: "center",
    color: "#aaa",
    fontSize: 16,
    marginBottom: 20,
  },
  imageContainer: {
    backgroundColor:"#2A2E43",
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
  },
  image: {
    borderRadius: 20,
    backgroundColor:"#2A2E43",
    marginHorizontal: 10,
    width: 40,
    height: 40,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
    fontSize: 14,
  },
});

export default withExpoSnack(SignIn);


