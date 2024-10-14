"use client";

import { PropertyType } from "../Property/PropertyList";
import { useEffect, useState } from "react";
import apiService from "@/app/services/apiService";
import CustomButton from "../UI/CustomButton";
import useAddComment from "../../hooks/useAddComment";
import SingleComment from "./SingleComment";
import { UserInfoType } from "@/app/my-properties/page";
import useLogInModal from "@/app/hooks/useLoginModal";

interface CommentProps {
  property: PropertyType;
  user: UserInfoType;
}

export interface CommentType {
  id: string;
  title: string;
  content: string;
  user: UserInfoType; // Represents the user object
  created_at: string;
}

// Define the type for the API response
interface ApiResponse {
  [key: string]: CommentType; // Each key is a string and its value is a CommentType
}

const Comments: React.FC<CommentProps> = ({ property, user }) => {
  const zusAddComment = useAddComment();
  const zusLogIn = useLogInModal();
  const userId = user?.id || "";

  const [comments, setComments] = useState<CommentType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchComments = async () => {
    setLoading(true);
    try {
      const response = await apiService.get(`/api/properties/${property.id}/comments/get/`);
      setComments(response.data); // Set the comments state
    } catch (err) {
      setError("Failed to load comments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [property.id, zusAddComment]);

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between  mb-4 mt-8">
        <div>
          <h1 className="text-4xl">
            <span className="inline-block relative">Comments
              <span className="block h-[5px] bg-gold rounded-full -mt-1"></span>
            </span>
          </h1>
          <span className="mb-4 mt-2 block text-lg text-gray-600">Please leave your comments here.</span>
        </div>
        <div className="w-full sm:w-72 mt-4 sm:mt-0"> {/* Added margin-top for small screens */}
          <CustomButton
            label="Add comment"
            onClick={() => {
              if (userId === "") {
                zusLogIn.open();
              } else {
                zusAddComment.open();
              }
            }}
          />
        </div>
      </div>
      <hr className="mb-4" />

      {loading ? (
        <div>Loading comments...</div>
      ) : error ? (
        <div className="text-red-600">{error}</div>
      ) : !comments || comments.length === 0 ? (
        <div>No comments available.</div>
      ) : comments.length > 0 ? (
        comments
          .filter(comment => comment.title !== "" && comment.content !== "") // Filter out invalid comments
          .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()) // Sort by created_at
          .map((comment, index) => (
            <SingleComment key={index} comment={comment} user={user} />
          ))
      ) : (
        <div>No comments yet.</div>
      )}
    </>
  );
}

export default Comments;
