import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from "react";
import * as gameService from './services/gameService';

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

  useEffect(() => {
        gameService.getAll()
           .then(result => {
              setGames(result);
           });
  }, []);

  return (
    <div id="box">
      <Header/>
      <main id="main-content">
        <Routes>
            <Route path="/" element={<Home games={games}/>}/>
            <Route path="/catalog" element={<Catalog games={games}/>}/>
            <Route path="/catalog/:gameId" element={<Details games={games}/>}/>
            <Route path="/create" element={<Create/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/edit" element={<Edit/>}/>
        </Routes> 
      </main>
    </div>
  );
}

export default App;
