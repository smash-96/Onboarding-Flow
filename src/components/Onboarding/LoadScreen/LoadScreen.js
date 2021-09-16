import React, { useEffect, useRef } from "react";
import { View, Keyboard } from "react-native";
import deviceStorage from "../../Helpers/AuthDeviceStorage";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../../../FirebaseConfig/firebaseConfig";
import authMiddleware from "../AuthMiddleware";

const LoadScreen = () => {
  const navigation = useNavigation();

  const didFocusSubscription = useRef(
    navigation.addListener("focus", (payload) => {
      setAppState();
    })
  );

  useEffect(() => {
    setAppState();
    return () => {
      didFocusSubscription.current && didFocusSubscription.current(); // This functions is returned by navigator to unsubscribe from the event
    };
  }, []);

  const setAppState = async () => {
    const shouldShowOnboardingFlow =
      await deviceStorage.getShouldShowOnboardingFlow();
    if (!shouldShowOnboardingFlow) {
      if (auth?.currentUser) {
        fetchPersistedUserIfNeeded();
        return;
      }
      navigation.navigate("LoginScreen");
    } else {
      navigation.navigate("StartupScreen");
    }
  };

  // Case when user is already logged in
  const fetchPersistedUserIfNeeded = async () => {
    authMiddleware
      .retrievePersistedAuthUser()
      .then((response) => {
        if (response?.user) {
          //   dispatch(
          //     setUserData({
          //       user: response.user,
          //     })
          //   );
          Keyboard.dismiss();
        }
        navigation.navigate("LoginScreen");
      })
      .catch((error) => {
        console.log(error);
        navigation.navigate("LoginScreen");
      });
  };

  return <View />;
};

export default LoadScreen;
