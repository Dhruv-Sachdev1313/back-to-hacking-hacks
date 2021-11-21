import React from "react";
import { useFormik } from "formik";
import { useAuth } from "./hooks/useAuth";
import { useFirestore } from './hooks/useFirestore';
import { NextRouter, useRouter } from "next/router";
import withAuthentication from "./hoc/NonAuth";
import { UserCredential } from "@firebase/auth";
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { App } from './hooks/firebase';




interface Signup {
  email: string,
  password: string,
  grade: number,
  type: string,
  subject: string
}


const SignupForm: React.FunctionComponent<{}> = () => {

  const auth = getAuth(App)
  const [error, setError ] = React.useState<null | string>(null);
  const { emailRegister, currentUser } = useAuth()
  const { addStudent, addTeacher } = useFirestore()
  const Router: NextRouter = useRouter()

  const { handleSubmit, handleChange, values } = useFormik({
    initialValues: {
      email: "",
      password: "",
      grade: 9,
      type: "",
      subject: ""
    },
    onSubmit: async ({ email, password, grade, type, subject }: Signup) => {

      console.log({
        email,
        password,
        grade,
        type,
        subject
      })

      createUserWithEmailAndPassword(auth, email, password)
        .then(async (res: UserCredential) => {
          const { user: { uid } } = res
          
          if(type == "tutor") {
            addTeacher!(uid!, subject, grade, email)
            Router.push('/tutor/students')
          } else {
            addStudent!(uid!, grade, email)
            Router.push('/student/browse')
          }
        })
        .catch((error: string) => setError(JSON.stringify(error)))
    }
  });
  return (
    <form className='max-w-md mx-auto bg-white shadow-xl rounded my-8' onSubmit={handleSubmit}>
    <div className="rounded-lg bg-gray-200 pt-2 pb-2 pl-4 pr-4">
    <h1 className='text-center text-2xl font-bold pb-4'>Register</h1>
      <div className="flex items-center bg-white rounded shadow-md mb-4">
          <span className="px-3">
            <svg className="fill-current text-gray-500 w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M18 2a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4c0-1.1.9-2 2-2h16zm-4.37 9.1L20 16v-2l-5.12-3.9L20 6V4l-10 8L0 4v2l5.12 4.1L0 14v2l6.37-4.9L10 14l3.63-2.9z"/></svg>
          </span>
          <input className="w-full h-12 focus:outline-none" type="email" name="email" placeholder="Email" value={values.email} onChange={handleChange} />
			</div>
      <div className="flex items-center bg-white rounded shadow-md mb-4">
				<span className="px-3">
					<svg className="fill-current text-gray-500 w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M4 8V6a6 6 0 1 1 12 0h-3v2h4a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z"/></svg>
				</span>
				<input className="w-full h-12 focus:outline-none" type="password" name="password" placeholder="Password" value={values.password} onChange={handleChange} />
			</div>
      <div className="flex items-center bg-white rounded shadow-md mb-4">
				<span className="px-3">
        <img src="https://img.icons8.com/ios/20/000000/class.png"/>
				</span>
        <input
          className="w-full h-12 focus:outline-none"
          id="grade"
          name="grade"
          type="number"
          min="9"
          max="12"
          onChange={handleChange}
          value={values.grade}
          placeholder="Grade"
        />
      </div>
      <div className="flex items-center bg-white rounded shadow-md mb-4">
				<span className="px-3">
        <img src="https://img.icons8.com/windows/22/000000/philosophy-book.png"/>
				</span>
      <input
        className="w-full h-12 focus:outline-none"
        id="subject"
        name="subject"
        type="text"
        onChange={handleChange}
        value={values.subject}
        placeholder="Subject"
      />
      </div>
      <div>
      <select
        name="type"
        value={values.type}
        onChange={handleChange}
        style={{ display: 'block' }}
      >
        <option value="" label="Select your role" />
        <option value="tutor" label="tutor" />
        <option value="student" label="student" />
      </select>
      </div>
      <button className='bg-green-600 block mx-auto text-white text-sm uppercase rounded shadow-md px-6 py-2' type="submit">Submit</button>
      </div>
    </form>
  );
};

export default withAuthentication(SignupForm);