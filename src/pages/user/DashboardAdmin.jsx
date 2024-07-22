import React, { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteMovie, getMovies, getMoviesFromStore } from '../../redux/movie/movieSlice'
import CreateMovie from '../../components/CreateMovie/CreateMovie'
import UpdateMovie from '../../components/UpdateMovie/UpdateMovie'
import './DashboardAdmin.scss'
import { ACCESS_TOKEN } from '../../constants'
import { Spin } from 'antd'

function DashboardAdmin() {
  const { movies } = useSelector(getMoviesFromStore)
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  console.log("movies in dashboard", movies)

  const [isCreateNewMovie, setIsCreateNewMovie] = useState(false)
  const [isUpdateMovie, setIsUpdateMovie] = useState(false)
  const [idSelectedMovie, setIdSelectedMovie] = useState('')

  const selectedMovie = useMemo(() => {
    return movies.find(item => item._id === idSelectedMovie) || {}
  }, [movies, idSelectedMovie])

  const handleDeleteMovie = async (movieId) => {
    if (confirm('Confirm delete movie?')) {
      const accessToken = localStorage.getItem(ACCESS_TOKEN)
      setLoading(true)
      await dispatch(deleteMovie({
        accessToken,
        id: movieId
      }))
      await dispatch(getMovies(accessToken))
      setLoading(false)
      setIdSelectedMovie('')
    }
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      margin: 30,
      gap: 20,
    }}>
      <button 
        title='New Movie'
        className='fa-solid fa-square-plus'
        onClick={() => setIsCreateNewMovie(true)}
        style={{
          cursor: 'pointer',
          fontSize: '28px',
          color: 'white',
          backgroundColor: '#F39C12',
          borderRadius: 5,
          padding: 10,
          border: 0,
        }}>
          <span style={{
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
          > {''} Add New Movie </span>
      </button>
      {
        isCreateNewMovie && <CreateMovie setIsCreateNewMovie={setIsCreateNewMovie} />
      }
      {
        isUpdateMovie && <UpdateMovie 
          setIdSelectedMovie={setIdSelectedMovie}
          selectedMovie={selectedMovie}
          setIsUpdateMovie={setIsUpdateMovie} 
        />
      }

      <section>
        <div className='table-header'>
          <p className='table-heading'>ID</p>
          <p className='table-heading'>Title</p>
          <p className='table-heading'>Year</p>
          <p className='table-heading'>Poster</p>
          <p className='table-heading'>Action</p>
        </div>

        <>
          {
            movies.length && movies?.map(movie => {
              const { _id, title, year, poster } = movie
              return (
                <div key={_id} className='table-body'>
                  <p className='table-data'>{_id}</p>
                  <p className='table-data'>{title}</p>
                  <p className='table-data'>{year}</p>
                  <p className='table-data'>
                    <img src={poster} alt="movie-poster" className='table-data-poster' />
                  </p>
                  <p className='table-data'>
                    <button 
                      style={{
                      cursor: 'pointer',
                      padding: 10,
                      color: 'green',
                      fontWeight: 'bolder',
                      fontSize: '16px',
                      minWidth: 80,
                      }}
                      onClick={() => {
                        setIsUpdateMovie(true)
                        setIdSelectedMovie(_id)
                      }}
                    > Edit </button>
                    {''}
                    <button 
                      style={{
                        cursor: 'pointer',
                        padding: 10,
                        color:'red',
                        fontWeight: 'bolder',
                        fontSize: '16px',
                        minWidth: 80,
                      }}
                      onClick={() => {
                        handleDeleteMovie(_id)
                        setIdSelectedMovie(_id)
                      }}
                    > Delete
                      {loading && idSelectedMovie === _id && <Spin size='small' style={{ marginLeft: 10 }} />}
                    </button>
                  </p>
                </div>
              )
            })
          }
        </>
      </section>
    </div>
  )
}

export default DashboardAdmin