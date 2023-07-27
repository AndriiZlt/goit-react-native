import {
  View,
  ImageBackground,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  Text,
  TextInput,
  Pressable,
  Keyboard,
  SafeAreaView,
  ScrollView,
  StatusBar,
  FlatList,
} from "react-native";
import { Dimensions } from "react-native";
import React, { useState } from "react";

const ProfileScreen = () => {
  const [userPhoto, setUserPhoto] = useState(require("../assets/user.jpg"));

  const posts = [
    {
      id: "1",
      title: "Ліс",
      image: require("../assets/postBackground.png"),
      comments: 8,
      likes: 153,
      location: "Ukraine",
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
    <>
      <Image
        source={require("../assets/background/BG.jpg")}
        style={styles.background}
      />
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View
            style={{ backgroundColor: "rgba(0, 0, 0, 0)", height: 147 }}
          ></View>
          <View style={styles.feed}>
            <View style={styles.user}>
              <View style={{ positon: "relative" }}>
                <View style={styles.photo}>
                  <Image
                    source={userPhoto}
                    resizeMode="cover"
                    style={styles.image}
                  />
                  <View style={styles.addIcon}>
                    <Image
                      style={styles.ellipse}
                      source={require("../assets/ellipse.png")}
                      resizeMode="cover"
                    />
                    <Image
                      style={styles.xIcon}
                      source={require("../assets/union-x.png")}
                      resizeMode="cover"
                    />
                  </View>
                </View>
              </View>

              <Image
                source={require("../assets/log-out.png")}
                style={{
                  position: "absolute",
                  right: 16,
                  bottom: 80,
                  zIndex: 6,
                  width: 24,
                  height: 24,
                }}
              />
              <Text style={styles.nameTitle}>Natali Romanova</Text>
            </View>
            <FlatList
              style={styles.posts}
              scrollEnabled={false}
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
                        source={require("../assets/message-circle.png")}
                      />
                      <Text style={styles.statsText}>{item.comments}</Text>
                      <Image
                        source={require("../assets/thumbs-up.png")}
                        style={styles.statsIcon}
                      />
                      <Text style={styles.statsText}>{item.likes}</Text>
                      <View style={styles.statsLocation}>
                        <Image
                          style={styles.statsIcon}
                          source={require("../assets/map-pin.png")}
                        />
                        <Text style={styles.statsTextLocation}>
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
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  background: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -10,
    width: Dimensions.get("window").width,
    height: "100%",
    width: "100%",
  },

  container: {
    paddingTop: StatusBar.currentHeight,
  },

  scrollView: {
    backgroundColor: "rgba(0, 0, 0, 0)",
    // height: "100%",
  },

  feed: {
    position: "relative",
    backgroundColor: "#FFFFFF",
    paddingTop: 160,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },

  user: {
    position: "absolute",
    top: -60,
    // borderWidth: 1,
    // borderColor: "tomato",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 32,
  },

  photo: {
    position: "relative",
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
    zIndex: 4,
    marginBottom: 32,
  },

  image: {
    width: 120,
    height: 120,
    borderRadius: 16,
  },

  addIcon: {
    position: "relative",
    top: -44.17533905932738,
    left: 107.5,
    width: 25,
    height: 25,
    padding: 5.5,
    zIndex: 5,
  },

  ellipse: {
    position: "absolute",
    width: 25,
    height: 25,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  xIcon: {
    width: 13,
    height: 13,
  },

  nameTitle: {
    fontSize: 30,
    lineHeight: 35.16,
    fontWeight: 500,
  },

  posts: {
    width: "100%",
    paddingHorizontal: 16,
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

export default ProfileScreen;
