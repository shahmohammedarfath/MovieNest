import axios from "axios";
import { Calendar, Clock, Play, Star } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import MovieCard from "../MovieCard";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

const MoviesPage = ({ type }) => {
  const { id } = useParams();
  const [movie, setMovie] = useState();
  const [cast, setCast] = useState([]);
  const [director, setDirector] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/${type}/${id}?api_key=${API_KEY}`
        );
        setMovie(response.data);
      } catch (error) {
        console.log("Failed to fetch the movie. Try again");
      }
    };

    const fetchCredits = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/${type}/${id}/credits?api_key=${API_KEY}`
        );

        const crew = response.data?.crew;
        const director = crew.find(
          (person) => person.known_for_department === "Directing"
        );
        setDirector(director ? director.name : "Unknown");
        setCast(response.data?.cast);
      } catch (error) {
        console.log("Failed to fetch the cast. Try again");
      }
    };

    const fetchSimilarMovies = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/${type}/${id}/similar?api_key=${API_KEY}`
        );
        setSimilarMovies(response.data?.results);
      } catch (error) {
        console.error("Failed to fetch similar movies. Try again");
      }
    };

    fetchMovie();
    fetchCredits();
    fetchSimilarMovies();

    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id, type]);

  const handleExternalLink = () => {
    if (movie?.homepage) {
      window.open(movie?.homepage, "_blank", "noopener", "noreferrer");
    } else {
      alert("No official link available for this movie.");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Movie Hero */}
      <section className="relative">
        {/* Backdrop Image */}
        <div className="relative h-[50vh] md:h-[70vh] w-full">
          <img
            src={
              movie?.backdrop_path
                ? `${IMAGE_BASE_URL}/${movie?.backdrop_path}`
                : "/assets/bg-fallback-image.png"
            }
            alt={movie?.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
          {/* <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-70" /> */}
        </div>

        {/* Movie Info */}
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          <div className="relative -mt-40 flex flex-col md:flex-row md:items-end gap-8">
            {/* Poster */}
            <div className="relative h-[210px] w-[140px] md:h-[300px] md:w-[200px] overflow-hidden rounded-lg shadow-xl">
              <img
                src={
                  movie?.poster_path
                    ? `${IMAGE_BASE_URL}/${movie?.poster_path}`
                    : "/assets/fallback-image.jpg"
                }
                alt=""
                className="object-cover h-full"
              />
            </div>

            {/* Details */}
            <div className="flex-1">
              <h1 className="text-3xl font-bold md:text-4xl lg:text-5xl">
                {movie?.title || movie?.name}
              </h1>

              <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-gray-300">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                  <span>{movie?.vote_average}</span>
                </div>
                <span className="h-1 w-1 rounded-full bg-gray-500"></span>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{movie?.release_date || movie?.first_air_date}</span>
                </div>

                <span className="h-1 w-1 rounded-full bg-gray-500"></span>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{movie?.runtime || movie?.episode_run_time} mins</span>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2 ">
                {movie?.genres.map((genre) => (
                  <Badge
                    key={genre.id}
                    variant="secondary"
                    className="bg-gray-800 hover:bg-gray-700 text-white"
                  >
                    {genre.name}
                  </Badge>
                ))}
              </div>

              <p className="mt-6 max-w-2xl text-gray-300">{movie?.overview}</p>

              <div className="mt-6 flex flex-wrap gap-4">
                <Button
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={handleExternalLink}
                  disabled={!movie?.homepage}
                >
                  <Play className="h-4 w-4" />
                  Watch Now
                </Button>
                <Button className="flex items-center gap-2">
                  <Play className="h-4 w-4" />
                  Add to Watchlist
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cast and Crew */}
      <section className="container mx-atuo px-6 py-12 md:py-12 lg:py-24">
        <h2 className="text-2xl font-bold">Cast & Crew</h2>

        <div className="mt-6">
          <div className="mb-4">
            <h3 className="text-lg font-medium">Director</h3>
            <p className="mt-1 text-gray-300">{director}</p>
          </div>

          <div className="text-lg font-medium">
            <h3 className="text-lg font-medium">Cast</h3>
            <div className="mt-2 flex flex-wrap gap-y-2">
              {cast.slice(0, 5).map((actor, index) => (
                <div key={index} className="w-1/2 md:w-1/3 lg:w-1/4">
                  <p className="text-gray-300">{actor.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Similar Movies */}
      <section className="container mx-auto px-6 py-12 md:py-12 lg:py-24">
        <h2 className="mb-6 text-2xl font-bold">You May Also Like</h2>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {similarMovies.slice(0, 10).map((movie, id) => (
            <MovieCard key={id} movie={movie} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default MoviesPage;
