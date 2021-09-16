import React from "react";
import { StyleSheet, Text, View } from "react-native";

const AppWrapper = (MainComponent) => {
  const Component = (props) => {
    return (
      <View style={{ flex: 1 }}>
        <MainComponent />
      </View>
    );
  };
  return Component;
};

export default AppWrapper;
