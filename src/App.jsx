import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./Home";
import MoviesPage from "./components/movies/MoviesPage";
import Footer from "./components/Footer";

function App() {
  return (
    
    <Router>
      <div className="min-h-screen">
        {/* <Navbar /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/movies" element={<Dashboard />} /> */}
          <Route path="/movie/:id" element={<MoviesPage />} />
        </Routes>
        {/* <Footer/> */}
      </div>
    </Router>
  );
}

export default App;
