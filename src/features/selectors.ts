import { GetStateType } from "../types/types";

export const signUpSelect = (state : GetStateType) => state.counter.signUp;
export const dashboardSelect = (state : GetStateType) => state.counter.dashboard;
export const itemSelect = (state : GetStateType) => state.counter.item;
export const authSelect = (state : GetStateType) => state.counter.auth;
export const postsSelect = (state : GetStateType) => state.counter.items;
export const createPostSelect = (state : GetStateType) => state.counter.createPost;
export const profileSelect = (state : GetStateType) => state.counter.profile;
export const userSelect = (state : GetStateType) => state.counter.user;