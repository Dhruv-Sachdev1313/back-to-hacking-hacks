import React from 'react'
import withStudent from '../hoc/AuthStudent'
import { useAuth } from '../hooks/useAuth';
import { useFirestore } from '../hooks/useFirestore';
import { firestore } from '../hooks/firebase';
import { doc, getDoc  } from 'firebase/firestore'
import type { Course } from '../hooks/useFirebase.types'
import { NextRouter, useRouter } from 'next/router'
import Class from './Class'

const Classes = () => {

    const { currentUser } = useAuth()
    const { getStudentCourses } = useFirestore()
    const [courses, setCourses] = React.useState<Course[]>([])
    const Router: NextRouter = useRouter()

    React.useEffect(() => {
        const _data_: Course[] = []
    
        if(currentUser === null) {
            Router.replace('/')
        }

        getStudentCourses!(currentUser!.uid)
            .then(res => {

                res.forEach(async i => {
                    const courseRef = doc(firestore, 'courses', i)
                    const courseSnap = await getDoc(courseRef)
                    if(!courseSnap.exists()) {
                        throw new Error('Error on id ' + i)
                    }
                    const data: any = courseSnap.data()
                    _data_.push(data)
                    console.log({
                        data,
                        _data_
                    })
                    setCourses(_data_)
                })
            })
    }, [])

    return (
        <div>
            {courses.map((i, k) => {
                return (
                    <Class 
                        grade={i.grade}
                        students={i.students}
                        subject={i.subject}
                        teacher={i.teacher}
                        key={k}
                    />
                )
            })}
        </div>
    )
}

export default withStudent(Classes)
