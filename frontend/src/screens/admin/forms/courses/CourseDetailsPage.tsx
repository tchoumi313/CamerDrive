import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  CoursControllerApi,
  CoursResponse,
} from "../../../../../generated/index";
import axiosInstance from "../../../../environments/axiosInstance";
import environment from "../../../../environments/environment";

interface CourseDetailsProps {
  id: number;
}

const CourseDetailsPage: React.FC<CourseDetailsProps> = (props) => {
  const [courseDetails, setCourseDetails] = useState<CoursResponse>({});
  // const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageUri, setImageUri] = useState<string>("");

  useEffect(() => {
    const fetchCourseDetails = async () => {
      const courseApi = new CoursControllerApi(
        environment,
        environment.basePath,
        axiosInstance
      );
      courseApi
        .showCours(props.id)
        .then((response) => {
          // console.log("Course Response: ", response.data);
          if (response.data) {
            setCourseDetails(response.data);
            if (response.data.image) {
              // console.log("Course Image: ", response.data.image);
              setImageUri("/files/" + response.data.image.id);
            }
          }
        })
        .catch((err) => {
          console.log("Error while fetching course details: ", err);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    fetchCourseDetails();
  }, [props.id, imageUri]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.detailsContainer}>
        <Text style={styles.titleText}>
          Titre du Cours: {courseDetails.titre}
        </Text>
        {imageUri && (
          <View className="w-full items-center">
            <Image
              src={environment.basePath + imageUri}
              className="h-80 w-80 my-5 content-center bg-cover"
            />
          </View>
        )}
        <Text style={styles.contentText}>
          Description: {courseDetails.description}
        </Text>
      </View>
    </ScrollView>
  );
};

export default CourseDetailsPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  detailsContainer: {
    width: "90%",
    alignSelf: "center",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginTop: 20,
    marginBottom: 20,
  },
  titleText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  contentText: {
    fontSize: 16,
    color: "#333",
    textAlign: "left",
    marginBottom: 20,
  },
  courseText: {
    fontSize: 16,
    color: "#333",
    textAlign: "left",
  },
});
