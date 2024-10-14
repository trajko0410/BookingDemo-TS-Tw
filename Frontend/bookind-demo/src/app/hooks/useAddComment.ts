import { create } from "zustand";

interface AddCommentModalStore {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  title: string;
  content: string;
  setTitle: (title: string) => void;   // Function to set title
  setContent: (content: string) => void; // Function to set content
  reset: () => void; // Function to reset title and content

  isEditing: boolean; // Track if editing or adding a comment
  commentId: string | null;
  setEditingMode: (isEditing: boolean, commentId?: string | null) => void;
}

const useAddPropertyModal = create<AddCommentModalStore>((set) => ({
  isOpen: false,
  title: "",
  content: "",
  isEditing: false,
  commentId: null,
  setEditingMode: (isEditing, commentId = null) =>
    set(() => ({ isEditing, commentId })),

  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  setTitle: (title: string) => set({ title }),
  setContent: (content: string) => set({ content }),
  reset: () => set({
    title: "", content: "", isEditing: false,
    commentId: null,
  }), // Reset function

}));

export default useAddPropertyModal;
