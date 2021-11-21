import React from 'react'
import { firestore } from '../hooks/firebase'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { Course } from '../hooks/useFirebase.types'
import { useAuth } from '../hooks/useAuth'
import withStudent from '../hoc/AuthStudent'
import { useFirestore } from '../hooks/useFirestore'
import { useRole } from '../hooks/useRole'
import { Course as Courses } from './Course'

const Browse = () => {

    const { enrollCourse, getStudent } = useFirestore()
    const { currentUser, signOut } = useAuth()
    const role = useRole()
    const [courses, setCourses] = React.useState<Course[]>([])
    const [subject, setSubject] = React.useState<string>('')
    const [grade, setGrade] = React.useState<number>(9)

    async function generateCourse() {
        const { uid } = currentUser!
        const { grade } = await getStudent!(uid)
        const _course = await getCourses!(subject, grade)
        setGrade(grade)
        setCourses(_course)
    }

    async function getCourses(subject: string, grade: number) {
        const coursesRef = collection(firestore, 'courses')
        const qy = query(coursesRef, where("subject", "==", subject))
        const snaphost = await getDocs(qy)
        const list: Course[]  = []
        snaphost.forEach(i => {
            const data: any = i.data()
            list.push(data)
        })
        console.log(list)
        return list
    }

    

    const options = [
        { value: '', label: 'Select one'}, 
        { value: 'math', label: 'Math'},
        { value: 'science', label: 'Science'}
    ]

    return (
        <div>
            <label>Subject:</label>
            <select value={subject} onChange={(e) => setSubject(e.target.value)}>
                <option value="">Please select an option</option>
                <option value="math">Math</option>
                <option value="science">Science</option>
            </select>
            <button onClick={generateCourse}>Find Courses</button>
            <button className='p-3' onClick={signOut!}>Sign Out</button>
            {courses.map((i, k) => {
                return (
                    <Courses 
                        grade={i.grade}
                        studentUID={currentUser!?.uid}
                        teacherUID={i.teacher}
                        subject={i.subject}
                    />
                )
            })}
        </div>
    )
}

export default withStudent(Browse)
