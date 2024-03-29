import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  TextInput,
  FlatList,
  SafeAreaView,
  Button,
  Alert,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import AllTasksScreen from "./AllTasks";
import CompletedTasksScreen from "./CompletedTasks";
import PendingScreen from "./PendingTasks";
import UpdateTaskScreen from "./EditTask";

import { NavigationContainer } from "@react-navigation/native";

import AsyncStorage from "@react-native-async-storage/async-storage";

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

const messages = [
  "Don't focus on the victory, focus on the task. - Erik Spoelstra.",
  "The greater the effort, the greater the glory. - Pierre Corneille",
  "The secret of getting ahead is getting started - Mark Twain",
  "There is nothing so fatal to character as half finished tasks. - David Lloyd George",
  "Tomorrow becomes never. No matter how small the task, take the first step now! - Tim Ferriss",
  "The price of success is hard work, dedication to the job at hand - Vince Lombardi",
  "Don't search for inspiration when you have a task to do; Just start your work and you will see that it will soon find you. - Charles Ghigna",
  "The smallest task, well done, becomes a miracle of achievement - Og Mandino",
  "Better to complete a small task well, than to do much imperfectly. - Plato",
  "Nothing is more burdensome than an unfinished task. -  Jim Rohn",
  "To focus our mind on the task at hand-with fierce concentration-m akes for a productive use of time. - R. C. Sproul",
  "No matter what you're doing, try to work at that task like it's your dream job. - Russell Simmons",
];

function Task({ route, navigation }) {
  const [username, setUsername] = useState("");
  const [user_id, setUserId] = useState("");
  const [motd, setMotd] = useState("");
  const [show, setShow] = useState(true);

  //Fetch User
  async function getUser() {
    const user = await AsyncStorage.getItem("username");
    const id = await AsyncStorage.getItem("user_id");
    const uid = JSON.parse(id);
    const userName = JSON.parse(user);
    setUsername(userName);
    setUserId(uid);
    console.log(userName, "at app.jsx");
  }
  useEffect(() => {
    getUser();
  }, []);
  // Generate Message of the day
  const generateMotd = () => {
    const randomIndex = Math.floor(Math.random() * messages.length);
    setMotd(messages[randomIndex]);
  };

  useEffect(() => {
    generateMotd();
  }, []);

  return (
    <NavigationContainer independent={true}>
      <View style={styles.container}>
        <View style={styles.innercontainer}>
          <Text style={styles.textHead}>Welcome {username}, </Text>
          <Text style={styles.textSubHead}>Message of the Day</Text>
          <Text style={styles.textreg}>{motd}</Text>
        </View>
      </View>
      <Stack.Navigator>
        <Stack.Screen
          name="TopTab"
          component={TopTab}
          options={{ headerShown: false }}
          initialParams={{ username: username }}
        />
        <Stack.Screen
          name="UpdateTaskScreen"
          component={UpdateTaskScreen}
          options={{
            title: "Update Task Details",
            headerShadowVisible: false,
            headerTintColor: "black",
            headerStyle: {
              backgroundColor: "#f2f2f2",
              borderBottomWidth: 0,
            },
          }}
        />
      </Stack.Navigator>

      {/* {route?.name !== "UpdateTask" && ( */}
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate("NewTask")}
      >
        <MaterialCommunityIcons name="plus" color={"#ffffff"} size={40} />
      </Pressable>
      {/* )} */}
    </NavigationContainer>
  );
}

function TopTab({ route, navigation }) {
  const { data } = route?.params ?? {};
  const { currentUser } = route?.params ?? {};

  return (
    <Tab.Navigator
      labeled="true"
      screenOptions={({ route }) => ({
        tabBarContentContainerStyle: {
          backgroundColor: "#f2f2f2",
        },
        tabBarLabelStyle: { fontSize: 12 },
        tabBarActiveTintColor: "#215a88",
        tabBarInactiveTintColor: "#B2B2B2",
        tabBarShowLabel: true,
        tabBarPressColor: "#215a88",
      })}
    >
      <Tab.Screen
        name="AllTasks"
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="view-dashboard"
              color={color}
              size={26}
            />
          ),
          tabBarLabel: ({ focused, color }) => (
            <Text style={{ fontSize: 12, color: color, textAlign: "center" }}>
              All
            </Text>
          ),
        }}
        children={(props) => <AllTasksScreen />}
      />

      <Tab.Screen
        name="PendingTasks"
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="clock-fast" color={color} size={26} />
          ),
          tabBarLabel: ({ focused, color }) => (
            <Text style={{ fontSize: 12, color: color, textAlign: "center" }}>
              Pending
            </Text>
          ),
        }}
        children={(props) => <PendingScreen />}
      />
      <Tab.Screen
        name="CompletedTasks"
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="format-list-checks"
              color={color}
              size={26}
            />
          ),
          tabBarLabel: ({ focused, color }) => (
            <Text style={{ fontSize: 12, color: color, textAlign: "center" }}>
              Completed
            </Text>
          ),
        }}
        children={(props) => <CompletedTasksScreen />}
      />
    </Tab.Navigator>
  );
}

