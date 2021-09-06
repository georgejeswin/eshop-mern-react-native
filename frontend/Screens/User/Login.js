import React, { useEffect, useContext, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import FormContainer from "../../Shared/Form/FormContainer";
import Input from "../../Shared/Form/Input";
import Error from "../../Shared/Error";
//Context
import AuthGlobal from "../../Context/store/AuthGlobal";
import { loginUser } from "../../Context/actions/auth.actions";
import { StackActions } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

const Login = (props) => {
  const context = useContext(AuthGlobal);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { navigation } = props;

  useEffect(() => {
    if (context.stateUser.isAuthenticated === true) {
      props.navigation.navigate("User Profile");
    }
    return () => {};
  }, [context.stateUser.isAuthenticated]);

  const handleSubmit = () => {
    const user = {
      email,
      password,
    };
    if (email === "" || password === "") {
      setError("Please fill in your credentials");
    } else {
      loginUser(user, context.dispatch);
    }
    navigation.dispatch(
      StackActions.replace("User Profile", {
        user: user,
      })
    );
  };

  return (
    <ScrollView>
      <FormContainer title={"Login"}>
        <Image
          style={{ width: 300, height: 300 }}
          resizeMode="contain"
          source={{
            uri: "https://www.payway.com/wp-content/uploads/header-img-10-mobile.png",
          }}
        />
        <Input
          placeholder={"Enter Email"}
          name={"email"}
          id={"email"}
          value={email}
          onChangeText={(text) => setEmail(text.toLowerCase().trim())}
        />
        <Input
          placeholder={"Enter Password"}
          name={"password"}
          id={"password"}
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <View style={styles.buttonGroup}>
          {error ? <Error message={error} /> : null}
          <LinearGradient
            colors={["#a0b5d1", "#7d80e4"]}
            style={styles.registerButton}
          >
            <TouchableOpacity onPress={() => handleSubmit()}>
              <Text style={{ color: "#FFF", fontWeight: "bold", fontSize: 14 }}>
                Login
              </Text>
            </TouchableOpacity>
          </LinearGradient>
          {/* <EasyButton large primary onPress={() => handleSubmit()}>
          <Text style={{ color: "#FFF", fontWeight: "bold" }}>Login</Text>
        </EasyButton> */}
        </View>
        <View style={[{ marginTop: 40 }, styles.buttonGroup]}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("Register")}
          >
            <Text style={styles.middleText}>
              Don't have account yet?? &nbsp;
              <Text style={{ color: "gray", fontWeight: "bold" }}>
                Register
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
      </FormContainer>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  buttonGroup: {
    width: "80%",
    alignItems: "center",
    marginTop: 30,
  },
  middleText: {
    marginBottom: 20,
    alignSelf: "center",
    color: "darkgray",
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

export default Login;
