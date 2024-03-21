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

function NewTask({ currentUser, route, navigation }) {
  const [title, setTitle] = useState("");
  const [convertedLanguage, setConvertedLanguage] = useState("");
  const [history, setHistory] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [username, setUsername] = useState("");
  const [user_id, setUserId] = useState("");
  const [data, setData] = useState();

  //Fetch User
  async function getUser() {
    const user = await AsyncStorage.getItem("username");
    const id = await AsyncStorage.getItem("user_id");
    const uid = JSON.parse(id)
    const userName = JSON.parse(user)
    setUsername(userName)
    setUserId(uid)
    console.log(userName, "at app.jsx");
    
  }
  useEffect(() => {
    getUser();
  }, []);
  
  const createTask = async () => {
    try {
      const res = await axios.post("http://10.0.0.42:3007/api/createTask", {
        title: title,
        description: description,
        deadline: date.toDateString(),
        completed: "false",
        username: username,
        user_id: user_id,
      });
      console.log(res.data);
      // Show alert message
      Alert.alert("Registration successful", "You have been registered successfully.");
    } catch (error) {
      console.error(error);
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



  return (
    <ScrollView style={styles.container}>
      <View style={styles.bodycontainer}>
        <View style={{ marginVertical: 15 }}>
                
          <Text style={[{ fontSize: 18 }]}>
            Create tasks and add a deadline to keep you on track with your
            goals.
          </Text>
        </View>

        <View style={{ marginVertical: 5 }}>
          <Text style={[styles.text, { fontSize: 16 }]}>Task Name</Text>
          <TextInput
            style={styles.input}
            multiline={true}
            autoCapitalize="none"
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
          
          <Text style={{fontSize: 14}}>Date: {date.toDateString()}</Text>
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
            onPress={() => createTask(data)}
          >
            <Text style={[styles.text, { fontSize: 15, color: "white" }]}>
              Submit
            </Text>
          </TouchableOpacity>
        </View>
      
    </ScrollView>
  );
}

export default NewTask;
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
});
