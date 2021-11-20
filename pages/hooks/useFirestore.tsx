import { useState, useEffect, createContext, useContext } from "react";
import { firestore } from "./firebase";
import { collection, getDocs, CollectionReference } from "firebase/firestore"; 

interface FirestoreContextProps {
    addTeacher: ((uid: string, grade: number, subject: number ) => Promise<void>) | null,
    addStudent: ((uid: string, grade: number))
    getUser: ((uid: string))
}

const FirestoreContext = createContext<FirestoreContextProps>({

})

const useFirestore = (collection: String) => {
    const [docs, setDocs] = useState([]);

    useEffect(()=>{
       
        const unsub =  getDocs(collection(collection)
            .
       );
            // .orderBy('createdAt','desc')
            // .onSnapshot((snap)=>{
            //     let documents = [];
            //     snap.forEach(doc =>{
            //         documents.push({...doc.data(), id: doc.id})
            //     });
            //     setDocs(documents);
            // });

            return () =>unsub();
    }, [collection])

    return { docs };
}

export default useFirestore;