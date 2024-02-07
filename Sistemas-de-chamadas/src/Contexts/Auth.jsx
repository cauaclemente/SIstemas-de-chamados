import { useState, createContext, useEffect } from "react";

import {  auth, db } from "../Services/Firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({})

function AuthProvider({ children }) {

    const [user, setUser] = useState(null)
    const [loadingAuth, setLoadingAuth] = useState(false)

    const navigate = useNavigate();

    async function signIn( email, password) {
        setLoadingAuth(true)

        await signInWithEmailAndPassword(auth, email, password)
        .then( async(value) => {
            let uid = value.user.uid

            const docRef = doc(db, "users", uid)
            const docSnap = await getDoc(docRef)

            let data = {
                uid: uid,
                nome: docSnap.data().name,
                email: value.user.email,
                avatarUrl: docSnap.data().avatarUrl
            }
            setUser(data);
            storageUser(data);
            setLoadingAuth(false);
            toast.success("Bem vindo(a) de volta " );
            navigate("/dashboard");
        })
        .catch((error) => { 
            console.log(error);
            setLoadingAuth(false);
            toast.error("Ops algo deu errado!");
        })
    }

    async function signUp(email, password, name) {
        setLoadingAuth(true)

        await createUserWithEmailAndPassword(auth, email, password)
        .then( async(value) => {
            let uid = value.user.uid
            
            await setDoc(doc(db, "users", uid), {
                name: name,
                avatarUrl: null
            })
            .then(() => {
                let data = {
                    uid: uid,
                    nome: name,
                    email: value.user.email,
                    avatarUrl: null
                }
                setUser(data);        
                storageUser(data);      
                setLoadingAuth(false);
                toast.success("Seja bem-vindo ao sistema! " + name)
                navigate("/dashboard");
            })
        })
        .catch((error) => {
            console.log(error)
            alert("Erro ao cadastrar")
        })
    }

    function storageUser(data) {
        localStorage.setItem("@ticktesPRO", JSON.stringify(data))
    }

    return (
        <AuthContext.Provider 
        value={{
            signed: !!user,
            user,
            signIn,
            signUp,
            loadingAuth
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider