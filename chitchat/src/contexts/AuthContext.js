import React, { useContext, useEffect, useState } from 'react';
import { auth } from '../firebase';

const AuthContext = React.createContext();

export function useAuth(){
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();

    function signup(email, password){
        console.log(email, password);
        return auth.createUserWithEmailAndPassword(email, password)
    }

    function signin(email, password){
        console.log(email, password);
        return auth.signInWithEmailAndPassword(email, password)
    }

    useEffect(() => {
        const unsbscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
        })
        // Clean up function
        return unsbscribe;
    },[])

    const value = {
        currentUser,
        signup,
        signin,
    }
  return (
    <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
  )
}
