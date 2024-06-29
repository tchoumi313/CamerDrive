import { Dimensions, StatusBar, StyleSheet } from "react-native";
const { width, height } = Dimensions.get("window");

const AdminDashbordStyle = StyleSheet.create({
  header1: {
    marginTop: StatusBar.currentHeight,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#1C202F",
    borderBottomWidth: 1,
    borderBottomColor: "#3AAF9F",
    justifyContent: "space-between",
  },
  container: {
    flex: 1,
    backgroundColor: "#f0f2f5",
    padding: 20,
  },
  textBelowLine: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1C202F",
    marginBottom: 20,
    textAlign: "center",
    alignSelf: "center",
    marginTop: 5,
    padding: 10,
  },
  tasksContainer: {
    marginTop: 5,
  },
  tasksRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 5,
    marginBottom: 5,
  },
  tasksIconContainer: {
    alignItems: "center",
    width: "45%",
    backgroundColor: "#3AAF9F",
    borderRadius: 15,
    padding: 20,
    marginBottom: 48,
    height: 150,
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  tasksIcon: {
    alignItems: "center",
  },
  tasksText: {
    textAlign: "center",
    color: "white",
    fontSize: 18,
    marginTop: 15,
    fontWeight: "600",
  },
  alertContainer: {
    backgroundColor: "lightgrey",
    borderRadius: 10,
  },
});

export default AdminDashbordStyle;
