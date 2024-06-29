import Header from "@/components/Header";
import { AntDesign } from "@expo/vector-icons";
import {
  NavigationProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { CoursControllerApi, CoursResponse } from "../../../generated/index";
import axiosInstance from "../../environments/axiosInstance";
import environment from "../../environments/environment";
import CourseDetailsStyle from "./CoursesDetailsStyles";

interface Concept {
  id: number;
  titre: string;
}

const CourseConcepts: React.FC = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const route = useRoute();
  const { id } = route.params as { id: number };
  const [courseDetails, setCourseDetails] = useState<CoursResponse | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      const courseApi = new CoursControllerApi(
        environment,
        environment.basePath,
        axiosInstance
      );
      try {
        const response = await courseApi.showCours(id);
        setCourseDetails(response.data);
      } catch (error) {
        console.error("Failed to fetch course details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [id]);

  const handleConceptPress = (conceptId: number) => {
    navigation.navigate("ConceptDetails", { id: conceptId });
  };

  const handlePress = () => {
    navigation.goBack();
  };

  if (loading) {
    return (
      <View style={CourseDetailsStyle.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <>
      <Header titre={"Liste des Concepts"} />
      <View
        style={{
          backgroundColor: "#f0f8ff",
          height: Dimensions.get("window").height + 50,
        }}
      >
        <View
          style={{
            backgroundColor: "#f0f8ff",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={CourseDetailsStyle.titleText}>
            {courseDetails?.titre}
          </Text>
          <FlatList
            data={courseDetails?.concepts}
            keyExtractor={(item) => item.id!.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleConceptPress(item.id!)}>
                <View style={CourseDetailsStyle.conceptContainer}>
                  <Text style={CourseDetailsStyle.conceptText}>
                    {item.titre}
                  </Text>
                  <AntDesign name="rightcircleo" size={24} color="black" />
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </>
  );
};

export default CourseConcepts;
