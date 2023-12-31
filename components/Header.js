import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Header(props) {
  async function deleteChat() {
    await AsyncStorage.setItem("messages", "");
    props.setMessages([]);
    props.closeDropdown();
  }
  async function logout() {
    await AsyncStorage.setItem("jwt", "");
    props.setJWT("");
    props.setLoggedIn(false);
    props.setProfileURI("");
    props.closeDropdown();
  }

  return (
    <View style={styles.header}>
      <Image
        style={styles.logoImg}
        source={require("../assets/chatcharmlogo.png")}
      ></Image>
      <Text style={styles.logoText}>ChatCharm</Text>
      <TouchableOpacity
        style={styles.profile}
        onPress={() => props.setDropdownVisible(!props.dropdownVisible)}
      >
        <Image
          style={styles.settings}
          source={require("../assets/settings.png")}
        ></Image>
      </TouchableOpacity>
      {props.dropdownVisible && (
        <View
          style={[
            styles.dropdownMenu,
            props.loggedIn ? styles.dropdownLoggedIn : styles.dropdownGuest,
          ]}
        >
          <TouchableOpacity
            onPress={() => {
              props.loggedIn
                ? props.toggleModal("upload")
                : props.toggleModal("register");
            }}
          >
            <Text style={styles.dropdownText}>
              {props.loggedIn ? "Select profile Image" : "Register"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={deleteChat}>
            <Text style={styles.dropdownText}>Delete Chat</Text>
          </TouchableOpacity>
          {props.loggedIn ? (
            <TouchableOpacity onPress={logout}>
              <Text style={styles.dropdownText}>Logout</Text>
            </TouchableOpacity>
          ) : (
            ""
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    borderBottomWidth: 1,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 10,
    zIndex: 100,
  },
  logoText: {
    fontSize: 20,
    fontWeight: "600",
  },
  logoImg: {
    width: 35,
    height: 35,
    borderRadius: 17.5, //Half of width and height ==> MERKEN!!!
  },
  settings: {
    width: 30,
    height: 30,
  },
  profile: {
    padding: 5,
  },
  dropdownMenu: {
    position: "absolute",
    top: 35,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    shadowColor: "black",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  dropdownText: {
    fontSize: 18,
    marginVertical: 8,
  },
  dropdownLoggedIn: {
    left: "52%",
  },
  dropdownGuest: {
    left: "70%",
  },
});
