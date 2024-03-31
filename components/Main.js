import React, { Component, useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Platform,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../AuthContext";
import axios from "axios";

import { scheduleNotification } from "../NotificationService";

import RegisterScreen from "./auth/Register";
import LoginScreen from "./auth/Login";
import NewTaskScreen from "./main/NewTask";
import EditTaskScreen from "./main/EditTask";
import HomeScreen from "./HomeScreen";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// Can use this function below or use Expo's Push Notification Tool from: https://expo.dev/notifications

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = await Notifications.getExpoPushTokenAsync({
      projectId: "ToDoList",
    });
    console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token.data;
}

const Stack = createStackNavigator();
function Main() {
  const [expoPushToken, setExpoPushToken] = useState("");
  const { isLoggedIn } = useAuth();
  console.log(isLoggedIn);

  useEffect(() => {
    sendNotification();
    scheduleNotification();
  }, []);

  useEffect(() => {
    console.log("Registering for push notifications...");
    registerForPushNotificationsAsync()
      .then((token) => {
        console.log("token: ", token);
        setExpoPushToken(token);
      })
      .catch((err) => console.log(err));
  }, []);

  async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      // Learn more about projectId:
      // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
      token = (
        await Notifications.getExpoPushTokenAsync({
          projectId: "44149cfa-791f-49d6-8d32-2bcc26aff129",
        })
      ).data;
      console.log(token);
    } else {
      alert("Must use physical device for Push Notifications");
    }

    return token;
  }
  const sendNotification = async () => {
    console.log("Sending push notification...");

    // notification message
    const message = {
      to: expoPushToken,
      sound: "default",
      title: "Good Day!",
      body: "Always remember to check for your pending tasks and finish them in time. Thank you!  ",
    };

    await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        host: "exp.host",
        accept: "application/json",
        "accept-encoding": "gzip, deflate",
        "content-type": "application/json",
      },
      body: JSON.stringify(message),
    });
  };

  const scheduleNotification = async () => {
    try {
      // Fetch tasks from your backend API
      const id = await AsyncStorage.getItem("user_id");
      const uid = JSON.parse(id);
      const res = await axios.get(
        "http://10.0.0.42:3007/api/fetchPendingTask",
        {
          params: {
            user_id: uid,
          },
        }
      );
      const tasks = res.data; // Assuming your API returns an array of tasks

      // Filter tasks that are within 24 hours from their deadline
      const filteredTasks = tasks.filter((task) => {
        const hoursUntilDeadline = calculateUntilDeadline(task.deadline);
        return hoursUntilDeadline <= 24 && hoursUntilDeadline > 0;
      });

      // Schedule notifications for each task
      filteredTasks.forEach(async (task) => {
        const notificationId = await Notifications.scheduleNotificationAsync({
          content: {
            title: "Task Deadline Reminder!",
            body: `Task: ${task.title} deadline is fast approaching. Please finish the task before the deadline. You got this!`,
          },
          trigger: { seconds: calculateUntilDeadline(task.deadline) },
        });
        // Store the notificationId along with the task for future reference
        console.log(
          `Scheduled notification for task ${task._id},Task Title ${task.title}. Notification ID: ${notificationId}`
        );
      });
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  };

  const calculateUntilDeadline = (deadline) => {
    console.log(deadline);
    const deadlineTime = new Date(deadline).getTime(); // Remove subtraction of 24 hours
    const currentTime = Date.now();
    const diff = deadlineTime - currentTime;
    const hours = Math.max(0, Math.floor(diff / (60 * 60 * 1000))); // Convert milliseconds to hours
    return hours;
  };

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

export default Main;

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
