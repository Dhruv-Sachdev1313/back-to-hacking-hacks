import React from 'react'
import withTutor from '../hoc/AuthTutor'
import { useAuth } from '../hooks/useAuth'
import { useFirestore } from '../hooks/useFirestore'
import { App } from '../hooks/firebase'
import { useRouter, NextRouter } from 'next/router'
import { doc, getDoc, getFirestore } from  'firebase/firestore'

const Students = () => {

    const { addCourse, getTeacher } = useFirestore()
    const { currentUser, signOut } = useAuth()
    const [students, setStudents] = React.useState<any[]>([])
    const firestore = getFirestore(App)

    React.useEffect(() => {
        const init = async () => {
            const courseRef = doc(firestore, 'courses', currentUser!?.uid)
            const courseSnap = await getDoc(courseRef)
            const courseData: any = courseSnap.data()
            const studentID: string[] = courseData!.students
            const _students_: any[] = []
            studentID.forEach(async i => {
                const studentRef = doc(firestore, 'students', i)
                const studentSnap: any = await getDoc(studentRef)
                _students_.push({ email: studentSnap.data().email })
                setStudents(_students_)
            })
        }
        init();
    }, [])

    async function startCourse() {
        const { uid } = currentUser!
        const { subject, grade } = await getTeacher!(uid!)
        await addCourse!(uid, subject, grade)
    }

    return (
        <div>
            <button onClick={startCourse}>Start a Tutoring Session</button>
            <div>
            {'The teacher is ' + currentUser?.email + ':'}
            <p>Students:</p>
            {students.map((i, k) => {
                return (
                    <p>{i.email}</p>
                )
            })}
        </div>
        </div>
    )
}

export default withTutor(Students)



