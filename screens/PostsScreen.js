import React, { useState } from "react";
import { View, StyleSheet, Text, ImageBackground } from "react-native";
import userImage from "../assets/user.jpg";

const Posts = () => {
  const [userPhoto, setUserPhoto] = useState(userImage);
  const [userName, setUserName] = useState("Natali Romanova");
  const [userMail, setUserMail] = useState("email@example.com");

  return (
    <View style={styles.container}>
      <View style={styles.user}>
        <View style={styles.photo}>
          <ImageBackground
            source={userPhoto}
            resizeMode="cover"
            style={styles.image}
          />
        </View>
        <View style={styles.userDetails}>
          <Text style={styles.userName}>{userName}</Text>
          <Text style={styles.userMail}>{userMail}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    fontFamily: "Roboto",
    width: "100%",
    paddingHorizontal: 16,
    paddingVertical: 32,
  },

  user: {
    display: "flex",
    flexDirection: "row",
    height: 60,
    width: "100%",
    zIndex: 4,
  },

  photo: {
    width: 60,
    height: 60,
    overflow: "hidden",
    justifyContent: "center",
    borderRadius: 16,
  },

  image: {
    flex: 1,
    justifyContent: "center",
  },

  userDetails: {
    marginLeft: 8,
    justifyContent: "center",
  },

  userName: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: 700,
    fontSize: 13,
    lineHeight: 15,
    color: "#212121",
  },

  userMail: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: 11,
    lineHeight: 13,
    color: "rgba(33, 33, 33, 0.8)",
  },
});

export default Posts;
