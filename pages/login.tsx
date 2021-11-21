import React from "react";
import { useFormik } from "formik";
import { useAuth } from "./hooks/useAuth";
import { useFirestore } from './hooks/useFirestore';
import { NextRouter, useRouter } from "next/router";
import withAuthentication from "./hoc/NonAuth";
import { useRole } from "./hooks/useRole";

interface SignupFormProps {

}


interface Signup {
  email: string,
  password: string,
  type: string
}


const LoginInForm: React.FunctionComponent<SignupFormProps> = () => {

  const [error, setError ] = React.useState<null | string>(null);
  const { loginRegister, currentUser } = useAuth()
  const role = useRole()
  const Router: NextRouter = useRouter()

  const { handleSubmit, handleChange, values } = useFormik({
    initialValues: {
      email: "",
      password: "",
      type: "",
    },
    onSubmit: async ({ email, password, type }: Signup) => {
      console.log({ 
        email,
        password,
        type
      })
      loginRegister!(email, password)
        .then(async res => {
          const { uid } = currentUser!
          if(type == 'tutor') {
            Router.push('/tutor/students')
          } else {
            Router.push('/student/browse')
          }
        })
        .catch(error => setError(JSON.stringify(error)))
    
  }});
  return (
    <div className=''>
    <form className='max-w-md mx-auto bg-white shadow-xl rounded my-8' onSubmit={handleSubmit}>
    <div className="rounded-lg bg-gray-200 pt-4 pb-4 pl-4 pr-4">
    <h1 className='text-center text-2xl font-bold pb-4'>Login</h1>
    <div className="flex items-center bg-white rounded shadow-md mb-4">
				<span className="px-3">
					<svg className="fill-current text-gray-500 w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M18 2a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4c0-1.1.9-2 2-2h16zm-4.37 9.1L20 16v-2l-5.12-3.9L20 6V4l-10 8L0 4v2l5.12 4.1L0 14v2l6.37-4.9L10 14l3.63-2.9z"/></svg>
				</span>
				<input className="w-full h-12 focus:outline-none" type="email" name="email" placeholder="Email" onChange={handleChange} value={values.email} />
			</div>
      <div className="flex items-center bg-white rounded shadow-md mb-4">
				<span className="px-3">
					<svg className="fill-current text-gray-500 w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M4 8V6a6 6 0 1 1 12 0h-3v2h4a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z"/></svg>
				</span>
				<input className="w-full h-12 focus:outline-none" type="password" name="password" placeholder="Password" onChange={handleChange} value={values.password} />
			</div>
      <div className=' w-s '>
      <select
        name="type"
        value={values.type}
        onChange={handleChange}
        style={{ display: 'inline-block' }}
      >
        <option value="" label="Select a role" />
        <option value="tutor" label="tutor" />
        <option value="student" label="student" />
      </select>
      </div>
      <button className='bg-green-600 block mx-auto text-white text-sm uppercase rounded shadow-md px-6 py-2' type="submit">Submit</button>
      </div>
    </form>
    </div>
  );
};

export default withAuthentication(LoginInForm);