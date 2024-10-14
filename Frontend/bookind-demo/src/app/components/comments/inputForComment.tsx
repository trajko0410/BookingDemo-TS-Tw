"use client"

import { useState } from "react";

import CustomButton from "../UI/CustomButton";

const CommentInputText = () => {
  const [newMessage, setNewMessage] = useState('');

  const sendMessage = () => {
    console.log(newMessage, "Send message")
  }



  return (
    <div className="mt-4 py-4 px-6 flex border border-gray-300 space-x-4 rounded-xl">
      <input
        type="text"
        placeholder="Write your comment..."
        className="w-full p-2 bg-gray-200 rounded-xl"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}

      />

      <CustomButton
        label="Send"
        onClick={sendMessage}
        className="w-[180px]"
      />
    </div>
  )
}

export default CommentInputText