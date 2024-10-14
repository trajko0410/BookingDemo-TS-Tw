"use client";

import { useEffect, useState } from "react";
//import { useRouter } from "next/navigation";

import Modal from "./Modal";
//import useSuccessModal from "@/app/hooks/useSuccessModal";
import useAddComment from "../../hooks/useAddComment"

import CustomButton from "../UI/CustomButton";


import apiService from "@/app/services/apiService";


interface ApiResponse {
  success: boolean;
  [key: string]: any; // Handle other keys from the response
}

interface AddCommentModalProps {
  propertyId: string
}


const AddPropertyModal: React.FC<AddCommentModalProps> = ({ propertyId }) => {
  //const router = useRouter();
  const zusAddComment = useAddComment()
  console.log(zusAddComment)


  const commentId = zusAddComment.commentId
  const isEditing = zusAddComment.isEditing

  const [errors, setErrors] = useState<string[]>([]);



  const [dataTitle, setDataTitle] = useState("");
  const [dataDescription, setDataDescription] = useState("");

  useEffect(() => {
    if (isEditing) {
      setDataTitle(zusAddComment.title)
      setDataDescription(zusAddComment.content)
    }
  }, [zusAddComment])


    ;
  //RESET FORM DATA
  const resetFormData = () => {
    setDataTitle("");
    setDataDescription("");
    setErrors([]); // Clear any errors
    zusAddComment.reset()
    zusAddComment.close()
  };

  //submit
  const submitForm = async () => {
    if (
      dataTitle &&
      dataDescription
    ) {
      const formData = new FormData();
      formData.append("title", dataTitle);
      formData.append("content", dataDescription);

      let response: ApiResponse

      if (isEditing && commentId) {
        // Update an existing comment
        response = await apiService.put(`/api/properties/${commentId}/comments/edit/`, formData);
        console.log("updatae")
      } else {
        // Add a new comment
        response = await apiService.post(`/api/properties/${propertyId}/comments/add/`, formData);
      }

      //const response = await apiService.post(`/api/properties/${propertyId}/comments/add/`, formData);
      //console.log(response, "REs comment")

      if (response.success) {
        zusAddComment.setTitle(dataTitle)
        zusAddComment.setContent(dataDescription)
        //router.push("/?added=true");
        zusAddComment.close();
        resetFormData()
      } else {
        const tmpErrors: string[] = Object.values(response).map((error: any) => error);
        setErrors(tmpErrors);
      }
    }
  };

  const content = (
    <>
      <h2 className="mb-6 text-2xl">Describe your place</h2>
      <input
        type="text"
        value={dataTitle}
        onChange={(e) => setDataTitle(e.target.value)}
        className="w-full p-4 border border-gray-600 rounded-xl mb-6"
        placeholder="Comment title"
      />
      <textarea
        value={dataDescription}
        onChange={(e) => setDataDescription(e.target.value)}
        className="w-full h-[200px] p-4 border border-gray-600 rounded-xl mb-6"
        placeholder="Your comment"
      />
      {Object.entries(errors).map(([key, value], index) => (
        <div key={index} className="p-5 bg-red-400 text-white rounded-xl mt-1 opacity-80">
          {value}
        </div>
      ))}
      <div className="mt-4 space-y-4">
        <CustomButton
          label='Cancle'
          className='mb-2 bg-black hover:bg-gray-800 transition duration-300'
          onClick={resetFormData}
        />
        <CustomButton label="Add Comment" onClick={() => submitForm()} />
      </div>

    </>
  );

  return (
    <Modal
      isOpen={zusAddComment.isOpen}
      close={resetFormData}
      label="Add property"
      content={content}
    />
  );
};

export default AddPropertyModal;
