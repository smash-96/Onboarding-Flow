import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { KeyboardAwareScrollView } from "@codler/react-native-keyboard-aware-scroll-view";
import { Avatar, Button } from "react-native-elements";
import { Formik } from "formik";
import * as yup from "yup";
import authMiddleware from "../AuthMiddleware";
import MyActivityIndicator from "../../Helpers/ActivityIndicator";
import { useDispatch } from "react-redux";
import {
  selectUserData,
  setUserData,
} from "../../../Redux/Slices/userAuthSlice";
import dynamicStyles from "./styles";

const loginSchema = yup.object({
  fname: yup.string().required("First Name cannot be empty"),
  lname: yup.string().required("Last Name cannot be empty"),
  email: yup
    .string()
    .required("Email cannot be empty")
    .matches(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Email not valid"
    ),
  pass: yup.string().required("Password cannot be empty").min(8),
});
const SignupScreen = (props) => {
  const styles = dynamicStyles();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const signup = async (values, actions) => {
    console.log("Signup");
    setLoading(true);
    auth
      .createUserWithEmailAndPassword(values.email, values.pass)
      .then((authUser) => {
        console.log("User account created & signed in!");
        authUser.user.updateProfile({
          displayName: values.fname,
          //photoURL: photoUrl,
        });
        //authUser.user.sendEmailVerification();
        db.collection("Users")
          .doc(authUser.user.uid)
          .set({
            uid: authUser.user.uid,
            email: values.email,
            password: values.pass,
            fname: values.fname,
            lname: values.lname,
            helpRequestID: null,
            //createdAt: firestore.FieldValue.serverTimestamp(),
          })
          .then(() => {
            console.log("User added!");

            //Alert.alert("User added!", "User account created & signed in!");
            //props.navigation.replace("Home");
          });

        authManager.handleSuccessfulSignup(authUser.user, true).then((res) => {
          if (res?.user) {
            //const user = res.user;
            dispatch(setUserFname(values.fname));
            dispatch(setUserLname(values.lname));
            dispatch(setUserEmail(values.email));

            Keyboard.dismiss();
            props.navigation.reset({
              index: 0,
              routes: [
                {
                  name: "MapStack",
                  //params: { user: authUser.user }
                },
              ],
            });
          } else {
            setLoading(false);

            if (res.verification) {
              Alert.alert(
                I18n.t("signup.alert.header"),
                I18n.t("signup.alert.body"),
                [I18n.t("signup.alert.button")],
                {
                  cancelable: false,
                }
              );
              props.navigation.goBack();
            } else {
              Alert.alert(
                "",
                I18n.t("signup.alert.error"),
                [I18n.t("signup.alert.button")],
                {
                  cancelable: false,
                }
              );
            }
          }
        });
      })
      .catch((error) => {
        setLoading(false);
        if (error.code === "auth/email-already-in-use") {
          console.log("That email address is already in use!");
        } else if (error.code === "auth/invalid-email") {
          console.log("That email address is invalid!");
        } else {
          console.error("Signup Error", error);
        }
      });
    //actions.resetForm();
  };

  const login = () => {
    props.navigation.goBack();
  };
  return (
    <KeyboardAwareScrollView style={styles.container}>
      <Text style={styles.title}>Create new account</Text>
      <View>
        <Formik
          initialValues={{ fname: "", lname: "", email: "", pass: "" }}
          validationSchema={loginSchema}
          onSubmit={signup}
        >
          {(formikProps) => (
            <View>
              <TextInput
                style={styles.inputContainer}
                placeholder="First Name"
                placeholderTextColor="#aaaaaa"
                onChangeText={formikProps.handleChange("fname")}
                onBlur={formikProps.handleBlur("fname")}
                value={formikProps.values.fname}
                keyboardType="email-address"
              />
              <Text style={styles.error}>
                {formikProps.touched.fname && formikProps.errors.fname}
              </Text>

              <TextInput
                style={styles.inputContainer}
                placeholder="Last Name"
                placeholderTextColor="#aaaaaa"
                onChangeText={formikProps.handleChange("lname")}
                onBlur={formikProps.handleBlur("lname")}
                value={formikProps.values.lname}
                keyboardType="email-address"
              />
              <Text style={styles.error}>
                {formikProps.touched.lname && formikProps.errors.lname}
              </Text>

              <TextInput
                style={styles.inputContainer}
                placeholder="E-mail Address"
                placeholderTextColor="#aaaaaa"
                type="email"
                onChangeText={formikProps.handleChange("email")}
                onBlur={formikProps.handleBlur("email")}
                value={formikProps.values.email}
                keyboardType="email-address"
              />
              <Text style={styles.error}>
                {formikProps.touched.email && formikProps.errors.email}
              </Text>

              <TextInput
                style={styles.inputContainer}
                placeholder="Password"
                placeholderTextColor="#aaaaaa"
                type="password"
                secureTextEntry={true}
                onChangeText={formikProps.handleChange("pass")}
                value={formikProps.values.pass}
              />

              <Text style={styles.error}>
                {formikProps.touched.pass && formikProps.errors.pass}
              </Text>

              {/* Only based on image upload for now */}
              <Button
                buttonStyle={styles.buttonContainer}
                title="Sign up"
                onPress={formikProps.handleSubmit}
              />
            </View>
          )}
        </Formik>
      </View>
      {/* <Text style={styles.ortext}>OR</Text>
      <Button
        buttonStyle={{...styles.buttonContainer, backgroundColor: 'dodgerblue'}}
        title="Log in with Google"
        color="green"
      /> */}
      <View style={{ height: 20 }}></View>
      {loading && <TNActivityIndicator />}
    </KeyboardAwareScrollView>
  );
};

export default SignupScreen;
