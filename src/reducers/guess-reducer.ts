import { GuessData, GuessPostData } from "@/app/api/guess/route";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface IGuessState {
  guesses: { [key: number]: GuessData[] };
}

const initialState: IGuessState = {
  guesses: {},
};

const guessSlice = createSlice({
  name: "guesses",
  initialState,
  reducers: {
    addGuess: (state, action: PayloadAction<GuessPostData>) => {
      state.guesses[action.payload.currentGuessTurn] = [
        ...(state.guesses[action.payload.currentGuessTurn] ?? []),
        action.payload.guessData,
      ];
      state.guesses[action.payload.currentGuessTurn].sort((a, b) =>
        a.userName > b.userName ? 1 : -1
      );
    },
    resetGuesses: (state) => {
      state.guesses = [];
    },
  },
});

export const { addGuess, resetGuesses } = guessSlice.actions;
export const guessReducer = guessSlice.reducer;
