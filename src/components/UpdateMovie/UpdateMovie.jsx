import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

function UpdateMovie({ selectedMovie, setIsUpdateMovie }) {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    title: selectedMovie?.title || '',
    year: selectedMovie?.year || '',
    poster: selectedMovie?.poster || '',
  })

  const handleUpdateMovie = async (e) => {
    e.preventDefault()
    setLoading(true)
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
          maxWidth: 500,
        }}
      >

      </form>
    </section>
  )
}

export default UpdateMovie