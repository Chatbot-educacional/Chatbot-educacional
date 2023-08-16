import { db } from "../firebase/config";

import {
    getAuth, 
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    updateProfile,
    signOut,
} from "firebase/auth";

import { useState, useEffect } from "react";

export const useAuthentication = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    // cleanup
    // deal with memory leak  
    const [cancelled, setCancelled] = useState(false);

    const auth = getAuth();

    function checkIfIsCancelled() {
        if (cancelled) {
            return
        }
    }

    // register
    const createUser = async (data) => {
        checkIfIsCancelled();
        setCancelled(true);
        setError(null);
        setLoading(true);

        try {
            const {user} = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            )

            await updateProfile(user, {
                displayName: data.displayName
            })
            setLoading(false);
            return user;
        } catch (error) {
            console.log(error.message)
            console.log(typeof error.message)

            let systemErrorMessage

            if (error.message.includes("Password")) {
                systemErrorMessage = "A senha deve ter pelo menos 6 caracteres"
            } else if (error.message.includes("email-already")) {
                systemErrorMessage = "E-mail já cadastrado"
            } else {
                systemErrorMessage = "Ocorreu erro, por favor tente novamente mais tarde"
            }

            setLoading(false);
            setError(systemErrorMessage);
        }
    };

    // logout - sign out
    const logout = () => {
        checkIfIsCancelled();

        signOut(auth);
    };

    // login - sign in
    const login = async (data) => {
        checkIfIsCancelled();
        setLoading(true);
        setError(false);

        try {
            await signInWithEmailAndPassword(auth, data.email, data.password)
            setLoading(false);
        } catch (error) {
            let systemErrorMessage

            if (error.message.includes("user-not-found")) {
                systemErrorMessage = "Usuário não encontrado"
            } else if (error.message.includes("wrong-password")) {
                systemErrorMessage = "Senha incorreta"
            } else {
                systemErrorMessage = "Ocorreu um erro, por favor tente novamente mais tarde"
            }
            setError(systemErrorMessage);
            setLoading(false);
        }
    }

    useEffect(() => {
        return () => setCancelled(true);
    }, []);

    return {
        auth,
        createUser,
        error,
        loading,
        logout,
        login,
    }
}