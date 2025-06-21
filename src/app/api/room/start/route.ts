import { getPusherInstance } from "@/libs/pusher/server";
const pusherServer = getPusherInstance();

export async function POST(req: Request) {
  const { roomName, maxRound } = await req.json();

  try {
    await pusherServer.trigger(
      `private-${roomName}`,
      "evt::start",
      maxRound as number
    );

    return Response.json({ message: "ok" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json(
      { message: "Failed to test sockets", error: error },
      { status: 500 }
    );
  }
}
