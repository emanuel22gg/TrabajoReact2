import { createAsyncThunk } from '@reduxjs/toolkit';
import { authenticateUser } from '../services/authService';

// Thunk para login
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const user = await authenticateUser(credentials);
      if (user) {
        return user;
      } else {
        return rejectWithValue('Usuario o contraseña incorrectos');
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);