import { getPusherInstance } from "@/libs/pusher/server";

const pusherServer = getPusherInstance();

export async function POST(req: Request) {
  console.log(`authenticating pusher perms...`);
  const body = await req.formData();

  const socketId = body.get("socket_id") as string;
  const channelName = body.get("channel_name") as string;
  const user_id = body.get("userId") as string;
  const name = body.get("username") as string;
  const icon = body.get("usericon") as string;

  const user = {
    user_id: socketId,
    user_info: {
      name: name,
      icon: icon,
    },
  };

  const authResponse = pusherServer.authorizeChannel(
    socketId,
    channelName,
    user
  );

  return new Response(JSON.stringify(authResponse));
}
