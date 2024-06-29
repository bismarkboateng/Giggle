"use client"

import { Button, Input} from "@nextui-org/react";
import { TbEyeFilled } from "react-icons/tb";
import { IoEyeOffSharp } from "react-icons/io5";
import { ChangeEvent, FormEvent, useState } from "react"
import { checkUser, createUser } from "@/actions/user.actions";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import Link from "next/link";


export default function SignUp() {
  const [isPVisible, setIsPVisible] = useState(false);
  const [isCPVisible, setIsCPVisible] = useState(false);
  const [isFieldEmpty, setIsFieldEmpty] = useState("")
  const [signUpState, setSignUpState] = useState("")
  const [userExist, setUserExist] = useState("")
  const [error, setError] = useState("")
  const [passwordDoesNotMatch, setPasswordDoesNotMatch] = useState("")

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const router = useRouter()

  const toggleVisibility = () => setIsPVisible(!isPVisible);
  const toggleCPVisibility = () => setIsCPVisible(!isCPVisible);


  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setIsFieldEmpty("")
    setPasswordDoesNotMatch("")
    setUserExist("")
    setError("")
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit =  async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const { username, email, password, confirmPassword } = formData
    if (username === "" || email === "" || password === "" || confirmPassword === "") {
     setIsFieldEmpty("Please fill in all fields")
     return 
    }

    if (password !== confirmPassword) {
      setPasswordDoesNotMatch("Passwords do not match")
      return
    }

    const user = await checkUser(email)
    const isUserExist = JSON.parse(user).isUserExist

    if (isUserExist) {
      setUserExist("This email already exists. Please sign in")
      return
    }

    try {
      setSignUpState("loading")
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      await createUser({
        username,
        email,
        authId: userCredential.user.uid
      })
      setSignUpState("success")
      // TODO: send email to currently signed in user
      router.push("/accounts/sign-in")
    } catch (error) {
      setError("Something went wrong, Please try again")
      setSignUpState("")
    }
  }


  return (
    <section className="mt-10 px-5 md:px-32 lg:px-60 xl:px-[450px] bg-black ">
      <h1 className="text-2xl 2xl:text-3xl text-[#EEF1F3] font-bold">Sign Up</h1>
      <p className="mt-1 text-[#F2F2F2] 2xl:text-lg">
       By continuing, you agree to our <span className="text-[#648EFC]">User Agreement</span>
      </p>
      <p className="text-[#F2F2F2] 2xl:text-lg">and acknowledge that you understand the <span className="text-[#648EFC]">Privacy Policy</span></p>

      <section className="mt-20 w-full">
       <form onSubmit={handleSubmit}>
        <div>
         <Input
          isRequired
          type="text"
          label="Username"
          placeholder="@username"
          className="w-full"
          onChange={handleChange}
          value={formData.username}
          name="username"
         />
        </div>
        <div className="mt-3">
         <Input
          isRequired
          type="email"
          label="Email"
          placeholder="name@example.com"
          className="w-full"
          onChange={handleChange}
          value={formData.email}
          name="email"
         />
        </div>
        <div className="mt-3">
         <Input
          isRequired
          label="Password"
          name="password"
          onChange={handleChange}
          value={formData.password}
          placeholder="Enter your password"
          endContent={
           <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
            {isPVisible ? (
              <TbEyeFilled className="text-2xl text-default-400 pointer-events-none" />
            ) : (
             <IoEyeOffSharp className="text-2xl text-default-400 pointer-events-none" />
            )}
           </button>
          }
          type={isPVisible ? "text" : "password"}
          className="w-full focus:outline-none bg-[#27272A] outline-none rounded-xl"
         />
        </div>

        <div className="mt-3">
         <Input
          isRequired
          label="Confirm Password"
          placeholder="Enter your password"
          name="confirmPassword"
          onChange={handleChange}
          value={formData.confirmPassword}
          endContent={
           <button className="focus:outline-none" type="button" onClick={toggleCPVisibility}>
            {isCPVisible ? (
              <TbEyeFilled className="text-2xl text-default-400 pointer-events-none" />
            ) : (
             <IoEyeOffSharp className="text-2xl text-default-400 pointer-events-none" />
            )}
           </button>
          }
          type={isCPVisible ? "text" : "password"}
          className="w-full focus:outline-none bg-[#27272A] outline-none rounded-xl"
         />
        </div>

        <Button type="submit"
         className="w-full bg-[#D93900] mt-3 py-6 font-bold"
         disabled={signUpState === "loading"}
         isLoading={signUpState === "loading"}
        >
         Sign Up
        </Button>
       </form>
      </section>
      {isFieldEmpty && <p className="text-center text-red-500 mt-2">{isFieldEmpty}</p>}
      {passwordDoesNotMatch && <p className="text-center text-red-500 mt-2">{passwordDoesNotMatch}</p>}
      {userExist && <p className="text-center text-red-500 mt-2">{userExist}</p>}
      {error && <p className="text-center text-red-500 mt-2">{error}</p>}

      <div className="mt-10">
        <p>Already a Memer? <Link href="/accounts/sign-in" className="text-[#648EFC] underline">Sign In</Link></p>
      </div>
    </section>
  )
}