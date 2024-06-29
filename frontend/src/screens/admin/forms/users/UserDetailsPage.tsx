import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { UserControllerApi } from "../../../../../generated/index";
import axiosInstance from "../../../../environments/axiosInstance";
import environment from "../../../../environments/environment";

const UserDetailsPage = ({ id }) => {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userApi = new UserControllerApi(
          environment,
          environment.basePath,
          axiosInstance
        );
        const response = await userApi.showUser(id);
        setUserDetails(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [id]);

  if (loading) {
    return (
      <View style={UserDetailsStyle.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  return (
    <View style={UserDetailsStyle.container}>
      <View style={UserDetailsStyle.detailsContainer}>
        <Text style={UserDetailsStyle.titleText}>Details Utilisateur</Text>
        <View style={UserDetailsStyle.sectionContainer}>
          <Text style={UserDetailsStyle.labelText}>ID:</Text>
          <Text style={UserDetailsStyle.detailText}>{userDetails.id}</Text>
        </View>
        <View style={UserDetailsStyle.sectionContainer}>
          <Text style={UserDetailsStyle.labelText}>Nom d'utilisateur:</Text>
          <Text style={UserDetailsStyle.detailText}>
            {userDetails.username}
          </Text>
        </View>
        <View style={UserDetailsStyle.sectionContainer}>
          <Text style={UserDetailsStyle.labelText}>email</Text>
          <Text style={UserDetailsStyle.detailText}>{userDetails.email}</Text>
        </View>
        <View style={UserDetailsStyle.sectionContainer}>
          <Text style={UserDetailsStyle.labelText}>date de naissance</Text>
          <Text style={UserDetailsStyle.detailText}>
            {formatDate(userDetails.dateNaiss)}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default UserDetailsPage;

const UserDetailsStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  detailsContainer: {
    width: "100%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 20,
  },
  titleText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  sectionContainer: {
    marginBottom: 15,
    alignItems: "center",
  },
  labelText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#666",
  },
  detailText: {
    fontSize: 18,
    marginTop: 5,
    textAlign: "center",
    color: "#333",
  },
  optionsContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  optionHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "#333",
  },
  optionText: {
    fontSize: 16,
    paddingVertical: 5,
    color: "#333",
  },
});
