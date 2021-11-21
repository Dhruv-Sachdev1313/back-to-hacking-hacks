import React from "react";
import Link from 'next/link'
import withAuthentication from "./hoc/NonAuth";

const Home = () => {
  return (
    <>
      <Link href="/register">Go to Register Page</Link>
      <Link href="/login">Go to Login Page</Link>
    </>
  );
};

export default withAuthentication(Home);