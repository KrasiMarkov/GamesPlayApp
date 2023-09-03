import { createContext, useReducer } from "react";
import { useEffect } from "react";
import { useNavigate }from "react-router-dom";
import * as gameService from '../services/gameService';

export const GameContext = createContext();

const gameReducer = (state, action) => {

    switch (action.type) {
        case 'ADD_GAMES':
            return action.payload.map(x => ({...x, comments: [] }));
        case 'ADD_GAME':
            return [...state, action.payload];
        case 'FETCH_GAME_DETAILS':
        case 'EDIT_GAME':       
            return state.map(x => x._id === action.gameId ? action.payload : x);       
        case 'ADD_COMMENT': 
            return state.map(x => x._id === action.gameId ? {...x, comments: [...x.comments, action.payload]} : x);  
        default:
            return state;
    }

};


export const GameProvider = ({children}) => {

  const navigate = useNavigate();
  const [games, dispatch] = useReducer(gameReducer, []);
  

    useEffect(() => {
        gameService.getAll()
           .then(result => {
              dispatch ({
                 type: 'ADD_GAMES',
                 payload: result,
               });

            });

    }, []);

    const selectGame = (gameId) => {

        return games.find(x => x._id === gameId) || {};
    };

    const fetchGameDetails = (gameId, gameDatails) => {

        dispatch({
            type: 'FETCH_GAME_DETAILS',
            payload: gameDatails,
            gameId,
        });
    };

  const addComment = (gameId, comment) => {
      
    dispatch({
        type: 'ADD_COMMENT',
        payload: comment,
        gameId
    });
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
     <GameContext.Provider value={{games, addGame, editGame, addComment, fetchGameDetails, selectGame}}>
        {children}
     </GameContext.Provider>
    );
}