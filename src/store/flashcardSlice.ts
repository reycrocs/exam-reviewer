import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FlashcardState {
  enabled: boolean; // Auto-submit state
  correctCount: number;
  wrongCount: number;
  skippedCount: number;
}

const initialState: FlashcardState = {
  enabled: false, // Default value for auto-submit
  correctCount: 0,
  wrongCount: 0,
  skippedCount: 0,
};

const FlashcardSlice = createSlice({
  name: "flashcard",
  initialState,
  reducers: {
    // Toggle auto-submit state
    toggleAutoSubmit: (state) => {
      state.enabled = !state.enabled;
    },
    setAutoSubmit: (state, action: PayloadAction<boolean>) => {
      state.enabled = action.payload;
    },

    // Track quiz results
    incrementCorrect: (state) => {
      state.correctCount += 1;
    },
    incrementWrong: (state) => {
      state.wrongCount += 1;
    },
    incrementSkipped: (state) => {
      state.skippedCount += 1;
    },

    // Reset counts (e.g., when restarting quiz)
    resetCounts: (state) => {
      state.correctCount = 0;
      state.wrongCount = 0;
      state.skippedCount = 0;
    },
  },
});

export const {
  toggleAutoSubmit,
  setAutoSubmit,
  incrementCorrect,
  incrementWrong,
  incrementSkipped,
  resetCounts,
} = FlashcardSlice.actions;

export default FlashcardSlice.reducer;