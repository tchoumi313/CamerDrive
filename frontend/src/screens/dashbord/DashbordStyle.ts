import { Dimensions, StatusBar, StyleSheet } from "react-native";
const { width, height } = Dimensions.get("window");

const DashbordStyle = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
  header: {
    marginTop: StatusBar.currentHeight,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
  navigationHeader: {
    backgroundColor: "#003f5c",
    //alignItems: "center",
    paddingVertical: 60,
    width: "auto",
  },
  userInfoContainer: {
    flexDirection: "row",
  },
  userPhoto: {
    width: 80,
    height: 80,
    borderRadius: 50,
    marginLeft: 30,
    marginRight: 20, // Marge à droite de l'image pour séparer l'image du nom
  },
  fullImageContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: width,
    height: height / 2,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  fullImage: {
    width: width,
    height: height / 2,
  },
  userName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  userRole: {
    fontSize: 10,
    color: "white",
  },

  menuItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuItemContainer: {
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
    width: "95%",
    marginBottom: 30,
  },
  menuItemIconContainer: {
    padding: 10,
    marginLeft: 20,
  },
  menuItemText: {
    // color: "#003f5c",
    fontSize: 15,
    marginLeft: 10,
  },
  selectedMenuItem: {
    //backgroundColor: "#fb5b5a",
  },
  closeBtn: {
    width: "50%",
    padding: 10,
    alignItems: "center",
    backgroundColor: "#fb5b5a",
    borderRadius: 50,
  },

  line: {
    borderBottomWidth: 3,
    borderBottomColor: "white",
    width: 150,
    marginTop: 50,
  },
  textLeft: {
    position: "absolute",
    left: 0,
    top: 60,
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
  textRight: {
    position: "absolute",
    right: 0,
    top: 100,
    color: "white",
  },
  bottomNavigation: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  alertTitle: {
    fontSize: 18, // Adjust title font size
    fontWeight: "bold", // Bold text
    marginBottom: 10, // Margin below title
  },
  alertMessage: {
    fontSize: 16, // Adjust message font size
    marginBottom: 20, // Margin below message
  },
  alertContainer: {
    backgroundColor: "lightgrey",
    borderRadius: 10,
  },
  navigationContainer: {},
  initialLetterContainer: {
    width: 80,
    height: 80,
    borderRadius: 50,
    marginLeft: 30,
    marginRight: 20,
    backgroundColor: "green",
    alignItems: "center",
    justifyContent: "center",
  },

  initialLetter: {
    fontSize: 40, // Taille de la lettre
    color: "white", // Couleur de la lettre
  },
});

export default DashbordStyle;
