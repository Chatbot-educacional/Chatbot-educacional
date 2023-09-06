import { useState, useEffect, useReducer } from "react";
import { db } from "../firebase/config";
import { collection, addDoc, Timestamp } from "firebase/firestore";

const initialState = {
    loading: false,
    error: null,
}

const insertReducer = (state, action) => {
    switch(action.type) {
        case "LOADING":
            return {
                loading: true,
                error: null,
            }
        case "SUCCESS":
            return {
                loading: false,
                error: null,
            }
        case "ERROR":
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}

export const useInsertDocument = (docCollection) => {

    const [response, dispatch] = useReducer(insertReducer, initialState);

    // deal with memory leak
    const [cancelled, setCancelled] = useState(false);

    const checkCancelBeforeDispatch = (action) => {
        if(!cancelled) {
            dispatch(action);
        }
    }

    const insertDocument = async (document) => {
        try {
            checkCancelBeforeDispatch({ type: "LOADING" });

            const newDocument = {...document, createdAt: Timestamp.now()};
            
            const insertedDocument = await addDoc(collection(db, docCollection), newDocument);

            checkCancelBeforeDispatch({ type: "SUCCESS", payload: insertedDocument });

        } catch (error) {
            checkCancelBeforeDispatch({ type: "ERROR", payload: error });
        }
    }

    useEffect(() => {
        return () => setCancelled(true);
    }, [])

    return { insertDocument, response };
}