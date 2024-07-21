import React from 'react'
import { Link } from 'react-router-dom'
import './MovieCard.scss'

function MovieCard({ movie }) {

  return (
    <Link to={`/movies/${movie?._id}`}>
      <div className='card-item'>
        <div className='card-top'>
          <img src={movie?.poster} alt="movie-poster" />
        </div>
        <div className='card-bottom'>
          <h4>{movie?.title}</h4>
          <p>{movie?.year}</p>
        </div>
      </div>
    </Link>
  )
}

export default MovieCard