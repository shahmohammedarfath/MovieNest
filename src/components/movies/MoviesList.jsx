import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MovieCard from "../MovieCard";
import { Button } from "../ui/button";
import MovieFilters from "../MovieFilters";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

const MoviesList = () => {
  const [totalPages, setTotalPages] = useState(1);
  const [allMovies, setAllMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1;

  useEffect(() => {
    const fetchAllMovies = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/discover/movie?api_key=${API_KEY}&page=${currentPage}`
        );
        setAllMovies(response.data?.results);
        setTotalPages(response.data?.total_pages);
      } catch (error) {
        console.error("Failed to fetch all movies. Try again");
      }
    };

    fetchAllMovies();
  }, [currentPage]);

  const changePage = (newPage) => {
    setSearchParams({ page: newPage });
  };
  return (
    <section className="px-6 py-12 md:px-12 lg:px-24">

      <div>
        <MovieFilters onFilterChange={(filters) => console.log(filters)}/>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {allMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      <div className="flex justify-center mt-4 gap-4">
        <Button onClick={() => changePage(currentPage - 1)}>Previous</Button>
        <Button onClick={() => changePage(currentPage + 1)}>Next</Button>
      </div>
    </section>
  );
};

export default MoviesList;
