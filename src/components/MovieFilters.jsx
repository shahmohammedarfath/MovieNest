import React, { useEffect } from "react";
import { Button } from "./ui/button";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import axios from "axios";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

const MovieFilters = ({ onFilterChange }) => {
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [sortOptions, setSortOptions] = useState("");

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/genre/movie/list?api_key=${API_KEY}`
        );
        setGenres(response.data?.genres);
      } catch (error) {
        console.error("Failed to fetch genres. Try again");
      }
    };

    fetchGenres();
  }, []);

  const handleFilterChange = () => {
    onFilterChange({
      genre: selectedGenre,
      year: selectedYear,
      sortBy: sortOptions,
    });
  };
  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-4 text-lg font-medium">Filters</h3>

        {/* Genre Filters */}
        <div className="space-y-2">
          <label htmlFor="" className="text-sm font-medium text-gray-300">
            Genre
          </label>
          <select
            className="p-2 bg-gray-800 text-white rounded"
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
          >
            <option value="">All Genres</option>
            {genres.map((genre) => (
                <option key={genre.id} value={genre.id} >
                    {genre.name}
                </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default MovieFilters;
