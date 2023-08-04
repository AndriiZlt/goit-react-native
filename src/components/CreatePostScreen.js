import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";

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
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import flipCamera from "../assets/flip-camera.png";
import cameraImage from "../assets/camera-transparent.png";
import * as Location from "expo-location";
import posts from "../../posts";
import authSelectors from "../redux/selectors";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../config";

const CreatePostScreen = () => {
  const navigation = useNavigation();
  const state = useSelector(authSelectors.getState);
  const [postTitle, setPostTitle] = useState("");
  const [postLocation, setPostLocation] = useState("");
  const [location, setLocation] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const textInputLocation = useRef(null);
  const textInputTitle = useRef(null);

  // Styling elements
  const [height, setHeight] = useState("auto");
  const [btnBackground, setBtnBackground] = useState("#F6F6F6");
  const [textColor, setTextColor] = useState("#BDBDBD");
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [shown, setShown] = useState(true);

  const [titleBorder, setTitleBorder] = useState("#E8E8E8");
  const [locationBorder, setLocationBorder] = useState("#E8E8E8");

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();

    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
      }

      let location = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setLocation(coords);
    })();

    const keyboardShownListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setShown(false);
      }
    );
    const keyboardHideListener = Keyboard.addListener("keyboardDidHide", () => {
      setShown(true);
      textInputTitle.current.blur();
      textInputLocation.current.blur();
    });

    return () => {
      keyboardShownListener.remove();
      keyboardHideListener.remove();
    };
  }, []);

  const publishHandler = async () => {
    try {
      const docRef = await addDoc(collection(db, "posts"), {
        userId: state.user.uid,
        title: postTitle,
        image: imageUrl,
        comments: [],
        likes: 0,
        userLocation: postLocation,
        geoLocation: location,
        postTime: new Date().toLocaleString(),
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
      throw e;
    }
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "position"}
      style={[styles.container, { height: height }]}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View>
          <View style={styles.image}>
            {!imageUrl ? (
              <Camera style={styles.camera} type={type} ref={setCameraRef}>
                <View style={styles.photoView}>
                  <TouchableOpacity
                    style={styles.flipContainer}
                    onPress={() => {
                      setType(
                        type === Camera.Constants.Type.back
                          ? Camera.Constants.Type.front
                          : Camera.Constants.Type.back
                      );
                    }}
                  >
                    <Image
                      source={flipCamera}
                      style={{ width: 30, height: 30 }}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={async () => {
                      if (cameraRef) {
                        const { uri } = await cameraRef.takePictureAsync();
                        await MediaLibrary.createAssetAsync(uri);
                        setImageUrl(uri);
                        console.log(uri);
                      }
                    }}
                  >
                    <Image
                      source={cameraImage}
                      style={{ width: 60, height: 60 }}
                    />
                  </TouchableOpacity>
                </View>
              </Camera>
            ) : (
              <ImageBackground
                source={{
                  uri: imageUrl,
                }}
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              ></ImageBackground>
            )}
          </View>
          <Text style={styles.imageText}>Завантажте фото</Text>
          <View>
            <TextInput
              ref={textInputTitle}
              style={[styles.postTitle, { borderColor: titleBorder }]}
              placeholder="Назва..."
              placeholderTextColor="#BDBDBD"
              onFocus={() => {
                setHeight(550);
                setTitleBorder("#FF6C00");
              }}
              onBlur={() => {
                setHeight("auto");
                setTitleBorder("#E8E8E8");
              }}
              onChangeText={(text) => setPostTitle(text)}
            ></TextInput>
            <View style={styles.relative}>
              <TextInput
                ref={textInputLocation}
                style={[styles.inputLocation, { borderColor: locationBorder }]}
                placeholder="Місцевість..."
                placeholderTextColor="#BDBDBD"
                onFocus={() => {
                  setHeight(550);
                  setLocationBorder("#FF6C00");
                }}
                onBlur={() => {
                  setHeight("auto");
                  setLocationBorder("#E8E8E8");
                }}
                onChangeText={(text) => setPostLocation(text)}
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
          {shown && (
            <View>
              <Pressable
                style={[styles.publishBtn, { backgroundColor: btnBackground }]}
                onPress={() => {
                  publishHandler();
                  navigation.navigate("Home");
                }}
              >
                <Text style={[styles.textBtn, { color: textColor }]}>
                  Опубліковати
                </Text>
              </Pressable>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Home");
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
          )}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 16,
    paddingVertical: 32,
    backgroundColor: "#fff",
    fontFamily: "Roboto",
  },

  image: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    width: "100%",
    aspectRatio: 1.429166666666667,
    backgroundColor: "#F6F6F6",
    borderColor: "#E8E8E8",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 8,
    overflow: "hidden",
  },

  camera: { height: 500, width: "100%" },

  photoView: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "center",
    position: "relative",
  },

  flipContainer: {
    flex: 0.08,
    alignSelf: "center",
    position: "absolute",
    top: "65%",
    left: "84%",
    opacity: 0.7,
  },

  button: { alignSelf: "center" },

  takePhotoOut: {
    borderWidth: 2,
    borderColor: "white",
    height: 50,
    width: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },

  takePhotoInner: {
    borderWidth: 2,
    borderColor: "white",
    height: 40,
    width: 40,
    backgroundColor: "white",
    borderRadius: 50,
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
  buttons: {
    flexDirection: "column",
  },
});

export default CreatePostScreen;
