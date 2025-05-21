import { createSlice } from "@reduxjs/toolkit";
type AuthModelState = {
  openModel: boolean;
  openModelMenu: boolean;
  isLogin: boolean;
  userLogin: string | null;
  signUp: boolean;
  clinicData: any;
};

const initialState: AuthModelState = {
  openModel: false,
  openModelMenu: false,
  isLogin: true,
  userLogin: null,
  signUp: false,
  clinicData: []
};

const ModelSlice = createSlice({
  name: "model",
  initialState,
  reducers: {
    openModel: (state: AuthModelState) => {
      state.openModel = true;
    },
    clinicData: (state: any, action: any) => {
      state.clinicData = action.payload;
    },
    closeAuthModel: (state: AuthModelState) => {
      state.openModel = false;
    },

    openModelMenu: (state: AuthModelState) => {
      state.openModelMenu = true;
    },

    closeModelMenu: (state: AuthModelState) => {
      state.openModelMenu = false;
    },

    setIsLoginToTrue: (state: AuthModelState) => {
      state.isLogin = true;
    },
    SetToken: (state: AuthModelState, action: any) => {
      state.userLogin = action.payload;
    },
    setIsLoginToFalse: (state: AuthModelState) => {
      state.isLogin = false;
    },

    setSignupTofalse: (state: AuthModelState) => {
      state.signUp = false;
    },

    setSignupTotrue: (state: AuthModelState) => {
      state.signUp = true;
    },
  },
});

export const modelActions = ModelSlice.actions;
export default ModelSlice.reducer;
