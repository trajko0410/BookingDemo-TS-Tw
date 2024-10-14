"use client"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"

import MenuLink from "./MenuLink"

import useLogInModal from "@/app/hooks/useLoginModal"
import useSignUpModal from "@/app/hooks/useSignUp"

import { resetAuthCookies } from "@/app/lib/auth"

import { getUserId } from "@/app/lib/auth"

import useUserId from "@/app/hooks/useUserId"

//interface UserNavProps {
///userId?: string | null;

//}

const UserNav = () => {
  const router = useRouter()
  const pathname = usePathname()

  const zusUserId = useUserId()
  const zusloginModal = useLogInModal()
  const zusSignUp = useSignUpModal()

  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState<string | null>(zusUserId.userId);


  const fetchUserId = async () => {
    const userId = await getUserId();
    zusUserId.setUserId(userId);
    setUser(userId)
  };

  useEffect(() => {
    fetchUserId();
  }, []);

  //console.log(user, "navigation user")

  //async function handleUserId() {
  // const userId = await getUserId()
  //setUser(userId)

  //console.log(userId, "Vanigation")
  //zusSignUp.reverseClick()//seting click to false
  //}

  //let click = zusSignUp.isClick

  //console.log(click, "sadfasfafa")

  //useEffect(() => {
  //handleUserId()
  //}, [click])

  useEffect(() => {
    setUser(zusUserId.userId); // Update local `user` state
  }, [zusUserId.userId]);

  async function logOutHandler() {
    await resetAuthCookies()
    zusUserId.resetUserId();
    router.push("/");
  }


  return (

    <div className={`rounded-md p-2 ${isOpen ? "bg-transparentWhite" : "hover:bg-transparentWhite transition"}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center"
      >

        <svg fill="none" viewBox="0 0 24 24" strokeWidth="2.2" stroke="white" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
        <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
        </svg>
      </button>

      {isOpen && (

        <div className=" w-[220px] absolute top-[70px] right-2 border-[3px] border-gold rounded-xl shadow-md flex flex-col cursor-pointer z-50">
          <div className="bg-white p-1 rounded-lg">
            {user ? (
              <>
                <MenuLink
                  label='My properties-Profile'
                  onClick={() => {
                    setIsOpen(false);
                    router.push('/my-properties');
                  }}
                  isActive={pathname === "/my-properties"}
                />

                <MenuLink
                  label='My reservations'
                  onClick={() => {
                    setIsOpen(false);
                    router.push('/my-reservations');
                  }}
                  isActive={pathname === "/my-reservations"}

                />

                <MenuLink
                  label='My favorites'
                  onClick={() => {
                    setIsOpen(false);
                    router.push('/my-favorites');
                  }}
                  isActive={pathname === "/my-favorites"}

                />



                <MenuLink
                  label="LogOut"
                  onClick={() => {
                    logOutHandler();
                  }}
                />
              </>
            ) :
              (
                <>
                  <MenuLink
                    label="Log in"
                    onClick={() => {
                      zusloginModal.open();
                      setIsOpen(false)
                    }}
                  />


                  <MenuLink
                    label="Sign up"
                    onClick={() => {
                      zusSignUp.open();
                      setIsOpen(false)
                    }}
                  />
                </>
              )}
          </div>
        </div>
      )}
    </div>
  )
}

export default UserNav