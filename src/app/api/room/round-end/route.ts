import { getPusherInstance } from "@/libs/pusher/server";
import { IGuessState } from "@/reducers/guess-reducer";
const pusherServer = getPusherInstance();

export async function POST(req: Request) {
  const { roomName, guesses } = await req.json();

  try {
    await pusherServer.trigger(`private-${roomName}`, "evt::roundEnd", {
      guesses,
    } as IGuessState);

    return Response.json({ message: "ok" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json(
      { message: "Failed to test sockets", error: error },
      { status: 500 }
    );
  }
}
