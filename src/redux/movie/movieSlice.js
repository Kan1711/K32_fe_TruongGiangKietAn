import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { NOTIFICATION_TYPES } from "../../constants";
import createApi from "../../api";
import { notification } from "antd";

export const getMovies = createAsyncThunk('movies/getMovies', async (accessToken) => {
  try {
    const { data } = await createApi(accessToken).get('/movies')
    notification[NOTIFICATION_TYPES.success]({
      message: 'Get movies successfully',
    })
    return data.data
  } catch (error) {
    notification[NOTIFICATION_TYPES.error]({
      message: error.response.data.message
    })
  }
});

export const getMovieDetail = createAsyncThunk('movies/getMovieDetail', async ({ accessToken, id }) => {
  try {
    const { data } = await createApi(accessToken).get(`/movies/${id}`)
    notification[NOTIFICATION_TYPES.success]({
      message: 'Get movies detail successfully',
    })
    return data.data
  } catch (error) {
    notification[NOTIFICATION_TYPES.error]({
      message: error.response.data.message
    })
  }
})

export const createNewMovie = createAsyncThunk('movies/createNewMovie', async ({accessToken, newMovie}) => {
  try {
    await createApi(accessToken).post('/movies/', { ...newMovie })
    notification[NOTIFICATION_TYPES.success]({
      message: 'Create new movie successfully',
    })
  } catch (error) {
    notification[NOTIFICATION_TYPES.error]({
      message: error.response.data.message
    })
  }
})

export const updateMovie = createAsyncThunk('movies/updateMovie', async ({ accessToken, id, updateData }) => {
  try { 
    await createApi(accessToken).put(`/movies/${id}`, { ...updateData })
    notification[NOTIFICATION_TYPES.success]({
      message: 'Update movie successfully',
    })
  } catch (error) {
    notification[NOTIFICATION_TYPES.error]({
      message: error.response.data.message
    })
  }
})

export const deleteMovie = createAsyncThunk('movies/deleteMovie', async (accessToken, id) => {
  try {
    await createApi(accessToken).delete(`/movies/${id}`)
    notification[NOTIFICATION_TYPES.success]({
      message: 'Delete movie successfully',
    })
  } catch (error) {
    notification[NOTIFICATION_TYPES.error]({
      message: error.response.data.message
    })
  }
})

const initialState = {
  movies: [],
  movie: {}
}

const movieSlice = createSlice({
  name:'movies',
  initialState,
  reducers: {
    removeSelectedMovie: (state, action) => {
      state.movie = {}
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getMovies.fulfilled, (state, action) => {
      state.movies = action.payload
    })
    builder.addCase(getMovieDetail.fulfilled, (state, action) => {
      state.movie = action.payload
    })
  }
})

export const { removeSelectedMovie } = movieSlice.actions;

export const getMoviesFromStore = state => state.movie.movies
export const getMovieFromStore = state => state.movie.movie

export default movieSlice.reducer;