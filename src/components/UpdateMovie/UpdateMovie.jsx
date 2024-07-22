import { Spin } from 'antd'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import './UpdateMovie.scss'
import { getMovies, updateMovie } from '../../redux/movie/movieSlice'
import { ACCESS_TOKEN } from '../../constants'

function UpdateMovie({ setIdSelectedMovie, selectedMovie, setIsUpdateMovie }) {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    title: selectedMovie?.title || '',
    year: selectedMovie?.year || '',
    poster: selectedMovie?.poster || ''
  })

  const handleUpdateMovie = async (e) => {
    e.preventDefault()
    setLoading(true)
    const accessToken = localStorage.getItem(ACCESS_TOKEN)
    await dispatch(updateMovie({
      accessToken,
      id: selectedMovie._id,
      updateData: formData
    }))
    await dispatch(getMovies(accessToken))
    setLoading(false)
    setIdSelectedMovie('')
    setIsUpdateMovie(false)
    setFormData({
      title: '',
      year: '',
      poster: ''
    })
  }

  return (
    <section>
      <h1 className='title'>Update movie</h1>
      <form
        onSubmit={handleUpdateMovie}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
          width: 500,
          maxWidth: 500
        }}
      >
        <input
          type="text"
          value={formData.title}
          onChange={e => setFormData({ ...formData, title: e.target.value })}
          placeholder='Movie title'
          autoFocus
          className='input'
        />
        <input
          type="text"
          value={formData.year}
          onChange={e => setFormData({ ...formData, year: e.target.value })}
          placeholder='Year release'
          className='input'
        />
        <textarea
          rows={4}
          type="text"
          value={formData.poster}
          onChange={e => setFormData({ ...formData, poster: e.target.value })}
          placeholder='Movie poster'
          className='input'
        />
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 5,
            marginTop: 10,
            width: '100%',
          }}
        >
          <button
            className='btn btn-submit'
            type='submit'
          >
            Update
            { loading && <Spin size='small' style={{marginLeft: 10}} />}
          </button>
          <button className='btn btn-cancel' onClick={() => setIsUpdateMovie(false)}>Cancel</button>
        </div>
      </form>
    </section>
  )
}

export default UpdateMovie