import React from "react";
import {
  Image,
  View,
  StyleSheet,
  ImageBackground,
  Button,
  TouchableOpacity,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PostsScreen from "./PostsScreen";
import CreatePostScreen from "./CreatePostScreen";
import ProfileScreen from "./ProfileScreen";

const Tabs = createBottomTabNavigator();

const Home = ({ navigation }) => {
  return (
    <Tabs.Navigator
      initialRouteName="Публікації"
      screenOptions={{
        tabBarActiveColor: "#42f44b",
        tabBarShowLabel: false,
        tabBarItemStyle: { height: 40, width: 40 },
        tabBarStyle: {
          height: 83,
          paddingTop: 9,
          paddingHorizontal: 60,
        },
        headerStyle: {
          shadowOffset: 2,
          shadowOpacity: 1,
          shadowRadius: 5,
          shadowColor: "#000000 ",
        },
      }}
    >
      <Tabs.Screen
        name="Публікації"
        component={PostsScreen}
        options={{
          headerShown: true,
          headerTitleAlign: "center",
          headerRight: () => (
            <Image
              source={require("../assets/log-out.png")}
              style={{
                width: 24,
                height: 24,
                marginRight: 16,
              }}
            />
          ),
          tabBarIcon: () => (
            <Image
              source={require("../assets/postsIcon.png")}
              style={{
                width: 40,
                height: 40,
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Створити публікацію"
        component={CreatePostScreen}
        options={{
          headerShown: true,
          headerTitleAlign: "center",
          tabBarStyle: { display: "none" },
          // headerRight: () => (
          //   <Button
          //     onPress={() => alert("This is a button!")}
          //     title="Info"
          //     color="#fff"
          //   />
          // ),
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{
                backgroundColor: "rgba(0,0,0,0)",
                width: 24,
                height: 24,
                marginLeft: 16,
              }}
            >
              <Image
                source={require("../assets/arrow-left.png")}
                onPress={() => navigation.goBack()}
                style={{
                  width: 24,
                  height: 24,
                }}
              />
            </TouchableOpacity>
          ),
          tabBarIcon: () => (
            <View
              style={[
                styles.relative,
                {
                  width: 70,
                  height: 40,
                  borderRadius: 40,
                },
              ]}
            >
              <ImageBackground
                source={require("../assets/Rectangle.png")}
                style={{
                  width: "100%",
                  height: "100%",
                }}
              >
                <Image
                  source={require("../assets/Union.png")}
                  style={{
                    width: 13,
                    height: 13,
                    position: "absolute",
                    top: 13.5,
                    left: 28.5,
                  }}
                />
              </ImageBackground>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          headerShown: false,
          headerTitleAlign: "center",
          tabBarIcon: () => (
            <Image
              source={require("../assets/user-icon.png")}
              style={{
                width: 40,
                height: 40,
                borderRadius: 40,
                // borderColor: "#42f44b",
                // borderWidth: 1,
              }}
            />
          ),
        }}
      />
      {/* <Tabs.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
        }}
      /> */}
    </Tabs.Navigator>
  );
};

const styles = StyleSheet.create({
  relative: {
    position: "relative",
  },
});

export default Home;
