import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserData } from '../types';

interface UserState {
  users: UserData[];
}

const initialState: UserState = {
  users: JSON.parse(localStorage.getItem('users') || '[]'),
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<UserData>) => {
      state.users.push(action.payload);
      localStorage.setItem('users', JSON.stringify(state.users));
    },
  },
});

export const { addUser } = userSlice.actions;
export default userSlice.reducer;