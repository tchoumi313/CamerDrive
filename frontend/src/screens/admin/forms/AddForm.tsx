import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import { useAuth } from "../../../context/AuthContext";
import AddConceptForm from "./concepts/AddConceptForm";
import AddCourseForm from "./courses/AddCourseForm";
import AddQuestionForm from "./questions/AddQuestionForm";
import AddQuizForm from "./quizzes/AddQuizForm";
import AddUserForm from "./users/AddUserForm";

type FormRouteParams = {
  params: {
    type: "users" | "courses" | "questions" | "concepts" | "quizzes";
  };
};

const AddForm = () => {
  const route = useRoute<RouteProp<FormRouteParams, "params">>();

  const { type } = route.params;

  const navigation = useNavigation();

  if (type === "questions") {
    return <AddQuestionForm />;
  } else if (type === "users") {
    return <AddUserForm />;
  } else if (type === "concepts") {
    return <AddConceptForm />;
  } else if (type === "quizzes") {
    return <AddQuizForm />;
  } else {
    return <AddCourseForm />;
  }

  const { authState } = useAuth();
};
export default AddForm;
