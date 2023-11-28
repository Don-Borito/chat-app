import { ScrollView, View, Text, StyleSheet, Image } from "react-native";
import React from "react";

export default function MessageContainer(props) {
  return (
    <ScrollView style={{ flex: 1 }}>
      {props.messages.map((message, index) => (
        <View
          key={index}
          style={[
            styles.messageContainer,
            message.sender === "user" ? styles.userContainer : styles.aiContainer,
          ]}
        >
          {message.sender === "ai" && (
            <Image
              style={styles.profilePic}
              source={require("../assets/chatcharmlogo.png")}
            />
          )}
          <View
            style={
              message.sender === "user" ? styles.userMessage : styles.aiMessage
            }
          >
            <Text>{message.text}</Text>
          </View>
          {message.sender === "user" && (
            <Image
              style={styles.profilePic}
              source={require("../assets/profile.png")}
            />
          )}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  userContainer: {
    justifyContent: 'flex-end',
  },
  aiContainer: {
    justifyContent: 'flex-start',
  },
  userMessage: {
    backgroundColor: "#DCF8C6",
    borderRadius: 10,
    padding: 8,
    maxWidth: '40%',
    marginLeft: 10,
    alignSelf: 'flex-end',
  },
  aiMessage: {
    backgroundColor: "#ECECEC",
    borderRadius: 10,
    padding: 8,
    maxWidth: '40%',
    marginRight: 10,
    alignSelf: 'flex-start',
  },
  profilePic: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginHorizontal: 10
  }
});
