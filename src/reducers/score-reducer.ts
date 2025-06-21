import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IGuessState } from "./guess-reducer";

export type ScoreData = {
  name: string;
  score: number;
};

export interface IScoreState {
  scores: ScoreData[];
}

const initialState: IScoreState = {
  scores: [],
};

const scoreSlice = createSlice({
  name: "scores",
  initialState,
  reducers: {
    calcScore: (state, action: PayloadAction<IGuessState>) => {
      const guesses = action.payload.guesses;
      for (const key in guesses) {
        for (const v of guesses[key]) {
          if (state.scores.map((s) => s.name).indexOf(v.userName) == -1) {
            state.scores.push({ name: v.userName, score: 0 });
          }
          if (v.isCorrect) {
            state.scores.find((score) => score.name == v.userName)!.score++;
          }
        }
      }
    },
    resetScore: (state) => {
      state.scores = [];
    },
  },
});

export const { calcScore, resetScore } = scoreSlice.actions;
export const scoreReducer = scoreSlice.reducer;
