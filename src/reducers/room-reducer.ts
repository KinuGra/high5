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
}

const initialState: IRoomState = {
  userName: "",
  userIcon: "",
  roomName: "",
  roomCondition: RoomCondition.Matching,
  members: [],
};

const roomSlice = createSlice({
  name: "roomInfo",
  initialState,
  reducers: {
    setRoomInfo: (state, action: PayloadAction<IRoomState>) => {
      state.userName = action.payload.userName;
      state.userIcon = action.payload.userIcon;
      state.roomName = action.payload.roomName;
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
  },
});

export const { setRoomInfo, setRoomCondition, addMembers, removeMembers } =
  roomSlice.actions;
export const roomReducer = roomSlice.reducer;
