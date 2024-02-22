export interface Item {
  author: {
    _id: string;
    name: string;
    username: string;
  };
  category: {
    _id: string;
    name: string;
  };
  content: string;
  datePosted: string;
  imgUrls: string[];
  likedByThisUser: boolean;
  likes: {
    userIDList: string[];
  };
  numLikes: number;
  price: number;
  title: string;
  _id: string;
}

export interface Category {
  _id: string;
  name: string;
}

export interface JWT {
  exp: number;
}

export interface AppState {
  signUp: {
    newUser: {
      firstName: string;
      email: string;
      phoneNumber: string;
      username: string;
    };
    usernameExists: boolean;
    pending: boolean;
    toggleSnackBar: boolean;
    resSuccess: boolean;
    statusMessage: string;
  };
  dashboard: {
    items: Item[]; // You might want to replace `any[]` with a more specific type if you have a specific item type.
    categories: Category[]; // You might want to replace `any[]` with a more specific type if you have a specific category type.
    currentCategory: string;
    getItemsPending: boolean;
    getCategoriesPending: boolean;
    randomText: string;
    activePageIndex: number;
  };
  item: {
    getItemPending: boolean;
    currentItem: Item | null; // You might want to replace `any` with a more specific type if you have a specific item type.
  };
  status: string;
  auth: {
    accessToken: string | undefined;
    loggedIn: boolean;
    signInPending: boolean;
    toggleSnackBar: boolean;
    refreshTokenPending: boolean;
  };
  createPost: {
    pending: boolean;
  };
  items: {
    items: Item[];
    pending: boolean;
  };
  profile: {
    username: string;
  };
  user: {
    username: string | undefined;
  };
}

export interface GetStateType {
  counter : AppState
}