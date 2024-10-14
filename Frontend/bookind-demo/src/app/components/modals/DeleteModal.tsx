"use client";

import Modal from "./Modal";
import useDeleteModal from "@/app/hooks/useDeleteModal";
import useAddComment from "../../hooks/useAddComment";
import Image from "next/image";
import xMarkImage from "../../../../public/x-mark.png";
import CustomButton from "../UI/CustomButton";
import apiService from "@/app/services/apiService";
import { useState } from "react";

const SuccessModal = () => {
  const zusDeleteModal = useDeleteModal();
  const zusAddComment = useAddComment();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const deleteHandler = async () => {
    setIsLoading(true); // Set loading state
    setError(null); // Reset error state
    try {
      const response = await apiService.delete(`/api/properties/${zusDeleteModal.commentId}/comments/delete/`);
      //console.log(response, "Delete");
      zusAddComment.reset();
      zusDeleteModal.close();
    } catch (err) {
      //console.error(err);
      setError("Failed to delete comment. Please try again."); // Set error message
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  const content = (
    <>
      <div className="text-center flex flex-col items-center">
        <h2 className="text-2xl font-semibold text-gray-700">
          Confirm you want to delete the comment titled: {zusDeleteModal.commentTitle}.
        </h2>

        <div className="my-6 h-[200px] w-[200px] border-4 border-gold rounded-full bg-booking flex justify-center items-center">
          <Image
            className="self-center"
            width={100}
            height={100}
            src={xMarkImage}
            alt="checked image"
          />
        </div>

        <p className="text-lg text-gray-700">
          Are you certain you want to delete this comment? There’s no way to undo this action.
        </p>

        {/* Display error message if exists */}
        {error && <div className="p-5 bg-red-400 text-white rounded-xl w-full mt-2">{error}</div>}
      </div>

      <div className="mt-6 mb-2 flex justify-center">
        <CustomButton
          label={isLoading ? "Deleting..." : "Delete"}
          onClick={deleteHandler}
        />
      </div>
    </>
  );

  return (
    <Modal
      isOpen={zusDeleteModal.isOpen}
      close={zusDeleteModal.close}
      content={content}
      label="Delete Comment"
    />
  );
};

export default SuccessModal;
