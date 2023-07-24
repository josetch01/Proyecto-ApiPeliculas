import React, { useContext} from 'react'
import UserContext from '../context/UserContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
  // endpoint para las imagenes
  const imgStyles = {
    height: '600px',
    objectFit: 'cover',
    }

const URL_IMAGE = "https://image.tmdb.org/t/p/original";

export const Movie = ({ movie }) => {

  const {user,peliculafavorita}= useContext(UserContext);

    const favorito=user?.favoriteMovies?.includes(movie.title);



    const copiarEnlace = () => {
      const peli = movie.title; // Reemplaza con tu enlace deseado
      navigator.clipboard.writeText(peli)
        .then(() => {
          toast.success('Enlace copiado al portapapeles', {
            position: toast.POSITION.TOP_RIGHT // Puedes ajustar la posición según tus necesidades
          });
        })
        .catch((err) => {
          console.error('Error al copiar el enlace al portapapeles:', err);
        });
    };
  return (
        <div className="card contenedorpelis">
            <img
                className='poster rounded'
                src={`${URL_IMAGE + movie.poster_path}`}
                alt=""
                style={imgStyles} 
              />
              <div className="card-body">
              <h4 className="text-center">{movie.original_title}</h4>
              <p className="text-center fecha"> {movie.release_date}</p>
              <p className="text-center valoracion"><i class="fa-regular fa-star-half-stroke fa-beat"></i>{movie.vote_average}</p>
              {user?.id &&
              <div className='botonesmovie'>
              {favorito?<button className="btnsinfavorito"onClick={()=>peliculafavorita(movie.title)} ><i class="fa-regular fa-star fa-flip"></i></button>:<button className="btnfavorito" onClick={()=>peliculafavorita(movie.title)}>Favorito</button>}
              <button className="btnseleccionar" onClick={copiarEnlace}><i class="fa-solid fa-share"></i></button>
              <ToastContainer />
              </div>
            }
              
              </div>

        </div>
  )
}
