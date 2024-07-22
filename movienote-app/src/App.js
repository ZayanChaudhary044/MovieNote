import React, { Component } from "react";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Home from "./pages/home";
import Movies from "./pages/movies";
import List from "./pages/yrlist";

const App = () => {

  const [myList, setMyList] = useState([]);

  const addToList = (movie) => {
    setMyList([...myList, movie]);
  };

  const removeFromList = (movie) => {
    setMyList((prevList) => prevList.filter((m) => m.id !== movie.id));
  };


    return (
      <Router>
        <div className="App">
          <ul className="nav">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/movies">Movies</Link>
            </li>
            <li>
              <Link to="/yrlist" className="navlist">Your List</Link>
            </li>
          </ul>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Movies addToList={addToList}/>} />
            <Route path="/yrlist" element={<List myList={myList} removeFromList={removeFromList} />} />
          </Routes>
        </div>
      </Router>
    );
  };

export default App;
