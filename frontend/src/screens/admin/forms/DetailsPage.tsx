import { RouteProp, useRoute } from "@react-navigation/native";
import React from "react";
import QuestionDetailsPage from "./questions/QuestionDetailsPage";
//import EditUserForm from "./EditUserForm";
//import EditCourseForm from "./EditCourseForm";
import ConceptDetailsPage from "./concepts/ConceptDetailsPage";
import CourseDetailsPage from "./courses/CourseDetailsPage";
import QuizDetailsPage from "./quizzes/QuizDetailsPage";
import UserDetailsPage from "./users/UserDetailsPage";

type DetailsPageRouteParams = {
  params: {
    type: "users" | "courses" | "questions" | "quizzes";
    id: number;
  };
};

const DetailsPage = () => {
  const route = useRoute<RouteProp<DetailsPageRouteParams, "params">>();
  const { type, id } = route.params;

  if (type === "questions") {
    return <QuestionDetailsPage id={id} />;
  } else if (type === "users") {
    return <UserDetailsPage id={id} />;
  } else if (type === "courses") {
    return <CourseDetailsPage id={id} />;
  } else if (type === "quizzes") {
    return <QuizDetailsPage id={id} />;
  } else if (type === "concepts") {
    return <ConceptDetailsPage id={id} />;
  } else {
    return null;
  }
};

export default DetailsPage;
