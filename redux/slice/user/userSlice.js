import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = [
  {
    id: '1',
    name: 'Matt Murdock',
  },
  {
    id: '2',
    name: 'Basuki Ahok',
  },
];

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
});

export const selectUsers = (state) => state.users;

// export const {} = userSlice.actions;
export default userSlice.reducer;
