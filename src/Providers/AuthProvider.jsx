import React, { createContext, useEffect, useState } from 'react';
import {GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile} from "firebase/auth";

import swal from 'sweetalert';
import { app } from '../Firebase/firebase.config';

const auth = getAuth(app);

export const AuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {
    const admin = 'sakibzaman54@gmail.com';
    const [loading, setLoading] = useState(true);

    // set user

    const [user, setUser] = useState(null);

    // create user

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    // update user

    const updateUser = (name, photo) => {
        setLoading(true);
        return updateProfile(auth.currentUser, { displayName: name, photoURL: photo })
    };

    // sign in user

    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const signInWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider)
    }

    // sign out user 

    const logOutUser = () => {
        setLoading(true);
        swal({
            title: "Are you sure?",
            text: "Are you sure that you want to leave this page?",
            icon: "warning",
            dangerMode: true,
          })
          .then(willDelete => {
            if (willDelete) {
              swal("Sadly!", "You have been logged out!", "success");
              return signOut(auth);
            }
          });
          

    };

    // Go to Top of window

    const goToTop = () => window.scrollTo(0,0);

    // observing the user

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false);
            console.log("observing current user", currentUser)
        });
        return () => {
            unSubscribe();
        }
    }, [])


    const authInfo = { user, createUser, updateUser, signInUser, signInWithGoogle, logOutUser, loading, goToTop, admin };


    return (
        <div>
            <AuthContext.Provider value={authInfo}>
                {children}
            </AuthContext.Provider>
        </div>
    );
};

export default AuthProvider;