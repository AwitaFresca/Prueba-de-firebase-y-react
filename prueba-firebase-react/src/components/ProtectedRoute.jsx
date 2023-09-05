/* ProtectedRoute servira para imponerle limites al usuario anonimo.
   De esta forma evitamos que el usuario anonimo que no esta logueado
   tenga acceso a una pagina a la cual nosotros no queremos que se meta */
import { useAuth } from "../context/authContext";
import { Navigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export function ProtectedRoute({children}) {
    const {user, loading} = useAuth()

    if (loading) return <h1>loading</h1>;

    //Compruebo si el usuario existe (si existe, lo dejamos navegar en otras paginas), si no redirecciono al login
    if (!user) return <Navigate to='/login'/>;

    return <>{children}</>
}