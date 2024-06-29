import { useNavigation } from "@react-navigation/native";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import {
  StatusBar,
  Image,
  Text,
  View,
  useColorScheme,
  ImageBackground,
} from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import dynamicStyles from "./styles";


const Onboarding = (props) => {
  const navigation = useNavigation();
  const appConfig = props.appConfig;
  const appStyles = props.appStyles;
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(appStyles, colorScheme);

  useEffect(() => {
    StatusBar.setBarStyle("light-content");
    StatusBar.setBackgroundColor("rgba(0, 0, 0, 0.5)");
    StatusBar.setTranslucent(true);
  }, []);

  const slides = appConfig.onboardingConfig.onboardingScreens.map(
    (screenSpec, index) => {
      return {
        key: `${index}`,
        text: screenSpec.description,
        title: screenSpec.title,
        image: screenSpec.icon,
      };
    }
  );

  const _renderItem = ({ item, dimensions }) => (
    <ImageBackground style={[styles.container, dimensions]} source={item.image}>
      <View style={styles.secondContainer} className="shadow-2xl">
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.text}>{item.text}</Text>
      </View>
    </ImageBackground>
    // <View style={[styles.container, dimensions]}>
    //   <Image style={styles.image} source={item.image} />
    //   <View style={styles.secondContainer}>
    //     <Text style={styles.title}>{item.title}</Text>
    //     <Text style={styles.text}>{item.text}</Text>
    //   </View>
    // </View>
  );

  const handleDone = () => {
    navigation.navigate("SignIn", { screen: "SignIn" });
  };

  return (
    <AppIntroSlider
      data={slides}
      slides={slides}
      renderItem={_renderItem}
      onDone={handleDone}
      onSkip={handleDone}
      showSkipButton={true}
      showDoneButton={true}
      showNextButton={true}
    />
  );
};

Onboarding.propTypes = {
  appStyles: PropTypes.object,
  appConfig: PropTypes.object,
};

export default Onboarding;
