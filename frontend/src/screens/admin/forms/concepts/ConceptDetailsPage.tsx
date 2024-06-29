import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { ConceptControllerApi, ConceptResponse, CoursResponse } from "../../../../../generated/index";
import axiosInstance from "../../../../environments/axiosInstance";
import environment from "../../../../environments/environment";

interface ConceptDetailsProps {
  id: number;
}
const ConceptDetailsPage: React.FC<ConceptDetailsProps> = (props) => {
  const [conceptDetails, setConceptDetails] = useState<ConceptResponse>({});
  const [course, setCourse] = useState<CoursResponse>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConceptDetails = async () => {
      console.log(props.id);
      try {
        const conceptApi = new ConceptControllerApi(
          environment,
          environment.basePath,
          axiosInstance
        );
        const response = await conceptApi.showConcept(props.id);
        setConceptDetails(response.data);
        conceptApi.getCours(props.id)
          .then((response) => {
            if (response.data) {
              setCourse(response.data);
            }
          });
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchConceptDetails();
  }, [props.id]);

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
          Concept Title: {conceptDetails!.titre}
        </Text>
        <Text style={styles.contentText}>
          Contenu: {conceptDetails.contenu}
        </Text>
        <Text style={styles.courseText}>Cours: {course.titre}</Text>
      </View>
    </ScrollView>
  );
};

export default ConceptDetailsPage;

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
