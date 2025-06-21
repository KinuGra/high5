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
      <style jsx>
        {`
          body {
            margin: 0;
            padding: 0;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
              Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
              sans-serif;
            background: linear-gradient(135deg, #f9f0ff, #fff0f8);
            min-height: 100vh;
            position: relative;
            overflow-x: hidden;
          }

          /* 背景の？マーク */
          body::before,
          body::after {
            content: "?";
            position: fixed;
            font-weight: bold;
            color: rgba(255, 102, 196, 0.1);
            z-index: -1;
            animation: float 15s infinite ease-in-out;
          }

          body::before {
            top: 10%;
            left: 5%;
            font-size: 180px;
            transform: rotate(-15deg);
            animation-delay: 0s;
          }

          body::after {
            bottom: 5%;
            right: 5%;
            font-size: 220px;
            transform: rotate(10deg);
            animation-delay: -7s;
          }

          @keyframes float {
            0%,
            100% {
              transform: translateY(0) rotate(var(--rotation, 0deg));
            }
            50% {
              transform: translateY(-20px) rotate(var(--rotation, 0deg));
            }
          }

          .page-container {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            padding: 20px;
          }

          /* 追加の？マーク */
          .page-container::before,
          .page-container::after {
            content: "?";
            position: absolute;
            font-weight: bold;
            color: rgba(255, 102, 196, 0.1);
            z-index: 0;
            animation: float 15s infinite ease-in-out;
          }

          .page-container::before {
            top: 30%;
            left: 80%;
            font-size: 120px;
            transform: rotate(25deg);
            animation-delay: -3s;
          }

          .page-container::after {
            bottom: 20%;
            left: 10%;
            font-size: 150px;
            transform: rotate(-5deg);
            animation-delay: -10s;
          }

          /* コンテナスタイル */
          .container {
            max-width: 500px;
            width: 100%;
            margin: 0 auto;
            padding: 30px;
            border-radius: 16px;
            position: relative;
            overflow: hidden;
            z-index: 1;
            backdrop-filter: blur(5px);
            background-color: rgba(255, 255, 255, 0.4);
            box-shadow: 0 8px 32px rgba(255, 102, 196, 0.15);
          }

          @keyframes float {
            0%,
            100% {
              transform: translateY(0) rotate(var(--rotation, 0deg));
            }
            50% {
              transform: translateY(-20px) rotate(var(--rotation, 0deg));
            }
          }

          /* 進捗表示のスタイル */
          .progress-container {
            background-color: rgba(255, 255, 255, 0.7);
            border-radius: 12px;
            padding: 15px;
            margin-top: 20px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
          }

          .progress-stats {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 8px;
          }

          .progress-numbers {
            display: flex;
            align-items: baseline;
          }

          .answers-count {
            font-size: 24px;
            font-weight: 700;
            color: #ff66c4;
          }

          .members-divider {
            font-size: 20px;
            margin: 0 2px;
            color: #666;
          }

          .members-count {
            font-size: 20px;
            font-weight: 600;
            color: #666;
          }

          .progress-label {
            font-size: 14px;
            color: #666;
            margin-left: 5px;
          }

          .progress-percentage {
            font-size: 18px;
            font-weight: 700;
            color: #ff66c4;
            background: -webkit-linear-gradient(#ff66c4, #ff9a5f);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }

          .progress-bar-container {
            height: 8px;
            background-color: rgba(255, 230, 246, 0.5);
            border-radius: 4px;
            overflow: hidden;
          }

          .progress-bar {
            height: 100%;
            background: linear-gradient(to right, #ff66c4, #ff9a5f);
            border-radius: 4px;
            transition: width 0.5s ease-in-out;
            animation: pulse-bar 2s infinite;
          }

          @keyframes pulse-bar {
            0%,
            100% {
              opacity: 1;
            }
            50% {
              opacity: 0.8;
            }
          }

          /* ユーザー質問バナー */
          .user-question-banner {
            background: linear-gradient(
              to right,
              rgba(255, 102, 196, 0.8),
              rgba(255, 154, 95, 0.8)
            );
            color: white;
            padding: 10px 15px;
            border-radius: 30px;
            margin-bottom: 20px;
            display: inline-block;
            font-size: 16px;
            box-shadow: 0 4px 10px rgba(255, 102, 196, 0.3);
            position: relative;
            transform: translateY(0);
            animation: float-banner 3s infinite ease-in-out;
          }

          @keyframes float-banner {
            0%,
            100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-5px);
            }
          }

          .user-question-banner::after {
            content: "";
            position: absolute;
            bottom: -8px;
            left: 20px;
            width: 0;
            height: 0;
            border-left: 8px solid transparent;
            border-right: 8px solid transparent;
            border-top: 8px solid rgba(255, 102, 196, 0.8);
          }

          .user-name {
            font-weight: 700;
            font-size: 18px;
            text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
            margin-right: 2px;
          }

          .question-for {
            font-weight: 500;
          }

          /* 質問ヘッダーのスタイル */
          .question-header {
            display: flex;
            align-items: center;
            margin-bottom: 25px;
            position: relative;
            padding-bottom: 15px;
            animation: fadeIn 0.6s ease-out;
          }

          .question-header::after {
            content: "";
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 2px;
            background: linear-gradient(
              to right,
              #ff66c4,
              #ff9a5f,
              transparent
            );
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          /* 質問アイコン */
          .question-icon {
            width: 40px;
            height: 40px;
            background: linear-gradient(135deg, #ff66c4, #ff9a5f);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 24px;
            font-weight: bold;
            margin-right: 15px;
            box-shadow: 0 4px 10px rgba(255, 102, 196, 0.3);
            flex-shrink: 0;
          }

          /* 質問タイトル */
          .question-title {
            margin: 0;
            font-size: 22px;
            font-weight: 700;
            color: #333;
            line-height: 1.4;
            letter-spacing: 0.5px;
            position: relative;
            text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.8);
          }

          /* フォームスタイル */
          .question-form {
            width: 100%;
          }

          .form-fieldset {
            border: 2px solid rgba(255, 182, 232, 0.3);
            border-radius: 12px;
            padding: 20px;
            position: relative;
            background-color: rgba(255, 255, 255, 0.5);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          }

          .form-fieldset.invalid {
            border-color: #ff6b6b;
          }

          /* ラジオボタングループ */
          .radio-group {
            margin-bottom: 20px;
          }

          .radio-stack {
            display: flex;
            flex-direction: column;
            gap: 10px;
            width: 100%;
            margin: 0 auto;
          }

          /* 画像のようなラジオボタンスタイル */
          .radio-item {
            display: flex;
            align-items: center;
            cursor: pointer;
            padding: 12px 16px;
            border-radius: 8px;
            transition: all 0.2s ease;
            background-color: rgba(255, 230, 246, 0.3);
            border: 1px solid rgba(255, 182, 232, 0.3);
            position: relative;
            width: 100%;
          }

          .radio-item:hover {
            background-color: rgba(255, 230, 246, 0.5);
            border-color: rgba(255, 182, 232, 0.5);
          }

          /* 選択された状態のスタイル */
          .radio-input:checked ~ .radio-item-bg {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(to right, #ff66c4, #ff9a5f);
            z-index: -1;
            border-radius: 8px;
          }

          .radio-input {
            position: absolute;
            opacity: 0;
            cursor: pointer;
          }

          /* 円形のインジケーター */
          .radio-indicator {
            position: relative;
            display: inline-block;
            width: 24px;
            height: 24px;
            margin-right: 12px;
            border-radius: 50%;
            flex-shrink: 0;
            background-color: white;
            border: 2px solid rgba(255, 255, 255, 0.8);
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          }

          /* 選択時の内側の円 */
          .radio-input:checked + .radio-indicator:after {
            content: "";
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: linear-gradient(135deg, #ff66c4, #ff9a5f);
            animation: pulse 0.3s ease-out;
          }

          @keyframes pulse {
            0% {
              transform: translate(-50%, -50%) scale(0);
              opacity: 0;
            }
            50% {
              transform: translate(-50%, -50%) scale(1.2);
              opacity: 0.7;
            }
            100% {
              transform: translate(-50%, -50%) scale(1);
              opacity: 1;
            }
          }

          /* 選択されたテキスト */
          .radio-text {
            font-size: 16px;
            color: #333;
            transition: all 0.2s ease;
          }

          .radio-input:checked ~ .radio-text {
            color: white;
            font-weight: 500;
          }

          /* エラーテキスト */
          .error-text {
            color: #ff6b6b;
            font-size: 14px;
            margin-top: 5px;
            margin-bottom: 10px;
          }

          /* 送信ボタン */
          .submit-button {
            background: linear-gradient(to right, #ff66c4, #ff9a5f);
            color: white;
            border: none;
            border-radius: 25px;
            padding: 8px 24px;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 4px 10px rgba(255, 102, 196, 0.3);
            align-self: flex-start;
            display: block;
          }

          .submit-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 12px rgba(255, 102, 196, 0.4);
          }

          .submit-button:active {
            transform: translateY(0);
          }

          /* ローディング表示 */
          .loading {
            text-align: center;
            padding: 20px;
            color: #666;
            font-size: 16px;
            background-color: rgba(255, 255, 255, 0.7);
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          }
        `}
      </style>
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
