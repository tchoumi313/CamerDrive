import { Dimensions, StatusBar, StyleSheet } from "react-native";

const CoursesStyle = StyleSheet.create({
  fstContainer:{
    backgroundColor:"#f0f8ff",
    height:Dimensions.get("window").height+20,
    //marginBottom:50
  },
  container: {
    backgroundColor: "white",
    marginBottom: 15,
    marginLeft: 20,
    marginRight: 20,
    marginTop: StatusBar.currentHeight! - 10,
    borderRadius: 20,
  },
  image: {
    height: 300,
    width: Dimensions.get("window").width - 20,
    borderRadius: 20,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    overflow: "hidden",
    //marginRight: 10,
    //marginTop: 5,
  },
  courseImage: {
    width: 110,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
  },
  name: {
    fontWeight: "bold",
  },
  title: {
    width: Dimensions.get("window").width * 0.5,
    fontWeight: "bold",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop:Dimensions.get("window").height*0.4
  },
});
export default CoursesStyle;