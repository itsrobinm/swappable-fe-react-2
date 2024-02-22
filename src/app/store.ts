import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counterSlice";
import axiosInstance from "../axiosInstance";
import { refreshAccessTokenAsync } from "../features/effects.js";
import jwt_decode from "jwt-decode";
import config from "../config.json";
import { AxiosRequestConfig } from "axios";
import { Item, JWT } from "../types/types.js";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

//before the request takes flight
axiosInstance.interceptors.request.use(async (req) => {
  let currentReqUrl = req.url;

  //check to see if we have an access token stored in the state
  let accessToken = store.getState().counter.auth.accessToken;

  //the below logic SHOULD NOT apply to requests going out the the refresh enpoint
  if (!(currentReqUrl!.includes("/api/auth"))) {
    if (accessToken) {
      req.headers!.Authorization = `Bearer ${accessToken}`;

      const now = Math.floor(Date.now() / 1000);
      const decoded : JWT = jwt_decode(accessToken);

      let timeDifference = decoded.exp - now;
      //if the token is close to expiring - (margin defined in config.json)
      if (timeDifference <= config.refreshAccessTokenMargin) {
        await refreshAccessToken(req);
      }
    }
  }

  return req;
});

//function to refresh the token
async function refreshAccessToken(req: AxiosRequestConfig) {
  //req.headers.SomeHeader = 'added some header';


  await store.dispatch(refreshAccessTokenAsync());

  //once the above request has executed -
  //we shopuld be all good to get the header and add it to the token

  let accessToken = store.getState().counter.auth.accessToken;
  req.headers!.Authorization = `Bearer ${accessToken}`;

  return req;
}

//intercept every response from
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    //console.log(error.request.responseURL);
    let responseURL = new URL(error.request.responseURL);
    //console.log([responseURL.pathname, Math.floor(Date.now() / 1000)]);
    //console.log(error.request)
  }
);
