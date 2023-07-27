import "react-native-gesture-handler";
import React from "react";
import LoginScreen from "./screens/LoginScreen";
import RegistrationScreen from "./screens/RegistrationScreen";
import PostsScreen from "./components/PostsScreen";
import CommentsScreen from "./screens/CommentsScreen";
import CreatePostScreen from "./components/CreatePostScreen";
import ProfileScreen from "./components/ProfileScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./screens/HomeScreen";
import MapScreen from "./screens/MapScreen";

const MainStack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <MainStack.Navigator initialRouteName="Home">
        <MainStack.Screen
          name="Registration"
          component={RegistrationScreen}
          options={{ headerShown: false }}
        />
        <MainStack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <MainStack.Screen
          name="Публікації"
          component={PostsScreen}
          options={{ headerShown: true, headerTitleAlign: "center" }}
        />
        <MainStack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <MainStack.Screen
          name="Коментарі"
          component={CommentsScreen}
          options={{ headerShown: true, headerTitleAlign: "center" }}
        />
        <MainStack.Screen
          name="Створити публікацію"
          component={CreatePostScreen}
          options={{ headerShown: true, headerTitleAlign: "center" }}
        />
        <MainStack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            headerShown: true,
          }}
        />
        <MainStack.Screen
          name="Map"
          component={MapScreen}
          options={{
            headerShown: false,
          }}
        />
      </MainStack.Navigator>
    </NavigationContainer>
  );
}
