"use client";
import { useAppSelector } from "@/stores";
import { useRouter } from "next/navigation";
import { FC, Suspense, useEffect, useState } from "react";
import QuestionAnswerForm from "./components/question-answer-form";
import { Rings } from "react-loader-spinner";
import { Container, Box, Center, Text } from "@chakra-ui/react";

const Question: FC = () => {
  const { members, currentRound, maxRound } = useAppSelector(
    (state) => state.roomInfo
  );
  const { answers } = useAppSelector((state) => state.answers);
  const { guesses } = useAppSelector((state) => state.guesses);
  const { scores } = useAppSelector((state) => state.score);
  const { currentGuessTurn } = useAppSelector((state) => state.guessIncrement);
  const [isWaiting, setIsWaiting] = useState<boolean>(false);
  const router = useRouter();

  // useEffect(() => {
  //   console.log("members");
  //   console.log("%o", members);
  //   console.log("answers");
  //   console.log("%o", answers);
  //   console.log("guesses");
  //   console.log("%o", guesses);
  //   console.log("scores");
  //   console.log("%o", scores);
  //   console.log("currentGuessTurn");
  //   console.log("%o", currentGuessTurn);
  //   console.log("currentRound");
  //   console.log("%o", currentRound);
  //   console.log("maxRound");
  //   console.log("%o", maxRound);
  // }, []);

  useEffect(() => {
    if (answers.length >= members.length) {
      console.log("to guess");
      router.push("/guess");
    }
  }, [answers]);

  return (
    <Suspense fallback={<p>...loading</p>}>
      {!isWaiting && (
        <QuestionAnswerForm
          setIsWaiting={setIsWaiting}
          membersCount={members.length}
          answersCount={answers.length}
        />
      )}
      {isWaiting && (
        <Container>
          <Box h="100vh">
            <Center h="100%">
              <Rings />
              <Text>皆の回答待ち</Text>
            </Center>
          </Box>
        </Container>
      )}
    </Suspense>
  );
};

export default Question;
