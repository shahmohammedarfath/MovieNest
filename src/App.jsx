import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./Home";
import MoviesPage from "./components/movies/MoviesPage";
import Footer from "./components/Footer";
import MoviesList from "./components/movies/MoviesList";
import SeriesList from "./components/series/SeriesList";
import SeriesPage from "./components/series/SeriesPage";

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<MoviesList type="movie" />} />
          <Route path="/tv" element={<MoviesList type="tv" />} />
          <Route path="/movie/:id" element={<MoviesPage type="movie" />} />
          <Route path="/tv/:id" element={<MoviesPage type="tv" />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
