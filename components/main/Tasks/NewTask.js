import React, { useState } from "react";
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

function NewTask({ currentUser, route, navigation }) {
  const [taskName, setTaskName] = useState("");
  const [convertedLanguage, setConvertedLanguage] = useState("");
  const [history, setHistory] = useState("");
  const [about, setAbout] = useState("");
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  const Capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  //   const filteredLanguage = Capitalize(language);
  //   const filteredNote = Capitalize(note);

  const submit = async () => {
    saveUserData();
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
            onChangeText={() => setTaskName()}
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
            onChangeText={() => setAbout()}
          ></TextInput>
        </View>
        <View>
        <Text style={[styles.text, { fontSize: 16 }]}>Deadline</Text>
          <View style={styles.container}>
          
          <Text style={{fontSize: 14}}>Date: {date.toDateString()}</Text>
            <TouchableOpacity
            style={[styles.button, { backgroundColor: "#215a88" }]}
           onPress={showDatepicker}
          >
            <Text style={[styles.text, { fontSize: 16, color: "white" }]}>
              Select Date
            </Text>
          </TouchableOpacity>
          </View>
          <View style={styles.container}>
          <Text style={{fontSize: 14}}>Time: {date.toLocaleTimeString()}</Text>
            <TouchableOpacity
            style={[styles.button, { backgroundColor: "#215a88" }]}
           onPress={showTimepicker}
          >
            <Text style={[styles.text, { fontSize: 15, color: "white" }]}>
              Select Time
            </Text>
          </TouchableOpacity>
          </View>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
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
            onPress={() => submit()}
          >
            <Text style={[styles.text, { fontSize: 15, color: "white" }]}>
              Submit
            </Text>
          </TouchableOpacity>
        </View>
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
