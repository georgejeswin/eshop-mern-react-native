import React from "react";
import { ScrollView, Dimensions, StyleSheet, Text } from "react-native";

var { width } = Dimensions.get("window");

const FormContainer = (props) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {props.title ? <Text style={styles.title}>{props.title}</Text> : null}
      {props.children}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    marginBottom: 10,
    flex: 1,
    width: width,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
export default FormContainer;