export default Task;

const styles = StyleSheet.create({
  title: {
    top: 20,
    left: 10,
  },
  container: {
    alignItems: "center",
    marginTop: 30,
    marginBottom: -450,
    flex: 1,
  },
  innercontainer: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginTop: 30,
    marginLeft: 20,
    marginRight: 15,
    //backgroundColor: '#FFFFFF',
  },
  button: {
    position: "absolute",
    width: 70,
    height: 70,
    borderRadius: 70 / 2,
    alignItems: "center",
    justifyContent: "center",
    //shadowRadius: 10,
    //shadowColor: "#F02A4B",
    //shadowOpacity: 0.3,
    //shadowOffset: { height: 10 },
    backgroundColor: "#91B2EB",
    bottom: 30,
    right: 30,
    elevation: 9,
  },

  textHead: {
    flexDirection: "row",
    fontSize: 21,
    fontWeight: "bold",
    lineHeight: 21,
    letterSpacing: 0.25,
    color: "#215a88",
  },
  textSubHead: {
    flexDirection: "row",
    fontSize: 15,
    fontWeight: "bold",
    lineHeight: 21,
    letterSpacing: 0.25,
    //color: "white",
  },
  textreg: {
    flexDirection: "row",
    fontSize: 15,
    // fontWeight: "bold",
    lineHeight: 21,
    letterSpacing: 0.25,
    //color: "white",
  },
  headLine: {
    flexDirection: "row",
    width: "100%",
    height: 110,
    backgroundColor: "#8E2835",
  },
  textHeadline: {
    flexDirection: "row",
    fontSize: 20,
    fontWeight: "bold",
    lineHeight: 21,
    letterSpacing: 0.25,
    color: "black",
  },
  searchBar: {
    top: 40,
    left: -120,
    width: "100%",
  },
  Kagan: {
    top: 90,
    left: 40,
  },
  grammar: {
    top: 70,
    left: 40,
  },
  pronun: {
    top: 100,
    left: 40,
  },
  textKagan: {
    flexDirection: "row",
    fontSize: 15,
    fontWeight: "bold",
    lineHeight: 21,
    letterSpacing: 0.25,
    color: "black",
  },

  buttonVocab: {
    alignSelf: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    width: "90%",
    backgroundColor: "#dadada",
    top: -70,
    left: -40,
    height: 280,
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
    borderBottomRightRadius: 7,
    borderBottomLeftRadius: 7,
    borderColor: "black",
  },
  buttonGrammar: {
    alignSelf: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    width: "90%",
    backgroundColor: "#dadada",
    top: -30,
    left: -40,
    height: 300,
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
    borderBottomRightRadius: 7,
    borderBottomLeftRadius: 7,
    borderColor: "black",
  },
  buttonPronun: {
    alignSelf: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    width: "90%",
    backgroundColor: "#dadada",
    top: -40,
    left: -40,
    height: 105,
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
    borderBottomRightRadius: 7,
    borderBottomLeftRadius: 7,
    borderColor: "black",
  },
  Vocab: {
    top: 10,
    left: -20,
    paddingBottom: 20,
  },
  VocabSubSub: {
    top: 5,
    left: -10,
  },
  VocabSub: {
    top: 5,
    left: -10,
  },
  textVocab: {
    fontSize: 20,
    fontWeight: "bold",
    lineHeight: 21,
    letterSpacing: 0.25,
    color: "black",
  },
  textVocabSub: {
    fontSize: 11,
    lineHeight: 21,
    letterSpacing: 0.25,
    color: "black",
  },
  textVocabSubSub: {
    fontSize: 11,
    lineHeight: 21,
    letterSpacing: 0.25,
    color: "#8E2835",
  },
  text: {
    fontSize: 15,
    fontWeight: "bold",
    lineHeight: 21,
    letterSpacing: 0.25,
    color: "white",
  },
  input: {
    height: 45,
    width: "90%",
    backgroundColor: "white",
    margin: 12,
    borderWidth: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  buttonAudio: {
    alignSelf: "center",
    justifyContent: "center",
    borderRadius: 50,
    elevation: 3,
    width: 50,
    backgroundColor: "#79222D",
    top: 300,
    left: 130,
    height: 50,
    borderColor: "black",
  },
  Icon: {
    left: 7,
  },
});
