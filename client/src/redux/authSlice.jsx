import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
  search: {
    title: "",
    category: "",
    name: "",
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, { payload }) => {
      state.user = payload.user;
      localStorage.setItem("user", JSON.stringify(payload.user));
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
    setSearch: (state, { payload }) => {
      state.search = payload
    },
  },
});

export const { setCredentials, logout, setSearch } = authSlice.actions;
export default authSlice.reducer;
