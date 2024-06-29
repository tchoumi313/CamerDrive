import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const SelectImage: React.FC<{ onImagePicked: (uri: string) => void }> = ({
  onImagePicked,
}) => {
  const [imageUri, setImageUri] = useState<string | null>(null);

  const handleSelectImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImageUri(result.assets[0].uri);
      onImagePicked(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      {imageUri ? (
        <>
          <Image source={{ uri: imageUri }} style={styles.image} />
          <TouchableOpacity
            style={styles.changeButton}
            onPress={handleSelectImage}
          >
            <Text style={styles.buttonText}>Changer l'image</Text>
          </TouchableOpacity>
        </>
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleSelectImage}>
          <Text style={styles.buttonText}>Choisir une Image</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    //marginVertical: 20,
  },
  button: {
    padding: 10,
    backgroundColor: "#3AAF9F",
    borderRadius: 5,
  },
  changeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#ff6347",
    borderRadius: 5,
    marginBottom: 15,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  image: {
    width: 250,
    height: 250,
    borderRadius: 10,
  },
});

export default SelectImage;
