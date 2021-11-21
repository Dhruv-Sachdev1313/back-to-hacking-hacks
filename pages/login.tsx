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
      loginRegister!(email, password)
        .then(async res => {
          const { uid } = currentUser!
          if(type == "tutor") {
            Router.push('/tutor/students')
          } else {
            Router.push('/student/browse')
          }
        })
        .catch((error) => setError(error))
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
      <select
        name="type"
        value={values.type}
        onChange={handleChange}
        style={{ display: 'block' }}
      >
        <option value="" label="Select a color" />
        <option value="tutor" label="tutor" />
        <option value="student" label="student" />
      </select>
      {error && error}
      <button type="submit">Submit</button>
      {'The role is ' + role}
    </form>
  );
};

export default withAuthentication(LoginInForm);