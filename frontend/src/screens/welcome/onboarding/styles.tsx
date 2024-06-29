import {
  Dimensions,
  ImageBackground,
  StatusBar,
  StyleSheet,
} from "react-native";

const dynamicStyles = (appStyles, colorScheme) => {
  return StyleSheet.create({
    title: {
      fontSize: 25,
      fontWeight: "bold",
      textAlign: "center",
      paddingBottom: 25,
      color: "white",
    },
    text: {
      fontSize: 18,
      textAlign: "center",
      color: "white",
      paddingLeft: 10,
      paddingRight: 10,
    },
    image: {
      width: "100%",
      height: Dimensions.get("window").height * 0.5,
      marginTop: 0,
      marginBottom: 60,
      objectFit: "cover",
      borderBottomLeftRadius: 50,
      borderBottomRightRadius: 50,
    },
    container: {
      paddingTop: StatusBar.currentHeight,
      overflow: "hidden",
      flex: 1,
      justifyContent: "flex-end",
      backgroundColor: appStyles.colorSet[colorScheme].mainThemeForegroundColor,
    },
    secondContainer: {
      backgroundColor: "rgba(17, 34, 51, 0.5)",
      paddingTop: 50,
      paddingBottom: 150,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    button: {
      fontSize: 18,
      color: "black",
      marginTop: 10,
      marginBottom: 100,

      borderWidth: 2,
      borderColor: "green",
    },
  });
};

export default dynamicStyles;
