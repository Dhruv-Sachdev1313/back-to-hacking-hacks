import React from "react";
import { useFormik } from "formik";
import { useAuth } from "./hooks/useAuth";

interface SignupFormProps {

}

interface Signup {
  email: string,
  password: string
}


const SignupForm: React.FunctionComponent<SignupFormProps> = () => {

  const [error, setError ] = React.useState<null | string>(null);
  const { emailRegister } = useAuth()

  const { handleSubmit, handleChange, values } = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    onSubmit: async ({ email, password }: Signup) => {
      emailRegister!(email, password)
        .then((res) => {

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
      {error && error}
      <button type="submit">Submit</button>
    </form>
  );
};

export default SignupForm;