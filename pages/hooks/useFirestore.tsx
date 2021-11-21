import { useState, useEffect, createContext, useContext } from "react";
import { firestore } from "./firebase";
import { doc, setDoc, getDoc, getDocs, updateDoc, query, where, collection } from "firebase/firestore"; 
import type { FirestoreProviderProps, Course, Responce, Student, Teacher, UseFirestore, FirestoreContextProps } from './useFirebase.types'
import { getRole ,addCourseAsync, addStudentFunc, addTeacherFunc, enrollCourseAsync, getCoursesAsync, getStudentAsync, getStudentCourses, getStudentCoursesAsync, getTeacherAsync, getTeacherCoursesAsync } from './firestore.methods'



const FirestoreContext = createContext<FirestoreContextProps>({
    addCourse: null,
    addStudent: null,
    addTeacher: null,
    enrollCourse: null,
    getCourses: null,
    getStudent: null,
    getStudentCourses: null,
    getTeacherCourses: null,
    getTeacher: null,
    getRole: null
})

const FirestoreProvider: React.FunctionComponent<FirestoreProviderProps> =  ({ children }) => {
    return (
        <FirestoreContext.Provider value={{
            addCourse: addCourseAsync,
            addStudent: addStudentFunc,
            addTeacher: addTeacherFunc,
            enrollCourse: enrollCourseAsync,
            getCourses: getCoursesAsync,
            getStudent: getStudentAsync,
            getStudentCourses: getStudentCoursesAsync,
            getTeacherCourses: getTeacherCoursesAsync,
            getTeacher: getTeacherAsync,
            getRole: getRole
        }}>
            {children}
        </FirestoreContext.Provider>
    )
}


const useFirestore: UseFirestore = () =>  { 
    return useContext(FirestoreContext) 
};

export { useFirestore }

export default FirestoreProvider;