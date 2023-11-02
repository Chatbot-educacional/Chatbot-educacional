import { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import {
    collection,
    query,
    orderBy,
    onSnapshot,
    where,
} from 'firebase/firestore';

export const useFetcDocuments = (docCollection, search = null, uid = null) => {
    const [documents, setDocuments] = useState(null);
    const [error, setError] = useState(null);
    const [loadings, setLoading] = useState(false);

    const [cancelled, setCancelled] = useState(null);

    useEffect(() => {
        async function loadData() {
            if(cancelled) return;

            setCancelled(true);

            const collectionRef = await collection(db, docCollection);

            try{
                let q;

                q = await query(collectionRef, orderBy('createdAt', 'desc'));

                await onSnapshot(q, (querySnapshot) => {
                    setDocuments(
                        querySnapshot.docs.map((doc) => ({
                            id: doc.id,
                            ...doc.data(),
                        }))
                    );
                });

                setLoading(false);
            } catch (error) {
                setError(error);

                setLoading(false);
            }
        }

        loadData();
    }, [docCollection, search, uid, cancelled]);

    useEffect(() => {
        return () => setCancelled(true);
    }, []);

    return documents, loadings, error;
}