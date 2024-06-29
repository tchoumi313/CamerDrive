import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

const QuestionDetailsStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  titleHeader: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 20,
  },
  listTile: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#3AAF9F",
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  listTileText: {
    fontSize: 16,
    color: "#333",
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 70,
  },
  rowView: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 70,
  },
  textCenter: {
    textAlign: "center",
  },
  text: {
    fontSize: 14,
    color: "#333",
  },
});

export default QuestionDetailsStyle;
