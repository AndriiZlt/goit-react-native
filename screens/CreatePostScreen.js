import {
  View,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
  TextInput,
  Pressable,
  TouchableOpacity,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useHeaderHeight } from "@react-navigation/elements";

const CreatePostScreen = () => {
  const height = useHeaderHeight();
  const navigation = useNavigation();
  const [background, setBackground] = useState(null);
  const [cameraImage, setCameraImage] = useState(
    require("../assets/camera-white.png")
  );
  const [btnBackground, setBtnBackground] = useState("#F6F6F6");
  const [textColor, setTextColor] = useState("#BDBDBD");

  useEffect(() => {
    if (background !== null) {
      setCameraImage(require("../assets/camera-transparent.png"));
      setBtnBackground("#FF6C00");
      setTextColor("#FFFFFF");
    } else {
      setCameraImage(require("../assets/camera-white.png"));
      setBtnBackground("#F6F6F6");
      setTextColor("#BDBDBD");
    }
  }, [background]);

  const publishHandler = () => {
    if (background === null) {
      setBackground(require("../assets/postBackground.png"));
    } else {
      setBackground(null);
    }
  };

  // require("../assets/postBackground.png")
  // require("../assets/camera-transparent.png")
  return (
    // <KeyboardAvoidingView
    //   style={styles.container}
    //   behavior={Platform.OS === "ios" ? "padding" : "height"}
    //   keyboardVerticalOffset={height}
    //   // style={{ flex: 1 }}
    //   enabled
    // >
    //   <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    <View style={styles.container}>
      <View style={styles.image}>
        <ImageBackground
          source={background}
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image source={cameraImage} style={{ width: 60, height: 60 }} />
        </ImageBackground>
      </View>
      <Text style={styles.imageText}>Завантажте фото</Text>

      <View>
        <TextInput
          style={styles.postTitle}
          placeholder="Назва..."
          placeholderTextColor="#BDBDBD"
        ></TextInput>
        <View style={styles.relative}>
          <TextInput
            style={styles.inputLocation}
            placeholder="Місцевість..."
            placeholderTextColor="#BDBDBD"
          ></TextInput>
          <Image
            source={require("../assets/map-pin.png")}
            style={{
              width: 24,
              height: 24,
              position: "absolute",
              top: 13,
              left: 0,
            }}
          ></Image>
        </View>
      </View>

      <Pressable
        style={[styles.publishBtn, { backgroundColor: btnBackground }]}
        onPress={publishHandler}
      >
        <Text style={[styles.textBtn, { color: textColor }]}>Опубліковати</Text>
      </Pressable>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Home");
          console.log("pressed");
        }}
      >
        <Image
          source={require("../assets/trash.png")}
          style={{
            width: 70,
            height: 40,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        ></Image>
      </TouchableOpacity>
    </View>
    //   </TouchableWithoutFeedback>
    // </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    fontFamily: "Roboto",
    width: "100%",
    height: "100%",
    paddingHorizontal: 16,
    paddingVertical: 32,
  },

  image: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 343,
    height: 240,
    backgroundColor: "#F6F6F6",
    borderColor: "#E8E8E8",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 8,
  },

  imageText: {
    color: "#BDBDBD",
    fontSize: 16,
    fontWeight: 400,
    lineHeight: 18.75,
    marginBottom: 32,
  },

  postTitle: {
    height: 50,
    borderColor: "#E8E8E8",
    borderBottomWidth: 1,
    marginBottom: 16,
    fontSize: 16,
    // fontWeight: 500,
    lineHeight: 18.75,
  },

  inputLocation: {
    height: 50,
    borderColor: "#E8E8E8",
    borderBottomWidth: 1,
    paddingLeft: 28,
    fontSize: 16,
    // fontWeight: 400,
    lineHeight: 18.75,
    marginBottom: 32,
  },

  relative: {
    position: "relative",
  },

  publishBtn: {
    width: 343,
    height: 51,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    marginBottom: 120,
  },
  textBtn: {
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 18.75,
  },
});

export default CreatePostScreen;
