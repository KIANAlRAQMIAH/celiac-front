import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import modelReducer from "./modelSlice";
import { homeApi } from "@/api/HomeApiSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { aboutUsApi } from "@/api/AboutUsApiSlice";
import { committeeApi } from "@/api/CommitteeApiSlice";
import { authApi } from "@/api/AuthApiSlice";
import { ClinicApi } from "@/api/Clinic/ClinicApiSlice";
import { ClinicSocialApi } from "@/api/Clinic/SocialGroupApiSlice";
import { profileApi } from "@/api/profileApiSlice";
import { servecesApi } from "@/api/serveces";
// import { authApi } from "@/src/api/AuthApiSlice";
// import { homeApi } from "@/src/api/HomeApiSlice";
// import { catApi } from "../api/Categories";
const store = configureStore({
  reducer: {
    auth: authReducer,
    Model: modelReducer,
    [authApi.reducerPath]: authApi.reducer,
    [homeApi.reducerPath]: homeApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
    [aboutUsApi.reducerPath]: aboutUsApi.reducer,
    [committeeApi.reducerPath]: committeeApi.reducer,
    [ClinicApi.reducerPath]: ClinicApi.reducer,
    [ClinicSocialApi.reducerPath]: ClinicSocialApi.reducer,
    [servecesApi.reducerPath]: servecesApi.reducer
    // cart:cartReducer,
    // [homeApi.reducerPath]: homeApi.reducer,
    // [authApi.reducerPath]: authApi.reducer,
    // [catApi.reducerPath]: catApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    // authApi.middleware
    getDefaultMiddleware().concat(
      homeApi.middleware,
      profileApi.middleware,
      aboutUsApi.middleware,
      authApi.middleware,
      committeeApi.middleware,
      ClinicApi.middleware,
      ClinicSocialApi.middleware,
      servecesApi.middleware
    ),
});

setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
export default store;
