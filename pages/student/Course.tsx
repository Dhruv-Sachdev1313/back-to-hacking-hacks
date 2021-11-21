import React from 'react'
import { useFirestore } from '../hooks/useFirestore'

interface CourseType {
    teacherUID: string,
    studentUID: string,
    subject: string,
    grade: number
}

export const Course: React.FunctionComponent<CourseType> = ({ teacherUID, studentUID, subject, grade}: CourseType) => {
    
    const { getTeacher, enrollCourse } = useFirestore()
    const [ teacher, setTeacher ] = React.useState('')

    React.useEffect(() => {
        getTeacher!(teacherUID)
            .then(res => {
                const { email } = res
                setTeacher(email)
            })
    }, [])

    async function handleClick() {
        await enrollCourse!(studentUID, teacherUID)
    }
    
    return (
        <div onClick={handleClick} >
            <h1>Grade {grade} {subject}</h1>
            <p>Taught by {teacher}</p>
        </div>
    )
}
