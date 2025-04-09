import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./features/api/authApi";
import { taskApi } from "./features/api/taskApi";
import authReducer from "./features/auth/authSlice";
import { localStorageMiddleware } from "./middleware/localStorageMiddleware";
import { userApi } from "./features/api/userApi";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [taskApi.reducerPath]: taskApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(taskApi.middleware)
      .concat(userApi.middleware)
      .concat(localStorageMiddleware),
});
