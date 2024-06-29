import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { useAuth } from "../context/AuthContext";
import AboutUs from "./AboutUs";
import Profile from "./Profile/Profile";
import ScorePage from "./ScorePage";
import Statistiques from "./Statistiques/Statistiques";
import AdminDashbord from "./admin/dashbord/AdminDashbord";
import AddForm from "./admin/forms/AddForm";
import DetailsPage from "./admin/forms/DetailsPage";
import EditForm from "./admin/forms/EditForm";
import QuestionDetails from "./admin/manageTasks/QuestionDetails";
import SignIn from "./auth/SignIn";
import SignUp from "./auth/SignUp";
import Courses from "./courses/Courses";
import ConceptDetails from "./coursesDetails/ConceptDetails";
import CourseConcepts from "./coursesDetails/CourseConcepts";
import Dashbord from "./dashbord/Dashbord";
import ExamDashbord from "./examen/ExamDashbord";
import ExamenDetails from "./examen/ExamenDetails";
import ExamenScore from "./examen/ExamenScore";
import LoadingScreen from "./examen/LoadingScreem";
import LastExam from "./lastExam/LastExam";
import Quiz from "./quiz/Quiz";
import QuizDetails from "./quiz/QuizDetails";
import OnboardingCompo from "./welcome/onboarding/OnboardingCompo";

const Stack = createNativeStackNavigator();

const Index = () => {
  const { authState } = useAuth();

  return (
    <Stack.Navigator initialRouteName="Onboading">
      {authState?.authenticated ? (
        authState.user?.role === "ADMIN" ? (
          <>
            <Stack.Screen
              name="AdminDashboard"
              component={AdminDashbord}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="QuestionDetails"
              component={QuestionDetails}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="AddForm"
              component={AddForm}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="EditForm"
              component={EditForm}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="DetailsPage" component={DetailsPage} />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Home"
              component={Dashbord}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Courses"
              component={Courses}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Quiz"
              component={Quiz}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="QuizDetails"
              component={QuizDetails}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ScorePage"
              component={ScorePage}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="LastExam"
              component={LastExam}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="CourseConcepts"
              component={CourseConcepts}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="ConceptDetails" component={ConceptDetails} />
            <Stack.Screen
              name="Profile"
              component={Profile}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="AboutUs"
              component={AboutUs}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Statistiques"
              component={Statistiques}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ExamenBlanc"
              component={ExamDashbord}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ExamenDetails"
              component={ExamenDetails}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="LoadingScreen"
              component={LoadingScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ExamenScore"
              component={ExamenScore}
              options={{ headerShown: false }}
            />
          </>
        )
      ) : (
        <>
          <Stack.Screen
            name="Onboarding"
            component={OnboardingCompo}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignIn"
            component={SignIn}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{ headerShown: false }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default Index;
