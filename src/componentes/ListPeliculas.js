import { useContext, useEffect } from 'react';
import axios from 'axios'
import { useState } from 'react';
import YouTube from 'react-youtube';
import { Movie } from './Movie';
import MovieList from './Movielist';
import UserContext from '../context/UserContext';

function ListPeliculas() {
  const API_URL = "https://api.themoviedb.org/3";
  const API_KEY = "4f5f43495afcc67e9553f6c684a82f84";
  const IMAGE_PATH = "https://image.tmdb.org/t/p/original";

  const [movies, setMovies] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [trailer, setTrailer] = useState(null);
  const [movie, setMovie] = useState({ title: "Cargando Peliculas" });
  const [playing, setPlaying] = useState(false);


  const fetchMovies = async (searchKey) => {
    const type = searchKey ? "search" : "discover";
    const {
      data: { results },
    } = await axios.get(`${API_URL}/${type}/movie`, {
      params: {
        api_key: API_KEY,
        query: searchKey,
      },
    });

    setMovies(results);
    setMovie(results[0]);

    if (results.length) {
      await fetchMovie(results[0].id);
    }
  };

  const fetchMovie = async (id) => {
    const { data } = await axios.get(`${API_URL}/movie/${id}`, {
      params: {
        api_key: API_KEY,
        append_to_response: "videos",
      },
    });

    if (data.videos && data.videos.results) {
      const trailer = data.videos.results.find(
        (vid) => vid.name === "Official Trailer"
      );
      setTrailer(trailer ? trailer : data.videos.results[0]);
    }
    setMovie(data);
  };

  const selectMovie = async (movie) => {
    fetchMovie(movie.id);
    setMovie(movie);
  };

  const searchMovies = (e) => {
    e.preventDefault();
    fetchMovies(searchKey);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const { user } = useContext(UserContext);
  return (
    <div>
      <h2 className="text-center mt-5 mb-5">PELICULAS GRATIS</h2>

{/* el buscador */}
    <form className="container mb-4 header" onSubmit={searchMovies}>
      <input className='inputbuscador'
        type="text"
        placeholder="Buscar"
        onChange={(e) => setSearchKey(e.target.value)}
      />
      <button className="botonbuscador">Buscar</button>
    </form>
<div>
  <main>
    {movie ? (
      <div
        className="viewtrailer"
        style={{
          backgroundImage: `url("${IMAGE_PATH}${movie.backdrop_path}")`,
        }}
      >
        {playing ? (
          <div className='divvideo'>
            <YouTube
              videoId={trailer.key}
              className="reproductor container"
              containerClassName={"youtube-container amru"}
              opts={{
                width: "100%",
                height: "100%",
                playerVars: {
                  autoplay: 1,
                  controls: 0,
                  cc_load_policy: 0,
                  fs: 0,
                  iv_load_policy: 0,
                  modestbranding: 0,
                  rel: 0,
                  showinfo: 0,
                },
              }}
            />
            <button onClick={() => setPlaying(false)} className="botonvideo">
              Close
            </button>
          </div>
        ) : (
          <div className="container ">
            <div className="textovideo">
              {trailer ? (
                <button
                  className="boton"
                  onClick={() => setPlaying(true)}
                  type="button"
                >
                  Ver Trailer
                </button>
              ) : (
                "No se encontró Detalles"
              )}
              <h1 className="text-white">{movie.title}</h1>
              <p className="text-white">{movie.overview}</p>
            </div>
          </div>
        )}
      </div>
    ) : null}
  </main>
</div>
{user?.id &&
<MovieList/>
}
{/* contenedor para mostrar los posters y las peliculas en la peticion a la api */}
<div className="container mt-3">
  <div className="row">
    
    {movies.map((movie) => (
      <div
        key={movie.id}
        className="col-md-4 mb-3"
        onClick={() => selectMovie(movie)}
      >
        <Movie movie={movie}/>
      </div>
    ))}
                  
  </div>
</div>
    </div>
  )
}

export default ListPeliculas