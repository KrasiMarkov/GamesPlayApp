import { Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import * as gameService from './services/gameService';
import uniqid from 'uniqid';

import './App.css';
import { Catalog } from './components/Catalog/Catalog';
import { Create } from './components/Create/Create';
import { Details } from './components/Details/Details';
import { Edit } from './components/Edit/Edit';
import { Header } from './components/Header/Header';
import { Home } from './components/Home/Home';
import { Login } from './components/Login/Login';
import { Register } from './components/Register/Register';

function App() {

  const [games, setGames] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
        gameService.getAll()
           .then(result => {
              setGames(result);
           });
  }, []);

  const addComment = (gameId, comment) => {
      
    setGames(state => {
      const game = state.find(x => x._id == gameId);

      const comments = game.comments || [];
      comments.push(comment);
      
      return [
        ...state.filter(x => x._id !== gameId),
        {...game, comments}
      ]
    });
  }

  const addGame = (gameData) => {

      setGames(state => [
        ...state,
        {
          ...gameData,
          _id: uniqid()
        }
      ]);

      navigate('/catalog');
  }

  return (
    <div id="box">
      <Header/>
      <main id="main-content">
        <Routes>
            <Route path="/" element={<Home games={games}/>}/>
            <Route path="/catalog" element={<Catalog games={games}/>}/>
            <Route path="/catalog/:gameId" element={<Details games={games} addComment={addComment}/>}/>
            <Route path="/create" element={<Create addGame={addGame}/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/edit" element={<Edit/>}/>
        </Routes> 
      </main>
    </div>
  );
}

export default App;
