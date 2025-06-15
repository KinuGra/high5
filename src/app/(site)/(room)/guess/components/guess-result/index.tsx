"use client";

import { MouseEventHandler, useEffect, useRef } from "react";
import "./styles.css";
import { GuessData } from "@/app/api/guess/route";
import { GetIcon } from "@/components/icons";

interface GuessResultProps {
  answerUserName: string;
  question: string;
  guesses: GuessData[];
  userAnswer: string;
  enableNextButton: boolean;
  animationKey: number;
  handleClick: MouseEventHandler<HTMLButtonElement>;
}

export default function GuessResult({
  answerUserName,
  question,
  guesses,
  userAnswer,
  enableNextButton,
  animationKey,
  handleClick,
}: GuessResultProps) {
  const answerRef = useRef<HTMLDivElement>(null);
  const sparkleIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // キラキラエフェクトを作成する関数
  const createSparkle = () => {
    if (!answerRef.current) return;

    const answerElement = answerRef.current;
    const rect = answerElement.getBoundingClientRect();

    // 新しいキラキラを作成
    const sparkle = document.createElement("div");
    sparkle.className = "sparkle";

    // キラキラの位置をランダムに設定（回答の周囲）
    const x = rect.left + Math.random() * rect.width;
    const y = rect.top + Math.random() * rect.height;

    // キラキラのスタイルを設定
    sparkle.style.left = `${x}px`;
    sparkle.style.top = `${y}px`;
    sparkle.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 75%)`;
    sparkle.style.width = `${3 + Math.random() * 5}px`;
    sparkle.style.height = sparkle.style.width;
    sparkle.style.animation = `sparkle ${0.5 + Math.random() * 1}s linear`;

    document.body.appendChild(sparkle);

    // アニメーション終了後に要素を削除
    setTimeout(() => {
      sparkle.remove();
    }, 1500);
  };

  // 星を作成する関数
  const createStar = () => {
    if (!answerRef.current) return;

    const answerElement = answerRef.current;
    const rect = answerElement.getBoundingClientRect();

    // 新しい星を作成
    const star = document.createElement("div");
    star.className = "star";

    // 星の位置を設定（回答の下部から出現）
    const x = rect.left + Math.random() * rect.width;
    const y = rect.bottom - 5;

    // 星のスタイルを設定
    star.style.left = `${x}px`;
    star.style.top = `${y}px`;
    star.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 70%)`;
    star.style.animation = `starFloat ${1 + Math.random() * 2}s ease-out`;

    document.body.appendChild(star);

    // アニメーション終了後に要素を削除
    setTimeout(() => {
      star.remove();
    }, 3000);
  };

  // コンポーネントがマウントされたときにエフェクトを開始
  useEffect(() => {
    // キラキラエフェクトを定期的に作成
    sparkleIntervalRef.current = setInterval(() => {
      for (let i = 0; i < 2; i++) {
        createSparkle();
      }
    }, 300);

    // 星のエフェクトを定期的に作成
    const starInterval = setInterval(() => {
      createStar();
    }, 500);

    // クリーンアップ関数
    return () => {
      if (sparkleIntervalRef.current) {
        clearInterval(sparkleIntervalRef.current);
      }
      clearInterval(starInterval);
    };
  }, [answerUserName, userAnswer]);

  return (
    <div className="container">
      <div className="result-card">
        <div className="user-result">
          <h2 className="username-label">{answerUserName}さんの結果</h2>
        </div>

        <div className="question-header">
          <div className="question-icon">Q</div>
          <h2 className="question-title">{question}</h2>
        </div>
        <div className="guesses-section">
          <h3 className="section-title">みんなの推測</h3>
          <div className="guesses-list" key={animationKey}>
            {guesses.map((guess, index) => (
              <div
                key={index}
                className="guess-item"
                style={{
                  animationDelay: `${index * 0.15}s`, // 各アイテムに遅延を追加
                }}
              >
                <div className="guess-content">
                  <div className="guess-text">{guess.guess}</div>
                  <div className="guess-author">
                    <div className="guess-author-by">by</div>
                    <div className="guess-author-icon">
                      {GetIcon(guess?.userIcon, { width: 24 })}
                    </div>
                    <div>{guess.userName}さん</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="answer-section">
          <h3 className="section-title">{answerUserName}さんの回答</h3>
          <div className="answer" ref={answerRef}>
            {userAnswer}
          </div>
        </div>

        {enableNextButton && (
          <button className="next-button" onClick={handleClick}>
            次へ
          </button>
        )}
      </div>
    </div>
  );
}
