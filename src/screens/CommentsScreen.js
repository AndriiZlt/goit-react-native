import {
  View,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
  TextInput,
  Pressable,
  FlatList,
} from "react-native";

const CommentsScreen = () => {
  const comments = [
    {
      userId: 1,
      userPhoto: require("../assets/user-2.png"),
      text: "Really love your most recent photo. I've been trying to capture the same thing for a few months and would love some tips!",
    },
    {
      userId: 2,
      userPhoto: require("../assets/user.jpg"),
      text: "A fast 50mm like f1.8 would help with the bokeh. I've been using primes as they tend to get a bit sharper images.",
    },
    {
      userId: 1,
      userPhoto: require("../assets/user-2.png"),
      text: "Thank you! That was very helpful!",
    },
    {
      userId: 1,
      userPhoto: require("../assets/user-2.png"),
      text: "Really love your most recent photo. I've been trying to capture the same thing for a few months and would love some tips!",
    },
  ];

  return (
    <>
      <View style={styles.container}>
        <View style={styles.image}>
          <ImageBackground
            source={require("../assets/postBackground.png")}
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
            renderItem={({ item, index }) => (
              <View
                style={index % 2 === 0 ? styles.commentEven : styles.commentOdd}
                key={index}
              >
                <Image
                  source={item.userPhoto}
                  style={
                    index % 2 === 0 ? styles.userImageEven : styles.userImageOdd
                  }
                ></Image>
                <Text
                  style={
                    index % 2 === 0
                      ? styles.commentTextEven
                      : styles.commentTextOdd
                  }
                >
                  {item.text}
                </Text>
              </View>
            )}
          />
        </View>
        <View style={styles.newComment}>
          <TextInput
            style={styles.newCommentText}
            placeholder="Коментувати..."
            placeholderTextColor="#BDBDBD"
          ></TextInput>
          <Pressable style={styles.newCommentBtn}>
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
    </>
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
