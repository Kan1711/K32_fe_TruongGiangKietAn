
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getMovieDetail, getMovieFromStore, removeSelectedMovie } from '../../redux/movie/movieSlice';
import { ACCESS_TOKEN } from '../../constants';
import { Spin } from 'antd';
import MovieDetail from '../../components/MovieDetail/MovieDetail';

function MovieDetailPage() {
  const dispatch = useDispatch()
  const { id } = useParams()
  const movie = useSelector(getMovieFromStore)
  console.log("movie from store", movie)

  const fetchMovie = async () => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN)
    if (accessToken && id) {
      dispatch(getMovieDetail({accessToken, id}))
    }
  }

  useEffect(() => {
    fetchMovie()

    return () => {
      dispatch(removeSelectedMovie())
    }
  }, [localStorage.getItem(ACCESS_TOKEN), id])

  return (
    <section>

      {
        Object.keys(movie).length === 0 ? (<div
          style={{
            width: '100vw',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
          >
          <Spin size='large' />
        </div>) : (<MovieDetail movie={movie} />)
      }
    </section>
  )
}

export default MovieDetailPage;
