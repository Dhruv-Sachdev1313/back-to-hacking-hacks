import React from "react";
import { useFormik } from "formik";
import { useAuth } from "./hooks/useAuth";
import { useFirestore } from './hooks/useFirestore';
import { NextRouter, useRouter } from "next/router";
import withAuthentication from "./hoc/NonAuth";
import { UserCredential } from "@firebase/auth";

interface SignupFormProps {

}


interface Signup {
  email: string,
  password: string,
  grade: number,
  type: string,
  subject: string
}


const SignupForm: React.FunctionComponent<SignupFormProps> = () => {

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
      emailRegister!(email, password)
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
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email</label>
      <input
        id="email"
        name="email"
        type="text"
        onChange={handleChange}
        value={values.email}
      />
      <label htmlFor="password">Password</label>
      <input
        id="password"
        name="password"
        type="text"
        onChange={handleChange}
        value={values.password}
      />
      <label htmlFor="grade">Grade</label>
      <input
        id="grade"
        name="grade"
        type="number"
        min="9"
        max="12"
        onChange={handleChange}
        value={values.grade}
      />
      <label htmlFor="grade">Subject (for tutors)</label>
      <input
        id="subject"
        name="subject"
        type="text"
        onChange={handleChange}
        value={values.subject}
      />
      <select
        name="type"
        value={values.type}
        onChange={handleChange}
        style={{ display: 'block' }}
      >
        <option value="" label="Select a type of person" />
        <option value="tutor" label="tutor" />
        <option value="student" label="student" />
      </select>
      {error && error}
      <button type="submit">Submit</button>
    </form>
  );
};

export default withAuthentication(SignupForm);