import { auth } from "@/firebaseConfig";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";



const logIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)

};

const signUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);

}


const logOut = () => {
    signOut(auth)
}

const googleSignIn = () => {
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleAuthProvider);
}

const userAuthContext = createContext(
    {
        user: null,
        logIn,
        signUp,
        logOut,
        googleSignIn
    }
);





export const UserAuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    useEffect(() => {
        const subscribe = onAuthStateChanged(auth, (user) => {


            if (user) {
                setUser(user)
            }

            return () => {
                subscribe()
            }
        })
    }, [])

    const value = {
        user,
        logIn,
        signUp,
        logOut,
        googleSignIn
    }

    return <userAuthContext.Provider value={value}>
        {children}
    </userAuthContext.Provider>

}


// eslint-disable-next-line react-refresh/only-export-components
export const useUserAuth = () => {
    return useContext(userAuthContext)
}