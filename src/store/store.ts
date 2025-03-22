import { configureStore } from "@reduxjs/toolkit";
import flashcardReducer from "./flashcardSlice"; // Updated import

export const store = configureStore({
  reducer: {
    flashcard: flashcardReducer, // Use the renamed slice
  },
});

// TypeScript types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
