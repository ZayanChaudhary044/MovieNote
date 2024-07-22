import React, { useState } from 'react';
import axios from 'axios';


const List = ({ myList, removeFromList }) => {

    return(
        <div>
            <h2 className='mylist'>My List📝</h2>
        <ul className="list">
            {myList.map((movie) => (
            <li className="listspec" key={movie.id}>
                {movie.poster_path && (
                <img id="movimg" className="movie-poster" src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
                )}
                <div className="info">
                <h3>{movie.title}</h3>
                <p>Release Date: {movie.release_date}</p>
                <p>Rating⭐️: {movie.popularity}</p>
                <p>
                    <button onClick={() =>removeFromList(movie)}>Remove</button>
                </p>
                </div>
            </li>
            ))}
        </ul>
        </div>
    )
}

export default List;


