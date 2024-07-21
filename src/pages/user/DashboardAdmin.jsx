import React, { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMoviesFromStore, removeSelectedMovie } from '../../redux/movie/movieSlice'
import CreateMovie from '../../components/CreateMovie/CreateMovie'
import UpdateMovie from '../../components/UpdateMovie/UpdateMovie'
import './DashboardAdmin.scss'

function DashboardAdmin() {
  const { movies } = useSelector(getMoviesFromStore)
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  console.log("movies in dashboard", movies)

  const [isCreateNewMovie, setIsCreateNewMovie] = useState(false)
  const [isUpdateMovie, setIsUpdateMovie] = useState(false)
  const [idSelectedMovie, setIdSelectedMovie] = useState('')

  const selectedMovie = useMemo(() => {
    return movies.find(item => item._id === idSelectedMovie)
  }, [movies, idSelectedMovie])

  const handleDeleteMovie = async (movieId) => {
    // setLoading(true)
    // await dispatch(removeSelectedMovie(movieId))
    // setLoading(false)
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: 20,
    }}>
      <h1>Admin dashboard</h1>
      <button 
        className='new-movie-btn'
        onClick={() => setIsCreateNewMovie(true)}
      >
        New movie
      </button>
      {
        isCreateNewMovie && <CreateMovie setIsCreateNewMovie={setIsCreateNewMovie} />
      }
      {
        isUpdateMovie && <UpdateMovie 
          selectedMovie={selectedMovie} 
          setIsUpdateMovie={setIsUpdateMovie} 
        />
      }

      <section>
        <div className='table-header' style={{
          display: 'flex',
          justifyContent:'space-between',
          alignItems: 'center',
          gap: 275,
          padding: 10,
          fontWeight: 'bold'
        }}>
          <p className='table-heading'>Id</p>
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
                      fontWeight: 'bold'
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
                        fontWeight: 'bold'
                      }}
                      onClick={() => handleDeleteMovie(_id)}
                    > Delete </button>
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