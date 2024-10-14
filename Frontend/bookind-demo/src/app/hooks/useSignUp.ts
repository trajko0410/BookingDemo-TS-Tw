import { create } from "zustand"

interface SignUpModalStore {
  isOpen: boolean;
  isClick: boolean;
  open: () => void;
  close: () => void;
  click: () => void;
  reverseClick: () => void
}

const useSignUpModal = create<SignUpModalStore>((set) => ({
  isOpen: false,
  isClick: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  click: () => set({ isClick: true }),
  reverseClick: () => set({ isClick: false })
}))

export default useSignUpModal