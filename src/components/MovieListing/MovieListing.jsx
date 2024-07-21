import React from 'react'
import MovieCard from '../MovieCard/MovieCard';
import './MovieListing.scss'

function MovieListing({ movies }) {

  return (
    <div className='movies-list'>
      <div className='movies-container'>
        {
          movies?.map(movie => (
            <div key={movie?._id}>
              <MovieCard movie={movie} />
            </div>
          ))

        }
      </div>
    </div>
  )
}

export default MovieListing;