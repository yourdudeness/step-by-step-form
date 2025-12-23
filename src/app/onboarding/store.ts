import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type FormValues = Record<string, unknown>;

type OnboardingState = {
  // currentStep: number;
  formData: FormValues;
  _hasHydrated: boolean;
  // setCurrentStep: (step: number) => void;
  setFormData: (data: Partial<FormValues>) => void;
  // mergeFormData: (data: Partial<FormValues>) => void;
  clearFormData: () => void;
  // resetStore: () => void;
  // goToNextStep: () => void;
  // goToPreviousStep: () => void;
  setHasHydrated: (state: boolean) => void;
};

const initialState = {
  formData: {},
  _hasHydrated: false,
};

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set) => ({
      ...initialState,
      setFormData: (data) =>
        set((state) => ({ formData: { ...state.formData, ...data } })),
      clearFormData: () => set({ formData: {} }),
      setHasHydrated: (state) => set({ _hasHydrated: state }),
    }),
    {
      name: "onboarding-storage",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
