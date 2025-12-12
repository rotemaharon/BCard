import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import type { UserType } from "../interfaces/UserType";

interface UserState {
  user: UserType | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const getToken = () => localStorage.getItem("token");
const getUserFromToken = (): UserType | null => {
  const token = getToken();
  if (!token) return null;
  try {
    return jwtDecode(token) as UserType;
  } catch {
    return null;
  }
};

const initialState: UserState = {
  user: getUserFromToken(),
  token: getToken(),
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    },
    setUser: (state, action: PayloadAction<UserType>) => {
      state.user = action.payload;
    },
  },
});

export const { logout, setUser } = userSlice.actions;
export default userSlice.reducer;
