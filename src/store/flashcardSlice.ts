import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { mockData } from "../views/WEB002/MockData";

interface FlashcardState {
  enabled: boolean;
  ended: boolean;
  tryAgain: boolean;
  skippedOnly: boolean;
  isLoading: boolean;
  correctCount: number;
  wrongCount: number;
  skippedCount: number;
  currentQuestionIndex: number;
  totalQuestions: number;
  skippedQuestions: number[];
}

const initialState: FlashcardState = {
  enabled: false,
  ended: false,
  tryAgain: false,
  skippedOnly: false,
  isLoading: true,
  correctCount: 0,
  wrongCount: 0,
  skippedCount: 0,
  currentQuestionIndex: 0,
  totalQuestions: mockData.length,
  skippedQuestions: [],
};

// Helper function to move to the next question
const getNextQuestionIndex = (state: FlashcardState) => {
  state.isLoading = true;
  if (state.currentQuestionIndex < state.totalQuestions - 1 && !state.skippedOnly) {
    return state.currentQuestionIndex + 1; // Move to the next question normally
  }

  if (state.skippedQuestions.length > 0) {
    state.skippedOnly = true;
    
    // If only skipped questions remain, cycle through them instead of reducing the count
    const currentIndex = state.skippedQuestions.indexOf(state.currentQuestionIndex);
    if (currentIndex !== -1 && currentIndex < state.skippedQuestions.length - 1) {
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
    },
    toggleEnded: (state) => {
      state.ended = !state.ended;
    },
    toggleTryAgain: (state) => {
      state.tryAgain = !state.tryAgain;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setAutoSubmit: (state, action: PayloadAction<boolean>) => {
      state.enabled = action.payload;
    },
    incrementCorrect: (state) => {
      state.isLoading = true;
      state.correctCount += 1;
      state.skippedQuestions = state.skippedQuestions.filter(q => q !== state.currentQuestionIndex);
      state.skippedCount = state.skippedQuestions.length;
      state.isLoading = false;
    },
    incrementWrong: (state) => {
      state.isLoading = true;
      state.wrongCount += 1;
      state.skippedQuestions = state.skippedQuestions.filter(q => q !== state.currentQuestionIndex);
      state.skippedCount = state.skippedQuestions.length;
      state.isLoading = false;
    },
    incrementSkipped: (state) => {
      state.isLoading = true;
      if (!state.skippedQuestions.includes(state.currentQuestionIndex)) {
        state.skippedQuestions.push(state.currentQuestionIndex);
        state.skippedCount += 1;
      }
      state.isLoading = false;
    },
    resetCounts: (state) => {
      state.correctCount = 0;
      state.wrongCount = 0;
      state.skippedCount = 0;
      state.currentQuestionIndex = 0;
      state.skippedQuestions = [];
      state.ended = false;
      state.tryAgain = false;
      state.skippedOnly = false;
      state.isLoading = true;
    },
    setCurrentQuestionIndex: (state) => {
      state.currentQuestionIndex = getNextQuestionIndex(state);
    },
  },
});

export const {
  toggleAutoSubmit,
  toggleEnded,
  toggleTryAgain,
  setAutoSubmit,
  setLoading,
  incrementCorrect,
  incrementWrong,
  incrementSkipped,
  resetCounts,
  setCurrentQuestionIndex,
} = FlashcardSlice.actions;

export default FlashcardSlice.reducer;