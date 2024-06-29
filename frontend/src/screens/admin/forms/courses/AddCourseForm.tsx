import Header from "@/components/Header";
import Uploadimage from "@/components/UploadImage";
import { useAuth } from "@/context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { CoursRequest } from "../../../../../generated/index";
import environment from "../../../../environments/environment";

const AddCourseForm = () => {
  const authState = useAuth();
  const [formData, setFormData] = useState<CoursRequest>({})
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // 'success' or 'error'
  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [imageError, setImageError] = useState("");
  const [fileUri, setFileUri] = useState<string>();
  const [loading, setLoading] = useState<boolean>();
  // const [file, setFile] = useState<Blob>();

  const navigation = useNavigation();

  const handlePress = () => {
    navigation.goBack(); 
  };

  const handlePick = async (image: ImagePicker.ImagePickerResult) => {
    setImageError("")
    // console.log("Uploaded Image: ", image);
    const fileUri = image.assets![0].uri;
    handleInputChange("fichier", image.assets![0].uri);

    setFileUri(fileUri);
  }

  const handleInputChange = (name: keyof CoursRequest, text: string) => {
    setFormData((prevState) => ({ ...prevState, [name]: text }));
    // console.log("FormData: ", formData);
  };

  const handleSubmit = async () => {
    // console.log(formData);
    // return;
    let hasError = false;

    if (!formData.titre) {
      setTitleError("Le champ 'titre' est obligatoire.");
      hasError = true;
    } else {
      setTitleError("");
    }

    if (!formData.description) {
      setDescriptionError("Entrer une description");
      hasError = true;
    } else {
      setDescriptionError("");
    }

    if (!formData.fichier) {
      setImageError("Veilez selectionner une image");
      hasError = true;
    } else {
      setImageError("");
    }

    if (hasError) return;
    setLoading(true);
    const formValues = new FormData();
    formValues.append("titre", formData.titre!);
    formValues.append("description", formData.description!);

    formValues.append('fichier', {
      uri: formData.fichier,
      type: "image/jpeg",
      name: "image.jpg",
    });

    await axios.post(
      `${environment.basePath}/cours/`,
      formValues,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${authState.authState?.token}`,
        },
      }
    ).then((response) => {
      if (response.status === 201) {
        setMessage("Cours ajouter avec succes !!!");
        setMessageType("success");
        setTitleError("");
        setDescriptionError("");
        setFormData({});
        setTimeout(() => {
          navigation.goBack();
        }, 1000);
      }
    }).catch((err) => {
      console.log(err);
      setMessage("Erreur d'ajout: " + err.message);
      setMessageType("error");
    }).finally(() => {
      setTimeout(() => {
        setMessage("");
        setMessageType("");
        setLoading(false);
      }, 5000)
    });
  };

  return (
    <>
      <Header titre={"Ajouter un Cours"} />
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
          <View style={styles.textInputContainer} className="mt-5" >
            <Uploadimage onImagePicked={handlePick} />
            {imageError ? (
              <Text style={styles.errorText}>{imageError}</Text>
            ) : null}
          </View>
          <View style={styles.textInputContainer}>
            <TextInput
              placeholder="Enter course title"
              value={formData.titre}
              onChangeText={(text) => handleInputChange("titre", text)}
              style={styles.textInput}
            />
            {titleError ? (
              <Text style={styles.errorText}>{titleError}</Text>
            ) : null}
          </View>
          <View style={styles.textInputContainer}>
            <TextInput
              placeholder="Enter a description"
              value={formData.description}
              onChangeText={(text) => handleInputChange("description", text)}
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
              {loading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text style={styles.buttonText}>Add</Text>
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

export default AddCourseForm;
