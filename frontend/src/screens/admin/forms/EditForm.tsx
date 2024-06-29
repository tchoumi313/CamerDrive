import { RouteProp, useRoute } from "@react-navigation/native";
import React from "react";
import EditConceptForm from "./concepts/EditConceptForm";
import EditCourseForm from "./courses/EditCourseForm";
import EditQuestionForm from "./questions/EditQuestionForm";
import EditQuizForm from "./quizzes/EditQuizzesForm";
import EditUserForm from "./users/EditUserForm";

type EditFormRouteParams = {
  params: {
    type: "users" | "courses" | "questions";
    id: number;
  };
};

const EditForm = () => {
  const route = useRoute<RouteProp<EditFormRouteParams, "params">>();
  const { type, id } = route.params;

  if (type === "questions") {
    return <EditQuestionForm id={id} />;
  } else if (type === "courses") {
    return <EditCourseForm id={id} />;
  } else if (type === "users") {
    return <EditUserForm id={id} />;
  } else if (type === "quizzes") {
    return <EditQuizForm id={id} />;
  } else if (type === "concepts") {
    return <EditConceptForm id={id} />;
  } else {
    return null;
  }
};

export default EditForm;
