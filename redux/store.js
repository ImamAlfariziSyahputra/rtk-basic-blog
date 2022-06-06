import { configureStore } from '@reduxjs/toolkit';
import postReducer from './slice/post/postSlice';
import userReducer from './slice/user/userSlice';

export const store = configureStore({
  reducer: {
    posts: postReducer,
    users: userReducer,
  },
});
