import { useEffect, useState } from "react";
import "./App.css";
import MovieCard from "./MovieCard";
import axios from "axios";
import SearchIcon from "./Search.svg";

const API_URL = "https://www.omdbapi.com/?apikey=7a1603f5";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");

  const searchMovies = async (title) => {
    try {
      const response = await axios.get(`${API_URL}&s=${title}`);
      setMovies(response.data.Search);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    searchMovies();
  }, [setSearch]);

  return (
    <div className="app">
      <h1>MovieLand</h1>

      <div className="search">
        <input
          type="text"
          placeholder="New Movie"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <img
          src={SearchIcon}
          alt="Search icon"
          onClick={() => searchMovies(search)}
        />
      </div>

      <div className="container">
        {movies.map((movie, index) => {
          return <MovieCard key={index} id={index} movie={movie} />;
        })}
      </div>
    </div>
  );
};

export default App;
