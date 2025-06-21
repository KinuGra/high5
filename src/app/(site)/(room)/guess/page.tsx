"use client";

import { useAppDispatch, useAppSelector } from "@/stores";
import { FC, useEffect, useState } from "react";
import GuessForm from "./components/guess-form";
import { Box, Center, Container, Text } from "@chakra-ui/react";
import { redirect, useRouter } from "next/navigation";
import GuessResult from "./components/guess-result";
import { resetAnswers } from "@/reducers/answer-reducer";
import { resetGuessTurn } from "@/reducers/guess-increment-reducer";
import { setRoomCondition } from "@/reducers/room-reducer";
import { RoomCondition } from "@/types/room-condition";
import { Rings } from "react-loader-spinner";

const Guess: FC = () => {
  const { userName, roomName, members, currentRound, maxRound, roomCondition } =
    useAppSelector((state) => state.roomInfo);
  const { answers } = useAppSelector((state) => state.answers);
  const { guesses } = useAppSelector((state) => state.guesses);
  const { currentGuessTurn } = useAppSelector((state) => state.guessIncrement);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [enableNextButton, setEnableNextButton] = useState<boolean>(false);
  const router = useRouter();
  const [animationKey, setAnimationKey] = useState<number>(0); // アニメーションをリセットするためのキー
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isWaiting, setIsWaiting] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (roomCondition != RoomCondition.Progressing) {
      redirect("/");
    }
    if (currentGuessTurn < members.length - 1) return;
    if (currentRound > maxRound) {
      dispatch(setRoomCondition(RoomCondition.End));
      router.push("/result");
    } else {
      console.log("to question");

      dispatch(resetAnswers());
      dispatch(resetGuessTurn());
      router.push("/question");
    }
  }, [currentRound]);

  useEffect(() => {
    if (
      Object.keys(guesses).length > 0 &&
      guesses[currentGuessTurn].length >= members.length - 1
    ) {
      setEnableNextButton(true);
      setShowResult(true);
    }
  }, [guesses]);

  useEffect(() => {
    setIsWaiting(false);
    setIsLoading(false);
    setEnableNextButton(false);
    if (answers.length > 0 && answers[currentGuessTurn].userName === userName) {
      setShowResult(true);
    } else {
      setShowResult(false);
    }
  }, [currentGuessTurn]);

  const handleClick = async () => {
    setIsLoading(true);
    if (currentGuessTurn >= members.length - 1) {
      const body = { roomName: roomName, guesses: guesses };
      await fetch("/api/room/round-end", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      return;
    }

    const body = { roomName: roomName, prevTurn: currentGuessTurn };
    await fetch("/api/guess/increment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    setAnimationKey((prev) => prev + 1); // アニメーションをリセット
  };

  return (
    <>
      {currentRound}/{maxRound}
      {!showResult && answers.length > 0 && !isWaiting && (
        <Container>
          <GuessForm
            answerUserName={answers[currentGuessTurn].userName}
            question={answers[currentGuessTurn].question}
            choices={answers[currentGuessTurn].choices}
            answer={answers[currentGuessTurn].answer}
            showResult={showResult}
            currentGuessTurn={currentGuessTurn}
            setIsWaiting={setIsWaiting}
          />
        </Container>
      )}
      {!showResult && answers.length > 0 && isWaiting && (
        <Container>
          <Box h="100vh">
            <Center h="100%">
              <Rings />
              <Text>皆の推測待ち</Text>
            </Center>
          </Box>
        </Container>
      )}
      {showResult && answers.length > 0 && (
        <GuessResult
          answerUserName={answers[currentGuessTurn].userName}
          question={answers[currentGuessTurn].question}
          guesses={guesses[currentGuessTurn] ?? []}
          userAnswer={answers[currentGuessTurn].answer}
          enableNextButton={enableNextButton}
          animationKey={animationKey}
          handleClick={handleClick}
          isLoading={isLoading}
        />
      )}
    </>
  );
};

export default Guess;
