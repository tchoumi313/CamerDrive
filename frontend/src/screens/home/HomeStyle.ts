import { StyleSheet } from "react-native";

const Homestyles = StyleSheet.create({
  fstContainer: {
    alignSelf: "center",
    justifyContent: "center",
    marginBottom: 150,
    paddingTop: 10,
  },

  textContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  username: {
    fontSize: 16,
  },
  logo: {
    //borderWidth: 2,
    //borderColor: "black",
    width: 50,
    height: 50,
    borderRadius: 50,
    //marginLeft: 10,
    marginRight: 20,
  },
  serviceContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
});
export default Homestyles;
