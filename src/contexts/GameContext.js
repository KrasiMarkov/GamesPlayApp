import { createContext } from "react";
import { useEffect, useState} from "react";
import { useNavigate }from "react-router-dom";
import * as gameService from '../services/gameService';

export const GameContext = createContext();


export const GameProvider = ({children}) => {

  const navigate = useNavigate();
  const [games, setGames] = useState([]);
  

  useEffect(() => {
        gameService.getAll()
           .then(result => {
              setGames(result);
           });
  }, []);


  const addComment = (gameId, comment) => {
      
    setGames(state => {
      const game = state.find(x => x._id === gameId);

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
         gameData
      ]);

      navigate('/catalog');
  }

  const editGame = (gameId, gameData) => {
    setGames(state => state.map(x => x._id === gameId ? gameData : x));
  }




    return(
     <GameContext.Provider value={{addGame, editGame, addComment, games}}>
        {children}
     </GameContext.Provider>
    );
}