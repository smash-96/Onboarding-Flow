import "react-native-gesture-handler";
import React, { useEffect } from "react";
import { View, Text } from "react-native";
import AuthStack from "./src/navigation/AuthStack";
import { NavigationContainer } from "@react-navigation/native";
import AppWrapper from "./src/components/Onboarding/AppWrapper/AppWrapper";
// import { LogBox } from "react-native";

//LogBox.ignoreAllLogs();

// const MyAppNavigator = () => {
//   return (
//     <NavigationContainer>
//       <AuthStack />
//     </NavigationContainer>
//   );
// };

//const MainNavigators = AppWrapper(MyAppNavigator);

const App = () => {
  return (
    <View>
      <Text>Hello World</Text>
    </View>
  );
};

export default App;
