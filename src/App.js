
import './App.css';
import Nav from "./Nav";
import { getData } from './apiCalls.js';
import MovieCard from "./MovieCard";
import Details from './Details.js';
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom'

const App = () => {
  const [allMovies, setAllMovies] = useState([]);
  const [error, setError] = useState(null);


  const getMovie = () =>{
    fetch('https://rancid-tomatillos.herokuapp.com/api/v2/movies')
    .then(res => res.json())
    .then(json => setAllMovies(json.movies))
    .catch(err => setError(err))
  }
  useEffect(() => {
    getMovie()
  }, []);

  const allMoviesView = (movies) => {
    return (
      <div className="movie-card-grid">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            movie={movie}
          />
        ))}
      </div>
    )
  }

  return (
    <>
      <Nav />
      {error ? (
        <div className='error-message'>Error: {error.message}</div>
      ) : (
        <Routes>
          <Route path="/" element={allMoviesView(allMovies)} />
          <Route path="/:id" element={<Details />} />
        </Routes>
      )}
      <footer>
        
      </footer>
    </>
  );
};
  
export default App;