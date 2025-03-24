import { decryptData, encryptData } from "../../utils/encrypt";

// helpers/localStorage.ts
export const loadState = () => {
    const encrypted = localStorage.getItem('flashcardState');
    if (encrypted) {
        try {
        return decryptData(encrypted);
        } catch (e) {
        console.error('Decryption failed:', e);
        return null;
        }
    }
    return null;
  };
  
  export const saveState = (state: any) => {
    try {
      const encrypted = encryptData(state);
      localStorage.setItem('flashcardState', encrypted);
    } catch (err) {
      console.error("Error saving state to localStorage", err);
    }
  };
  