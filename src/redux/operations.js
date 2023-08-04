import { auth } from "../../config.js";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signOut,
} from "firebase/auth";

const signIn = createAsyncThunk(
  "auth/register",
  async ({ mail, password, name }) => {
    try {
      const data = await createUserWithEmailAndPassword(auth, mail, password);
      if (data) {
        const auth = getAuth();
        updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: "https://example.com/jane-q-user/profile.jpg",
        })
          .then(() => {
            console.log("Profile updated!");
          })
          .catch((error) => {
            console.log(error);
          });
      }
      result = data._tokenResponse;
      return { result, name };
    } catch (error) {
      throw error;
    }
  }
);

const logIn = createAsyncThunk("auth/login", async ({ mail, password }) => {
  try {
    const data = await signInWithEmailAndPassword(auth, mail, password);
    return data._tokenResponse;
  } catch (error) {
    throw error;
  }
});

const logOut = createAsyncThunk("auth/logout", async () => {
  try {
    const data = await signOut(auth);
  } catch (error) {
    throw error;
  }
});

const authOperations = {
  signIn,
  logIn,
  logOut,
};

export default authOperations;
