import React, { Component, useState } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Icon from "react-native-vector-icons/Ionicons";
import { createStackNavigator } from "@react-navigation/stack";
const ProfileStack = createStackNavigator();

import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Tab = createMaterialBottomTabNavigator();
const EmptyScreen = () => {
  return null;
};

import TaskScreen from "./main/Task";
import SettingsScreen from "./main/Settings";

export class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
    };
  }

  componentDidMount() {
    this.getUsername();
  }

  getUsername = async () => {
    try {
      const username = await AsyncStorage.getItem("username");
      if (username !== null) {
        this.setState({ username });
      }
    } catch (error) {
      console.error("Error retrieving username:", error);
    }
  };

  render() {
    return (
      <Tab.Navigator
        initialRouteName="Main"
        activeColor="#215A88"
        inactiveColor="#B2B2B2"
        barStyle={{ backgroundColor: "#f2f2f2" }}
        tabBarOptions={{
          showLabel: true, // This option always shows labels
        }}
      >
        <Tab.Screen
          name="Tasks"
          navigation={this.props.navigation}
          listeners={({ navigation }) => ({
            tabPress: (event) => {
              event.preventDefault();
              navigation.navigate("Tasks");
            },
          })}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="calendar-check"
                color={color}
                size={26}
              />
            ),
            tabBarLabel: "Tasks",
          }}
          children={(props) => <TaskScreen {...props} />}
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
}

export default Main;
