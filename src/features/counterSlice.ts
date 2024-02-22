/** BUG - console.log() of the state doesn't work properly in chrome.
 *  the state still has the right values you
 * just can't see them via console log for some reason */

import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./state";

import {
  checkUserFieldExistsAsync,
  confirmUserCodeAsync,
  getItemAsync,
  getCategoriesAsync,
  signInAsync,
  signUpUserAsync,
  refreshAccessTokenAsync,
  createPost,
  getUserInformation,
  likeItemAsync,
  unlikeItemAsync,
} from "./effects.js";
import { getPostsAsync } from "./effectsNew";

import { AppState, Item } from "../types/types.js";

//reducer thing
export const counterSlice = createSlice({
  name: "appState",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    dismissSignUpSnackBar: (state) => {
      state.signUp.toggleSnackBar = false;
    },
    dismissSignInSnackBar: (state) => {
      state.auth.toggleSnackBar = false;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    logoutUser: (state) => {
      logout(state);
    },
    setNewUserData: (state, action) => {
      //state.signUp.newUser[action.payload.fieldName] = action.payload.value;
    },
    setActivePageIndex: (state, action) => {
      state.dashboard.activePageIndex = action.payload;
    },
    setCurrentCategory: (state, action) => {
      state.dashboard.currentCategory = action.payload;
    },
    setSomeRandomText: (state, action) => {
      state.dashboard.randomText = action.payload;
    },
  },

  //reducer for effects/async actions - three states here: pending, fulfilled, rejected
  extraReducers: (builder) => {
    builder
      .addCase(checkUserFieldExistsAsync.fulfilled, (state, action) => {
        //state.signUp[`${action.payload.key}`] = action.payload.value;
      })
      .addCase(createPost.pending, (state, action) => {
        console.log("create post pending");
        state.createPost.pending = true;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        console.log("create post fulfilled");

        state.createPost.pending = false;
      })
      .addCase(createPost.rejected, (state, action) => {
        console.log("create post rejected");

        state.createPost.pending = false;
      })
      .addCase(confirmUserCodeAsync.fulfilled, (state, action) => {})
      //get items
      //get item categories
      .addCase(getCategoriesAsync.pending, (state, action) => {
        state.dashboard.getCategoriesPending = true;
      })
      .addCase(getCategoriesAsync.fulfilled, (state, action) => {
        state.dashboard.categories = [...action.payload.categories];
        state.dashboard.getCategoriesPending = false;
      })
      .addCase(getCategoriesAsync.rejected, (state, action) => {
        state.dashboard.getCategoriesPending = false;
      })
      .addCase(getItemAsync.pending, (state, action) => {
        state.item.getItemPending = true;
      })
      .addCase(getItemAsync.fulfilled, (state, action) => {
        state.item.getItemPending = false;
        state.item.currentItem = action.payload;
      })
      .addCase(getItemAsync.rejected, (state, action) => {
        state.item.getItemPending = false;
      })
      .addCase(getPostsAsync.pending, (state, action) => {
        state.items.pending = true;
      })
      .addCase(getPostsAsync.fulfilled, (state, action) => {
        console.log(action.payload);

        let items = action.payload.items;
        state.items.items = [...items];
        state.items.pending = false;
      })
      .addCase(getPostsAsync.rejected, (state, action) => {
        state.items.pending = false;
      })
      .addCase(getUserInformation.fulfilled, (state, action) => {
        state.profile.username = action.payload.name;
      })
      .addCase(likeItemAsync.fulfilled, (state, action) => {
        const index = state.items.items.findIndex(
          (item: Item) => item._id === action.payload.itemID
        );

        state.items.items[index]["likedByThisUser"] = true;
      })
      .addCase(unlikeItemAsync.fulfilled, (state, action) => {
        const index = state.items.items.findIndex(
          (item: Item) => item._id === action.payload.itemID
        );

        state.items.items[index]["likedByThisUser"] = false;
      })
      //actions for sign-in signInAsync
      .addCase(signInAsync.pending, (state, action) => {
        state.auth.signInPending = true;
      })
      .addCase(signInAsync.fulfilled, (state, action) => {
        // //save the access token in memory (in the state) and the refresh token in local storage
        logInUser(state, action.payload);
        state.auth.signInPending = false;
      })
      .addCase(signInAsync.rejected, (state, action) => {
        state.auth.signInPending = false;
        state.auth.toggleSnackBar = true;
      })
      .addCase(refreshAccessTokenAsync.pending, (state, action) => {
        console.log("refresh token pending");
      })
      .addCase(refreshAccessTokenAsync.fulfilled, (state, action) => {
        // //save the access token in memory (in the state) and the refresh token in local storage
        //
        logInUser(state, action.payload);
        state.auth.refreshTokenPending = false;
      })
      .addCase(refreshAccessTokenAsync.rejected, (state) => {
        state.auth.refreshTokenPending = false;
      })
      .addCase(signUpUserAsync.pending, (state, action) => {
        state.signUp.pending = true;
      })
      .addCase(signUpUserAsync.fulfilled, (state, action) => {
        logInUser(state, action.payload);
        state.signUp.pending = false;

        //toggle the snackbar at the bottom
        state.signUp.toggleSnackBar = true;

        //successful sign up state
        state.signUp.resSuccess = true;
        state.signUp.statusMessage = "Account created succesfully";
      })
      .addCase(signUpUserAsync.rejected, (state, action) => {
        state.signUp.pending = false;

        //toggle the snackbar at the bottom
        state.signUp.toggleSnackBar = true;

        //successful sign up state
        state.signUp.resSuccess = false;

        state.signUp.statusMessage =
          action.error.code == "ERR_BAD_REQUEST"
            ? "Account already exists"
            : "API Request Error";
      });
  },
});

export const {
  setNewUserData,
  dismissSignUpSnackBar,
  dismissSignInSnackBar,
  setCurrentCategory,
  setSomeRandomText,
  setActivePageIndex,
  logoutUser,
} = counterSlice.actions;

function logInUser(
  state: AppState,
  actionPayload: {
    accessToken: string;
    user: { username: string };
    refreshToken: string;
  }
) {
  state.auth.accessToken = actionPayload.accessToken;
  state.auth.loggedIn = true;
  state.user.username = actionPayload.user.username;
  //save our refresh token to local storage
  localStorage.setItem("refreshToken", actionPayload.refreshToken);
}

function logout(state: AppState) {
  state.auth.accessToken = undefined;
  state.auth.loggedIn = false;
  state.user.username = undefined;
  localStorage.removeItem("refreshToken");
}

export default counterSlice.reducer;
