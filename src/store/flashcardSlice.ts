import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadState, saveState } from "./helpers/localStorage";

interface FlashcardState {
  enabled: boolean;
  ended: boolean;
  tryAgain: boolean;
  isSkipping: boolean;
  skippedOnly: boolean;
  isLoading: boolean;
  correctCount: number;
  wrongCount: number;
  skippedCount: number;
  currentQuestionIndex: number;
  totalQuestions: number;
  skippedQuestions: number[];
}

const defaultState: FlashcardState = {
  enabled: false,
  ended: false,
  tryAgain: false,
  skippedOnly: false,
  isSkipping: false,
  isLoading: true,
  correctCount: 0,
  wrongCount: 0,
  skippedCount: 0,
  currentQuestionIndex: 0,
  totalQuestions: 0,
  skippedQuestions: [],
};

const initialState: FlashcardState = loadState() || defaultState;

// Helper function to move to the next question
const getNextQuestionIndex = (state: FlashcardState) => {
  state.isLoading = true;
  if (
    state.currentQuestionIndex < state.totalQuestions - 1 &&
    !state.skippedOnly
  ) {
    return state.currentQuestionIndex + 1; // Move to the next question normally
  }

  if (state.skippedQuestions.length > 0) {
    state.skippedOnly = true;

    // If only skipped questions remain, cycle through them instead of reducing the count
    const currentIndex = state.skippedQuestions.indexOf(
      state.currentQuestionIndex
    );
    if (
      currentIndex !== -1 &&
      currentIndex < state.skippedQuestions.length - 1
    ) {
      state.isLoading = false;
      return state.skippedQuestions[currentIndex + 1]; // Move to the next skipped question
    }
    state.isLoading = false;
    return state.skippedQuestions[0]; // Restart from the first skipped question if at the end
  }
  state.isLoading = false;
  return state.currentQuestionIndex; // No more questions left
};

const FlashcardSlice = createSlice({
  name: "flashcard",
  initialState,
  reducers: {
    toggleAutoSubmit: (state) => {
      state.enabled = !state.enabled;
      saveState(state);
    },
    toggleEnded: (state, action: PayloadAction<boolean>) => {
      state.ended = action.payload;
      saveState(state);
    },
    toggleTryAgain: (state, action: PayloadAction<boolean>) => {
      state.tryAgain = action.payload;
      saveState(state);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
      saveState(state);
    },
    setIsSkipping: (state, action: PayloadAction<boolean>) => {
      state.isSkipping = action.payload;
      saveState(state);
    },
    setAutoSubmit: (state, action: PayloadAction<boolean>) => {
      state.enabled = action.payload;
      saveState(state);
    },
    setTotalQuestion: (state, action: PayloadAction<number>) => {
      state.totalQuestions = action.payload;
      saveState(state);
    },
    incrementCorrect: (state) => {
      state.correctCount += 1;
      state.skippedQuestions = state.skippedQuestions.filter(
        (q) => q !== state.currentQuestionIndex
      );
      state.skippedCount = state.skippedQuestions.length;
      saveState(state);
    },
    incrementWrong: (state) => {
      state.wrongCount += 1;
      state.skippedQuestions = state.skippedQuestions.filter(
        (q) => q !== state.currentQuestionIndex
      );
      state.skippedCount = state.skippedQuestions.length;
      saveState(state);
    },
    incrementSkipped: (state) => {
      if (!state.skippedQuestions.includes(state.currentQuestionIndex)) {
        state.skippedQuestions.push(state.currentQuestionIndex);
        state.skippedCount += 1;
      }
      saveState(state);
    },
    resetCounts: (state) => {
      const preserveEnabled = state.enabled;
      Object.assign(state, defaultState);
      state.enabled = preserveEnabled;

      saveState(state);

      localStorage.removeItem("selectedChoice");
      localStorage.removeItem("isSubmitted");
      localStorage.removeItem("hasChecked");
      localStorage.removeItem("shuffledQuestionData");
    },
    resetFlashcards: (state) => {
      const preserveEnabled = state.enabled;
      const preserveTotalQuestions = state.totalQuestions;
      Object.assign(state, defaultState);
      state.enabled = preserveEnabled;
      state.totalQuestions = preserveTotalQuestions;

      saveState(state);

      localStorage.removeItem("selectedChoice");
      localStorage.removeItem("isSubmitted");
      localStorage.removeItem("hasChecked");
      localStorage.removeItem("shuffledQuestionData");
    },
    setCurrentQuestionIndex: (state) => {
      state.currentQuestionIndex = getNextQuestionIndex(state);
      saveState(state);
    },
  },
});

export const {
  toggleAutoSubmit,
  toggleEnded,
  toggleTryAgain,
  setAutoSubmit,
  setTotalQuestion,
  setLoading,
  setIsSkipping,
  incrementCorrect,
  incrementWrong,
  incrementSkipped,
  resetCounts,
  setCurrentQuestionIndex,
  resetFlashcards,
} = FlashcardSlice.actions;

export default FlashcardSlice.reducer;
