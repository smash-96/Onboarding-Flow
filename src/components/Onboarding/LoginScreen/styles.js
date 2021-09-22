import { StyleSheet } from "react-native";

const dynamicStyles = () => {
  return StyleSheet.create({
    container: {
      flex: 1,
      alignContent: "center",
      backgroundColor: "white",
    },
    title: {
      fontSize: 30,
      fontWeight: "bold",
      marginTop: 25,
      marginBottom: 20,
      alignSelf: "stretch",
      textAlign: "left",
      marginLeft: 30,
      color: "#ea60d6",
    },
    inputContainer: {
      height: 42,
      borderWidth: 1,
      borderColor: "grey",
      paddingLeft: 20,
      width: "80%",
      alignSelf: "center",
      marginTop: 20,
      alignItems: "center",
      borderRadius: 25,
    },
    buttonContainer: {
      width: "70%",
      borderRadius: 25,
      padding: 10,
      marginTop: 30,
      alignSelf: "center",
      backgroundColor: "#ea60d6",
    },
    error: {
      color: "crimson",
      fontWeight: "bold",
      fontSize: 15,
      //marginBottom: 10,
      //marginTop: 6,
      textAlign: "center",
    },
    ortext: {
      marginTop: 40,
      marginBottom: 10,
      alignSelf: "center",
    },
    eyeContainer: {
      flex: 1,
    },
  });
};

export default dynamicStyles;
