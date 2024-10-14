"use client"

import useLogInModal from "@/app/hooks/useLoginModal"
import useUserId from "@/app/hooks/useUserId"
import useAddPropertyModal from "@/app/hooks/usePropertyModal"

export default function ListProperty() {
  const zusUserId = useUserId()
  const zusloginModal = useLogInModal()
  const zusAddPropertyModal = useAddPropertyModal()

  const addPropertyHandler = () => {
    if (zusUserId.userId) {
      zusAddPropertyModal.open()
    } else {
      zusloginModal.open()
    }
  }

  return (
    <div className="rounded-md p-2 hover:bg-transparentWhite transition cursor-pointer" onClick={addPropertyHandler}>
      <h2 className="font-bluesans text-white font-semibold  text-sm">List your property</h2>
    </div>
  )
}