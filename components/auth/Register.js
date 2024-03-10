import React, { Component, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert
} from "react-native";

import { TextInput } from "react-native-paper";
import axios from "axios";
import { checkUsername } from "../../controllers/userController";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState();
  // function onSignUp() {
  //     axios.post('/register', {
  //         username: username,
  //         password: password
  //       })
  //       .then(response => {
  //         console.log(response.data);
  //       })

  //   }
  const fetchApi = async () => {
    try {
      const res = await axios.get("http://10.0.0.42:3007/");
      console.log(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const checkUsernameApi = async () => {
    const res = await axios.post('http://10.0.0.42:3007/api/checkUsername', { username: username })
    .then(res => {
        if (res.data.exists) {
            Alert.alert('User Exists', 'This username is already taken.');
            console.log(res.data)
        } else {
            // Alert.alert('User Does Not Exist', 'You can use this username.');
            registerApi(username)
        }
    })
    .catch(error => {
        Alert.alert('Error', 'Failed to check user existence.');
    });
};


  const registerApi = async () => {
    try {
      const res = await axios.post("http://10.0.0.42:3007/api/register", {
        username: username,
        password: password,
      });
      console.log(res.data);
      // Show alert message
      Alert.alert("Registration successful", "You have been registered successfully.");
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchApi();
  }, []);


  return (
    <ScrollView style={styles.container}>
      <View>
        <Text style={styles.welcome}>Welcome to ToDo,</Text>
        <Text style={styles.subtitle}>Create an account to get started!</Text>
      </View>
      <View style={styles.loginGroup}>
        <View style={styles.space}>
          <TextInput
            label="Username"
            activeUnderlineColor="#215a88"
            placeholder={"username"}
            onChangeText={(username) => setUsername(username)}
          />
        </View>

        <View style={styles.space}>
          <TextInput
            label="Password"
            iconSize={25}
            iconColor={"#222222"}
            onChangeText={(password) => setPassword(password)}
            activeUnderlineColor="#215a88"
          />
        </View>
      </View>
      <View style={{ paddingTop: 20 }}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => checkUsernameApi(data)}
        >
          <Text style={styles.text}>Sign Up</Text>
        </TouchableOpacity>
      </View>
      <View style={{ alignItems: "center", paddingVertical: 20 }}>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text>
            I'm already a member. <Text style={styles.textSignUp}>Sign In</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

export default Register;

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
  buttonGoogle: {
    alignSelf: "flex-start",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    elevation: 1,
    width: "80%",
    backgroundColor: "#dadada",
    top: 165,
  },
  text: {
    alignSelf: "center",
    fontSize: 18,

    letterSpacing: 0.25,
    color: "white",
  },
  logo: {
    width: 16,
    height: 16,
    right: 10,
  },
  textGoogle: {
    alignSelf: "center",
    paddingLeft: 40,
    paddingTop: 15,
    fontSize: 18,

    lineHeight: 21,
    letterSpacing: 0.25,
    color: "black",
    position: "absolute",
  },
  textGrey: {
    fontSize: 15,
    color: "grey",
    //fontWeight: "bold",
    //left: 50,
  },
  textMini: {
    fontSize: 12,
    color: "gray",
    fontWeight: "bold",
    left: 200,
  },
  textSignUp: {
    fontSize: 14,
    color: "#215a88",
    fontWeight: "bold",
  },
  input: {
    height: 45,
    width: "100%",
    marginTop: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "gray",
    paddingLeft: 10,
  },
});
