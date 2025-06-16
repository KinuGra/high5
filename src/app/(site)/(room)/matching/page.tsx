"use client";
import { type FC, useEffect } from "react";
import { useRouter } from "next/navigation";
import { RoomCondition } from "@/types/room-condition";
import { useAppSelector } from "@/stores";
import { GetIcon } from "@/components/icons";

const Matching: FC = () => {
  const { roomName, roomCondition, members, maxRound } = useAppSelector(
    (state) => state.roomInfo
  );
  const router = useRouter();

  useEffect(() => {
    if (roomCondition === RoomCondition.Progressing) {
      router.push("/question");
    }
  }, [roomCondition, router]);

  const onClick = async () => {
    try {
      const body = { roomName: roomName, maxRound: maxRound };
      const res = await fetch("/api/room/start", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        console.log("Room started successfully");
      }
    } catch (error) {
      console.error("Failed to start room:", error);
    }
  };

  return (
    <div className="matching-container">
      <style jsx>{`
        .matching-container {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
            sans-serif;
          min-height: 100vh;
          background: linear-gradient(
            135deg,
            #fdf2f8 0%,
            #fce7f3 50%,
            #f3e8ff 100%
          );
          position: relative;
          overflow: hidden;
          width: 100vw;
          margin: 0;
          padding: 0;
        }

        /* 歩いている人のアニメーション背景 */
        .walking-background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 0;
        }

        .walking-person {
          position: absolute;
          width: 60px;
          height: 80px;
          opacity: 0.1;
        }

        .person-body {
          position: relative;
          width: 100%;
          height: 100%;
        }

        .person-head {
          width: 20px;
          height: 20px;
          background: #4a5568;
          border-radius: 50%;
          margin: 0 auto 5px;
          animation: headBob 1s ease-in-out infinite;
        }

        .person-torso {
          width: 25px;
          height: 35px;
          background: #4a5568;
          margin: 0 auto 5px;
          border-radius: 5px;
        }

        .person-legs {
          position: relative;
          width: 100%;
          height: 20px;
        }

        .person-leg {
          position: absolute;
          width: 8px;
          height: 20px;
          background: #4a5568;
          border-radius: 4px;
          bottom: 0;
        }

        .person-leg.left {
          left: 20px;
          animation: leftLeg 1s ease-in-out infinite;
        }

        .person-leg.right {
          right: 20px;
          animation: rightLeg 1s ease-in-out infinite;
        }

        /* 歩行アニメーション */
        @keyframes headBob {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-2px);
          }
        }

        @keyframes leftLeg {
          0% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(20deg);
          }
          50% {
            transform: rotate(0deg);
          }
          75% {
            transform: rotate(-20deg);
          }
          100% {
            transform: rotate(0deg);
          }
        }

        @keyframes rightLeg {
          0% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(-20deg);
          }
          50% {
            transform: rotate(0deg);
          }
          75% {
            transform: rotate(20deg);
          }
          100% {
            transform: rotate(0deg);
          }
        }

        /* 移動アニメーション */
        @keyframes walkAcross {
          0% {
            transform: translateX(-100px);
          }
          100% {
            transform: translateX(calc(100vw + 100px));
          }
        }

        /* 赤色の人 */
        .person-1 .person-head,
        .person-1 .person-torso,
        .person-1 .person-leg {
          background: #dc2626;
        }

        .person-1 {
          top: 10%;
          animation: walkAcross 18s linear infinite;
          animation-delay: 0s;
          opacity: 0.4;
        }

        /* 青色の人 */
        .person-2 .person-head,
        .person-2 .person-torso,
        .person-2 .person-leg {
          background: #2563eb;
        }

        .person-2 {
          top: 25%;
          animation: walkAcross 32s linear infinite;
          animation-delay: -3s;
          opacity: 0.35;
        }

        /* 緑色の人 */
        .person-3 .person-head,
        .person-3 .person-torso,
        .person-3 .person-leg {
          background: #16a34a;
        }

        .person-3 {
          top: 40%;
          animation: walkAcross 15s linear infinite;
          animation-delay: -8s;
          opacity: 0.45;
        }

        /* 黄色の人 */
        .person-4 .person-head,
        .person-4 .person-torso,
        .person-4 .person-leg {
          background: #ca8a04;
        }

        .person-4 {
          top: 55%;
          animation: walkAcross 28s linear infinite;
          animation-delay: -12s;
          opacity: 0.3;
        }

        /* 茶色の人 */
        .person-5 .person-head,
        .person-5 .person-torso,
        .person-5 .person-leg {
          background: #92400e;
        }

        .person-5 {
          top: 70%;
          animation: walkAcross 22s linear infinite;
          animation-delay: -18s;
          opacity: 0.38;
        }

        /* 黒色の人 */
        .person-6 .person-head,
        .person-6 .person-torso,
        .person-6 .person-leg {
          background: #1f2937;
        }

        .person-6 {
          top: 85%;
          animation: walkAcross 35s linear infinite;
          animation-delay: -5s;
          opacity: 0.25;
        }

        /* ピンク色の人 */
        .person-7 .person-head,
        .person-7 .person-torso,
        .person-7 .person-leg {
          background: #ec4899;
        }

        .person-7 {
          top: 20%;
          animation: walkAcross 12s linear infinite;
          animation-delay: -15s;
          opacity: 0.42;
        }

        /* 水色の人 */
        .person-8 .person-head,
        .person-8 .person-torso,
        .person-8 .person-leg {
          background: #0891b2;
        }

        .person-8 {
          top: 65%;
          animation: walkAcross 26s linear infinite;
          animation-delay: -22s;
          opacity: 0.33;
        }

        /* メインコンテンツ */
        .main-content {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 40px;
          padding: 40px 16px 20px;
          max-width: 1200px;
          margin: 0 auto;
        }

        /* ヘッダー */
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          margin-bottom: 20px;
        }

        .top-link {
          font-size: 1rem;
          font-weight: 600;
          color: #374151;
          text-decoration: none;
        }

        .github-icon {
          width: 24px;
          height: 24px;
          fill: #374151;
        }

        /* ロゴセクション */
        .logo-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          margin-bottom: 20px;
        }

        .logo-container {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .logo-icon {
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 24px;
          font-weight: bold;
        }

        .logo-text {
          font-size: 2.5rem;
          font-weight: 800;
          background: linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .subtitle {
          font-size: 1.1rem;
          color: #6b7280;
          text-align: center;
          max-width: 600px;
        }

        /* カードコンテナ */
        .cards-container {
          display: flex;
          flex-direction: column;
          gap: 32px;
          width: 100%;
          max-width: 800px;
        }

        /* ルーム情報カード */
        .room-info-card {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(10px);
          border-radius: 24px;
          padding: 32px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          text-align: center;
        }

        .room-code-display {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 8px;
        }

        .room-code-value {
          font-size: 2rem;
          font-weight: 800;
          background: linear-gradient(135deg, #f59e0b 0%, #ec4899 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* メンバーカード */
        .members-card {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(10px);
          border-radius: 24px;
          padding: 32px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .members-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1f2937;
          text-align: center;
          margin-bottom: 24px;
        }

        .members-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
          max-height: 300px;
          overflow-y: auto;
        }

        .member-slot {
          display: flex;
        }

        .member-icon {
          align-content: center;
        }

        .member-item {
          background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
          color: #1f2937;
          padding: 16px 20px;
          border-radius: 16px;
          font-weight: 600;
          text-align: center;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          width: 80%;
        }

        .member-item::before {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.3),
            transparent
          );
          transition: left 0.5s ease;
        }

        .member-item:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
        }

        .member-item:hover::before {
          left: 100%;
        }

        /* スタートボタン */
        .start-button-container {
          display: flex;
          justify-content: center;
          margin-top: 20px;
        }

        .start-button {
          background: linear-gradient(135deg, #ec4899 0%, #be185d 100%);
          color: white;
          border: none;
          padding: 18px 48px;
          font-size: 1.25rem;
          font-weight: 700;
          border-radius: 20px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 8px 24px rgba(236, 72, 153, 0.3);
          text-transform: none;
          letter-spacing: 0.5px;
          position: relative;
          overflow: hidden;
        }

        .start-button::before {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.2),
            transparent
          );
          transition: left 0.5s ease;
        }

        .start-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 32px rgba(236, 72, 153, 0.4);
        }

        .start-button:hover::before {
          left: 100%;
        }

        .start-button:active {
          transform: translateY(-1px);
        }

        /* レスポンシブデザイン */
        @media (max-width: 768px) {
          .matching-container {
            padding: 16px 12px;
          }

          .logo-text {
            font-size: 2rem;
          }

          .logo-icon {
            width: 50px;
            height: 50px;
            font-size: 20px;
          }

          .room-info-card,
          .members-card {
            padding: 24px;
          }

          .members-grid {
            grid-template-columns: 1fr;
          }

          .walking-person {
            width: 40px;
            height: 60px;
          }

          .person-head {
            width: 15px;
            height: 15px;
          }

          .person-torso {
            width: 20px;
            height: 25px;
          }

          .person-leg {
            width: 6px;
            height: 15px;
          }
        }

        @media (max-width: 480px) {
          .logo-text {
            font-size: 1.75rem;
          }

          .subtitle {
            font-size: 1rem;
          }

          .start-button {
            padding: 16px 36px;
            font-size: 1.125rem;
          }

          .walking-person {
            width: 35px;
            height: 50px;
          }
        }
      `}</style>

      {/* 歩いている人のアニメーション背景 */}
      <div className="walking-background">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
          <div key={num} className={`walking-person person-${num}`}>
            <div className="person-body">
              <div className="person-head"></div>
              <div className="person-torso"></div>
              <div className="person-legs">
                <div className="person-leg left"></div>
                <div className="person-leg right"></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* メインコンテンツ */}
      <div className="main-content">
        {/* ヘッダー */}
        <div className="header">
          <a href="#" className="top-link">
            TOP
          </a>
          <svg className="github-icon" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
        </div>

        {/* ロゴセクション */}
        <div className="logo-section">
          <div className="logo-container">
            <div className="logo-icon">👥</div>
            <h1 className="logo-text">High5</h1>
          </div>
          <p className="subtitle">
            みんなで回答を推測しあって、アイスブレイクを楽しみましょう
          </p>
        </div>

        {/* カードコンテナ */}
        <div className="cards-container">
          {/* ルーム情報カード */}
          <div className="room-info-card">
            <div className="room-code-display">部屋のあいことば</div>
            <div className="room-code-value">{roomName}</div>
          </div>

          {/* メンバーカード */}
          <div className="members-card">
            <h2 className="members-title">参加メンバー</h2>
            <div className="members-grid">
              {members.map((member, index) => (
                <div key={index} className="member-slot">
                  <div className="member-icon">
                    {GetIcon(member.userIcon, {})}
                  </div>
                  <div className="member-item">{member.userName}</div>
                </div>
              ))}
            </div>
          </div>

          {/* スタートボタン */}
          {maxRound && (
            <div className="start-button-container">
              <button className="start-button" onClick={onClick}>
                ゲームを開始する
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Matching;
