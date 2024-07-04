import { withExpoSnack } from "nativewind";
import React from "react";

import { useColorScheme } from "nativewind";
import { Dimensions, Pressable, Text } from "react-native";

const CorrigeLastExam = () => {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  return (
    <Pressable
      onPress={() => {}}
      style={{ height: Dimensions.get("window").height * 0.8 }}
      className="z-50 flex-1 items-center justify-center dark:bg-slate-800"
    >
      <Text
        selectable={false}
        className="dark:text-white border-[1px] border-green-800"
      >
        {`Comming soon! ${colorScheme === "dark" ? "🌙" : "🌞"}`}
      </Text>
    </Pressable>
  );
};

// This demo is using a external compiler that will only work in Expo Snacks.
// You may see flashes of unstyled content, this will not occur under normal use!
// Please see the documentation to setup your application
export default withExpoSnack(CorrigeLastExam);
