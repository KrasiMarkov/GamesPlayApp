import { useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import * as authService from '../../services/authService';
import { useNavigate } from "react-router-dom";


export const Logout = () => {

    const { user, userLogout } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        authService.logout(user.accessToken)
          .then(() => {
            userLogout()
            navigate('/');
        })
        .catch(() => {
           navigate('/');
        })
    });
        
    

    return null;
}

