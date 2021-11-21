import { onAuthStateChanged } from "@firebase/auth"
import React from "react"
import { auth, firestore } from "./firebase"
import { collection, where, getDocs, query  } from "firebase/firestore"

export const useRole = () => {
    const [role, setRole] = React.useState<string | null>(null)

    onAuthStateChanged(auth, async user => {
        if(!user) {
            setRole(null)
        } else {
            const tutorRef = collection(firestore, 'tutors')
            const q = query(tutorRef, where("uid", "==", user.uid))
            const tutorSnap = await getDocs(q)

            if(tutorSnap.empty) {
                setRole('student')
            } else {
                setRole('tutor')
            }
        }
    })

    return role

}
