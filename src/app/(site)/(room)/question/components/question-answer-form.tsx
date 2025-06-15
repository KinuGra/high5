"use client";

import {
  type Dispatch,
  type FC,
  type SetStateAction,
  useState,
  useEffect,
  Suspense,
} from "react";
import { useForm, Controller } from "react-hook-form";
import { useAppSelector } from "@/stores";
import "./question-answer-form.css";

export type QuestionData = {
  question: string;
  choices: string[];
};

type QuestionAnswerFormProps = {
  membersCount: number;
  answersCount: number;
  setIsWaiting: Dispatch<SetStateAction<boolean>>;
};

interface FormValues {
  answer: string;
}

const QuestionAnswerFormContent: FC<QuestionAnswerFormProps> = ({
  membersCount,
  answersCount,
  setIsWaiting,
}) => {
  const [questionData, setQuestionData] = useState<QuestionData | null>(null);
  const { userName, roomName } = useAppSelector((state) => state.roomInfo);
  const answerRate = Math.round((answersCount / membersCount) * 100) || 0;

  useEffect(() => {
    const fetchQuestionData = async () => {
      try {
        const res = await fetch("/api/question", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        setQuestionData(data);
      } catch (error) {
        console.error("Failed to fetch question data:", error);
      }
    };

    fetchQuestionData();
  }, []);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = handleSubmit(async (formData) => {
    const otherInfo = {
      roomName: roomName,
      userName: userName,
      question: questionData?.question,
      choices: questionData?.choices,
    };

    const data = { ...otherInfo, ...formData };
    console.log("回答送信");
    console.log("%o", data);

    setIsWaiting(true);

    await fetch("/api/answer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  });

  if (!questionData) {
    return <div className="loading">質問を読み込み中...</div>;
  }

  return (
    <div className="page-container">
      <div className="container">
        <div className="user-question-banner">
          <span className="user-name">{userName}</span>
          <span className="question-for">さんへの質問です</span>
        </div>

        <div className="question-header">
          <div className="question-icon">Q</div>
          <h2 className="question-title">{questionData.question}</h2>
        </div>

        <form onSubmit={onSubmit} className="question-form">
          <fieldset
            className={`form-fieldset ${errors.answer ? "invalid" : ""}`}
          >
            <Controller
              name="answer"
              control={control}
              defaultValue={questionData.choices[0]}
              render={({ field }) => (
                <div className="radio-group">
                  <div className="radio-stack">
                    {questionData.choices.map((choice, index) => (
                      <label key={choice} className="radio-item">
                        <input
                          type="radio"
                          name={field.name}
                          value={choice}
                          checked={field.value === choice}
                          onChange={() => field.onChange(choice)}
                          onBlur={field.onBlur}
                          className="radio-input"
                        />
                        <span className="radio-indicator"></span>
                        <span className="radio-text">{choice}</span>
                        {field.value === choice && (
                          <span className="radio-item-bg"></span>
                        )}
                      </label>
                    ))}
                  </div>
                </div>
              )}
            />

            {errors.answer && (
              <div className="error-text">{errors.answer?.message}</div>
            )}

            <button type="submit" className="submit-button">
              回答する
            </button>
          </fieldset>
        </form>

        <div className="progress-container">
          <div className="progress-stats">
            <div className="progress-numbers">
              <span className="answers-count">{answersCount}</span>
              <span className="members-divider">/</span>
              <span className="members-count">{membersCount}</span>
              <span className="progress-label">人が回答済み</span>
            </div>
            <div className="progress-percentage">{answerRate}%</div>
          </div>
          <div className="progress-bar-container">
            <div
              className="progress-bar"
              style={{ width: `${answerRate}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const QuestionAnswerForm: FC<QuestionAnswerFormProps> = (props) => {
  return (
    <Suspense fallback={<div className="loading">読み込み中...</div>}>
      <QuestionAnswerFormContent {...props} />
    </Suspense>
  );
};

export default QuestionAnswerForm;
