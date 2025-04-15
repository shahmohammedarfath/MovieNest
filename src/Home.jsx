import React, { useEffect, useState } from "react";
import { Button } from "./components/ui/button";
import { ChevronRight, Play } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
import MovieCard from "./components/MovieCard";
// import { CategorySlider } from "./components/CategorySlider";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

const Home = () => {
  const [trending, setTrending] = useState([]);
  const [newReleases, setNewReleases] = useState([]);
  const [popular, setPopular] = useState([]);
  const [heroMovie, setHeroMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const urls = [
          `${BASE_URL}/trending/movie/week?api_key=${API_KEY}`,
          `${BASE_URL}/movie/now_playing?api_key=${API_KEY}`,
          `${BASE_URL}/movie/popular?api_key=${API_KEY}`,
        ];

        const [trendingRes, newReleasesRes, popularRes] = await axios.all(
          urls.map((url) => axios.get(url))
        );

        setTrending(trendingRes.data.results);
        setNewReleases(newReleasesRes.data.results);
        setPopular(popularRes.data.results);

        const randomMovie =
          popularRes.data.results[
          Math.floor(Math.random() * popularRes.data.results.length)
          ];
        setHeroMovie(randomMovie);
        setLoading(false);
      } catch (error) { }
    };

    fetchMovies();

    // window.scrollTo({top: 0, behavior: "smooth"})
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative h-[70vh] w-full">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: heroMovie
              ? `url(${IMAGE_BASE_URL}${heroMovie.backdrop_path})`
              : "none",
            backgroundPosition: "center 20%",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
        </div>
        <div className="relative z-10 flex h-full flex-col justify-center px-6 md:px-12 lg:px-24">
          <h1 className="max-w-2xl text-4xl font-bold md:text-5xl lg:text-6xl">
            {heroMovie?.title}
          </h1>
          <p className="mt-4 max-w-xl text-sm text-gray-300 md:text-base">
            {heroMovie?.overview || "No description available"}
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Button className="flex items-center gap-2 bg-primary hover:bg-primary/90">
              <Play className="h-4 w-4" /> Watch Now
            </Button>
            <Button variant="outline" className="text-black">
              Add to Watchlist
            </Button>
          </div>

          {/* <div className="mt-4 flex items-center gap-2 text-sm text-gray-400">
            <span className="rounded bg-yellow-600 px-1.5 py-0.5 text-xs font-medium text-white">
              IMDb
            </span>
            <span>8.5/10</span>
            <span className="h-1 w-1 rounded-full bg-gray-500"></span>
            <span>{heroMovie?.release_date}</span>
            <span className="h-1 w-1 rounded-full bg-gray-500"></span>
            <span>3h 10m</span>
          </div> */}
        </div>
      </section>

      {/* Trending Section */}
      <section className="px-6 py-12 md:px-12 lg:px-24">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Trending Now</h2>
          <Link
            href="/trending"
            className="flex items-center text-sm text-primary hover:underline"
          >
            View All <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {trending.map((movie, id) => (
            <MovieCard key={id} movie={movie} type="movie" />
          ))}
        </div>
      </section>

      {/* Categories */}
      {/* <section className="px-6 py-12 md:px-12 lg:px-24">
        <h2 className="mb-6 text-2xl font-bold">Browse by Category</h2>
        <CategorySlider />
      </section> */}

      {/* New Releases */}
      <section className="px-6 py-12 md:px-12 lg:px-24">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">New Releases</h2>
          <Link
            href="/new"
            className="flex items-center text-sm text-primary hover:underline"
          >
            View All <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {newReleases.map((movie, id) => (
            <MovieCard key={id} movie={movie} type="movie" />
          ))}
        </div>
      </section>

      {/* Popular */}
      <section className="px-6 py-12 md:px-12 lg:px-24">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Popular</h2>
          <Link
            href="/trending"
            className="flex items-center text-sm text-primary hover:underline"
          >
            View All <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {popular.map((movie, id) => (
            <MovieCard key={id} movie={movie} type="movie" />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
