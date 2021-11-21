import { getFirestore, setDoc, doc, collection, getDoc, query, getDocs, where, updateDoc } from "firebase/firestore"
import { App } from "./firebase"
import type { Teacher, Student, Course } from './useFirebase.types'

const firestore = getFirestore(App)

export async function addTeacherFunc(teacherUID: string, email: string, grade: number, subject: string) 
{
        await setDoc(doc(firestore, 'teachers', teacherUID), {
            grade,
            subject,
            uid: teacherUID,
            courses: [],
            email
        })
}

export async function addStudentFunc(studentUID: string, grade: number, email: string) 
{
        const studentRef = doc(firestore, 'students', studentUID)

        await setDoc((studentRef), {
            grade,
            uid: studentUID,
            classes: [],
            email
        })
}

export async function getStudentAsync(studentUID: string) 
{
    return new Promise<Student>(async (res, rej) => {
        const studentInfo =  await getDoc(doc(firestore, 'students', studentUID))
        if(studentInfo.exists()) {
            const data: any = await studentInfo.data()
            res(data)
        } else {
            rej('No document was found')
        }
    })
}

export async function getTeacherAsync(teacherUID: string) 
{
    return new Promise<Teacher>(async (res, rej) => {
        const teacherInfo = await getDoc(doc(firestore, 'teachers', teacherUID))
       
        if(teacherInfo.exists()){

            const data: any = teacherInfo.data()
            res(data)

        } else {
            throw new Error('Teacher was not found')
        }
    })
}

export async function addCourseAsync(teacherUID: string, subject: string, grade: number) {
    
        const teacherRef = doc(firestore, 'teachers', teacherUID)
        const teacherInfo = await getDoc(teacherRef)
        if(teacherInfo.exists()) {
        setDoc(doc(firestore, 'courses', teacherUID), {
              courses: [],
              teacher: teacherUID,
              subject,
              grade
        })
    } else {

    }
    
}

export async function getCoursesAsync(subject: string, grade: number) {
    
    return new Promise<Course[]>(async (res, rej) => {
        const coursesRef = collection(firestore, 'courses')
        const qy = query(coursesRef, where("grade", ">=", grade), where("subject", "==", subject))
        const snaphost = await getDocs(qy)
        const data: any = []
        snaphost.forEach(async doc => {
            const data: any = await doc.data()
            data.push(document)
        })

        res(data)
    })
    
    
}

export async function enrollCourseAsync(studentUID: string, teacherUID: string) {
        const studentRef = doc(firestore, 'students', studentUID)
        const teacherRef = doc(firestore, 'teachers', teacherUID)
        const coursesRef = doc(firestore, 'courses', teacherUID)
        var prevClasses: string[] = []
        var prevCourses: string[] = []
        var prevTrueCourses: string[] = []

        await getStudentAsync(studentUID)
            .then((res) => {
                const { classes } = res
                prevClasses= classes
            })

        await getTeacherAsync(teacherUID)
            .then((res) => {
                const { courses } = res
                prevCourses = courses
            })
        
        const courseSnap = await getDoc(coursesRef)
        if(courseSnap.exists()) {
            const cData = courseSnap.data()
            prevTrueCourses = cData.students
        }

       

        if(!prevTrueCourses) {
            prevTrueCourses = []
        } else if (prevTrueCourses.includes(studentUID)) {
            prevTrueCourses = prevTrueCourses.filter(e => {
                return e != studentUID
            })
        }

        if(!prevCourses) {
            prevTrueCourses = []
        } else if (prevTrueCourses.includes(studentUID)) {
            prevTrueCourses = prevTrueCourses.filter(e => {
                return e != studentUID
            })
        }

        if(!prevClasses) {
            prevTrueCourses = []
        } else if (prevTrueCourses.includes(teacherUID)) {
            prevTrueCourses = prevTrueCourses.filter(e => {
                return e != teacherUID
            })
        }

        console.log({
            prevClasses,
            prevCourses,
            prevTrueCourses
        })
        ///teachers.courses
        //students.classes
        await updateDoc(studentRef, {
            classes: [
                ...prevClasses,
                teacherUID
            ]
        })

        await updateDoc(teacherRef, {
            courses: [
                ...prevCourses,
                studentUID
            ]
        })

        

        await updateDoc(coursesRef, {
            students: [
                ...prevTrueCourses,
                studentUID
            ]
        })
}

export async function getStudentCourses(uid: string) {
    return new Promise(async (resolve, reject) => {
        
        var teacherUIDs: string[] = []
        var classMap: { grade: number, students: string[], subject: string  }[]

        await getStudentAsync(uid)
            .then(res => {
                const { classes } = res
                teacherUIDs = classes
            })

        teacherUIDs.forEach(async i => {

            const courseRef = doc(firestore, 'courses', i)
            const responce = await getDoc(courseRef)
            
            if(responce.exists()) {
                const data: any = await responce.data()
                classMap.push(data)
            }
            
        })
        
    })
}

export async function getStudentCoursesAsync(uid: string) {
    return new Promise<string[]>( async (resolve, reject) => {
        await getStudentAsync(uid)
            .then(res => {
                const { classes } = res
                resolve(classes)
            })
            .catch(res => {
                throw new Error('No student found')
            })
    })
}

export async function getTeacherCoursesAsync(uid: string) {
    return new Promise<string[]>( async (resolve, reject ) => {
        await getTeacherAsync(uid)
            .then(res => {
                const { courses } = res
                resolve(courses)
            })
            .catch(error => {
                throw new Error('No teacher found')
            })
    })
}

export async function getRole(uid: string) {
    const studentRef = doc(firestore, 'students', uid)
    const teacherRef = doc(firestore, 'tutors', uid)

    const studentSnap = await getDoc(studentRef)
    if(studentSnap.exists()) {
        return 'student'
    } 
    const teacherSnap = await getDoc(teacherRef)
    if(teacherSnap.exists()){
        return 'tutor'
    } else {
        return null
    }
}