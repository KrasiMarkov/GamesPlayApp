import { createContext, useReducer } from "react";
import { useEffect, useState} from "react";
import { useNavigate }from "react-router-dom";
import * as gameService from '../services/gameService';

export const GameContext = createContext();

const gameReducer = (state, action) => {

    switch (action.type) {
        case 'ADD_GAMES':
            return [...action.payload];
        case 'ADD_GAME':
            return [...state, action.payload];
        case 'EDIT_GAMES':
            return state.map(x => x._id === action.gameId ? action.payload : x)        
        default:
            return state;
    }

}


export const GameProvider = ({children}) => {

  const navigate = useNavigate();
  const [games, dispatch] = useReducer(gameReducer, []);
  

  useEffect(() => {
        gameService.getAll()
           .then(result => {
              dispatch({
                type: 'ADD_GAMES',
                payload: result
              });
           });
  }, []);


  const addComment = (gameId, comment) => {
      
    // setGames(state => {
    //   const game = state.find(x => x._id === gameId);

    //   const comments = game.comments || [];
    //   comments.push(comment);
      
    //   return [
    //     ...state.filter(x => x._id !== gameId),
    //     {...game, comments}
    //   ]
    // });
  }

  const addGame = (gameData) => {

    dispatch({
       type: 'ADD_GAME',
       payload: gameData
    });

    navigate('/catalog');
  }

  const editGame = (gameId, gameData) => {
    dispatch({
        type: 'EDIT_GAME',
        payload: gameData,
        gameId
    });
  }




    return(
     <GameContext.Provider value={{addGame, editGame, addComment, games}}>
        {children}
     </GameContext.Provider>
    );
}