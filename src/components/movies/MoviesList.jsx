import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MovieCard from "../MovieCard";
import { Button } from "../ui/button";
import MovieFilters from "../MovieFilters";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";


const MoviesList = ({ type }) => {
  const [totalPages, setTotalPages] = useState(1);
  const [allMovies, setAllMovies] = useState([]);
  const [filters, setFilters] = useState({})
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1;

  useEffect(() => {
    const fetchAllMovies = async () => {
      try {
        const queryParams = new URLSearchParams({
          api_key: API_KEY,
          page: currentPage,
          ...filters
        })
        const response = await axios.get(
          `${BASE_URL}/discover/${type}?${queryParams}`
        );
        setAllMovies(response.data?.results);
        setTotalPages(response.data?.total_pages);
      } catch (error) {
        console.error("Failed to fetch all movies. Try again");
      }
    };

    fetchAllMovies();
  }, [currentPage, filters, type]);

  const changePage = (newPage) => {
    setSearchParams({ page: newPage });
    window.scrollTo({ top: 0, behavior: "smooth" })
  };
  return (
    <section className="px-6 py-12 md:px-12 lg:px-24">
      <div>
        <MovieFilters onFilterChange={setFilters} />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {allMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} type={type} />
        ))}
      </div>

      <div className="flex justify-center mt-4 gap-4">
        <Button onClick={() => changePage(currentPage - 1)} disabled={currentPage === 1}>{currentPage}</Button>
        <Button onClick={() => changePage(currentPage + 1)} disabled={currentPage === totalPages}>{currentPage + 1}</Button>
      </div>
    </section>
  );
};

export default MoviesList;
