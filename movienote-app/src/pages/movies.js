import React, { useState } from 'react';
import axios from 'axios';
import List from './yrlist';

const MovieSearch = ({ addToList }) => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [sortOption, setSortOption] = useState('');

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
    };


  const searchMovies = async () => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
        params: {
          api_key: 'edb25027eda51739f1898a8064bd3f67',
          query: query,
        }
      });
      const sortedMovies = sortMovies(response.data.results || [], sortOption);
      setMovies(sortedMovies);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  const sortMovies = (movies, sortOption) => {
    const sortedMovies = [...movies];
    switch (sortOption) {
      case 'popularity.desc':
        sortedMovies.sort((a, b) => b.popularity - a.popularity);
        break;
      case 'popularity.asc':
        sortedMovies.sort((a, b) => a.popularity - b.popularity);
        break;
      case 'release_date.desc':
        sortedMovies.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
        break;
      case 'release_date.asc':
        sortedMovies.sort((a, b) => new Date(a.release_date) - new Date(b.release_date));
        break;
      case 'alphabet.desc':
        sortedMovies.sort((a,b) => b.title.localeCompare(a.title));
        break;
      case 'alphabet.asc':
        sortedMovies.sort((a,b) => a.title.localeCompare(b.title));
        break;
        default:
        break;
    }
    return sortedMovies;
  };


  return (
    <div>
      <h1 className="listtitle">Search Movies</h1>
        <div className='search'>
        <input type="text" value={query} onChange={handleChange} />
        <button id="searchbutt" onClick={searchMovies}>Search</button>

        <select className="sorting" value={sortOption} onChange={handleSortChange}>
        <option value="popularity.desc">Popularity: Most - Least</option>
        <option value="popularity.asc">Popularity: Least - Most </option>
        <option value="release_date.desc">Newest - Oldest</option>
        <option value="release_date.asc">Oldest - Newest</option>
        <option value="alphabet.desc"> Z - A</option>
        <option value="alphabet.asc"> A - Z</option>
        </select>

        </div>
      <ul className="list">
        {movies.map((movie) => (
          <li className="listspec" key={movie.id}>
            {movie.poster_path && (
              <img id="movimg" src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
            )}
            <div className="info">
              <h3>{movie.title}</h3>
              <p>Release Date: {movie.release_date}</p>
              <p>Rating⭐️: {movie.popularity}</p>
              <p>Add to List: <button type="button" onClick={() => addToList(movie)}>Yes</button></p>
            </div>
          </li>
        ))}
      </ul>

    </div>
  );
};

export default MovieSearch;
