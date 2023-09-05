import { createContext, useContext, useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    GoogleAuthProvider,
    signInWithPopup
} from 'firebase/auth';
import {auth} from '../firebase_config';

// eslint-disable-next-line react-refresh/only-export-components
export const authContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    const context = useContext(authContext)
    if (!context) throw new Error('No hay auth provider')
    return context
}

// eslint-disable-next-line react/prop-types
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)
    
    //Registrar usuario
    const signup = (email, password) => 
     createUserWithEmailAndPassword(auth, email, password);

    //iniciar sesion
    const login = (email, password) =>
     signInWithEmailAndPassword(auth, email, password);

    //Cerrar sesion
    const logout = () => signOut(auth);

    //Iniciar sesion con google
    const loginWithGoogle = () => {
        const googleProvider = new GoogleAuthProvider();
        return signInWithPopup(auth, googleProvider);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return(
        //El authContext sirve para hacer que un dato pueda ser accedido por todos los componentes
        <authContext.Provider value={{ signup, login, user, logout, loading, loginWithGoogle }}>
            {children}
        </authContext.Provider>
    )
}