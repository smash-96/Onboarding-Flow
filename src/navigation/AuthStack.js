import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import StartupScreen from "../components/Onboarding/StartupScreen/StartupScreen";
import LoginScreen from "../components/Onboarding/LoginScreen/LoginScreen";
import SignupScreen from "../components/Onboarding/SignupScreen/SignupScreen";
import LoadScreen from "../components/Onboarding/LoadScreen/LoadScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { View } from "react-native";

const Stack = createStackNavigator();

export default function AuthStack(props) {
  return (
    <View>
      <Text>Yoyo</Text>
    </View>
    // <SafeAreaProvider>
    //   <Stack.Navigator
    //     screenOptions={{ animationEnabled: false, headerShown: false }}
    //     initialRouteName="LoadScreen"
    //   >
    //     <Stack.Screen
    //       name="LoadScreen"
    //       component={LoadScreen}
    //       options={{ headerShown: false }}
    //     />

    //     <Stack.Screen
    //       name="StartupScreen"
    //       component={StartupScreen}
    //       options={{ headerShown: false }}
    //     />

    //     <Stack.Screen
    //       name="LoginScreen"
    //       component={LoginScreen}
    //       options={{ headerShown: false }}
    //     />
    //     <Stack.Screen
    //       name="SignupScreen"
    //       component={SignupScreen}
    //       options={{ headerShown: false }}
    //     />
    //     {/* <Stack.Screen
    //       name="MapStack"
    //       component={MapStack}
    //       options={{ headerShown: false }}
    //     /> */}
    //   </Stack.Navigator>
    // </SafeAreaProvider>
  );
}
