import { useContext } from "react";
import { Navigate, Outlet, useParams } from "react-router-dom"
import { GameContext } from "../../contexts/GameContext";
import { useAuthContext } from "../../contexts/AuthContext";


export const GameOwner = () => {

    const { gameId } = useParams();
    const { selectGame } = useContext(GameContext);
    const { user } = useAuthContext();

    const currentGame = selectGame(gameId);


    if(user._id !== currentGame._ownerId){
 
        return <Navigate to="/catalog" replace/>
    }

    return <Outlet/>;
}