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
    incrementGuessTurn: (state, action: PayloadAction<GuessIncrementData>) => {
      state.currentGuessTurn = action.payload.prevTurn + 1;
    },
    resetGuessTurn: (state) => {
      state.currentGuessTurn = 0;
    },
  },
});

export const { incrementGuessTurn, resetGuessTurn } =
  guessIncrementSlice.actions;
export const guessIncrementReducer = guessIncrementSlice.reducer;
