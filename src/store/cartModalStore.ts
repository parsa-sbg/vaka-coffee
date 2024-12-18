import {create} from "zustand"

type state = {
  isCartModalOpen: boolean
}

type action = {
  setIsCartModalOpen: (isOpen: boolean) => void
}

export const useCartModalStore = create<state & action>()((set) => ({
  isCartModalOpen: false,

  setIsCartModalOpen(isOpen: boolean) {
    set({
      isCartModalOpen: isOpen,
    })
  },
}))
