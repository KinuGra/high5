import { getPusherInstance } from "@/libs/pusher/server";
const pusherServer = getPusherInstance();

export type GuessIncrementData = {
  prevTurn: number;
};

export async function POST(req: Request) {
  const { roomName, prevTurn } = await req.json();

  try {
    await pusherServer.trigger(`private-${roomName}`, "evt::guessIncrement", {
      prevTurn: prevTurn,
    } as GuessIncrementData);

    return Response.json({ message: "ok" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json(
      { message: "Failed to test sockets", error: error },
      { status: 500 }
    );
  }
}
