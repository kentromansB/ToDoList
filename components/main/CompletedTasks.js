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
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

function CompletedTasks({ navigation, route, language }) {
  const [refreshing, setRefreshing] = useState(true);
  const [tasks, setTasks] = useState("");
  const [user_id, setUserId] = useState("");

  useEffect(() => {
    fetchTask();
  }, []);

  async function fetchTask() {
    try {
      const id = await AsyncStorage.getItem("user_id");
      const uid = JSON.parse(id);
      setUserId(uid);
      const res = await axios.get(
        "http://10.0.0.42:3007/api/fetchCompletedTask",
        {
          params: {
            user_id: user_id,
          },
        }
      );
      setTasks(res.data);
      setRefreshing(false);
    } catch (error) {
      console.error(error);
      console.log(res.data);
    }
  }

  const onRefresh = () => {
    //Clear old data of the list
    setTasks([]);
    //Call the Service to get the latest data
    fetchTask();
  };

  const renderItem = ({ item, index }) => {
    const deadline = new Date(item?.deadline);
    return (
      // UserContribution.js
      <TouchableOpacity
        key={index}
        style={styles.itemContainer}
        onPress={() => navigation.navigate("UserContribution", { data: item })}
      >
        <View style={{ flexDirection: "column", flex: 1 }}>
          <View style={styles.itemBody}>
            <Text style={styles.itemsName}>{item?.title}</Text>
            <Text>{item?.description}</Text>
          </View>

          <View style={[styles.itemBody]}>
            <Text style={{ fontSize: 12 }}>{deadline.toDateString()}</Text>
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
          <View style={[styles.arrowRight]}>
            <MaterialCommunityIcons
              name="chevron-right"
              size={20}
              color="#215a88"
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const separator = () => {
    return <View style={{ height: 1, backgroundColor: "#E6E5E5" }} />;
  };

  return (
    <FlatList
      nestedScrollEnabled
      numColumns={1}
      horizontal={false}
      data={tasks}
      style={{ flex: 1 }}
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
  );
}

export default CompletedTasks;

const styles = StyleSheet.create({
  title: {
    top: 20,
    left: 10,
  },
  container: {
    alignItems: "flex-start",
    marginBottom: 20,
    flex: 1,
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
});
