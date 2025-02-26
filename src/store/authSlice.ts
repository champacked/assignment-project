import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, AuthUser, SignUpData, SignInData } from "../types";

const mockUsers = new Map<string, { password: string; user: AuthUser }>();

const initialState: AuthState = {
  user: JSON.parse(localStorage.getItem("authUser") || "null"),
  isAuthenticated: !!localStorage.getItem("authUser"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AuthUser | null>) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
      if (action.payload) {
        localStorage.setItem("authUser", JSON.stringify(action.payload));
      } else {
        localStorage.removeItem("authUser");
      }
    },
  },
});

export const { setUser } = authSlice.actions;

// Mock authentication functions
export const signUp = (data: SignUpData) => {
  return async (dispatch: any) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (mockUsers.has(data.email)) {
      throw new Error("User already exists");
    }

    const newUser: AuthUser = {
      id: Math.random().toString(36).substr(2, 9),
      email: data.email,
      name: data.name,
    };

    mockUsers.set(data.email, {
      password: data.password,
      user: newUser,
    });

    return newUser;
  };
};

export const signIn = (data: SignInData) => {
  return async (dispatch: any) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const userRecord = mockUsers.get(data.email);
    if (!userRecord || userRecord.password !== data.password) {
      throw new Error("Invalid credentials");
    }

    dispatch(setUser(userRecord.user));
  };
};

export const signOut = () => {
  return (dispatch: any) => {
    dispatch(setUser(null));
  };
};

export default authSlice.reducer;
