import { useState, useEffect, createContext, useContext } from "react";
import { firestore } from "./firebase";
import { doc, setDoc, getDoc, getDocs, updateDoc, query, where, collection } from "firebase/firestore"; 

interface Teacher {
    grade: number,
    subject: string,
    uid: string,
    courses: string[]
}

interface Student {
    grade: number,
    uid: string,
    classes: string[]
}

interface Course {
    teacher: string,
    students: string[],
    subject: string,
    grade: number
}

interface FirestoreContextProps {
    addTeacher: ((teacherUID: string, grade: number, subject: number ) => Promise<void>) | null,
    addStudent: ((studentUID: string, grade: number) => Promise<void>),
    getStudent: ((studentUID: string) => Promise<Student>) | null,
    getTeacher: ((teacherUID: string) => Promise<Teacher>) | null,
    addCourse: ((teacherUID: string, subject: string, grade: number) => Promise<void>) | null,
    getCourses: ((subject: string, grade: number) => Promise<Course>) | null,
    getTeacherCourses: ((uid: string) => Promise<string[]>) | null,
    getStudentCourses: ((uid: string) => Promise<string[]>) | null,
    enrollCourse: ((studentUID: string, teacherUID: string) => Promise<void>) | null
}

async function addTeacherFunc(teacherUID: string, grade: number, subject: number) 
{
        await setDoc(doc(firestore, 'teachers', teacherUID), {
            grade,
            subject,
            uid: teacherUID,
            courses: []
        })
}

async function addStudentFunc(studentUID: string, grade: number) 
{

        await setDoc(doc(firestore, 'students', studentUID), {
            grade,
            uid: studentUID,
            classes: []
        })
}

async function getStudentAsync(studentUID: string) 
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

async function getTeacherAsync(teacherUID: string) 
{
    return new Promise<Teacher>(async (res, rej) => {
        const teacherInfo = await getDoc(doc(firestore, 'teachers', teacherUID))
        if(teacherInfo.exists()){

            const data: any = teacherInfo.data()
            res(data)

        } else {
            rej('No document was found')
        }
    })
}

async function addCourseAsync(teacherUID: string, subject: string, grade: number) 
{
    
        const teacherRef = doc(firestore, 'teachers', teacherUID)
        const teacherInfo = await getDoc(teacherRef)
        if(teacherInfo.exists()) {
            setDoc(doc(firestore, 'courses', teacherUID), {
              courses: [],
              teacher: teacherUID,
              subject,
              grade
        })
    
}

async function getCoursesAsync(subject: string, grade: number) 
{
    
    return new Promise<Course>(async (res, rej) => {
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

interface Responce {
    classes: string[],
    grade: number,
    uid: string
}

async function enrollCourseAsync(studentUID: string, teacherUID: string) 
{
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

async function getStudentCourses(uid: string) {
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

const FirestoreContext = createContext<FirestoreContextProps>({
    addCourse: addCourseAsync,
    addStudent: addStudentFunc,
    addTeacher: addTeacherFunc,
    enrollCourse: enrollCourseAsync,
    getCourses: getCoursesAsync,
    getStudent: getStudentAsync,
    getStudentCourses: null,
    getTeacherCourses: null,
    getTeacher: getTeacherAsync,
})

export default function FirestoreProvider() {
    return (

    )
}