import { create } from "zustand"

interface UserIdStore {
  userId: string | null;
  setUserId: (id: string | null) => void;
  resetUserId: () => void
}

const useUserId = create<UserIdStore>((set) => ({
  userId: null,
  setUserId: (id) => set({ userId: id }), // Set the user ID
  resetUserId: () => set({ userId: null })
}))

export default useUserId