import { Metadata } from "next";
import Login from "./login";

export const metadata: Metadata = {
  title: "Login",
  description: "Login page",
};

const LoginPage = async () => {
  return (
    <>
      <Login />
    </>
  );
};

export default LoginPage;
