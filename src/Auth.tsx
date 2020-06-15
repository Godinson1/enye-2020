import React, { useState, useEffect } from 'react';
import { auth } from './firebase';
import { USER_DETAIL } from './actions/types';
import { useDispatch } from 'react-redux'

//Create context and initialize User
export const AuthContext = React.createContext({user: null});


//Define wrapper to listen for auth change and passed down data to our app
export const AuthProvider = ({ children }: any) => {
    const [userAuth, setUserAuth]  = useState<any>('');
    const dispatch = useDispatch();

    useEffect(() => {
        auth.onAuthStateChanged((userAuth: any) => {
            const details = {
                userId: userAuth.uid,
                email:  userAuth.email
            }
            dispatch({ type: USER_DETAIL, payload: details });
            userAuth
            ? localStorage.setItem('authUser', JSON.stringify(userAuth))
            : localStorage.removeItem('authUser')
            //setUser(userAuth);
        });
    }, []);

    return (
       <AuthContext.Provider
       value = {
          userAuth
        }
       >
        { children }
       </AuthContext.Provider> 
    )
}