import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

//Stacks
import HomeNavigator from "./HomeNavigator";
import CartNavigator from "./CartNavigator";
import UserNavigator from "./UserNavigator";
import AdminNavigator from "./AdminNavigator";

import CartIcon from "../Shared/CartIcon";
import AuthGlobal from "../Context/store/AuthGlobal";

const Tab = createBottomTabNavigator();

const Main = () => {
  const context = useContext(AuthGlobal);
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        keyboardHidesTabBar: true,
        showLabel: false,
        activeTintColor: "#a283e7",
        style: {
          // position: "absolute",
          height: 70,
          // backgroundColor: "#0f0f0f",
          borderTopLeftRadius: 70,
          borderTopRightRadius: 70,
          borderBottomLeftRadius: 70,
          borderBottomRightRadius: 70,
          marginHorizontal: 30,
          bottom: 20,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="home" color={color} size={28} />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <View>
              <Icon name="shopping-cart" color={color} size={28} />
              <CartIcon />
            </View>
          ),
        }}
      />
      {context.stateUser.user.isAdmin == true ? (
        <Tab.Screen
          name="Admin"
          component={AdminNavigator}
          options={{
            tabBarIcon: ({ color }) => (
              <View>
                <Icon name="cog" color={color} size={28} />
              </View>
            ),
          }}
        />
      ) : null}

      <Tab.Screen
        name="User"
        component={UserNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <View>
              <Icon name="user" color={color} size={28} />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Main;
