import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "./../axiosInstance";

export const createPost = createAsyncThunk(
  "counter/createPost",
  async (payload, { getState }) => {
    console.log(payload);

    const requestPromise = axiosInstance.post(
      "/api/posts/create",
      payload.form
    );

    const delayPromise = new Promise((resolve) => setTimeout(resolve, 1000));

    await Promise.all([requestPromise, delayPromise]);
    return requestPromise.then((response) => response.data);
  }
);

export const getCategoriesAsync = createAsyncThunk(
  "counter/getCategoriesAsync",
  async (amount) => {
    const response = await axiosInstance.post("/api/categories");

    const delayPromise = new Promise((resolve) => setTimeout(resolve, 1000));
    await Promise.all([response, delayPromise]);


    // The value we return becomes the fulfilled action payload or rejected action payload
    return response.data;
  }
);

export const getPostsAsync = createAsyncThunk(
  "counter/getPostsAsync",
  async (payload, { getState }) => {
    let state = getState(); //get a copy of the state so we can read state variables
    const requestPromise = axiosInstance.post(
      `/api/posts/${payload.categoryId}`
    );

    if (state.counter.posts.posts.length === 0) {
      const delayPromise = new Promise((resolve) => setTimeout(resolve, 1000));

      //the below line will block execution until both promises have been resolved
      await Promise.all([requestPromise, delayPromise]);
      return requestPromise.then((response) => response.data);
    } else {
      return requestPromise.then((response) => response.data);
    }
  }
);

export const getItemAsync = createAsyncThunk(
  "counter/getItemAsync",
  async (payload) => {
    console.log(payload.itemID);
    let resp = await axiosInstance.post("/api/item/" + payload.itemID);

    console.log(resp.data.status);

    return resp.data.data;
  }
);


export const getUserInformation = createAsyncThunk(
  "counter/getUserInformation",
  async (payload) => {
    console.log(payload);
    const response = await axiosInstance.post(`/api/user/${payload.username}`);
    return response.data;
  }
);

//interacts with endpoit that will create a user and send them a code to confirm at the next step - EMAIL
export const sendConfirmationEmailAsync = createAsyncThunk(
  "counter/sendConfirmationEmailAsync",
  async (payload, { getState }) => {
    let state = getState();

    const response = await axiosInstance.post("/api/sendConfirmationEmail", {
      newUser: state.counter.signUp.newUser,
    });

    // The value we return becomes the `fulfilled` or rejected action payload
    console.log(response.data);
    return response.data;
  }
);

export const likeItemAsync = createAsyncThunk(
  "counter/likeItemAsync",
  async (payload) => {
    const resp = await axiosInstance.post(`/api/posts/like/${payload.itemID}`);
    return resp.data;
  });

  export const unlikeItemAsync = createAsyncThunk(
    "unlikeItemAsync",
    async (payload) => {
      const resp = await axiosInstance.post(`/api/posts/unlike/${payload.itemID}`);
      return resp.data;
    });

//interacts with endpoit that will create a user and send them a code to confirm at the next step - EMAIL
export const sendConfirmationTextAsync = createAsyncThunk(
  "counter/sendConfirmationTextAsync",
  async (payload, { getState }) => {
    let state = getState();

    // console.log(state);
    // console.log(state.counter.signUp.newUser);

    const response = await axiosInstance.post("/api/sendConfirmationText", {
      newUser: state.counter.signUp.newUser,
    });

    // The value we return becomes the `fulfilled` or rejected action payload
    console.log(response.data);
    return response.data;
  }
);

//see if the user's code matches up
export const confirmUserCodeAsync = createAsyncThunk(
  "counter/confirmUser",
  async (payload, { getState }) => {
    let state = getState();

    console.log(payload.verificationCode);

    const response = await axiosInstance.post(`/api/confirmUser`, {
      phoneNumber: state.counter.signUp.newUser.phoneNumber,
      verificationCode: payload.verificationCode,
    });

    if (response) {
      payload.onSuccessFunc();
    }

    // The value we return becomes the `fulfilled` or rejected action payload
    return response.data;
  }
);

//call the endpoint to check whether a username exists
export const checkUserFieldExistsAsync = createAsyncThunk(
  "counter/checkUserFieldExistsAsync",
  async (payload) => {
    const response = await axiosInstance.post(
      `/api/auth/signup/checkUserFieldExists/${payload.field}`,
      {
        value: payload.value,
      }
    );

    // The value we return becomes the `fulfilled` or rejected action payload
    return response.data;
  }
);

export const refreshAccessTokenAsync = createAsyncThunk(
  "counter/refreshAccessTokenAsync",
  async (payload) => {
    //access the refresh route
    let token = localStorage.getItem("refreshToken");

    const response = await axiosInstance.post(`/api/auth/refresh`, {
      token: token,
    });

    //return val determines if action was fulfilled/rejected. response data as payload of fulfilled action.
    return response.data;
  }
);

export const signInAsync = createAsyncThunk(
  "counter/signInAsync",
  async (payload) => {
    //access the signin route
    const response = await axiosInstance.post(`/api/auth/signin`, {
      username: payload.username,
      password: payload.password,
    });

    //action success / error is handled in the fulfilled/rejected action
    return response.data;
  }
);

export const signUpUserAsync = createAsyncThunk(
  "counter/signUpUserAsync",
  async (payload) => {
    //access the signin route
    console.log(payload);

    const response = await axiosInstance.post(`/api/auth/signup`, {
      name: payload.name,
      username: payload.username,
      password: payload.password,
    });

    //action success / error is handled in the fulfilled/rejected action
    return response.data;

    //return true;
  }
);
