"use client";
import Loader from "@/app/(components)/loader";
import { zodResolver } from "@hookform/resolvers/zod";
import { Google } from "@mui/icons-material";
import { AnimatePresence, motion } from "framer-motion";
import { Eye, EyeOff, FacebookIcon, Github } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "../../(components)/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../(components)/ui/form";
import { Input } from "../../(components)/ui/input";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

const messages = [
  {
    title: "Get Started Today!",
    text: "The secret of getting ahead is getting started. - Mark Twain",
  },
  {
    title: "Plan for Success!",
    text: "Failing to plan is planning to fail. - Benjamin Franklin",
  },
  {
    title: "Turn Goals into Reality!",
    text: "A goal without a plan is just a wish. - Antoine de Saint-Exupéry",
  },
];

const Login: React.FC = () => {
  const [loginError, setLoginError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [currentMessage, setCurrentMessage] = useState(0);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % messages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const form = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = (data: LoginFormInputs) => {
    if (data.email === "tahmid@test.io" && data.password === "Test123!") {
      setLoading(true);
      setLoginError(null);
      setTimeout(() => {
        router.push(`/kanban`);
      }, 9000);
    } else {
      setLoginError("Invalid email or password");
    }
  };

  return (
    <>
      {loading && <Loader />}
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-[#432c52] via-[#2a3b36] to-[#432c52] p-4">
        <div className="bg-white/10 backdrop-blur-md rounded-lg shadow-lg flex w-[1000px] overflow-hidden">
          {/* Left Side - Login Form */}
          <div className="w-1/2 p-10">
            <h2 className="text-white text-xl font-semibold mb-4">
              Please Enter your Account details
            </h2>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-400">Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          {...field}
                          className="w-full p-3 rounded-md bg-gray-700 text-white border-none"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-400">Password</FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Input
                            type={showPassword ? "text" : "password"}
                            {...field}
                            className="w-full p-3 pr-10 rounded-md bg-gray-700 text-white border-none"
                          />
                        </FormControl>
                        <button
                          type="button"
                          className="absolute inset-y-0 right-3 flex items-center text-gray-400"
                          onClick={() => setShowPassword((prev) => !prev)}
                        >
                          {showPassword ? (
                            <EyeOff size={20} />
                          ) : (
                            <Eye size={20} />
                          )}
                        </button>
                      </div>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <div className="text-right text-gray-400 text-sm">
                  <a href="#" className="hover:underline">
                    Forgot Password
                  </a>
                </div>
                {loginError && (
                  <p className="text-red-500 text-center">{loginError}</p>
                )}
                <Button
                  type="submit"
                  className="w-full bg-[#246175] hover:bg-[#215668] transition text-white"
                >
                  Sign in
                </Button>
              </form>
            </Form>
            <div className="flex justify-center gap-4 mt-4">
              <Google fontSize="medium" />
              <Github />
              <FacebookIcon />
            </div>
            <p className="text-center text-gray-400 mt-4">
              <a href="/signup" className="hover:underline">
                Create an account
              </a>
            </p>
          </div>

          {/* Right Side - Info Section */}
          <div className="w-1/2 bg-white/0 backdrop-blur-md p-8 flex flex-col justify-center text-gray-200 rounded-r-lg relative">
            <h3 className="text-2xl font-bold">What’s our Scholars Said.</h3>
            <p className="mt-4 italic">
              “A goal without a plan is just a wish.”
            </p>
            <p className="mt-2 font-semibold">Antoine de Saint-Exupéry</p>
            {/* <p className="text-sm">UI Designer at Google</p> */}

            {/* Slideshow Effect */}
            <div className="relative w-full overflow-hidden mt-6 h-[120px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentMessage}
                  initial={{ x: "100%", opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: "-100%", opacity: 0 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="absolute w-full p-4 bg-white/10  text-gray-200 rounded-lg"
                >
                  <h4 className="font-semibold">
                    {messages[currentMessage].title}
                  </h4>
                  <p className="text-sm mt-2">
                    {messages[currentMessage].text}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
