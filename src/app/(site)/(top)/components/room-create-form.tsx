import { IRoomState, setRoomInfo } from "@/reducers/room-reducer";
import { useAppDispatch, useAppSelector } from "@/stores";
import {
  Button,
  createListCollection,
  Field,
  Input,
  Portal,
  Select,
  Stack,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import { createUniqueRoomId } from "src/features/createRoomId";
import IconSelector from "./icon-selector";
import { RoomCondition } from "@/types/room-condition";

interface FormValues {
  userName: string;
  userIcon: string;
  maxRound: string[];
}

const maxRoundOptions = createListCollection({
  items: [
    { label: "1", value: "1" },
    { label: "2", value: "2" },
    { label: "3", value: "3" },
    { label: "4", value: "4" },
    { label: "5", value: "5" },
  ],
});

const RoomCreateForm: FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
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
    console.log(data.maxRound);
    // ルーム名を重複しないように自動生成
    const roomId = await createUniqueRoomId();
    const roomInfo: IRoomState = {
      userName: data.userName,
      userIcon: data.userIcon,
      roomName: roomId,
      roomCondition: RoomCondition.Matching,
      members: [],
      currentRound: 0,
      maxRound: parseInt(data.maxRound[0]),
    };

    dispatch(setRoomInfo(roomInfo));

    router.push("/matching");
  });

  return (
    <form onSubmit={onSubmit}>
      <Stack gap="4" align="flex-start" maxW="sm" width="100%">
        <Field.Root invalid={!!errors.userName} required>
          <Field.Label>ニックネーム</Field.Label>
          <Input {...register("userName")} />
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
        <Field.Root invalid={!!errors.maxRound} required>
          <Field.Label>ラウンド数</Field.Label>

          <Controller
            name="maxRound"
            control={control}
            defaultValue={["2"]}
            render={({ field }) => (
              <Select.Root
                name={field.name}
                defaultValue={["2"]}
                onValueChange={({ value }) => field.onChange(value)}
                onInteractOutside={() => field.onBlur()}
                collection={maxRoundOptions}
              >
                <Select.Control>
                  <Select.Trigger>
                    <Select.ValueText />
                  </Select.Trigger>
                  <Select.IndicatorGroup>
                    <Select.Indicator />
                  </Select.IndicatorGroup>
                </Select.Control>
                <Portal>
                  <Select.Positioner>
                    <Select.Content>
                      {maxRoundOptions.items.map((option) => (
                        <Select.Item item={option} key={option.value}>
                          {option.label}
                          <Select.ItemIndicator />
                        </Select.Item>
                      ))}
                    </Select.Content>
                  </Select.Positioner>
                </Portal>
              </Select.Root>
            )}
          />
        </Field.Root>

        <Button
          type="submit"
          loading={isSubmitting}
          loadingText="作成中..."
          width="100%"
          alignSelf="center"
        >
          作成
        </Button>
      </Stack>
    </form>
  );
};

export default RoomCreateForm;
