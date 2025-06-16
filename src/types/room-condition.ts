export const RoomCondition = {
  Matching: 0,
  Progressing: 1,
  End: 2,
} as const;

export type RoomCondition = (typeof RoomCondition)[keyof typeof RoomCondition];
