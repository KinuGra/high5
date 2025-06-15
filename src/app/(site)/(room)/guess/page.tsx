"use client";

import { useAppSelector } from "@/stores";
import { FC, useEffect, useState } from "react";
import GuessForm from "./components/guess-form";
import { Container } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import GuessResult from "./components/guess-result";
import { useCookieStore } from "@/components/cookie/useCookieValue";

const Guess: FC = () => {
  const { roomName, members } = useAppSelector((state) => state.roomInfo);
  const { answers } = useAppSelector((state) => state.answers);
  const { guesses } = useAppSelector((state) => state.guesses);
  const { currentShowenAnswerIndex } = useAppSelector(
    (state) => state.guessIncrement
  );
  const [showResult, setShowResult] = useState<boolean>(false);
  const [enableNextButton, setEnableNextButton] = useState<boolean>(false);
  const userName = useCookieStore("userName").getValue();
  const router = useRouter();
  const [animationKey, setAnimationKey] = useState<number>(0); // アニメーションをリセットするためのキー

  useEffect(() => {
    if (guesses.length >= members.length - 1) {
      setEnableNextButton(true);
      setShowResult(true);
    }
  }, [guesses]);

  useEffect(() => {
    setEnableNextButton(false);
    if (answers[currentShowenAnswerIndex].userName === userName) {
      setShowResult(true);
    } else {
      setShowResult(false);
    }
  }, [currentShowenAnswerIndex]);

  const handleClick = async () => {
    if (currentShowenAnswerIndex >= members.length - 1) {
      router.push("/result");
      return;
    }

    const body = { roomName: roomName, prevIndex: currentShowenAnswerIndex };
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
            answerUserName={answers[currentShowenAnswerIndex].userName}
            question={answers[currentShowenAnswerIndex].question}
            choices={answers[currentShowenAnswerIndex].choices}
            showResult={showResult}
          />
        </Container>
      )}
      {showResult && (
        <GuessResult
          answerUserName={answers[currentShowenAnswerIndex].userName}
          guesses={guesses}
          userAnswer={answers[currentShowenAnswerIndex].answer}
          enableNextButton={enableNextButton}
          animationKey={animationKey}
          handleClick={handleClick}
        />
      )}
    </>
  );
};

export default Guess;
