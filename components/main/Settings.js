import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from "react-native";

import {
  Title,
  Text,
  TouchableRipple,
} from "react-native-paper";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import axios from "axios";




function Settings({navigation}) {
  const onLogout = async () =>{
    try {
      const token = await AsyncStorage.getItem("token")
      await axios.post('http://10.0.0.42:3007/api/logout', {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      await AsyncStorage.clear();
      
      navigation.navigate("Login")
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };
 
    // This will render the Basic users functions
    return (
      <SafeAreaView style={styles.container}>
       

        <View style={styles.menuWrapper}>
          <TouchableRipple onPress={() => onLogout()}>
            <View style={styles.menuItem}>
              <Icon name="logout" color="#777777" size={25} />
              <Text style={styles.menuItemText}>Logout</Text>
            </View>
          </TouchableRipple>
        </View>
      </SafeAreaView>
    );
  
}


export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: 30,
    marginBottom: 30,
  },
  userInfoSelection: {
    // paddingHorizontal: 30,
    marginTop: 20,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: "500",
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: "#dddddd",
    borderBottomWidth: 1,
    borderTopColor: "#dddddd",
    borderTopWidth: 1,
    flexDirection: "row",
    height: 100,
  },
  infoBox: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },

  menuWrapper: {
    marginTop: 10,
  },

  menuItem: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: "#777777",
    marginLeft: 20,
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 26,
  },
});
