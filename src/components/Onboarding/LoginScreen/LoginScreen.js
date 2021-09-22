import React, { useEffect, useState } from "react";
import { Text, View, TextInput } from "react-native";
import { KeyboardAwareScrollView } from "@codler/react-native-keyboard-aware-scroll-view";
import { Formik } from "formik";
import * as yup from "yup";
import { Button } from "react-native-elements";
import { useDispatch } from "react-redux";
import {
  selectUserData,
  setUserData,
} from "../../../Redux/Slices/userAuthSlice";
import authMiddleware from "../AuthMiddleware";
import MyActivityIndicator from "../../Helpers/ActivityIndicator";
import dynamicStyles from "./styles";

const loginSchema = yup.object({
  email: yup
    .string()
    .required("Email cannot be empty")
    .matches(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Email not valid"
    ),
  pass: yup.string().required("Password cannot be empty").min(8),
});

const LoginScreen = (props) => {
  const styles = dynamicStyles();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // registerOnNotificationOpenedApp();
    // AppState.addEventListener("change", handleAppStateChange);
    tryToLoginFirst();
  }, []);

  const tryToLoginFirst = async () => {
    authMiddleware
      .retrievePersistedAuthUser()
      .then(async (response) => {
        if (response?.user) {
          const user = response.user;

          // console.log("LOGIN USER", user);
          // delete user["createdAt"];
          // delete user["lastOnlineTimestamp"];
          //console.log("USER_NEW", user);
          dispatch(setUserData({ user }));

          Keyboard.dismiss();
          props.navigation.reset({
            index: 0,
            routes: [
              {
                name: "MapStack",
                params: { user: user },
              },
            ],
          });
          return;
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  const login = (values, actions) => {
    console.log("LOGIN");
    setLoading(true);
    authMiddleware
      .loginWithEmailAndPassword(values.email, values.pass)
      .then(async (response) => {
        if (response?.user) {
          const user = response.user;
          if (!user.emailVerified) {
            // delete user["createdAt"];
            // delete user["lastOnlineTimestamp"];
            //console.log("USER_NEW", user);
            dispatch(setUserData({ user }));

            Keyboard.dismiss();
            props.navigation.reset({
              index: 0,
              routes: [
                {
                  name: "MapStack",
                  params: { user: user },
                },
              ],
            });
          } else {
            auth.signOut();
            setLoading(false);
            Alert.alert(
              I18n.t("login.alert.header"),
              I18n.t("login.alert.body"),
              ["OK"],
              {
                cancelable: false,
              }
            );
          }
        } else {
          setLoading(false);
          console.log("SOME ERROR");
          Alert.alert(
            I18n.t("login.alert2.header"),
            I18n.t("login.alert2.body"),
            ["OK"],
            {
              cancelable: false,
            }
          );
        }
      });

    //actions.resetForm();
  };

  const signup = () => {
    props.navigation.navigate("Signup");
  };

  if (isLoading == true) {
    return <MyActivityIndicator />;
  }
  return (
    <KeyboardAwareScrollView style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <Formik
        initialValues={{ email: "", pass: "" }}
        validationSchema={loginSchema}
        onSubmit={login}
      >
        {(formikProps) => (
          <View>
            <TextInput
              style={styles.inputContainer}
              placeholder="E-mail Address"
              type="email"
              onChangeText={formikProps.handleChange("email")}
              onBlur={formikProps.handleBlur("email")}
              value={formikProps.values.email}
              keyboardType="email-address"
            />
            <Text style={styles.error}>
              {formikProps.touched.email && formikProps.errors.email}
            </Text>

            <View style={styles.eyeContainer}>
              <TextInput
                style={styles.inputContainer}
                placeholder="Password"
                type="password"
                secureTextEntry={true}
                onChangeText={formikProps.handleChange("pass")}
                value={formikProps.values.pass}
              />

              {/* <Icon
                name="close"
                size={24}
                color="black"
                onPress={() => setModalOpen(false)}
                style={{...styles.modalToggle, ...styles.modalClose}}
              /> */}
            </View>

            <Text style={styles.error}>
              {formikProps.touched.pass && formikProps.errors.pass}
            </Text>

            <Button
              buttonStyle={styles.buttonContainer}
              title="Log in"
              onPress={formikProps.handleSubmit}
            />
          </View>
        )}
      </Formik>
      <Text style={styles.ortext}>OR</Text>
      <Button
        buttonStyle={{
          ...styles.buttonContainer,
          backgroundColor: "dodgerblue",
        }}
        title="Log in with Google"
      />
      <View style={{ height: 20 }}></View>
      {loading && <MyActivityIndicator />}
    </KeyboardAwareScrollView>
  );
};

export default LoginScreen;
