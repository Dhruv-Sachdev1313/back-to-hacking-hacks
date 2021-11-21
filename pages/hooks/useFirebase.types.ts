interface Teacher {
    grade: number,
    subject: string,
    uid: string,
    courses: string[],
    email: string
}

interface Student {
    grade: number,
    uid: string,
    classes: string[],
    email: string
}

interface Course {
    teacher: string,
    students: string[],
    subject: string,
    grade: number
}

interface Responce {
    classes: string[],
    grade: number,
    uid: string
}

interface FirestoreContextProps {
    addTeacher: ((teacherUID: string, subject: string, grade: number, email: string ) => Promise<void>) | null,
    addStudent: ((studentUID: string, grade: number, email: string) => Promise<void>) | null,
    getStudent: ((studentUID: string) => Promise<Student>) | null,
    getTeacher: ((teacherUID: string) => Promise<Teacher>) | null,
    addCourse: ((teacherUID: string, subject: string, grade: number) => Promise<void>) | null,
    getCourses: ((subject: string, grade: number) => Promise<Course[]>) | null,
    getTeacherCourses: ((uid: string) => Promise<string[]>) | null,
    getStudentCourses: ((uid: string) => Promise<string[]>) | null,
    enrollCourse: ((studentUID: string, teacherUID: string) => Promise<void>) | null,
    getRole: ((uid: string) => Promise<"tutor" | 'student' | null> ) | null
}

interface FirestoreProviderProps {
    children: React.ReactNode
}

type UseFirestore = (() => FirestoreContextProps)

export type { FirestoreProviderProps, Responce, Student, Course, Teacher, UseFirestore, FirestoreContextProps }