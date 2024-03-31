import React, { Component, useState } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { Pressable, StyleSheet } from "react-native";
const Tab = createMaterialBottomTabNavigator();

// import TaskScreen from "./main/Task";
import AllTasksScreen from "./main/AllTasks";
import CompletedTasksScreen from "./main/CompletedTasks";
import PendingScreen from "./main/PendingTasks";
// import EditTaskScreen from "./EditTask";
import SettingsScreen from "./main/Settings";

function HomeScreen() {
  return (
    <Tab.Navigator
      initialRouteName="Main"
      activeColor="#215A88"
      inactiveColor="#B2B2B2"
      barStyle={{ backgroundColor: "white" }}
      tabBarOptions={{
        showLabel: true, // This option always shows labels
      }}
    >
      <Tab.Screen
        name="AllTasks"
        listeners={({ navigation }) => ({
          tabPress: (event) => {
            event.preventDefault();
            navigation.navigate("AllTasks");
          },
        })}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="view-dashboard"
              color={color}
              size={26}
            />
          ),
          tabBarLabel: "All Tasks",
        }}
        children={(props) => <AllTasksScreen {...props} />}
      />

      <Tab.Screen
        name="PendingTasks"
        listeners={({ navigation }) => ({
          tabPress: (event) => {
            event.preventDefault();
            navigation.navigate("PendingTasks");
          },
        })}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="clock-fast" color={color} size={26} />
          ),
          tabBarLabel: "Pending",
        }}
        children={(props) => <PendingScreen {...props} />}
      />
      <Tab.Screen
        name="CompletedTasks"
        listeners={({ navigation }) => ({
          tabPress: (event) => {
            event.preventDefault();
            navigation.navigate("CompletedTasks");
          },
        })}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="format-list-checks"
              color={color}
              size={26}
            />
          ),
          tabBarLabel: "Completed",
        }}
        children={(props) => <CompletedTasksScreen {...props} />}
      />

      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        listeners={({ navigation }) => ({
          tabPress: (event) => {
            event.preventDefault();
            navigation.navigate("Settings");
          },
        })}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cog" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default HomeScreen;
