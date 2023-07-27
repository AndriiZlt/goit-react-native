import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import userImage from "../assets/user.jpg";
import posts from "../posts.js";

const PostsScreen = ({ navigation }) => {
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
      <FlatList
        style={styles.posts}
        scrollEnabled={true}
        data={posts}
        renderItem={({ item }) => {
          return (
            <View style={styles.post}>
              <Image
                style={styles.postImage}
                source={item.image}
                resizeMode="contain"
              ></Image>
              <Text style={styles.postTitle}>{item.title}</Text>
              <View style={styles.postStats}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate(`Коментарі`);
                  }}
                >
                  <Image
                    style={styles.statsIcon}
                    source={
                      item.comments === 0
                        ? require("../assets/message-circle-grey.png")
                        : require("../assets/message-circle.png")
                    }
                  />
                </TouchableOpacity>

                <Text style={styles.statsText}>{item.comments}</Text>
                {/* <Image
                  source={require("../assets/thumbs-up.png")}
                  style={styles.statsIcon}
                />
                <Text style={styles.statsText}>{item.likes}</Text> */}
                <View style={styles.statsLocation}>
                  <Image
                    style={styles.statsIcon}
                    source={require("../assets/map-pin.png")}
                  />
                  <Text
                    style={styles.statsTextLocation}
                    onPress={() => {
                      navigation.navigate("Map");
                    }}
                  >
                    {item.location}
                  </Text>
                </View>
              </View>
            </View>
          );
        }}
        keyExtractor={(item) => item.id}
      ></FlatList>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    fontFamily: "Roboto",
    width: "100%",
    height: "100%",
    paddingHorizontal: 16,
    paddingVertical: 32,
    backgroundColor: "#fff",
  },

  user: {
    display: "flex",
    flexDirection: "row",
    height: 60,
    width: "100%",
    zIndex: 4,
    marginBottom: 32,
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

  posts: {
    width: "100%",
  },

  post: {
    width: "100%",
    marginBottom: 32,
  },

  postImage: {
    flex: 1,
    width: "100%",
    height: undefined,
    aspectRatio: 1.429166666666667,
    marginBottom: 8,
  },

  postTitle: {
    fontSize: 16,
    lineHeight: 18.75,
    fontWeight: 500,
    marginBottom: 8,
  },

  postStats: {
    position: "relative",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },

  statsIcon: {
    width: 24,
    height: 24,
    marginRight: 6,
  },

  statsText: {
    fontSize: 16,
    fontWeight: 400,
    lineHeight: 18.75,
    marginRight: 24,
    alignSelf: "center",
  },

  statsLocation: {
    position: "absolute",
    right: 0,
    display: "flex",
    flexDirection: "row",
  },
  statsTextLocation: {
    fontSize: 16,
    fontWeight: 400,
    lineHeight: 18.75,
    alignSelf: "center",
    textDecorationLine: "underline",
  },
});

export default PostsScreen;
