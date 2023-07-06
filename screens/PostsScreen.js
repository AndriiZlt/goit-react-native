import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  FlatList,
  Image,
} from "react-native";
import userImage from "../assets/user.jpg";

const PostsScreen = () => {
  const [userPhoto, setUserPhoto] = useState(userImage);
  const [userName, setUserName] = useState("Natali Romanova");
  const [userMail, setUserMail] = useState("email@example.com");

  const posts = [
    {
      id: "1",
      title: "Ліс",
      image: require("../assets/postBackground.png"),
      comments: 0,
      likes: 153,
      location: "Ivano-Frankivs'k Region, Ukraine",
    },
    {
      id: "2",
      title: "Захід на Чорному морі",
      image: require("../assets/post2-image.jpg"),
      comments: 3,
      likes: 200,
      location: "Ukraine",
    },
    {
      id: "3",
      title: "Старий будиночок у Венеції",
      image: require("../assets/post3-image.jpg"),
      comments: 50,
      likes: 200,
      location: "Italy",
    },
  ];

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
                <Image
                  style={styles.statsIcon}
                  source={
                    item.comments === 0
                      ? require("../assets/message-circle-grey.png")
                      : require("../assets/message-circle.png")
                  }
                />
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
                  <Text style={styles.statsTextLocation}>{item.location}</Text>
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
