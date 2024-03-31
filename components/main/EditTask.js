import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Image,
  Button,
  Platform,
  DatePickerIOS,
  TouchableOpacity,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Alert,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Checkbox from "expo-checkbox";

function EditTask({ currentUser, route, navigation }) {
  const { data } = route?.params;
  const [title, setTitle] = useState(data?.title);
  const [description, setDescription] = useState(data?.description);
  const [date, setDate] = useState(new Date(data?.deadline));
  const [status, setStatus] = useState(data?.completed);
  const [taskID, setTaskID] = useState(data?._id);
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [username, setUsername] = useState("");
  const [user_id, setUserId] = useState("");
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [editable, setEditable] = useState(false);

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

  // Update Task without changing the task status to completed
  const updateTask = async () => {
    try {
      const response = await axios.put(
        `http://10.0.0.42:3007/api/updateTask/${data?._id}`,
        {
          title: title,
          description: description,
          deadline: date.toDateString(),
          completed: status,
          username: username,
          user_id: user_id,
        }
      );
      Alert.alert(
        "Task Successfully Updated",
        "Task Name: " + title + " edited successfully"
      );
      navigation.goBack();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };
  // Update Task and changing the task status to completed
  const completeTask = async () => {
    try {
      const response = await axios.put(
        `http://10.0.0.42:3007/api/updateTask/${data?._id}`,
        {
          title: title,
          description: description,
          deadline: date.toDateString(),
          completed: "true",
          username: username,
          user_id: user_id,
        }
      );
      Alert.alert(
        "Task Successfully Updated",
        "Task Name: " + title + " marked as completed"
      );
      navigation.goBack();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };
  const deleteTask = async () => {
    try {
      const response = await axios.delete(
        `http://10.0.0.42:3007/api/deleteTask/${data?._id}`
      );
      Alert.alert("Task Successfully Deleted", "Task Name: " + title);
      navigation.goBack();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const showMode = () => {
    setShow(true);
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  if (status == true) {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.bodycontainer}>
          <View style={{ marginVertical: 15 }}>
            <Text style={[styles.text, { fontSize: 16 }]}>
              This task is completed.
            </Text>
            <Text style={[styles.text, { fontSize: 16 }]}>
              Please complete your other tasks in time.
            </Text>
          </View>

          <View style={{ marginVertical: 5 }}>
            <Text style={[styles.text, { fontSize: 16 }]}>Task Name</Text>
            <Text>Title of your task.</Text>
            <TextInput
              style={[styles.input, !editable && styles.disabled]}
              multiline={true}
              autoCapitalize="none"
              editable={editable}
              value={title}
            />
          </View>
          <View>
            <Text style={[styles.text, { fontSize: 16 }]}>About the Task</Text>
            <Text>
              Detailed description about the Task, to help you remember what to
              do.
            </Text>
            <TextInput
              multiline={true}
              value={description}
              editable={editable}
              style={[
                styles.addButton,
                { height: 180 },
                { paddingHorizontal: 10, flexDirection: "row" },
                !editable && styles.disabled,
              ]}
              onChangeText={(description) => setDescription(description)}
            ></TextInput>
          </View>
          <View>
            <Text style={[styles.text, { fontSize: 16 }]}>Deadline</Text>
            <View style={styles.container}>
              <TextInput
                style={[styles.input, !editable && styles.disabled]}
                multiline={true}
                autoCapitalize="none"
                editable={editable}
                value={date.toDateString()}
                onChangeText={(title) => setTitle(title)}
              />
            </View>
          </View>
        </View>
        <View style={styles.checkboxContainer}>
          <Checkbox
            style={styles.checkbox}
            value={toggleCheckBox}
            onValueChange={(newValue) => setToggleCheckBox(newValue)}
            color={toggleCheckBox ? "#215a88" : undefined}
          />

          <Text style={styles.guidelines}> Delete Task </Text>
        </View>
        <Text style={styles.guidelines2}>
          {" "}
          Note: The deletion of a task is irreversible, proceed with caution
        </Text>
        <View
          style={{
            flexDirection: "row",
            flex: 1,
            justifyContent: "center",
            marginVertical: 25,
          }}
        >
          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: toggleCheckBox ? "#215a88" : "#91B2EB" },
            ]}
            onPress={() => deleteTask()}
            disabled={!toggleCheckBox}
          >
            <Text style={[styles.text, { fontSize: 15, color: "white" }]}>
              Delete Task
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  } else {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.bodycontainer}>
          <View style={{ marginVertical: 15 }}>
            <Text style={[{ fontSize: 18 }]}>
              Edit task details, deadline or mark the task as completed.
            </Text>
          </View>

          <View style={{ marginVertical: 5 }}>
            <Text style={[styles.text, { fontSize: 16 }]}>Task Name</Text>
            <TextInput
              style={styles.input}
              multiline={true}
              autoCapitalize="none"
              value={title}
              onChangeText={(title) => setTitle(title)}
            />
          </View>
          <View>
            <Text style={[styles.text, { fontSize: 16 }]}>About the Task</Text>
            <Text>
              Detailed description about the Task, to help you remember what to
              do.
            </Text>
            <TextInput
              multiline={true}
              value={description}
              style={[
                styles.addButton,
                { height: 180 },
                { paddingHorizontal: 10, flexDirection: "row" },
              ]}
              onChangeText={(description) => setDescription(description)}
            ></TextInput>
          </View>
          <View>
            <Text style={[styles.text, { fontSize: 16 }]}>Deadline</Text>
            <View style={styles.container}>
              <Text style={{ fontSize: 14 }}>
                Deadline: {date.toDateString()}
              </Text>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: "#215a88" }]}
                onPress={showMode}
              >
                <Text style={[styles.text, { fontSize: 16, color: "white" }]}>
                  Select Date
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode="date"
              is24Hour={true}
              display="default"
              onChange={onChange}
            />
          )}
        </View>
        {data?.completed == false ? (
          <View style={styles.checkboxContainer}>
            <Checkbox
              style={styles.checkbox}
              value={toggleCheckBox}
              onValueChange={(newValue) => setToggleCheckBox(newValue)}
              color={toggleCheckBox ? "#215a88" : undefined}
            />

            <Text style={styles.guidelines}> Mark this task as COMPLETED </Text>
          </View>
        ) : null}

        {toggleCheckBox == true ? (
          <View
            style={{
              flexDirection: "row",
              flex: 1,
              justifyContent: "center",
              marginVertical: 25,
            }}
          >
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "#215a88" }]}
              onPress={() => completeTask()}
            >
              <Text style={[styles.text, { fontSize: 15, color: "white" }]}>
                Submit as Completed
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View
            style={{
              flexDirection: "row",
              flex: 1,
              justifyContent: "center",
              marginVertical: 25,
            }}
          >
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "#215a88" }]}
              onPress={() => updateTask()}
            >
              <Text style={[styles.text, { fontSize: 15, color: "white" }]}>
                Submit
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    );
  }
}

export default EditTask;
const styles = StyleSheet.create({
  container: {
    alignContent: "center",
    top: 1,
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  input: {
    letterSpacing: 0.25,
    height: 50,
    width: "95%",
    paddingLeft: 12,
    paddingTop: 1,
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#707070",
  },
  text: {
    fontWeight: "bold",
    fontSize: 20,
    letterSpacing: 0.5,
  },
  guidelines2: {
    fontSize: 12,
    fontStyle: "italic",
    color: "#707070",
    alignContent: "center",
  },
  bodycontainer: {
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  addButton: {
    borderColor: "#70707033",
    borderWidth: 1.5,
    marginVertical: 10,
    borderRadius: 7,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    flex: 1,
    borderRadius: 5,
    alignItems: "center",
    paddingVertical: 15,
  },
  checkboxContainer: {
    flexDirection: "row",
    marginVertical: 10,
    alignItems: "center",
    //marginRight: 50,
    //paddingRight: 50,
    alignContent: "center",
    justifyContent: "center",
    paddingTop: 20,
  },
  disabled: {
    color: "black",
  },
});
