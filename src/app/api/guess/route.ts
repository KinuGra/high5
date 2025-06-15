import { getPusherInstance } from "@/libs/pusher/server";
const pusherServer = getPusherInstance();

export type GuessData = {
  userName: string;
  userIcon: string;
  guess: string;
};

export type GuessPostData = {
  currentGuessTurn: number;
  guessData: GuessData;
};

export async function POST(req: Request) {
  const { roomName, currentGuessTurn, userName, userIcon, guess } =
    await req.json();
  const guessData: GuessData = {
    userName: userName,
    userIcon: userIcon,
    guess: guess,
  };

  try {
    await pusherServer.trigger(`private-${roomName}`, "evt::guessed", {
      currentGuessTurn,
      guessData,
    } as GuessPostData);

    return Response.json({ message: "ok" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json(
      { message: "Failed to test sockets", error: error },
      { status: 500 }
    );
  }
}
