import { Metadata } from "next";
import Signup from "./signup";
export const metadata: Metadata = {
  title: "Signup",
  description: "Signup page",
};

const SignUpPage = async () => {
  return (
    <>
      <Signup />
    </>
  );
};

export default SignUpPage;
