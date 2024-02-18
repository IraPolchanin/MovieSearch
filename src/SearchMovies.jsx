import React, { useState } from 'react';
import { MovieCard } from './MovieCard';

export const SearchMovies = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([])

  const searchMovies = async (e) => {
    e.preventDefault();
    const apiKey = `047d8b5b97c27fc26d95a7181eb3adf6`
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${query}&page=1&include_adult=false`

    try {
      const resp = await fetch(url);
      const data = await resp.json();
      setMovies(data.results)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <form className="form" onSubmit={searchMovies}>
        <label className="label" htmlFor="query">Movie Name</label>
        <input
          className="input"
          type="text"
          name="query"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="i.e. Jurassic Park"
        />
        <button className="button" type="submit">Search</button>
      </form>
      <div className="card-list">
        {movies.filter(movie => movie.poster_path).map(movie => (
          <MovieCard movie={movie} key={movie.id}/>
        ))}
      </div>
    </>
  )
}
