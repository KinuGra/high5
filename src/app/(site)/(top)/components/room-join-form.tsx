import { setRoomInfo } from "@/reducers/room-reducer";
import { useAppDispatch, useAppSelector } from "@/stores";
import { Button, Field, Input, Stack, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import IconSelector from "./icon-selector";
import { RoomCondition } from "@/types/room-condition";

interface FormValues {
  userName: string;
  userIcon: string;
  roomName: string;
}

const RoomJoinForm: FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { userName } = useAppSelector((state) => state.roomInfo);

  const {
    control,
    register,
    handleSubmit,
    formState: { isSubmitting, isSubmitSuccessful, errors },
  } = useForm<FormValues>({
    defaultValues: {
      userName: userName,
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
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
        const roomInfo = {
          userName: data.userName,
          userIcon: data.userIcon,
          roomName: data.roomName,
          roomCondition: RoomCondition.Matching,
          members: [],
          currentRound: 0, // 初期値を追加
          maxRound: 0, // 初期値を追加
        };

        dispatch(setRoomInfo(roomInfo));

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
          <Text color={"red"} textStyle={"sm"}>
            *ルーム内のニックネームは重複させないでください
          </Text>
          <Field.ErrorText>{errors.userName?.message}</Field.ErrorText>
        </Field.Root>

        <Field.Root invalid={!!errors.userIcon} required>
          <Field.Label>アイコン</Field.Label>
          <Controller
            name="userIcon"
            control={control}
            defaultValue="apple"
            render={({ field }) => (
              <IconSelector
                onChange={(value) => field.onChange(value[0] || "")}
              />
            )}
          />
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
