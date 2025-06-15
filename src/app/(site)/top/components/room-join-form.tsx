import { useCookieStore } from "@/components/cookie/useCookieValue";
import { setRoomName } from "@/reducers/room-reducer";
import { useAppDispatch } from "@/stores";
import { Button, Field, Input, Stack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { useForm } from "react-hook-form";

interface FormValues {
  userName: string;
  roomName: string;
}

const RoomJoinForm: FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const userNameCookie = useCookieStore("userName");

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isSubmitSuccessful, errors },
  } = useForm<FormValues>({
    defaultValues: {
      userName: userNameCookie.getValue(),
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    const body = { roomName: data.roomName };
    const res = await fetch("/api/room/exists", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (res.status === 200) {
      const { occupied } = await res.json();
      if (occupied) {
        userNameCookie.setValue(data.userName);
        dispatch(setRoomName(data.roomName));

        router.push("/matching");
      }
    }
  });

  return (
    <form onSubmit={onSubmit}>
      <Stack gap="4" align="flex-start" maxW="sm" width="100%">
        <Field.Root invalid={!!errors.userName} required>
          <Field.Label>ニックネーム</Field.Label>
          <Input {...register("userName")} />
          <Field.ErrorText>{errors.userName?.message}</Field.ErrorText>
        </Field.Root>

        <Field.Root invalid={!!errors.roomName} required>
          <Field.Label>あいことば</Field.Label>
          <Input {...register("roomName")} />
          <Field.ErrorText>{errors.roomName?.message}</Field.ErrorText>
        </Field.Root>

        <Button
          type="submit"
          loading={isSubmitting}
          loadingText="参加中..."
          width="100%"
          alignSelf="center"
        >
          参加
        </Button>
      </Stack>
    </form>
  );
};

export default RoomJoinForm;
