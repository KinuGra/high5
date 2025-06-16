import { RoomCondition } from "@/types/room-condition";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type MemberInfo = {
  userName: string;
  userIcon: string;
};

export interface IRoomState {
  userName: string;
  userIcon: string;
  roomName: string;
  roomCondition: RoomCondition;
  members: MemberInfo[];
  currentRound: number;
  maxRound: number;
}

const initialState: IRoomState = {
  userName: "",
  userIcon: "",
  roomName: "",
  roomCondition: RoomCondition.Matching,
  members: [],
  currentRound: 0,
  maxRound: 3,
};

const roomSlice = createSlice({
  name: "roomInfo",
  initialState,
  reducers: {
    setRoomInfo: (state, action: PayloadAction<IRoomState>) => {
      state.userName = action.payload.userName;
      state.userIcon = action.payload.userIcon;
      state.roomName = action.payload.roomName;
      state.maxRound = action.payload.maxRound;
    },
    setRoomCondition: (state, action: PayloadAction<RoomCondition>) => {
      state.roomCondition = action.payload;
    },
    addMembers: (state, action: PayloadAction<MemberInfo>) => {
      state.members = [...state.members, action.payload];
      state.members.sort((a, b) => (a.userName > b.userName ? 1 : -1));
    },
    removeMembers: (state, action: PayloadAction<MemberInfo>) => {
      state.members = state.members.filter(
        (_, i) => i !== state.members.indexOf(action.payload)
      );
    },
    incrementRound: (state) => {
      state.currentRound++;
    },
  },
});

export const {
  setRoomInfo,
  setRoomCondition,
  addMembers,
  removeMembers,
  incrementRound,
} = roomSlice.actions;
export const roomReducer = roomSlice.reducer;
