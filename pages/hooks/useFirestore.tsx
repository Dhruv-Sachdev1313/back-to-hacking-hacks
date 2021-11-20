import { useState, useEffect, createContext, useContext } from "react";
import { firestore } from "./firebase";
import { doc, setDoc, getDoc, getDocs, updateDoc, query, where, collection } from "firebase/firestore"; 

interface FirestoreContextProps {
    addTeacher: ((teacherUID: string, grade: number, subject: number ) => Promise<unknown>) | null,
    addStudent: ((studentUID: string, grade: number) => Promise<unknown>),
    getStudent: ((studentUID: string) => Promise<unknown>) | null,
    getTeacher: ((teacherUID: string) => Promise<unknown>) | null,
    addCourse: ((teacherUID: string, subject: string, grade: number) => Promise<unknown>) | null,
    getCourses: ((subject: string, grade: number) => Promise<unknown>) | null,
    getTeacherCourses: ((uid: string) => Promise<unknown>) | null,
    getStudentCourses: ((uid: string) => Promise<unknown>) | null,
    enrollCourse: ((studentUID: string) => Promise<unknown>) | null
}

async function addTeacherFunc(teacherUID: string, grade: number, subject: number) {
    
    return new Promise(async (res, rej) => {
        await setDoc(doc(firestore, 'teachers', teacherUID), {
            grade,
            subject,
            uid: teacherUID,
            courses: []
        })
            .then((responce: any) => res(responce))
            .catch((error: any) => rej(error))
    })
}

async function addStudentFunc(studentUID: string, grade: number) {
    return new Promise(async (res, rej) => {
        await setDoc(doc(firestore, 'students', studentUID), {
            grade,
            uid: studentUID,
            classes: []
        })
            .then((responce: any) => res(responce))
            .catch((error: any) => rej(error))
    })
}

async function getStudentAsync(studentUID: string) {
    return new Promise(async (res, rej) => {
        const studentInfo =  await getDoc(doc(firestore, 'students', studentUID))
        if(studentInfo.exists()) {
            res(studentInfo.data())
        } else {
            rej('No document was found')
        }
    })
}

async function getTeacherAsync(teacherUID: string) {
    return new Promise(async (res, rej) => {
        const teacherInfo = await getDoc(doc(firestore, 'teachers', teacherUID))
        if(teacherInfo.exists()){
            res(teacherInfo.data())
        } else {
            rej('No document was found')
        }
    })
}

async function addCourseAsync(teacherUID: string, subject: string, grade: number) {
    return new Promise(async (res, rej) => {
        const teacherRef = doc(firestore, 'teachers', teacherUID)
        const teacherInfo = await getDoc(teacherRef)
        if(teacherInfo.exists()) {
            setDoc(doc(firestore, 'courses', teacherUID), {
              students: [],
              teacher: teacherUID,
              subject,
              grade
            })
                .then(responce => res(responce))
                .catch(error => rej(error))
        } else {
            rej('No Teacher was found')
        }
    })
}

async function getCoursesAsync(subject: string, grade: number) {
    
    return new Promise(async (res, rej) => {
        const coursesRef = collection(firestore, 'courses')
        const qy = query(coursesRef, where("grade", ">=", grade), where("subject", "==", subject))
        const snaphost = await getDocs(qy)
        const data: { teacher: string, students: string[] }[] = []
        snaphost.forEach(doc => {
            const students = doc.data().students
            data.push({ teacher: doc.id, students })
        })

        res(data)
    })
    
    
}

const FirestoreContext = createContext<FirestoreContextProps>({
    addCourse: addCourseAsync,
    addStudent: addStudentFunc,
    addTeacher: addTeacherFunc,
    enrollCourse: null,
    getCourses: getCoursesAsync,
    getStudent: getStudentAsync,
    getStudentCourses: null,
    getTeacherCourses: null,
    getTeacher: getTeacherAsync,
})

const useFirestore = (collection: String) => {
    const [docs, setDocs] = useState([]);

    useEffect(()=>{
       
       
    }, [collection])

    return { docs };
}

export default useFirestore;