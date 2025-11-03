import { create } from "zustand";

type SignupState = {
  loading: boolean;
  signupError: string | null;
  showPassword: boolean;
  currentMessage: number;

  setLoading: (val: boolean) => void;
  setSignupError: (val: string | null) => void;
  togglePassword: () => void;
  nextMessage: (length: number) => void;
};

export const useSignupStore = create<SignupState>((set) => ({
  loading: false,
  signupError: null,
  showPassword: false,
  currentMessage: 0,

  setLoading: (val) => set({ loading: val }),
  setSignupError: (val) => set({ signupError: val }),
  togglePassword: () => set((state) => ({ showPassword: !state.showPassword })),
  nextMessage: (length) =>
    set((state) => ({ currentMessage: (state.currentMessage + 1) % length })),
}));
