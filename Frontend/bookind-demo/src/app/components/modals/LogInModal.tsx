"use client"

import Modal from "./Modal"
import { useState } from "react"
import useLogInModal from "@/app/hooks/useLoginModal"
import CustomButton from "../UI/CustomButton"
import { useRouter } from "next/navigation"

import apiService from "@/app/services/apiService"
import { handleLogin } from "@/app/lib/auth"
import useUserId from "@/app/hooks/useUserId"

interface ErrorMessages {
  [key: string]: string; // Maps field names to error messages
}

const LoginModal = () => {
  const router = useRouter()
  const zusloginModal = useLogInModal()
  const zusUserId = useUserId()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [errors, setErrors] = useState<ErrorMessages>({})

  const submitLogin = async function () {
    const formData = {
      email: email,
      password: password,
    }

    const response = await apiService.postWithoutToken("api/auth/login/", JSON.stringify(formData))

    if (response.access) {
      //handle login
      handleLogin(response.user.pk, response.access, response.refresh)


      zusUserId.setUserId(response.user.pk)
      zusloginModal.close()
      router.push("/")



    } else {
      const newErrors: ErrorMessages = {}
      for (const key in response) {
        if (response[key]) {
          newErrors[key] = response[key] // Store errors in the object
        }
      }
      setErrors(newErrors)

    }
  }

  //console.log(errors, "eror")

  const handleClose = () => {
    // Reset errors when closing the modal
    setErrors({})
    zusloginModal.close()
  }

  const content = (
    <>
      <form
        action={submitLogin}
        className="space-y-4 z-30"
      >
        <input onChange={(e) => setEmail(e.target.value)} placeholder="Your e-mail address" type="email" className="w-full h-[54px] border px-4 boreder-gray-300 rounded-xl" />
        <input onChange={(e) => setPassword(e.target.value)} placeholder="Your password" type="password" className="w-full h-[54px] border px-4 boreder-gray-300 rounded-xl" />

        {Object.entries(errors).map(([key, value], index) => (
          <div key={index} className="p-5 bg-red-400 text-white rounded-xl opacity-80">
            {value}
          </div>
        ))}
        <CustomButton label="Submit" onClick={submitLogin} />
      </form>
    </>
  )

  return (
    <Modal
      isOpen={zusloginModal.isOpen}
      close={handleClose}
      content={content}
      label="Log in"
    />
  )
}


export default LoginModal