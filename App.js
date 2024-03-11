
import React, { Component, useEffect } from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import axios from "axios";

import MainScreen from './components/Main'
import RegisterScreen from './components/auth/Register'
import LoginScreen from './components/auth/Login'

const Stack = createStackNavigator();



export class App extends Component {
 
  render() {
   
      return(
         
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Main">
            <Stack.Screen
              name="Main"
              component={MainScreen}
              options={{ headerShown: false }}
            />
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

          </Stack.Navigator>
          </NavigationContainer>
      )

       // For Auth
       
        // <NavigationContainer>
        //   <Stack.Navigator initialRouteName="Landing">
        //     <Stack.Screen
        //       name="Landing"
        //       component={LandingScreen}
        //       options={{
        //         headerShown: false,
        //       }}
        //     />
        //     <Stack.Screen
        //       name="Register"
        //       component={RegisterScreen}
        //       options={{
        //         headerShadowVisible: false,
        //         headerTintColor: "#ffffff",
        //         headerStyle: {
        //           backgroundColor: "#215A88",
        //           borderBottomWidth: 0,
        //         },
        //       }}
        //     />
        //     <Stack.Screen
        //       name="ForgotPassword"
        //       component={ForgotPasswordScreen}
        //       options={{
        //         title: "Forgot Password",
        //         headerShown: false,
        //       }}
        //     />
        //     <Stack.Screen
        //       name="Login"
        //       component={LoginScreen}
        //       options={{
        //         headerShadowVisible: false,
        //         headerTintColor: "#ffffff",
        //         headerStyle: {
        //           backgroundColor: "#215A88",
        //           borderBottomWidth: 0,
        //         },
        //       }}
        //     />
        //   </Stack.Navigator>
        // </NavigationContainer>
      
    
    
     
    
  }
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
