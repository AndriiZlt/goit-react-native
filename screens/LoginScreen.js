import React, { useState, useEffect, useRef } from "react";
import {
  View,
  ImageBackground,
  StyleSheet,
  TouchableWithoutFeedback,
  Text,
  TextInput,
  Pressable,
  Keyboard,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Dimensions } from "react-native";

const LoginScreen = () => {
  const navigation = useNavigation();
  const [formHeight, setFormHeight] = useState(489);
  const [display, setDisplay] = useState("flex");
  const [mailInputBorder, setMailInputBorder] = useState("#E8E8E8");
  const [passwordInputBorder, setPasswordInputBorder] = useState("#E8E8E8");
  const textInputMail = useRef(null);
  const textInputPassword = useRef(null);
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setFormHeight(248);
      setDisplay("none");
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setFormHeight(489);
      setDisplay("flex");
      textInputMail.current.blur();
      textInputPassword.current.blur();
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <>
        <ImageBackground
          source={require("../assets/background/BG.jpg")}
          style={styles.background}
        />
        <View style={styles.container}>
          <View style={[{ height: formHeight }, styles.form]}>
            <View>
              <Text style={styles.title}>Увійти</Text>
              <TextInput
                style={[styles.input, { borderColor: mailInputBorder }]}
                ref={textInputMail}
                placeholder="Адреса електронної пошти"
                placeholderTextColor="#BDBDBD"
                onFocus={() => setMailInputBorder("#FF6C00")}
                onBlur={() => setMailInputBorder("#E8E8E8")}
                onSubmitEditing={Keyboard.dismiss}
                onChangeText={setMail}
              ></TextInput>

              <View style={{ position: "relative" }}>
                <TextInput
                  style={[
                    styles.input,
                    { marginBottom: 43, borderColor: passwordInputBorder },
                  ]}
                  ref={textInputPassword}
                  placeholder="Пароль"
                  placeholderTextColor="#BDBDBD"
                  onFocus={() => setPasswordInputBorder("#FF6C00")}
                  onBlur={() => setPasswordInputBorder("#E8E8E8")}
                  onSubmitEditing={Keyboard.dismiss}
                  onChangeText={setPassword}
                ></TextInput>

                <Text style={styles.showPasswordText} onPress={() => {}}>
                  Показати
                </Text>
              </View>
            </View>
            <View style={{ display: display }}>
              <Pressable
                style={styles.regBtn}
                onPress={() => {
                  console.log("Credentials", `${mail} + ${password}`);
                  navigation.navigate("Публікації");
                }}
              >
                <Text style={styles.textBtn}>Увійти</Text>
              </Pressable>
              <Text
                style={styles.navText}
                onPress={() => navigation.navigate("Registration")}
              >
                Немає акаунту? Зареєструватися
              </Text>
            </View>
          </View>
        </View>
      </>
    </TouchableWithoutFeedback>
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
    height: Dimensions.get("window").height,
  },

  container: {
    position: "relative",
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    zIndex: 1,
    elevation: 1,
  },

  form: {
    position: "relative",
    top: 0,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    zIndex: 4,
    elevation: 4,
    backgroundColor: "#ffffff",
    borderWidth: 3,
    borderColor: "#ffffff",
    alignItems: "center",
    justifyContent: "flex-start",
    display: "flex",
    width: "100%",
    paddingTop: 32,
  },

  title: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
    letterSpacing: 0.01,
    color: "#212121",
    marginBottom: 33,
  },

  input: {
    width: 343,
    height: 50,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    marginBottom: 16,
    padding: 16,
    paddingBottom: 15,
    fontSize: 16,
    lineHeight: 19,
  },

  inputPassword: {
    width: 343,
    height: 50,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    marginBottom: 43,
    padding: 16,
    paddingBottom: 15,
    fontSize: 16,
    lineHeight: 19,
  },

  regBtn: {
    width: 343,
    height: 51,
    backgroundColor: "#FF6C00",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    marginBottom: 16,
  },

  textBtn: {
    color: "#ffffff",
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 19,
  },

  showPasswordText: {
    position: "absolute",
    top: 16,
    right: 16,
    color: "#1B4371",
    fontSize: 16,
    lineHeight: 19,
  },

  navText: {
    color: "#1B4371",
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
  },
});

export default LoginScreen;
