import "react-native-gesture-handler";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import LoginScreen from "../screens/LoginScreen";
import RegistrationScreen from "../screens/RegistrationScreen";
import PostsScreen from "./PostsScreen";
import CommentsScreen from "../screens/CommentsScreen";
import CreatePostScreen from "./CreatePostScreen";
import ProfileScreen from "./ProfileScreen";
import HomeScreen from "../screens/HomeScreen";
import MapScreen from "../screens/MapScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import authSelectors from "../redux/selectors";
import { clearUser } from "../redux/slice";

const MainStack = createNativeStackNavigator();

const MyApp = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("Logged in(App)");
      const uid = user.uid;
      // ...
    } else {
      console.log("Logged out(App)");
      dispatch(clearUser());
    }
  });

  return (
    <NavigationContainer>
      <MainStack.Navigator initialRouteName="Home">
        {isLoggedIn ? (
          <>
            <MainStack.Screen
              name="Home"
              component={HomeScreen}
              options={{ headerShown: false }}
            />
            <MainStack.Screen
              name="Публікації"
              component={PostsScreen}
              options={{ headerShown: true, headerTitleAlign: "center" }}
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
          </>
        ) : (
          <>
            <MainStack.Screen
              name="LoginScreen"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <MainStack.Screen
              name="Registration"
              component={RegistrationScreen}
              options={{ headerShown: false }}
            />
          </>
        )}
      </MainStack.Navigator>
    </NavigationContainer>
  );
};

export default MyApp;
