import React from 'react'
import Link from 'next/link'
import {  } from '../navigator/navbar'
interface ClassProps {
    grade: number,
    students: string[],
    subject: string,
    teacher: string,
}

const Class: React.FunctionComponent<ClassProps> = ({ grade, students, subject, teacher}: ClassProps) => {
    
    const render = `${grade} grade ${subject} `
    
    return (
    
        <Link href={`/student/course/${teacher}`} >
            {render}
        </Link>
    )
}

export default Class
