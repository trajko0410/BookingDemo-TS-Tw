"use client"

import Modal from "./Modal"
import { useState } from "react"
import { useRouter } from "next/navigation"
import CustomButton from "../UI/CustomButton"
import apiService from "@/app/services/apiService"
import { handleLogin } from "@/app/lib/auth"


import useUserId from "@/app/hooks/useUserId"
import useSignUpModal from "@/app/hooks/useSignUp"





interface ErrorMessages {
  [key: string]: string; // Maps field names to error messages
}

const SignUpModal = () => {
  const zusSignUp = useSignUpModal()
  const zusUserId = useUserId()
  const router = useRouter()


  const [userName, setUserName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [repeatePassword, setRepeatePassword] = useState("")

  //const [errors, setErrors] = useState<string[]>([])
  const [errors, setErrors] = useState<ErrorMessages>({});
  //console.log(errors, "errror")



  const submitSignup = async () => {
    const formData = {
      username: userName,
      email: email,
      password1: password,
      password2: repeatePassword,

    }
    //console.log(formData, "fasd")

    const response = await apiService.postWithoutToken("api/auth/register/", JSON.stringify(formData))

    if (response.access) {
      //handle login
      handleLogin(response.user.pk, response.access, response.refresh)

      zusUserId.setUserId(response.user.pk)
      zusSignUp.close()
      router.push("/")
      //router.refresh()
      //window.location.reload()

    } else {
      // Set errors based on response
      const newErrors: ErrorMessages = {};
      for (const key in response) {
        if (response[key]) {
          newErrors[key] = response[key]; // Store errors in the object
        }
      }
      setErrors(newErrors);
    }
  }


  const content = (
    <>
      <form
        action={submitSignup}
        className="space-y-4"
      >
        <input onChange={(e) => setUserName(e.target.value)} placeholder='Your User Name' type="text" className={`w-full h-[54px] border px-4 boreder-gray-300 rounded-xl ${errors.username ? "border-red-500" : "border-gray-300"}`} />
        <input onChange={(e) => setEmail(e.target.value)} placeholder="Your e-mail address" type="email" className={`w-full h-[54px] border px-4 boreder-gray-300 rounded-xl ${errors.email ? "border-red-500" : "border-gray-300"}`} />
        <input onChange={(e) => setPassword(e.target.value)} placeholder="Your password" type="password" className={`w-full h-[54px] border px-4 boreder-gray-300 rounded-xl ${errors.password1 ? "border-red-500" : "border-gray-300"}`} />
        <input onChange={(e) => setRepeatePassword(e.target.value)} placeholder="Repeate password" type="password" className={`w-full h-[54px] border px-4 boreder-gray-300 rounded-xl ${errors.password2 ? "border-red-500" : "border-gray-300"}`} />

        {Object.entries(errors)
          .filter(([key]) => key !== "general")
          .map(([key, value], index) => (
            <div key={index} className="p-5 bg-red-400 text-white rounded-xl opacity-80">
              {value}
            </div>
          ))}


        <CustomButton label="Submit" onClick={submitSignup} />
      </form>
    </>
  )

  return (
    <Modal
      isOpen={zusSignUp.isOpen}
      close={zusSignUp.close}
      content={content}
      label="Sign Up"
    />
  )
}


export default SignUpModal