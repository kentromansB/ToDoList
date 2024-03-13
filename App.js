
// import React, { Component, useEffect } from "react";
// import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
// import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";
// import axios from "axios";

// import MainScreen from './components/Main'
// import RegisterScreen from './components/auth/Register'
// import LoginScreen from './components/auth/Login'
// import NewTaskScreen from "./components/main/Tasks/NewTask";

// const Stack = createStackNavigator();



// function App() {return(
         
//   <NavigationContainer>
//     <Stack.Navigator initialRouteName="Login">
//       <Stack.Screen
//         name="Main"
//         component={MainScreen}
//         options={{ headerShown: false }}
//       />
//       <Stack.Screen
//         name="Login"
//         component={LoginScreen}
//         options={{ headerShown: false }}
//       />
//       <Stack.Screen
//         name="Register"
//         component={RegisterScreen}
//         options={{ headerShown: false }}
//       />
//       <Stack.Screen
//         name="NewTask"
//         component={NewTaskScreen}
//         options={{ headerShown: true, title: "Task" }}
//       />

//     </Stack.Navigator>
//     </NavigationContainer>
// )

//  // For Auth
 
//   // <NavigationContainer>
//   //   <Stack.Navigator initialRouteName="Landing">
//   //     <Stack.Screen
//   //       name="Landing"
//   //       component={LandingScreen}
//   //       options={{
//   //         headerShown: false,
//   //       }}
//   //     />
//   //     <Stack.Screen
//   //       name="Register"
//   //       component={RegisterScreen}
//   //       options={{
//   //         headerShadowVisible: false,
//   //         headerTintColor: "#ffffff",
//   //         headerStyle: {
//   //           backgroundColor: "#215A88",
//   //           borderBottomWidth: 0,
//   //         },
//   //       }}
//   //     />
//   //     <Stack.Screen
//   //       name="ForgotPassword"
//   //       component={ForgotPasswordScreen}
//   //       options={{
//   //         title: "Forgot Password",
//   //         headerShown: false,
//   //       }}
//   //     />
//   //     <Stack.Screen
//   //       name="Login"
//   //       component={LoginScreen}
//   //       options={{
//   //         headerShadowVisible: false,
//   //         headerTintColor: "#ffffff",
//   //         headerStyle: {
//   //           backgroundColor: "#215A88",
//   //           borderBottomWidth: 0,
//   //         },
//   //       }}
//   //     />
//   //   </Stack.Navigator>
//   // </NavigationContainer>





// }
      

// export default App;

// const styles = StyleSheet.create({
//   capture: {
//     //position: "relative",
//     //bottom: 100,
//     right: 10,
//     width: 100,
//     height: 100,
//     borderRadius: 100,
//     borderColor: "#263238",
//     borderWidth: 6,
//     alignSelf: "center",
//   },
// });


import React, { Component, useEffect, useState } from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SplashScreen from 'react-native-splash-screen';

import MainScreen from "./components/Main";
import RegisterScreen from "./components/auth/Register";
import LoginScreen from "./components/auth/Login";
import NewTaskScreen from "./components/main/Tasks/NewTask";

const Stack = createStackNavigator();
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [username, setUsername] = useState(false);
  async function getData() {
    const data = await AsyncStorage.getItem("isLoggedIn");
    const username = await AsyncStorage.getItem("username");
    console.log(data, "at app.jsx");
    console.log(username, "at app.jsx");
    setIsLoggedIn(data);
    // setUsername(username)
  }

  useEffect(() => {
    getData();
    
  }, [isLoggedIn]);
  if(!isLoggedIn){
    return (
      <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
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
      );
  }
  else if (isLoggedIn) {
    return (
      <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
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
    </Stack.Navigator>
    </NavigationContainer>
    )
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
