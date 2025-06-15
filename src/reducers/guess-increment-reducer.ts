import { GuessIncrementData } from "@/app/api/guess/increment/route";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface IGuessIncrementState {
  currentGuessTurn: number;
}

const initialState: IGuessIncrementState = {
  currentGuessTurn: 0,
};

const guessIncrementSlice = createSlice({
  name: "guesses",
  initialState,
  reducers: {
    incrementGuess: (state, action: PayloadAction<GuessIncrementData>) => {
      state.currentGuessTurn = action.payload.prevTurn + 1;
    },
  },
});

export const { incrementGuess } = guessIncrementSlice.actions;
export const guessIncrementReducer = guessIncrementSlice.reducer;
