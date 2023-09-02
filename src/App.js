import { Routes, Route} from 'react-router-dom';


import { AuthProvider } from './contexts/AuthContext';
import { GameProvider } from './contexts/GameContext';

import './App.css';
import { Catalog } from './components/Catalog/Catalog';
import { Create } from './components/Create/Create';
import { Details } from './components/Details/Details';
import { Edit } from './components/Edit/Edit';
import { Header } from './components/Header/Header';
import { Home } from './components/Home/Home';
import { Login } from './components/Login/Login';
import Register from './components/Register/Register';
import { Logout } from './components/Logout/Logout';

function App() { 

  return (
    <AuthProvider>
       <div id="box">
      <Header/>
      <main id="main-content">
        <GameProvider>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/catalog" element={<Catalog/>}/>
            <Route path="/catalog/:gameId" element={<Details/>}/>
            <Route path="/create" element={<Create/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/logout" element={<Logout/>}/>
            <Route path="/games/:gameId/edit" element={<Edit/>}/>
        </Routes> 
        </GameProvider>
      </main>
    </div>
    </AuthProvider>
  );
}

export default App;
