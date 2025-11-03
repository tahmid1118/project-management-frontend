"use client";
import Loader from "@/app/(components)/loader";
import { useSignupStore } from "@/app/store/signupStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { Google } from "@mui/icons-material";
import { AnimatePresence, motion } from "framer-motion";
import { Eye, EyeOff, FacebookIcon, Github } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
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

const signupSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  contactNo: z
    .string()
    .min(10, "Must be at least 10 digits")
    .regex(/^[0-9]+$/, "Only numbers allowed"),
  position: z.string().min(2, "Position is required"),
});

type SignupFormInputs = z.infer<typeof signupSchema>;

const messages = [
  {
    title: "Build Your Path!",
    text: "Opportunities don’t happen. You create them. - Chris Grosser",
  },
  {
    title: "Stay Committed!",
    text: "Success doesn’t come from what you do occasionally, it comes from what you do consistently.",
  },
  {
    title: "Be Bold!",
    text: "The way to get started is to quit talking and begin doing. - Walt Disney",
  },
];

const Signup: React.FC = () => {
  const {
    loading,
    signupError,
    showPassword,
    currentMessage,
    setLoading,
    setSignupError,
    togglePassword,
    nextMessage,
  } = useSignupStore();

  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      nextMessage(messages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [nextMessage]);

  const form = useForm<SignupFormInputs>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      contactNo: "",
      position: "",
    },
  });

  const onSubmit = (data: SignupFormInputs) => {
    setLoading(true);
    setSignupError(null);

    setTimeout(() => {
      router.push("/kanban");
    }, 3000);
  };

  return (
    <>
      {loading && <Loader />}
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-[#432c52] via-[#2a3b36] to-[#432c52] p-4">
        <div className="bg-white/10 backdrop-blur-md rounded-lg shadow-lg flex w-[1000px] overflow-hidden">
          <div className="w-1/2 p-10">
            <h2 className="text-white text-xl font-semibold mb-4">
              Create your account
            </h2>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <div className="flex gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem className="w-1/2">
                        <FormLabel className="text-gray-400">
                          First Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="p-3 rounded-md bg-gray-700 text-white border-none"
                          />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem className="w-1/2">
                        <FormLabel className="text-gray-400">
                          Last Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="p-3 rounded-md bg-gray-700 text-white border-none"
                          />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                </div>

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
                          onClick={togglePassword}
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

                <FormField
                  control={form.control}
                  name="contactNo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-400">
                        Contact No
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="text"
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
                  name="position"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-400">Position</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="w-full p-3 rounded-md bg-gray-700 text-white border-none"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />

                {signupError && (
                  <p className="text-red-500 text-center">{signupError}</p>
                )}

                <Button
                  type="submit"
                  className="w-full bg-[#246175] hover:bg-[#215668] transition text-white"
                >
                  Sign Up
                </Button>
              </form>
            </Form>

            <div className="flex justify-center gap-4 mt-4">
              <Google fontSize="medium" />
              <Github />
              <FacebookIcon />
            </div>
            <p className="text-center text-gray-400 mt-4">
              <a href="#" className="hover:underline">
                Already have an account? Sign in
              </a>
            </p>
          </div>

          {/* Info Side */}
          <div className="w-1/2 bg-white/0 backdrop-blur-md p-8 flex flex-col justify-center text-gray-200 rounded-r-lg relative">
            <h3 className="text-2xl font-bold">Start your journey today!</h3>
            <p className="mt-4 italic">
              “Opportunities don’t happen. You create them.”
            </p>
            <p className="mt-2 font-semibold">Chris Grosser</p>

            <div className="relative w-full overflow-hidden mt-6 h-[120px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentMessage}
                  initial={{ x: "100%", opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: "-100%", opacity: 0 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="absolute w-full p-4 bg-white/10 text-gray-200 rounded-lg"
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

export default Signup;
