import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import createApi from "../../api";
import { notification } from "antd";
import { ACCESS_TOKEN, NOTIFICATION_TYPES } from "../../constants";

export const register = createAsyncThunk('auth/register', async (dataRegister) => {
  try {
    const { data } = await createApi().post('/auth/register', { ...dataRegister })
    notification[NOTIFICATION_TYPES.success]({
      message: 'Register successfully'
    })
    return data?.data
  } catch (error) {
    notification[NOTIFICATION_TYPES.error]({
      message: error.response.data.message
    })
  }
})

export const login = createAsyncThunk('auth/login', async (dataLogin) => {
  try {
    const { data } = await createApi().post('/auth/login', { ...dataLogin })
    localStorage.setItem(ACCESS_TOKEN, data.data.accessToken)
    notification[NOTIFICATION_TYPES.success]({
      message: 'Login successfully'
    })

    return data.data
  } catch (error) {
    notification[NOTIFICATION_TYPES.error]({
      message: error.response.data.message
    })
  }
})

export const logout = createAsyncThunk('auth/logout', async (accessToken) => {
  try {
    await createApi(accessToken).post('/auth/logout')
    localStorage.clear()
  } catch (error) {
    notification[NOTIFICATION_TYPES.success]({
      message: 'Log out successfully'
    })
  }
})

const initialState = {
  user: {}
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.user = action.payload
    })
    builder.addCase(logout.fulfilled, (state, action) => {
      state.user = {}
    })
  }
})

export const getLoggedInUser = state => state.auth.user

export default authSlice.reducer