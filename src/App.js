import { Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import * as gameService from './services/gameService';
import uniqid from 'uniqid';
import { AuthContext } from './contexts/AuthContext';

import './App.css';
import { Catalog } from './components/Catalog/Catalog';
import { Create } from './components/Create/Create';
import { Details } from './components/Details/Details';
import { Edit } from './components/Edit/Edit';
import { Header } from './components/Header/Header';
import { Home } from './components/Home/Home';
import { Login } from './components/Login/Login';
import { Register } from './components/Register/Register';
import { Logout } from './components/Logout/Logout';
import { useLocalStorage } from './hooks/useLocalStorage';

function App() {

  const [games, setGames] = useState([]);
  const navigate = useNavigate();
  const [auth, setAuth] = useLocalStorage('auth', {});

  useEffect(() => {
        gameService.getAll()
           .then(result => {
              setGames(result);
           });
  }, []);

  const userLogin = (authData) => {
    setAuth(authData);
  }

  const userLogout = () => {
    setAuth({});
  }

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
    <AuthContext.Provider value={{user: auth, userLogin, userLogout}}>
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
            <Route path="/logout" element={<Logout/>}/>
            <Route path="/edit" element={<Edit/>}/>
        </Routes> 
      </main>
    </div>
    </AuthContext.Provider>
  );
}

export default App;
