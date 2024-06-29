import { withExpoSnack } from "nativewind";
import React from "react";

import { FlatList, Image, SafeAreaView, Text, View } from "react-native";
import { lastExamData } from "./data";

const LastSubject = () => {
  return (
    <FlatList
      data={lastExamData}
      renderItem={({ item }) => (
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            margin: 10,
            overflow: "hidden",
          }}
          className="shadow-2xl"
        >
          <View>
            <Image
              source={item.image}
              style={{
                height: 175,
                width: "100%",
                aspectRatio: 1,
                resizeMode: "cover",
              }}
            />
          </View>
          <SafeAreaView className="bg-gray-300 w-full p-4">
            <View>
              <Text style={{ fontSize: 16 }} className="dark:text-cyan-50">
                {item.titre}
              </Text>
            </View>
            {/* <Pressable style={{ flexDirection: "row", alignItems: "center" }}>
              <MaterialIcons name="file-download" size={24} color="gray" />
              <Text style={{ fontSize: 16, color: "gray" }}>Telecharger</Text>
            </Pressable> */}
          </SafeAreaView>
        </View>
      )}
      keyExtractor={(item, index) => index.toString()}
      numColumns={2}
      style={{ flex: 1, overflow: "hidden" }}
      className="space-x-5 overflow-hidden"
    />
  );
};

// const LastSubject = () => {
//   return lastExamData.map((item, key) => {
//     return (
//       <View
//         key={key}
//         className="flex-1 flex-row items-center rounded-md overflow-hidden"
//       >
//         <View>
//           <Image
//             source={item.image}
//             className="h-28 w-full aspect-square object-cover"
//           />
//         </View>
//         <SafeAreaView className="bg-gray-200 w-full -mt-4">
//           <View>
//             <Text className="text-base dark:text-cyan-50">{item.titre}</Text>
//           </View>
//           <Pressable className="flex">
//             <Text className="text-base text-gray-500 dark:text-cyan-50">
//               <MaterialIcons name="file-download" />
//               Telecharger
//             </Text>
//           </Pressable>
//         </SafeAreaView>
//       </View>
//     );
//   });
// };

// This demo is using a external compiler that will only work in Expo Snacks.
// You may see flashes of unstyled content, this will not occur under normal use!
// Please see the documentation to setup your application
export default withExpoSnack(LastSubject);
