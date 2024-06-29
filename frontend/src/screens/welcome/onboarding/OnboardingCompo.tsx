import React from "react";
import DynamicAppStyles from "./DynamicAppStyles";
import Onboarding from "./Onboarding";
import OnboardingConfig from "./OnboardingConfig";

const OnboardingCompo = () => {
  return (
    <Onboarding appConfig={OnboardingConfig} appStyles={DynamicAppStyles} />
  );
};

export default OnboardingCompo;
