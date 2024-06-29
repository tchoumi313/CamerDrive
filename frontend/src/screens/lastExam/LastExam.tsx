import React, { useState } from "react";
import { Dimensions, SafeAreaView, Text, View } from "react-native";

import { styled } from "nativewind";
import { RadioButton } from "react-native-paper";
import CorrigeLastExam from "./CorrigeLastExam";
import LastSubject from "./LastSubject";
import { optionValues } from "./data";

const LastExam = () => {
  const [option, setOption] = useState(optionValues.sujet);
  const StyledSafeAreaView = styled(SafeAreaView);
  return (
    // <ColorScheme />
    <StyledSafeAreaView
      style={{ height: Dimensions.get("window").height * 0.8 }}
      className="flex-1 dark:bg-slate-700 overflow-hidden"
    >
      <View
        className="dark:text-white my-5 items-center"
      >
        <Text className="border-b-2 border-green-800 p-1 font-semibold text-xl dark:text-cyan-50">
          Cameroun
        </Text>
      </View>
      <View className="flex-row items-center justify-around shadow-md px-8">
        <View className="flex-row items-center">
          <RadioButton.Android
            value={optionValues.sujet}
            status={option === optionValues.sujet ? "checked" : "unchecked"}
            onPress={() => {
              setOption(optionValues.sujet);
            }}
            color="#007BFF"
          />
          <Text className="text-base dark:text-cyan-50">Sujets</Text>
        </View>
        <View className="flex-row items-center">
          <RadioButton.Android
            value={optionValues.corrige}
            status={option === optionValues.corrige ? "checked" : "unchecked"}
            onPress={() => {
              setOption(optionValues.corrige);
            }}
            color="#007BFF"
          />
          <Text className="text-base dark:text-cyan-50">Corriges</Text>
        </View>
      </View>
      {/* <View style={{ flexDirection: "row", flexWrap: "wrap", margin: -2 }}> */}
      {option === optionValues.sujet ? <LastSubject /> : <CorrigeLastExam />}
      {/* </View> */}
    </StyledSafeAreaView>
  );
};

export default LastExam;
