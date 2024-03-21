import React, { Component, useEffect, useState } from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SplashScreen from "react-native-splash-screen";

import MainScreen from "./components/Main";
import RegisterScreen from "./components/auth/Register";
import LoginScreen from "./components/auth/Login";
import NewTaskScreen from "./components/main/NewTask";
import EditTaskScreen from "./components/main/EditTask";

const Stack = createStackNavigator();
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  async function getData() {
    const data = await AsyncStorage.getItem("isLoggedIn");
    const username = await AsyncStorage.getItem("username");
    console.log(data, "at app.jsx");
    setIsLoggedIn(data);
  }

  useEffect(() => {
    getData();
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!isLoggedIn ? (
          <Stack.Group>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{ headerShown: false }}
            />
          </Stack.Group>
        ) : null}
        <Stack.Group>
          <Stack.Screen
            name="Main"
            component={MainScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="NewTask"
            component={NewTaskScreen}
            options={{ headerShown: true, title: "Task" }}
          />
          <Stack.Screen
            name="EditTask"
            component={EditTaskScreen}
            options={{ headerShown: true, title: "Task" }}
          />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

const styles = StyleSheet.create({
  capture: {
    //position: "relative",
    //bottom: 100,
    right: 10,
    width: 100,
    height: 100,
    borderRadius: 100,
    borderColor: "#263238",
    borderWidth: 6,
    alignSelf: "center",
  },
});
