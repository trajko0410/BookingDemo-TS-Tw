"use client"

import Modal from "./Modal"
import useSuccessModal from "@/app/hooks/useSuccessModal"


import { useEffect } from "react"
import { useRouter } from "next/navigation"
import confetti from 'canvas-confetti'
import Image from "next/image"

import checkedImage from "../../../../public/checked.png"

import CustomButton from "../UI/CustomButton"

const SuccessModal = () => {
  const router = useRouter()
  const zusSuccessModal = useSuccessModal()

  useEffect(() => {
    if (zusSuccessModal.isOpen) {
      triggerConfetti();
    }
  }, [zusSuccessModal.isOpen]); // Only trigger when modal opens

  const triggerConfetti = () => {
    confetti({
      particleCount: 300,
      spread: 85,
      origin: { y: 0.4 }, // This controls the start point of confetti
      colors: ['#ff0a54', // Pink
        '#ff477e',
        '#ff7096',
        '#ff85a1',
        '#fbb1bd',
        '#ffd700',
        '#1e90ff',
        '#00bfff',
        '#add8e6',
        '#32cd32',
      ],
      scalar: 1.2, // Controls size of the confetti
      startVelocity: 40, // Velocity of confetti particles
      disableForReducedMotion: true, // Respect user's motion preference
    });
  };

  const closeHandler = () => {
    router.push("/")
    zusSuccessModal.close()
  }



  const content = (
    <>
      <div className="text-center flex flex-col items-center">
        <h2 className="text-2xl font-bold text-gold">Success!</h2>

        <div className="my-6 h-[200px] w-[200px] border-4 border-gold rounded-full bg-booking flex justify-center items-center">
          <Image
            className="self-center"
            width={100}
            height={100}
            src={checkedImage}
            alt="checked image"
          />
        </div>

        <p className="text-lg text-gray-700">
          Your property has been added successfully.
        </p>
      </div>

      <div className="mt-6 flex justify-center">
        <CustomButton label="Close" onClick={closeHandler} />
      </div>

    </>
  )

  return (
    <Modal
      isOpen={zusSuccessModal.isOpen}
      close={zusSuccessModal.close}
      content={content}
      label="Property Successfully Added"
    />
  )
}


export default SuccessModal