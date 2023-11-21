import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";

export default function Header(props) {
  const [profileImage, setProfileImage] = useState(null);
  useEffect(() => {
    if (props.loggedIn == false) {
      setProfileImage(require("../assets/settings.png"));
    } else {
      setProfileImage(require("../assets/profile.png"));
    }
  }, []);
  return (
    <View style={styles.header}>
      <Image
        style={styles.logoImg}
        source={require("../assets/chatcharmlogo.png")}
      ></Image>
      <Text style={styles.logoText}>ChatCharm</Text>
      <TouchableOpacity
        style={styles.profile}
        onPress={
          !props.loggedIn
            ? props.setRegisterModalVisible
            : props.setModalVisible
        }
      >
        <Image style={styles.settings} source={profileImage}></Image>
      </TouchableOpacity>
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
  },
  logoText: {
    fontSize: 20,
    fontWeight: "600",
  },
  logoImg: {
    width: 25,
    height: 25,
  },
  settings: {
    width: 25,
    height: 25,
  },
  profile: {
    padding: 5,
  },
});