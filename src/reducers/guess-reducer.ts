import { GuessData, GuessPostData } from "@/app/api/guess/route";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface IGuessState {
  guesses: {[key: number]: GuessData[]};
}

const initialState: IGuessState = {
  guesses: {},
};

const guessSlice = createSlice({
  name: "guesses",
  initialState,
  reducers: {
    addGuess: (state, action: PayloadAction<GuessPostData>) => {
      state.guesses[action.payload.guessTurnId] = [...state.guesses[action.payload.guessTurnId], action.payload.guessData];
      state.guesses[action.payload.guessTurnId].sort();
    },
    resetGuesses: (state) => {
      state.guesses = [];
    },
  },
});

export const { addGuess, resetGuesses } = guessSlice.actions;
export const guessReducer = guessSlice.reducer;
