import React from 'react'
import withTutor from '../hoc/AuthTutor'
import { useAuth } from '../hooks/useAuth'
import { useFirestore } from '../hooks/useFirestore'

const Students = () => {

    const { addCourse, getTeacher } = useFirestore()
    const { currentUser, signOut } = useAuth()

    async function startCourse() {
        const { uid } = currentUser!
        const { subject, grade } = await getTeacher!(uid!)
        await addCourse!(uid, subject, grade)
    }

    return (
        <div>
            <button onClick={startCourse}>Start a Tutoring Session</button>
            <button onClick={signOut!}>Sign Out</button>
        </div>
    )
}

export default withTutor(Students)
