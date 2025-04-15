import { Star } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

<<<<<<< HEAD
const MovieCard = ({ movie, type }) => {
  return (
    <Link to={`/${type}/${movie.id}`} className="group">
=======
const MovieCard = ({ movie }) => {
  return (
    <Link to={`/movie/${movie.id}`} className="group">
>>>>>>> f36e1ccb166a48a7b4520fcdb5507b99317a3f36
      <div className="relative overflow-x-auto rounded-lg transition-all duration-300 group-hover:ring-2 group-hover:ring-primary hover:bottom-1.5">
        <div className="aspect-[2/3] w-full">
          <img
            src={
              movie.poster_path
                ? `${IMAGE_BASE_URL}/${movie.poster_path}`
                : "/assets/fallback-image.jpg"
            }
            alt={movie.title}
            className="h-full"
          />
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-3">
          <div className="flex items-center gap-1">
            <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
            <span>{Math.floor(movie.popularity) || "Rating"}</span>
          </div>
        </div>
      </div>
      <h3 className="mt-2 text-sm font-medium line-clamp-1">{movie.title}</h3>
      <p className="text-xs text-gray-400">{movie.release_date}</p>
    </Link>
  );
};

export default MovieCard;
