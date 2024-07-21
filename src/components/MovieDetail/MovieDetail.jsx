import React from 'react'
import './MovieDetail.scss'

function MovieDetail({ movie }) {
  return (
    <div className='movie-section'>
      <div className='section-left'>
        <div className='movie-title'>
          {movie?.title}
        </div>

        <div>
          <span>Year: {movie?.year} </span>
        </div>
      </div>

      <div className='section-right'>
        <img src={movie?.poster} alt="movie-poster" />
      </div>
    </div>
  )
}

export default MovieDetail