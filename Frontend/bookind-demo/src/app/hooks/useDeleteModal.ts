import { create } from "zustand";

interface DeleteModalStore {
  isOpen: boolean;
  commentId: string | null; // Change this type based on your comment ID type
  commentTitle: string | null; // Store the title of the comment
  open: (id: string, title: string) => void; // Accept id and title as parameters
  close: () => void;
}

const useDeleteModal = create<DeleteModalStore>((set) => ({
  isOpen: false,
  commentId: null,
  commentTitle: null,
  open: (id: string, title: string) => set({ isOpen: true, commentId: id, commentTitle: title }),
  close: () => set({ isOpen: false, commentId: null, commentTitle: null }), // Reset when closing
}));

export default useDeleteModal;
