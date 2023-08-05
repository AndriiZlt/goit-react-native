import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
  TextInput,
  Pressable,
  FlatList,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import userImage from "../assets/user.jpg";
import { doc, updateDoc, getDocs, collection } from "firebase/firestore";
import { db } from "../../config";

const CommentsScreen = ({ navigation, route }) => {
  const postId = route.params.postId;
  const [shown, setShown] = useState(true);
  const textInputComment = useRef(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const fetchPost = async () => {
    await getDocs(collection(db, "posts")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      post = newData.filter((post) => post.id === postId)[0].comments;
      setImageUrl(newData.filter((post) => post.id === postId)[0].image);
      setComments([...post]);
    });
  };

  useEffect(() => {
    fetchPost();

    const keyboardShownListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setShown(false);
      }
    );
    const keyboardHideListener = Keyboard.addListener("keyboardDidHide", () => {
      setShown(true);
      textInputComment.current.blur();
    });

    return () => {
      keyboardShownListener.remove();
      keyboardHideListener.remove();
    };
  }, []);

  const postCommentHandler = () => {
    const updateDataInFirestore = async (collectionName, docId) => {
      try {
        const ref = doc(db, collectionName, docId);
        console.log("comments inside update fun:", comments);
        await updateDoc(ref, {
          comments: [...comments, { comment: newComment }],
        });
        console.log("document updated");
        setNewComment("");
      } catch (error) {
        console.log(error);
      }
    };
    updateDataInFirestore("posts", route.params.postId);

    setComments([...comments, { comment: newComment }]);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "position"}
      // style={[styles.container, { height: "auto" }]}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <View style={styles.image}>
            <ImageBackground
              source={
                imageUrl
                  ? { uri: imageUrl }
                  : require("../assets/post2-image.jpg")
              }
              style={{
                width: "100%",
                aspectRatio: 1.429166666666667,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            ></ImageBackground>
          </View>

          <View style={styles.comments}>
            <FlatList
              data={comments}
              scrollEnabled={true}
              renderItem={({ index, item }) => {
                // console.log(comment);
                return (
                  <View
                    style={
                      index % 2 === 0 ? styles.commentEven : styles.commentOdd
                    }
                    key={index}
                  >
                    <Image
                      source={userImage}
                      style={
                        index % 2 === 0
                          ? styles.userImageEven
                          : styles.userImageOdd
                      }
                    ></Image>
                    <Text
                      style={
                        index % 2 === 0
                          ? styles.commentTextEven
                          : styles.commentTextOdd
                      }
                    >
                      {item.comment}
                    </Text>
                  </View>
                );
              }}
            ></FlatList>
          </View>
          <View style={styles.newComment}>
            <TextInput
              ref={textInputComment}
              style={styles.newCommentText}
              placeholder="Коментувати..."
              placeholderTextColor="#BDBDBD"
              value={newComment}
              onChangeText={setNewComment}
            ></TextInput>
            <Pressable
              style={styles.newCommentBtn}
              onPress={() => postCommentHandler()}
            >
              <ImageBackground
                source={require("../assets/send.png")}
                style={{
                  width: "100%",
                  height: "100%",
                }}
              ></ImageBackground>
            </Pressable>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    fontFamily: "Roboto",
    width: "100%",
    height: "100%",
    paddingHorizontal: 16,
    paddingTop: 32,
    paddingBottom: 16,
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
  },

  image: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    // height: "100%",
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
    marginBottom: 32,
    borderRadius: 8,
    overflow: "hidden",
  },

  comments: {
    width: "100%",
    height: 320,
    marginBottom: 16,
  },

  commentEven: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
    width: "100%",
  },

  userImageEven: {
    width: 24,
    height: 24,
    marginRight: 16,
    borderRadius: 24,
  },

  commentTextEven: {
    flex: 1,
    color: "#212121",
    fontSize: 13,
    fontWeight: 400,
    lineHeight: 18,
    padding: 16,
    paddingBottom: 35,
    backgroundColor: "#f7f7f7",
    borderTopRightRadius: 6,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  },

  commentOdd: {
    display: "flex",
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    marginBottom: 24,
    width: "100%",
  },

  userImageOdd: {
    width: 24,
    height: 24,
    marginLeft: 16,
    borderRadius: 24,
  },

  commentTextOdd: {
    flex: 1,
    color: "#212121",
    fontSize: 13,
    fontWeight: 400,
    lineHeight: 18,
    padding: 16,
    paddingBottom: 35,
    backgroundColor: "#f7f7f7",
    borderTopRightRadius: 0,
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  },

  newComment: {
    width: "100%",
    bottom: 16,
    height: 66,
    borderColor: "#E8E8E8",
    paddingTop: 16,
  },

  newCommentText: {
    height: 50,
    borderColor: "#E8E8E8",
    fontSize: 16,
    // fontWeight: 500,
    lineHeight: 19.36,
    padding: 16,
    paddingRight: 50,
    backgroundColor: "#F6F6F6",
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#E8E8E8",
  },

  newCommentBtn: {
    position: "absolute",
    top: 24,
    right: 8,
    width: 34,
    height: 34,
    backgroundColor: "#ff6d00",
    borderRadius: 34,
  },
});

export default CommentsScreen;
