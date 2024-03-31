import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  TextInput,
  FlatList,
  Alert,
  RefreshControl,
} from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const messages = [
  "Don't focus on the victory, focus on the task. - Erik Spoelstra.",
  "The greater the effort, the greater the glory. - Pierre Corneille",
  "The secret of getting ahead is getting started - Mark Twain",
  "There is nothing so fatal to character as half finished tasks. - David Lloyd George",
  "Tomorrow becomes never. No matter how small the task, take the first step now! - Tim Ferriss",
  "The price of success is hard work, dedication to the job at hand - Vince Lombardi",
  "The smallest task, well done, becomes a miracle of achievement - Og Mandino",
  "Better to complete a small task well, than to do much imperfectly. - Plato",
  "Nothing is more burdensome than an unfinished task. -  Jim Rohn",
  "No matter what you're doing, try to work at that task like it's your dream job. - Russell Simmons",
];

function CompletedTasks({ route, navigation }) {
  const [refreshing, setRefreshing] = useState(true);
  const [tasks, setTasks] = useState("");
  const [user_id, setUserId] = useState("");
  const [motd, setMotd] = useState("");
  const [filteredDataSource, setFilteredDataSource] = useState("");
  const [username, setUsername] = useState("");
  const [search, setSearch] = useState("");

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

  // Will load the API fetch function from the back end when the page renders
  useEffect(() => {
    fetchTask();
  }, []);

  const updateTaskNavigation = ({ item }) => {
    navigation.navigate("EditTask", { data: item });
  };

  //Function that calls the API request from the backend
  async function fetchTask() {
    try {
      const id = await AsyncStorage.getItem("user_id");
      const uid = JSON.parse(id);
      const res = await axios.get(
        "http://10.0.0.42:3007/api/fetchCompletedTask",
        {
          params: {
            user_id: uid,
          },
        }
      );
      setTasks(res.data);
      setFilteredDataSource(res.data);
      setRefreshing(false);
    } catch (error) {
      console.error(error);
    }
  }

  const onRefresh = () => {
    //Clear old data of the list
    setTasks([]);
    //Call the Service to get the latest data
    fetchTask();
  };

  const searchFilterFunction = (text) => {
    const newData = tasks.filter(
      (item) =>
        item.title.toUpperCase().startsWith(text.toUpperCase()) ||
        item.description.toUpperCase().startsWith(text.toUpperCase())
    );

    setFilteredDataSource(newData);
    setSearch(text);
  };

  const renderItem = ({ item, index, navigation }) => {
    const deadline = new Date(item?.deadline);
    return (
      <View style={styles.itemContainer}>
        <View style={{ flexDirection: "column", flex: 1 }}>
          <View style={styles.itemBody}>
            <Text style={[styles.itemsName, { fontWeight: "bold" }]}>
              {item?.title}
            </Text>
            <Text>{item?.description}</Text>
          </View>

          <View style={[styles.itemBody]}>
            <Text style={{ fontSize: 12, fontWeight: "bold" }}>
              Due: {deadline.toDateString()}
            </Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <View
            style={[
              styles.itemStatus,
              {
                backgroundColor:
                  item.completed == false
                    ? "#FFEFC5"
                    : "#B5F5D1" && item.completed == true
                    ? "#B5F5D1"
                    : null,
              },
            ]}
          >
            <Text
              style={[
                styles.statusFont,
                {
                  color:
                    item.completed == false
                      ? "#CEA032"
                      : "#63C579" && item.completed == true
                      ? "#63C579"
                      : null,
                },
              ]}
            >
              {" "}
              {item.completed == false
                ? "Pending"
                : item.completed === true
                ? "Completed"
                : null}
            </Text>
          </View>
          <TouchableOpacity
            key={index}
            onPress={() => updateTaskNavigation({ item })}
          >
            <View style={[styles.arrowRight]}>
              <MaterialCommunityIcons
                name="chevron-right"
                size={20}
                color="#215a88"
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const separator = () => {
    return <View style={{ height: 1, backgroundColor: "#E6E5E5" }} />;
  };

  return (
    <NavigationContainer independent={true}>
      <View style={styles.headLine}>
        <View style={styles.innercontainer}>
          <Text style={styles.textHead}>Welcome {username}, </Text>
          <Text style={styles.textSubHead}>Message of the Day</Text>
          <Text style={styles.textreg}>{motd}</Text>
          <View
            style={{
              flexDirection: "row",
              marginTop: 60,
              justifyContent: "center",
              marginVertical: 15,
            }}
          >
            <TextInput
              style={styles.input}
              placeholder="Search for Tasks..."
              onChangeText={(text) => searchFilterFunction(text)}
              value={search}
            ></TextInput>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "#215a88" }]}
              onPress={() => navigation.navigate("NewTask")}
            >
              <MaterialCommunityIcons name="plus" color={"#ffffff"} size={30} />
              <Text style={[{ fontSize: 13, color: "white" }]}>Add Task</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <FlatList
        nestedScrollEnabled
        style={styles.scrollContainer}
        numColumns={1}
        horizontal={false}
        data={filteredDataSource}
        renderItem={renderItem}
        ItemSeparatorComponent={separator}
        refreshControl={
          <RefreshControl
            //refresh control used for the Pull to Refresh
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      />
    </NavigationContainer>
  );
}

