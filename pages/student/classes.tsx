import React from 'react'
import withStudent from '../hoc/AuthStudent'
import { useAuth } from '../hooks/useAuth'
import { Course } from '../hooks/useFirebase.types'
import { useFirestore } from '../hooks/useFirestore'
import { firestore } from '../hooks/firebase'
import { doc, getDoc } from 'firebase/firestore'

const Classes = () => 
{
    const [classes, setClasses] = React.useState<Course[]>([])
    const { currentUser } = useAuth()
    const { getStudentCourses } = useFirestore()
    const [loading, setLoading] = React.useState(true)

    React.useEffect(() => {
        var _data: Course[] = []
        getStudentCourses!(currentUser!.uid)
            .then(async res => {
                res.forEach( async id => {
                    const courseRef = doc(firestore, 'courses', id)
                    const courseSnap = await getDoc(courseRef)
                    if(courseSnap.exists()) {
                        
                        const data: any = courseSnap.data()
                        _data.push(data)
                        console.log({
                            _data,
                            data
                        })
                    }
                })
                setClasses(_data)    
            })
        setLoading(false)
    }, [])

    return (
        <div>
            {!loading && JSON.stringify(classes)}
        </div>
    )
}

export default withStudent(Classes)
