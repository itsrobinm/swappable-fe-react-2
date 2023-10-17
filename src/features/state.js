export const initialState = {
  value: 0,
  splideInst: null,
  signUp: {
    newUser: {
      firstName: "",
      email: "",
      phoneNumber: "",
      username: "",
      verificationCode: "",
    },
    usernameExists: false,
    pending: false,
    emailExists: false,
    phoneNumberExists: false,
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
    currentItem: {},
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
    pending: false
  },
  posts : {
    posts: [],
    pending: false
  },
  profile: {
    username: ""
  },
  user: {
    username: ""
  }

};
