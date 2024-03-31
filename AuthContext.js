import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Alert } from "react-native";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const data = await AsyncStorage.getItem("token");
    if (data == null) {
      setIsLoggedIn(false);
      console.log(data, "false");
    } else {
      setIsLoggedIn(true);
      console.log(data, "true");
    }
  }

  const login = async (user, pass) => {
    console.log("1", user);
    setEmail(user);
    // console.log("2", username);
    console.log("3", pass);
    setPassword(pass);
    // console.log("4", password);
    try {
      const res = await axios.post("http://10.0.0.42:3007/api/login", {
        email: user,
        password: pass,
      });
      if (res.data.status == "ok") {
        Alert.alert("Logged In Successfull");
        console.log(res.data);
        AsyncStorage.setItem("token", res.data.token);
        AsyncStorage.setItem("email", JSON.stringify(res.data.email));
        AsyncStorage.setItem("username", JSON.stringify(res.data.username));
        AsyncStorage.setItem("firstname", JSON.stringify(res.data.firstname));
        AsyncStorage.setItem("lastname", JSON.stringify(res.data.lastname));
        AsyncStorage.setItem("user_id", JSON.stringify(res.data.user_id));
        setIsLoggedIn(true);
      } else {
        Alert.alert(res.data.data);
      }
    } catch (error) {
      console.error(error);
      console.log(res.data);
    }
  };

  const logout = () => {
    setEmail("");
    setPassword("");
    try {
      const token = AsyncStorage.getItem("token");
      axios.post(
        "http://10.0.0.42:3007/api/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      AsyncStorage.setItem("isLoggedIn", "false");
      AsyncStorage.setItem("token", "");
      AsyncStorage.setItem("email", "");
      AsyncStorage.setItem("username", "");
      AsyncStorage.setItem("firstname", "");
      AsyncStorage.setItem("lastname", "");
      AsyncStorage.setItem("user_id", "");
      console.log(token, "at app.jsx");
    } catch (error) {
      console.error("Logout failed:", error);
    }
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, email, password, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
