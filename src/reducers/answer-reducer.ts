import { AnswerData } from "@/app/api/answer/route";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface IAnswerState {
  answers: AnswerData[];
}

const initialState: IAnswerState = {
  answers: [],
};

const answerSlice = createSlice({
  name: "answers",
  initialState,
  reducers: {
    addAnswer: (state, action: PayloadAction<AnswerData>) => {
      state.answers = [...state.answers, action.payload];
      state.answers.sort();
    },
    resetAnswers: (state) => {
      state.answers = [];
    },
  },
});

export const { addAnswer, resetAnswers } = answerSlice.actions;
export const answerReducer = answerSlice.reducer;
