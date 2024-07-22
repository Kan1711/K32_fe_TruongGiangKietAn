import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMovies, getMoviesFromStore } from '../../redux/movie/movieSlice'
import { ACCESS_TOKEN } from '../../constants'
import MovieListing from '../../components/MovieListing/MovieListing'
import { Spin } from 'antd'

function HomePage() {
  const dispatch = useDispatch()
  const { movies } = useSelector(getMoviesFromStore)
  console.log("movies from store", movies)

  const fetchMovies = () => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN)
    if (accessToken)  {
      dispatch(getMovies(accessToken))
    }
  }

  useEffect(() => {
    fetchMovies()
  }, [localStorage.getItem(ACCESS_TOKEN)])

  return (
    <section>
      <h1 style={{
        margin: 25,
        padding: 30,
      }} className='title'>Movies List</h1>
      {
        movies?.length === 0 ? (<div
          style={{
            width: '100vw',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            
          }}
        >
          <Spin size='large'/>
        </div>) : (<MovieListing movies={movies} />)
      }
    </section>
  )
}

export default HomePage