import React, { useState } from "react";
import { TextInput, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const Input = (props) => {
  return (
    // <LinearGradient
    //   // Button Linear Gradient
    //   colors={["#cd19b4", "#9200bb", "#47a9bd"]}
    //   style={styles.gradient}
    // >
    <TextInput
      style={styles.input}
      placeholder={props.placeholder}
      name={props.name}
      id={props.id}
      value={props.value}
      autoCorrect={props.autoCorrect}
      onChangeText={props.onChangeText}
      onFocus={props.onFocus}
      onBlur={props.onBlur}
      secureTextEntry={props.secureTextEntry}
      keyboardType={props.keyboardType}
    ></TextInput>
    // </LinearGradient>
  );
};
const styles = StyleSheet.create({
  gradient: {
    width: "80%",
    height: 68,
    borderRadius: 20,
    margin: 10,
  },
  input: {
    width: "80%",
    height: 60,
    backgroundColor: "white",
    margin: 10,
    borderRadius: 30,
    borderWidth: 0,
    borderColor: "black",
    paddingLeft: 20,
  },
});
export default Input;
