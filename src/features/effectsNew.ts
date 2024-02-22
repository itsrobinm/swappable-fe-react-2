import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../axiosInstance";
import { AxiosResponse } from "axios";
import { GetStateType, Item } from "../types/types";

export const makeOffer = createAsyncThunk(
  "makeOffer",
  async ({
    itemID,
    price,
  }: {
    itemID: string;
    price: string;
  }): Promise<AxiosResponse> => {
    const resp = await axiosInstance.post(`/api/items/makeoffer/${itemID}`, {
      price: price,
    });
    console.log(resp.data);
    return resp.data;
  }
);

export const getPostsAsync = createAsyncThunk(
  "counter/getPostsAsync",
  async (payload: { categoryId: string }, { getState }) => {
    // @ts-ignore:next-line
    let state: GetStateType = getState(); //get a copy of the state so we can read state variables

    const requestPromise = axiosInstance.post<{ items: Item[] }>(
      `/api/items/${payload.categoryId}`
    );

    if (state.counter.items.items.length === 0) {
      const delayPromise = new Promise((resolve) => setTimeout(resolve, 1000));

      //the below line will block execution until both promises have been resolved
      await Promise.all([requestPromise, delayPromise]);
      return requestPromise.then((response) => response.data);
    } else {
      return requestPromise.then((response) => response.data);
    }
  }
);
