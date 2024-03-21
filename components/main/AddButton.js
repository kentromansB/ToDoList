import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableWithoutFeedback,
  Pressable,
} from "react-native";
import { AntDesign, Entypo } from "@expo/vector-icons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

// import CameraScreen from "./Contribution";
// import Contribution from "./Contribution";

class AddButton extends Component {
  constructor(props) {
    super(props);
  }

  animation = new Animated.Value(0);

  toggleMenu = () => {
    const toValue = this.open ? 0 : 1;

    Animated.spring(this.animation, {
      toValue,
      friction: 5,
      useNativeDriver: true,
    }).start();
    this.open = !this.open;
  };

  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <TouchableWithoutFeedback>
          <Animated.View style={[styles.Abutton, styles.secondary, textStyle]}>
            <MaterialCommunityIcons
              name="format-color-text"
              size={20}
              color="#8E2835"
            />
          </Animated.View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback>
          <Animated.View style={[styles.Abutton, styles.secondary, micStyle]}>
            <MaterialCommunityIcons
              name="microphone"
              size={20}
              color="#8E2835"
            />
          </Animated.View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback>
          <Animated.View
            style={[styles.Abutton, styles.secondary, cameraStyle]}
          >
            <AntDesign name="camera" size={20} color="#8E2835" />
          </Animated.View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress={this.toggleMenu}>
          <Animated.View style={[styles.Abutton, styles.menu, rotation]}>
            <Entypo name="plus" size={24} color="#fff" />
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

export default AddButton;

const mapStateToProps = (store) => ({
  postsAll: store.userState.postsAll,
  users: store.userState.users,
});

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    position: "absolute",
  },
  right: {
    position: "absolute",
    bottom: 90,
    right: 60,
    alignItems: "center",
  },
  Abutton: {
    position: "absolute",
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    elevation: 2,
    alignItems: "center",
    justifyContent: "center",
    shadowRadius: 10,
    shadowColor: "#BFBFBF42",
    shadowOpacity: 0.3,
    shadowOffset: { height: 10 },
    //backgroundColor: "#8E2835",
  },
  secondary: {
    width: 40,
    height: 40,
    borderRadius: 48 / 2,
    backgroundColor: "#FCFCFC",
  },
  menu: {
    backgroundColor: "#8E2835",
  },
});
