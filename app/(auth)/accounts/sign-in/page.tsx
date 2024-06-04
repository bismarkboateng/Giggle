"use client"

import { Button, Input} from "@nextui-org/react";
import { TbEyeFilled } from "react-icons/tb";
import { IoEyeOffSharp } from "react-icons/io5";
import { ChangeEvent, FormEvent, useState } from "react"
import { checkUser, setUserId } from "@/actions/user.actions";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import Link from "next/link";


export default function SignIn() {
  const [isPVisible, setIsPVisible] = useState(false);
  const [isFieldEmpty, setIsFieldEmpty] = useState("")
  const [signInState, setSignInState] = useState("")
  const [userExist, setUserExist] = useState("")
  const [passwordDoesNotMatch, setPasswordDoesNotMatch] = useState("")

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const router = useRouter()

  const toggleVisibility = () => setIsPVisible(!isPVisible);


  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setIsFieldEmpty("")
    setPasswordDoesNotMatch("")
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit =  async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const { email, password } = formData
    if (email === "" || password === "") {
     setIsFieldEmpty("Please fill in all fields")
     return 
    }

    const user = await checkUser(email)
    const isUserExist = JSON.parse(user).isUserExist

    if (!isUserExist) {
      setUserExist("User with this email does not exist. Please sign up")
      return
    }

    try {
      setSignInState("loading")
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      setUserId(userCredential.user.uid)
      setSignInState("success")
      router.push("/memes/feed")
    } catch (error) {
      throw error
    }
  }


  return (
    <section className="mt-10 px-5">
      <h1 className="text-2xl text-[#EEF1F3] font-bold">Sign In</h1>
      <p className="mt-1 text-[#F2F2F2]">
       By continuing, you agree to our <span className="text-primary-color">User Agreement</span>
      </p>
      <p className="text-[#F2F2F2]">and acknowledge that you understand the <span className="text-primary-color">Privacy Policy</span></p>

      <section className="mt-20 w-full">
       <form onSubmit={handleSubmit}>
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

        <Button type="submit"
         className="w-full bg-[#D93900] mt-3 py-6 font-bold"
         disabled={signInState === "loading"}
         isLoading={signInState === "loading"}
        >
         Sign In
        </Button>
       </form>
      </section>
      {isFieldEmpty && <p className="text-center text-red-500 mt-2">{isFieldEmpty}</p>}
      {passwordDoesNotMatch && <p className="text-center text-red-500 mt-2">{passwordDoesNotMatch}</p>}
      {userExist && <p className="text-center text-red-500 mt-2">{userExist}</p>}

      <div className="mt-10">
        <p>New to Giggler? <Link href="/accounts/sign-up" className="text-primary-color underline">Sign Up</Link></p>
      </div>
    </section>
  )
}
