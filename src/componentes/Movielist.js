import React, { useContext } from 'react';
import UserContext from '../context/UserContext'; // Ruta correcta al archivo de contexto

const MovieList = () => {
  const { user } = useContext(UserContext);

  return (
    <div className='listapelis'>
        
      <h2>Películas favoritas de {user.name}</h2>
      <ul>
        {user.favoriteMovies.map((movieId) => (
          <li key={movieId}>{movieId}</li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;