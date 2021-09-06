import React, { useEffect } from "react";
import { StyleSheet, View, LogBox, StatusBar } from "react-native";
import Toast from "react-native-toast-message";

//Redux
import { Provider } from "react-redux";
import store from "./Redux/store";

//Context API
import Auth from "./Context/store/Auth";

//Navigator
import Main from "./Navigators/Main";
//Screens
import ProductContainer from "./Screens/Products/ProductContainer";
import Header from "./Shared/Header";

import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";

const MyTheme = {
  dark: false,
  colors: {
    primary: "rgb(255, 45, 85)",
    background: "rgb(242, 242, 242)",
    card: "rgb(255, 255, 255)",
    text: "rgb(28, 28, 30)",
    border: "rgb(199, 199, 204)",
    notification: "rgb(255, 69, 58)",
  },
};

LogBox.ignoreAllLogs(true);

export default function App() {
  return (
    <Auth>
      <Provider store={store}>
        <NavigationContainer theme={MyTheme}>
          <StatusBar backgroundColor="red" barStyle="light-content" />
          <Main />
          <Toast ref={(ref) => Toast.setRef(ref)} />
        </NavigationContainer>
      </Provider>
    </Auth>
  );
}
