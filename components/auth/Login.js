import React, { Component, useEffect, useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";

import { TextInput } from "react-native-paper";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import { useAuth } from "../../AuthContext";

function Login({ navigation }) {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState();
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [propUsername, setPropUsername] = useState("");

  const storeToken = async (key, value) => {
    await SecureStore.setItemAsync(key, value);
  };

  const handleLogin = () => {
    console.log(email, password);
    login(email, password);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setEmail(null);
      setPassword(null);
      console.log("2", data);
    });
    return unsubscribe;
  }, []);

  // async function getData() {
  //   const data = await AsyncStorage.getItem("isLoggedIn");
  //   console.log;
  //   console.log(data, "at app.jsx");
  // }
  // useEffect(() => {
  //   getData();
  //   setUsername("");
  //   setPassword("");
  //   console.log("Hii");
  //   console.log(data);
  // }, []);

  return (
    <ScrollView style={styles.container}>
      <View>
        <Text style={styles.welcome}>Welcome to ToDo,</Text>
        <Text style={styles.subtitle}>Sign in to start your tasks!</Text>
      </View>
      <View style={styles.loginGroup}>
        <View style={styles.space}>
          <TextInput
            value={email}
            label="Email"
            activeUnderlineColor="#215a88"
            inputMode="email"
            autoCapitalize="none"
            placeholder={"sample@email.com"}
            onChangeText={(email) => setEmail(email)}
          />
        </View>

        <View style={styles.space}>
          <TextInput
            label="Password"
            autoCapitalize="none"
            secureTextEntry={secureTextEntry}
            onChangeText={(password) => setPassword(password)}
            value={password}
            activeUnderlineColor="#215A88"
            right={
              <TextInput.Icon
                name={secureTextEntry ? "eye" : "eye-off"}
                onPress={() => setSecureTextEntry(!secureTextEntry)}
              />
            }
          />
        </View>
      </View>
      <View style={{ paddingTop: 20 }}>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.text}>Sign In</Text>
        </TouchableOpacity>
      </View>
      <View style={{ alignItems: "center", paddingVertical: 20 }}>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text>
            I'm already a member. <Text style={styles.textSignUp}>Sign Up</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 50,
    alignContent: "center",
  },
  space: {
    paddingVertical: 5,
  },
  banner: {
    //flex: 1,
    alignContent: "center",
    justifyContent: "center",
    top: 70,
    left: 40,
  },
  bottom: {
    bottom: 20,
    marginBottom: 45,
  },
  loginGroup: {
    paddingTop: 70,
  },
  miniGroup: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
    top: 200,
    left: 240,
  },

  welcome: {
    fontSize: 30,
    fontWeight: "bold",
  },
  subtitle: {
    // flex: 1,
    // left: 20,
    fontSize: 22,
    fontWeight: "bold",
    color: "grey",
  },
  button: {
    alignSelf: "flex-start",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    elevation: 1,
    width: "100%",
    backgroundColor: "#215a88",
  },

  text: {
    alignSelf: "center",
    fontSize: 18,

    letterSpacing: 0.25,
    color: "white",
  },
  textSignUp: {
    fontSize: 14,
    color: "#215a88",
    fontWeight: "bold",
  },
});
