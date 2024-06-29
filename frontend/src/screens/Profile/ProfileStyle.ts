import { Dimensions, StatusBar, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    padding: 40,
    backgroundColor: "#f5f5f5",
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  cameraIcon: {
    position: "absolute",
    bottom: 0,
    right: 10,
    backgroundColor: "blue",
    borderRadius: 15,
    padding: 5,
  },
  infoContainer: {
    marginBottom: 20,
    marginTop: 30,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 45,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  inputLabel: {
    alignSelf: "flex-start",
    marginBottom: 5,
    fontWeight: "bold",
  },
  value: {
    fontSize: 16,
    color: "#666",
  },
  buttonContainer: {
    //flex:1,
   flexDirection: "column",
   justifyContent:"space-between"
    //justifyContent: "space-between",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  input: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: "100%",
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    height: "50%",
  },
  fullScreenImageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  fullScreenImage: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height * 0.5,
  },
  messageText:{
    color:"white",
  },
  errorMessage: {
    color: "red",
    fontSize: 12,
    marginLeft: 10,
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
  initialLetter: {
    fontSize: 40, // Taille de la lettre
    color: "white", // Couleur de la lettre
  },
  initialLetterContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginLeft: 30,
    marginRight: 20,
    backgroundColor: "green",
    alignItems: "center",
    justifyContent: "center",
  },
  modalButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 5,
  },
  modalButtonText: {
    marginLeft: 10,
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  PmodalView: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
  },
  imagePreviewContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  imagePreview: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },

  cancelButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 5,
    alignItems: 'center',
  },
  confirmButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginLeft: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  image: {
    width: 130,
    height: 130,
    borderRadius:80,
  },
});

export default styles;
