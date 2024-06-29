import { Ionicons } from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/native";
import {
  Dimensions,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const Header = ({ titre }) => {
  console.log(titre);
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.header1}>
      <TouchableOpacity onPress={handlePress}>
        <Ionicons name="arrow-back" size={24} color="#000000" />
      </TouchableOpacity>
      <Text style={styles.text}>{titre}</Text>
    </View>
  );
};

export default Header;
const windowWidth = Dimensions.get("window").width;
const marginLeft = windowWidth * 0.2;

const styles = StyleSheet.create({
  header1: {
    marginTop: StatusBar.currentHeight,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#dddddd",
  },
  text: {
    marginLeft: marginLeft,
    fontSize: 15,
    fontWeight: "bold",
  },
});
