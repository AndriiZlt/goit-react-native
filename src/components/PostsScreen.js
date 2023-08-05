import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
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
// import posts from "../../posts.js";
import authSelectors from "../redux/selectors";
import { doc, updateDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../../config";

const PostsScreen = ({ navigation }) => {
  const [userPhoto, _] = useState(userImage);
  const userName = useSelector(authSelectors.getUserName);
  const userMail = useSelector(authSelectors.getUserEmail);
  const [posts, setPosts] = useState([]);

  const fetchPost = async () => {
    await getDocs(collection(db, "posts")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setPosts(newData);
    });
  };

  useEffect(() => {
    fetchPost();
  }, []);

  const updateLikes = (postId, currentLikes) => {
    const updateDataInFirestore = async (collectionName, docId) => {
      try {
        const ref = doc(db, collectionName, docId);
        await updateDoc(ref, {
          likes: currentLikes + 1,
        });
        console.log("document updated");
        fetchPost();
      } catch (error) {
        console.log(error);
      }
    };
    updateDataInFirestore("posts", postId);
  };

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
                source={{ uri: item.image }}
                resizeMode="contain"
              ></Image>
              <Text style={styles.postTitle}>{item.title}</Text>
              <View style={styles.postStats}>
                <TouchableOpacity
                  style={{ display: "flex" }}
                  onPress={() => {
                    navigation.navigate(`Коментарі`, {
                      postId: item.id,
                    });
                  }}
                >
                  <Image
                    style={styles.statsIcon}
                    source={
                      item.comments.length === 0
                        ? require("../assets/message-circle-grey.png")
                        : require("../assets/message-circle.png")
                    }
                  />
                </TouchableOpacity>
                <Text
                  style={[
                    styles.statsText,
                    {
                      color: item.comments.length > 0 ? "#212121" : "#BDBDBD",
                    },
                  ]}
                >
                  {item.comments.length}
                </Text>

                <TouchableOpacity
                  onPress={() => {
                    updateLikes(item.id, item.likes);
                  }}
                >
                  <Image
                    source={
                      item.comments.length === 0
                        ? require("../assets/thumbs-up-grey.png")
                        : require("../assets/thumbs-up.png")
                    }
                    style={styles.statsIcon}
                  />
                </TouchableOpacity>
                <Text
                  style={[
                    styles.statsText,
                    {
                      color: item.comments.length > 0 ? "#212121" : "#BDBDBD",
                    },
                  ]}
                >
                  {item.likes}
                </Text>
                <View style={styles.statsLocation}>
                  <Image
                    style={styles.statsIcon}
                    source={require("../assets/map-pin.png")}
                  />
                  <Text
                    style={styles.statsTextLocation}
                    onPress={() => {
                      navigation.navigate("Map", {
                        location: item.geoLocation,
                      });
                    }}
                  >
                    {item.userLocation}
                  </Text>
                </View>
              </View>
            </View>
          );
        }}
        keyExtractor={(post) => post.id}
      ></FlatList>
    </View>
  );
  // );
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
    objectFit: "cover",
    borderRadius: 8,
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
    color: "#BDBDBD",
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
