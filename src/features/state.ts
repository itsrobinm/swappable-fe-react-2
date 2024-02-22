import { AppState } from "../types/types";

export const initialState: AppState = {
  signUp: {
    newUser: {
      firstName: "",
      email: "",
      phoneNumber: "",
      username: "",
    },
    usernameExists: false,
    pending: false,
    toggleSnackBar: false,
    resSuccess: false,
    statusMessage: "",
  },
  dashboard: {
    items: [],
    categories: [],
    currentCategory: "For you",
    getItemsPending: false,
    getCategoriesPending: false,
    randomText: "I am a random text",
    activePageIndex: 0,
  },
  item: {
    getItemPending: false,
    currentItem: null,
  },
  status: "idle",
  auth: {
    accessToken: "",
    loggedIn: false,
    signInPending: false,
    toggleSnackBar: false,
    refreshTokenPending: true,
  },
  createPost: {
    pending: false,
  },
  items: {
    items: [],
    pending: false,
  },
  profile: {
    username: "",
  },
  user: {
    username: "",
  },
};
