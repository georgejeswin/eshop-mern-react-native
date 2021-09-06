import React, { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import FormContainer from "../../Shared/Form/FormContainer";
import Input from "../../Shared/Form/Input";
import Error from "../../Shared/Error";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";
import { baseURL } from "../../assets/common/baseUrl";
import Toast from "react-native-toast-message";
import { TouchableOpacity } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";

const Register = (props) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const register = () => {
    if (email === "" || name === "" || phone === "" || password === "") {
      setError("Please Fill in the form correctly");
    }
    let user = {
      name: name,
      email: email,
      password: password,
      phone: phone,
      isAdmin: false,
    };

    axios
      .post(`${baseURL}users/register`, user)
      .then((res) => {
        if (res.status == 200) {
          setTimeout(() => {
            Toast.show({
              topOffset: 60,
              type: "success",
              text1: "Registration Succeeded",
              text2: "Please login into your account",
            });
            props.navigation.navigate("Login");
          }, 500);
        }
      })
      .catch((error) => {
        console.log(error);
        Toast.show({
          topOffset: 60,
          type: "error",
          text1: "Something went wrong",
          text2: "Please try again",
        });
      });
  };

  return (
    <KeyboardAwareScrollView
      viewIsInsideTabBar={true}
      extraHeight={200}
      enableOnAndroid={true}
      style={{ marginTop: 50 }}
    >
      <FormContainer title={"Register"} style={styles.signupContainer}>
        <Input
          placeholder={"Email"}
          name={"email"}
          id={"email"}
          onChangeText={(text) => setEmail(text.toLowerCase())}
          value={email}
        />
        <Input
          placeholder={"Name"}
          name={"name"}
          id={"name"}
          onChangeText={(text) => setName(text)}
          value={name}
        />
        <Input
          placeholder={"Phone"}
          name={"phone"}
          id={"phone"}
          keyboardType={"numeric"}
          onChangeText={(text) => setPhone(text)}
          value={phone}
        />

        <Input
          placeholder={"Password"}
          name={"password"}
          id={"password"}
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
          value={password}
        />
        <View>{error ? <Error message={error} /> : null}</View>

        <View style={[{ marginTop: 40 }, styles.buttonGroup]}>
          <LinearGradient
            colors={["#3393E4", "#715886"]}
            style={styles.registerButton}
          >
            <TouchableOpacity onPress={() => register()}>
              <Text style={{ color: "#FFF", fontWeight: "bold", fontSize: 14 }}>
                Register
              </Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
        <View style={[{ marginTop: 40 }, styles.buttonGroup]}>
          <TouchableOpacity onPress={() => props.navigation.navigate("Login")}>
            <Text style={{ color: "darkgrey", fontWeight: "bold" }}>
              Already have an account?? &nbsp;{" "}
              <Text style={{ color: "gray" }}>Login</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </FormContainer>
    </KeyboardAwareScrollView>
  );
};
const styles = StyleSheet.create({
  signupContainer: {
    height: "100vh",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  buttonGroup: {
    width: "80%",
    alignItems: "center",
  },
  middleText: {
    marginBottom: 20,
    alignSelf: "center",
    color: "gainsboro",
  },
  registerButton: {
    width: "90%",
    borderRadius: 20,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
});
export default Register;
