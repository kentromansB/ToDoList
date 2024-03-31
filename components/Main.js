import React, { Component, useEffect, useState } from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../AuthContext";

import RegisterScreen from "./auth/Register";
import LoginScreen from "./auth/Login";
import NewTaskScreen from "./main/NewTask";
import EditTaskScreen from "./main/EditTask";
import HomeScreen from "./HomeScreen";

const Stack = createStackNavigator();
function App() {
  const { isLoggedIn } = useAuth();
  console.log(isLoggedIn);

  // useEffect(() => {
  //   getData();
  // }, []);

  // async function getData() {
  //   const data = await AsyncStorage.getItem("isLoggedIn");
  //   console.log(data, "at app.jsx");

  // }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLoggedIn ? (
          <Stack.Group>
            <Stack.Screen
              name="HomeScreen"
              component={HomeScreen}
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
        ) : (
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
        )}
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
