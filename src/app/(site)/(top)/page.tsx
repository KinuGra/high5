"use client";
import { type FC, useState } from "react";
import RoomCreateForm from "./components/room-create-form";
import RoomJoinForm from "./components/room-join-form";
import "./styles.css";

const Top: FC = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isJoinDialogOpen, setIsJoinDialogOpen] = useState(false);

  return (
    <div className="app-container">
      {/* IceBreakerロゴ */}
      <div className="icebreaker-logo-bg">
        <div className="icebreaker-logo">
          <div className="logo">
            <div className="logo-icon big">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                  fill="white"
                />
              </svg>
            </div>
            <h1 className="logo-text big">
              <span className="pink-text">High</span>
              <span className="purple-text">5</span>
            </h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="subtitle">
          みんなで回答を推測しあって、アイスブレイクを楽しみましょう
        </div>

        <div className="action-cards">
          {/* Create Room Card */}
          <div className="action-card">
            <div className="card-icon create-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" fill="white" />
              </svg>
            </div>
            <h3 className="card-title">ルーム作成</h3>
            <p className="card-description">
              新しいルームを作って、友達を招待しよう！
            </p>
            <div className="card-detail">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zM4 18v-4h3v4h2v-7.5c0-.83.67-1.5 1.5-1.5S12 9.67 12 10.5V11h2.5c.83 0 1.5.67 1.5 1.5V18h2v-5.5c0-1.1-.9-2-2-2H13v-.5c0-1.93-1.57-3.5-3.5-3.5S6 8.07 6 10v8h-2z"
                  fill="#666"
                />
              </svg>
              <span>最大8人まで参加可能</span>
            </div>
            <button
              className="action-button create-button"
              onClick={() => setIsCreateDialogOpen(true)}
            >
              ルームを作成する
            </button>
          </div>

          {/* Join Room Card */}
          <div className="action-card">
            <div className="card-icon join-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M9 5v2h6.59L4 18.59 5.41 20 17 8.41V15h2V5H9z"
                  fill="white"
                />
              </svg>
            </div>
            <h3 className="card-title">ルーム参加</h3>
            <p className="card-description">
              友達のルームに参加して、一緒に楽しもう！
            </p>
            <div className="card-detail">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  stroke="#666"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
              <span>ルームコードで簡単参加</span>
            </div>
            <button
              className="action-button join-button"
              onClick={() => setIsJoinDialogOpen(true)}
            >
              ルームに参加する
            </button>
          </div>
        </div>

        {/* Features */}
        <div className="features">
          <div className="feature">
            <div className="feature-icon heart-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                  fill="#E91E63"
                />
              </svg>
            </div>
            <h4 className="feature-title">楽しいゲーム</h4>
            <p className="feature-description">
              「ドラえもんのひみつ道具で一番欲しいのは？」みたいな問題にあの人が何て答えたか当ててみよう！
            </p>
          </div>

          <div className="feature">
            <div className="feature-icon users-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  fill="#2196F3"
                />
              </svg>
            </div>
            <h4 className="feature-title">新しい出会い</h4>
            <p className="feature-description">自然な会話で素敵なつながりを</p>
          </div>

          <div className="feature">
            <div className="feature-icon bolt-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M13 10V3L4 14h7v7l9-11h-7z" fill="#4CAF50" />
              </svg>
            </div>
            <h4 className="feature-title">簡単操作</h4>
            <p className="feature-description">誰でも簡単に始められる</p>
          </div>
        </div>
      </div>

      {/* Create Room Dialog */}
      {isCreateDialogOpen && (
        <div
          className="dialog-overlay"
          onClick={() => setIsCreateDialogOpen(false)}
        >
          <div className="dialog-content" onClick={(e) => e.stopPropagation()}>
            <div className="dialog-header">
              <h2 className="dialog-title">ルーム作成</h2>
              <button
                className="close-button"
                onClick={() => setIsCreateDialogOpen(false)}
              >
                ✕
              </button>
            </div>
            <div className="dialog-body">
              <RoomCreateForm />
            </div>
          </div>
        </div>
      )}

      {/* Join Room Dialog */}
      {isJoinDialogOpen && (
        <div
          className="dialog-overlay"
          onClick={() => setIsJoinDialogOpen(false)}
        >
          <div className="dialog-content" onClick={(e) => e.stopPropagation()}>
            <div className="dialog-header">
              <h2 className="dialog-title">ルーム参加</h2>
              <button
                className="close-button"
                onClick={() => setIsJoinDialogOpen(false)}
              >
                ✕
              </button>
            </div>
            <div className="dialog-body">
              <RoomJoinForm />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Top;
