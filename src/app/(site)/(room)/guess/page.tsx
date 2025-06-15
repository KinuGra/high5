"use client";

import { useAppSelector } from "@/stores";
import { FC, useEffect, useState } from "react";
import GuessForm from "./components/guess-form";
import { Container } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import GuessResult from "./components/guess-result";

const Guess: FC = () => {
  const { userName, roomName, members } = useAppSelector(
    (state) => state.roomInfo
  );
  const { answers } = useAppSelector((state) => state.answers);
  const { guesses } = useAppSelector((state) => state.guesses);
  const { currentGuessTurn } = useAppSelector((state) => state.guessIncrement);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [enableNextButton, setEnableNextButton] = useState<boolean>(false);
  const router = useRouter();
  const [animationKey, setAnimationKey] = useState<number>(0); // アニメーションをリセットするためのキー

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
    setEnableNextButton(false);
    if (answers[currentGuessTurn].userName === userName) {
      setShowResult(true);
    } else {
      setShowResult(false);
    }
  }, [currentGuessTurn]);

  const handleClick = async () => {
    if (currentGuessTurn >= members.length - 1) {
      router.push("/result");
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
    setEnableNextButton(false);
    setShowResult(false);
  };

  return (
    <>
      {!showResult && (
        <Container>
          <GuessForm
            answerUserName={answers[currentGuessTurn].userName}
            question={answers[currentGuessTurn].question}
            choices={answers[currentGuessTurn].choices}
            answer={answers[currentGuessTurn].answer}
            showResult={showResult}
            currentGuessTurn={currentGuessTurn}
          />
        </Container>
      )}
      {showResult && (
        <GuessResult
          answerUserName={answers[currentGuessTurn].userName}
          question={answers[currentGuessTurn].question}
          guesses={guesses[currentGuessTurn] ?? []}
          userAnswer={answers[currentGuessTurn].answer}
          enableNextButton={enableNextButton}
          animationKey={animationKey}
          handleClick={handleClick}
        />
      )}
    </>
  );
};

export default Guess;
