import React from 'react'
import withStudent from '../../hoc/AuthStudent'
import { useRouter, NextRouter } from 'next/router'
import { useFirestore } from '../../hooks/useFirestore'
import { useAuth } from '../../hooks/useAuth';
import { App } from '../../hooks/firebase';
import { doc, getDoc, getFirestore } from  'firebase/firestore'


const CourseByID = () => {

    const firestore = getFirestore(App)
    const router: NextRouter = useRouter()
    const [students, setStudents] = React.useState<any[]>([])
    const [teacher, setTeacher] = React.useState('')
    const { id } = router.query
    const { currentUser } = useAuth()
    
    React.useEffect(() => {
        const init = async () => {
            const courseRef = doc(firestore, 'courses', id)
            const courseSnap = await getDoc(courseRef)
            const courseData: any = courseSnap.data()
            const teacherRef = doc(firestore, 'teachers', id)
            const teacherSnap: any = await getDoc(teacherRef)
            const teacherData: any = teacherSnap.data()
            setTeacher(teacherData.email)
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

    return (
        <div>
            {'The teacher is ' + teacher + ':'}
            {students.map((i, k) => {
                return (
                    <p>Student: {i.email}</p>
                )
            })}
        </div>
    )
}

export default withStudent(CourseByID);
