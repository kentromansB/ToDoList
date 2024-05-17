import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableWithoutFeedback,
  Pressable,
} from "react-native";

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
