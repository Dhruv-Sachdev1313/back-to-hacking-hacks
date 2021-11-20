import { useState, useEffect, createContext, useContext } from "react";
import { firestore } from "./firebase";
import { doc, setDoc } from "firebase/firestore"; 

interface FirestoreContextProps {
    addTeacher: ((teacherUID: string, grade: number, subject: number ) => Promise<unknown>) | null,
    addStudent: ((studentUID: string, grade: number) => Promise<unknown>),
    getStudent: ((studentUID: string) => Promise<unknown>) | null,
    addCourse: ((teacherUID: string) => Promise<unknown>) | null,
    getCourses: (() => Promise<unknown>) | null,
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
            .then(responce => res(responce))
            .catch(error => rej(error))
    })
}

async function addStudentFunc(studentUID: string, grade: number) {
    return new Promise(async (res, rej) => {
        await setDoc(doc(firestore, 'students', studentUID), {
            grade,
            uid: studentUID,
            classes: []
        })
            .then(responce => res(responce))
            .catch(error => rej(error))
    })
}

const FirestoreContext = createContext<FirestoreContextProps>({
    addCourse: null,
    addStudent: addStudentFunc,
    addTeacher: addTeacherFunc,
    enrollCourse: null,
    getCourses: null,
    getStudent: null,
    getStudentCourses: null,
    getTeacherCourses: null
})

const useFirestore = (collection: String) => {
    const [docs, setDocs] = useState([]);

    useEffect(()=>{
       
       
    }, [collection])

    return { docs };
}

export default useFirestore;