import React, { Component } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Icon from "react-native-vector-icons/Ionicons";
import { createStackNavigator } from "@react-navigation/stack";
const ProfileStack = createStackNavigator();

import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

const Tab = createMaterialBottomTabNavigator();
const EmptyScreen = () => {
  return null;
};

import HomeScreen from "./main/Home";
import TaskScreen from "./main/Tasks/Task";
import SettingsScreen from "./main/Settings";


export class Main extends Component {

  render() {
    

    return (
      <Tab.Navigator
        initialRouteName="Home"
        activeColor="#215A88"
        inactiveColor="#B2B2B2"
        barStyle={{ backgroundColor: "#f2f2f2" }}
        tabBarOptions={{
          showLabel: true, // This option always shows labels
          
        }}
      >
        <Tab.Screen
          name="Home"
          navigation = {this.props.navigation}
          listeners={({ navigation }) => ({
            tabPress: (event) => {
              event.preventDefault();
              navigation.navigate("Home");
            },
          })}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={26} />
            ),
          }}
          children={() => <HomeScreen  />}
        />
        <Tab.Screen
          name="Tasks"
          component={TaskScreen}
          navigation = {this.props.navigation}
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
            tabBarLabel: 'Tasks'
          }}
          
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
