import { CommentType } from "./Coments";
import Image from "next/image";

import useAddComment from "../../hooks/useAddComment";
import useDeleteModal from "@/app/hooks/useDeleteModal";


import apiService from "@/app/services/apiService";
import { UserInfoType } from "@/app/my-properties/page";
import editImage from "../../../../public/edit.png";
import { useState } from "react";


interface SingleCommentProps {
  comment: CommentType;
  user?: UserInfoType; // Allow user prop to be passed down as a fallback
}

const SingleComment: React.FC<SingleCommentProps> = ({ comment, user }) => {
  const zusAddComment = useAddComment();
  const zusDeleteModal = useDeleteModal()
  const [menuOpen, setMenuOpen] = useState(false); // State for menu visibility

  // Format the comment date
  const commentDate = new Date(comment.created_at);
  const formattedDate = commentDate.toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true, // For AM/PM format
  });

  // Check if avatar exists, otherwise fallback to a placeholder or user avatar
  const avatarPath = comment.user?.avatar || user?.avatar;
  const avatarUrl = avatarPath?.startsWith('http')
    ? avatarPath
    : `http://127.0.0.1:8000/${avatarPath}`;

  // Skip rendering if the title or content is empty
  if (!comment.title || !comment.content) {
    return null;
  }

  const editHandler = () => {
    zusAddComment.setEditingMode(true, comment.id);
    zusAddComment.setTitle(comment.title);
    zusAddComment.setContent(comment.content);
    zusAddComment.open();
    setMenuOpen(false); // Close the menu after selecting edit
  };



  const toggleMenu = () => setMenuOpen((prev) => !prev); // Toggle menu visibility

  return (
    <>
      {comment ? (
        <div className="mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <Image
                src={avatarUrl}
                alt={`${comment.user.username}'s avatar`}
                width={50}
                height={50}
                className="rounded-full w-12 h-12 object-cover"
              />
              <div className="flex items-center justify-center">
                <span className="text-gray-500 font-semibold">{comment.user.username}</span>
              </div>
            </div>

            <div className="ml-6 flex flex-col w-full relative">
              <h3 className="text-lg font-bold">{comment.title}</h3>

              {user?.id === comment.user?.id && (
                <div
                  className="absolute top-0 right-0 cursor-pointer p-2 rounded-full hover:scale-90 transition duration-500"
                  onClick={toggleMenu} // Toggle menu on click
                >
                  <Image src={editImage} alt="edit" width={20} height={20} />
                </div>
              )}

              <p className="mt-1 text-gray-700">{comment.content}</p>

              <div className="mt-2 text-sm text-gray-500 text-right">
                {formattedDate}
              </div>

              {/* Menu with Edit and Delete options */}
              {menuOpen && (
                <div className="w-[220px] absolute top-2 right-12 bg-white border border-gray-400 rounded-xl flex flex-col cursor-pointer shadow-xl z-50">
                  <h2
                    onClick={editHandler}
                    className="cursor-pointer   hover:bg-gray-100 text-black transition duration-300 rounded-xl px-4 py-2"
                  >
                    Edit
                  </h2>
                  <h2
                    onClick={() => { zusDeleteModal.open(comment.id, comment.title), setMenuOpen(false) }}
                    className="cursor-pointer text-red-400 hover:bg-gray-100 transition duration-300 rounded-xl px-4 py-2"
                  >
                    Delete
                  </h2>
                </div>
              )}
            </div>
          </div>

          <hr className="mt-4" />
        </div >
      ) : (
        <>Can't find this comment at this time.</>
      )}
    </>
  );
};

export default SingleComment;
