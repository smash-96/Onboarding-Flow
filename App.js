import "react-native-gesture-handler";
import React, { useEffect } from "react";
import AuthStack from "./src/navigation/AuthStack";
import { NavigationContainer } from "@react-navigation/native";
import { AppWrapper } from "./src/components/Onboarding/AppWrapper";
import { LogBox } from "react-native";

LogBox.ignoreAllLogs();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <AuthStack />
    </NavigationContainer>
  );
};

const MainNavigator = IMAVAppCallWrapper(AppNavigator);

const App = () => {
  return <MainNavigator />;
};

export default App;