export default CompletedTasks;

const styles = StyleSheet.create({
  container: {
    alignContent: "center",
    top: 1,
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  bodycontainer: {
    paddingVertical: 3,
    paddingHorizontal: 15,
  },
  innercontainer: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginTop: 40,
    marginLeft: 20,
    marginRight: 15,
    //backgroundColor: '#FFFFFF',
  },
  headLine: {
    flexDirection: "column",
    width: "100%",
    height: 280,
    backgroundColor: "#215a88",
    padding: 10,
    // backgroundColor: "white",
    borderBottomRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  title: {
    paddingHorizontal: 20,
    paddingVertical: 50,
    alignItems: "center",
  },
  textHead: {
    flexDirection: "row",
    fontSize: 22,
    fontWeight: "bold",
    lineHeight: 21,
    letterSpacing: 0.25,
    color: "yellow",
  },
  textSubHead: {
    flexDirection: "row",
    fontSize: 15,
    fontWeight: "bold",
    lineHeight: 21,
    letterSpacing: 0,
    color: "white",
  },
  textreg: {
    flexDirection: "row",
    fontSize: 15,
    // fontWeight: "bold",
    lineHeight: 21,
    letterSpacing: 0.25,
    color: "white",
  },

  input: {
    height: 55,
    width: "80%",
    backgroundColor: "white",
    margin: 12,
    marginLeft: -5,
    paddingLeft: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  input1: {
    height: 45,
    width: "50%",
    backgroundColor: "white",
    margin: 12,
    paddingLeft: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  guidelines: {
    fontSize: 15,
    fontStyle: "bold",
    color: "#ffffff",
    paddingLeft: 5,
    paddingRight: 30,
  },
  itemContainer: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 15,
    fontWeight: "bold",
    lineHeight: 21,
    letterSpacing: 0.25,
    color: "white",
  },
  arrowRight: {
    backgroundColor: "#ebebeb",
    paddingHorizontal: 5,
    width: 30,
    height: 30,
    justifyContent: "center",
    right: 2,
    borderRadius: 5,
    margin: 10,
  },
  itemStatus: {
    backgroundColor: "#69C080",
    paddingHorizontal: 17,
    height: 30,
    justifyContent: "center",
    right: 14,
    borderRadius: 5,
  },
  itemBody: {
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: "center",
  },
  buttonContainer: {
    alignItems: "flex-end",
    alignSelf: "center",
  },
  button: {
    flex: 1,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
});
