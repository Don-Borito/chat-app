import { ScrollView, View, Text, StyleSheet } from "react-native";

export default function MessageContainer(props) {
  return (
    <ScrollView style={{ flex: 1 }}>
      {props.messages.map((message, index) => (
        <View
          key={index}
          style={
            message.sender === "user" ? styles.userMessage : styles.aiMessage
          }
        >
          <Text>{message.text}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#DCF8C6",
    borderRadius: 10,
    padding: 8,
    marginVertical: 5,
  },
  aiMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#ECECEC",
    borderRadius: 10,
    padding: 8,
    marginVertical: 5,
  },
});
