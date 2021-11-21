interface NavItem {
    path: string,
    name: string
}

export const TutorNavbarItems: NavItem[] = [
    { path: '/tutor/students', name: 'Students'}
]

export const StudentNavbarItems: NavItem[] = [
    { path: '/student/browse', name: 'Browse Courses'},
    { path: '/student/classes', name: 'See your classes'}
]

export const NonAuthItems: NavItem[] = [
    { path: '/login', name: 'Login into your account'},
    { path: '/register', name: 'Create an account' }
]
