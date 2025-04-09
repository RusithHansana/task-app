export const localStorageMiddleware =
  ({ getState }) =>
  (next) =>
  (action) => {
    const result = next(action);
    const state = getState().auth;

    if (action.type === "auth/setCredentials") {
      localStorage.setItem("user", JSON.stringify(state.user));
    }

    if (action.type === "auth/clearCredentials") {
      localStorage.removeItem("user");
    }

    return result;
  };
