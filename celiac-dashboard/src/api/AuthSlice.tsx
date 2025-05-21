import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Permission = {
  id: number;
  name: string;
  module: string;
  action: string;
};

type UserData = {
  email: string | null;
  name: string | null;
  image: string | null;
  permissions: Permission[] | null;
};

type AuthState = {
  adminLogin: string | null;
  userData: UserData | null;
};

const initialState: AuthState = {
  adminLogin: localStorage.getItem('admintoken'),
  userData: {
    email: localStorage.getItem('email'),
    name: localStorage.getItem('name'),
    image: localStorage.getItem('image'),
    permissions: JSON.parse(localStorage.getItem('permissions') || 'null'),
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string | null>) => {
      if (action.payload) {
        localStorage.setItem('admintoken', action.payload);
      } else {
        localStorage.removeItem('admintoken');
      }
      state.adminLogin = action.payload;
    },
    setUserData: (state, action: PayloadAction<any | null>) => {
      if (action.payload && action.payload.data.data) {
        const { email, name, image, permissions } = action.payload.data.data;
        if (email) {
          localStorage.setItem('email', email);
        } else {
          localStorage.removeItem('email');
        }
        if (name) {
          localStorage.setItem('name', name);
        } else {
          localStorage.removeItem('name');
        }
        if (image) {
          localStorage.setItem('image', image);
        } else {
          localStorage.removeItem('image');
        }
        if (permissions) {
          localStorage.setItem('permissions', JSON.stringify(permissions));
        } else {
          localStorage.removeItem('permissions');
        }
        state.userData = { email, name, image, permissions };
      } else {
        localStorage.removeItem('email');
        localStorage.removeItem('name');
        localStorage.removeItem('image');
        localStorage.removeItem('permissions');
        state.userData = null;
      }
    },
    clearUserData: (state) => {
      localStorage.removeItem('email');
      localStorage.removeItem('name');
      localStorage.removeItem('image');
      localStorage.removeItem('permissions');
      state.userData = null;
    },
  },
});

export const { setToken, setUserData, clearUserData } = authSlice.actions;
export default authSlice.reducer;
