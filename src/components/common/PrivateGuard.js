import { Navigate, Outlet } from "react-router-dom";

import { useAuthContext } from "../../contexts/AuthContext";

export const PrivateGuard = () => {

    const { isAuthenticated } = useAuthContext();
    
    if(!isAuthenticated) {
        return <Navigate to="/login" replace />
    }

    return <Outlet/>
}