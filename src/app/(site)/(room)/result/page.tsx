"use client"
import type React from "react"
import type { FC } from "react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

const players = [
  { name: "mi", score: 5 },
  { name: "taro", score: 8 },
  { name: "yoshida", score: 100 },
]

const styles: { [key: string]: React.CSSProperties } = {
  bgOuter: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #f3e8ff 0%, #fce7f3 25%, #fff1f2 50%, #fef3c7 75%, #f0f9ff 100%)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "32px 16px",
    position: "relative",
    overflow: "hidden",
  },
  floatingElement1: {
    position: "absolute",
    top: "10%",
    left: "15%",
    fontSize: "2rem",
    animation: "float 3s ease-in-out infinite",
    opacity: 0.7,
  },
  floatingElement2: {
    position: "absolute",
    top: "20%",
    right: "20%",
    fontSize: "1.5rem",
    animation: "float 4s ease-in-out infinite 1s",
    opacity: 0.6,
  },
  floatingElement3: {
    position: "absolute",
    bottom: "15%",
    left: "10%",
    fontSize: "2.5rem",
    animation: "float 3.5s ease-in-out infinite 2s",
    opacity: 0.8,
  },
  floatingElement4: {
    position: "absolute",
    bottom: "25%",
    right: "15%",
    fontSize: "1.8rem",
    animation: "float 2.5s ease-in-out infinite 0.5s",
    opacity: 0.5,
  },
  cardOuter: {
    background: "rgba(255,255,255,0.95)",
    borderRadius: 32,
    boxShadow: "0 20px 60px 0 rgba(236,72,153,0.15), 0 0 0 1px rgba(255,255,255,0.8)",
    padding: 40,
    maxWidth: 480,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
    backdropFilter: "blur(10px)",
    animation: "slideUp 0.6s ease-out",
  },
  titleContainer: {
    position: "relative",
    marginBottom: 16,
  },
  title: {
    fontSize: "1.8rem",
    fontWeight: 800,
    color: "#fff",
    background: "linear-gradient(135deg, #ec4899 0%, #f97316 50%, #eab308 100%)",
    borderRadius: 20,
    padding: "12px 24px",
    textAlign: "center",
    boxShadow: "0 8px 25px 0 rgba(236,72,153,0.3)",
    textShadow: "0 2px 4px rgba(0,0,0,0.1)",
    position: "relative",
    overflow: "hidden",
  },
  titleDecoration: {
    position: "absolute",
    top: "-50%",
    left: "-50%",
    width: "200%",
    height: "200%",
    background: "linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.2) 50%, transparent 70%)",
    animation: "shimmer 2s infinite",
  },
  subtitle: {
    fontSize: "1.2rem",
    color: "#ec4899",
    marginBottom: 32,
    fontWeight: 600,
    textAlign: "center",
  },
  resultCard: {
    width: "100%",
    background: "linear-gradient(135deg, #fff 0%, #fef7ff 100%)",
    borderRadius: 24,
    boxShadow: "0 8px 32px 0 rgba(236,72,153,0.1)",
    padding: 28,
    marginBottom: 24,
    border: "2px solid rgba(236,72,153,0.1)",
  },
  summaryCard: {
    width: "100%",
    background: "linear-gradient(135deg, #fff 0%, #f8fafc 100%)",
    borderRadius: 24,
    boxShadow: "0 8px 32px 0 rgba(168,139,250,0.1)",
    padding: 28,
    marginBottom: 24,
    border: "2px solid rgba(168,139,250,0.1)",
  },
  cardHeader: {
    textAlign: "center",
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: "1.3rem",
    fontWeight: 700,
    color: "#ec4899",
    margin: 0,
  },
  cardTitle2: {
    fontSize: "1.3rem",
    fontWeight: 700,
    color: "#a78bfa",
    margin: 0,
  },
  list: {
    width: "100%",
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  listItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "linear-gradient(135deg, #fce7f3 0%, #fef3c7 50%, #e0f2fe 100%)",
    borderRadius: 18,
    padding: "16px 20px",
    marginBottom: 12,
    boxShadow: "0 4px 12px 0 rgba(236,72,153,0.08)",
    border: "1px solid rgba(255,255,255,0.5)",
    animation: "slideInLeft 0.5s ease-out forwards",
    opacity: 0,
    transform: "translateX(-20px)",
    transition: "all 0.3s ease",
  },
  topPlayer: {
    // background: "linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #ec4899 100%)",
    // boxShadow: "0 8px 25px 0 rgba(251,191,36,0.3)",
    // transform: "scale(1.02)",
  },
  playerInfo: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  rank: {
    fontSize: "1.5rem",
  },
  playerName: {
    fontWeight: 600,
    color: "#374151",
    fontSize: "1.1rem",
  },
  scoreContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "2px",
  },
  playerScore: {
    fontWeight: 800,
    color: "#ec4899",
    fontSize: "1.4rem",
  },
  scoreLabel: {
    fontSize: "0.8rem",
    color: "#6b7280",
    fontWeight: 500,
  },
  summaryContent: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  summaryItem: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "12px 16px",
    background: "rgba(168,139,250,0.05)",
    borderRadius: 12,
    border: "1px solid rgba(168,139,250,0.1)",
  },
  summaryIcon: {
    fontSize: "1.2rem",
  },
  summaryText: {
    color: "#4b5563",
    fontWeight: 500,
    fontSize: "1rem",
  },
  actionButtonGroup: {
    display: "flex",
    gap: "12px", // ボタン間の隙間も少し狭く
    justifyContent: "center",
    marginTop: 12,
    marginBottom: 0,
    flexWrap: "wrap",
  },
  actionButton: {
    background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    color: "white",
    border: "none",
    borderRadius: 16,
    padding: "10px 18px", // 幅を狭く
    fontSize: "0.98rem", // 文字を小さく
    fontWeight: 700,
    cursor: "pointer",
    boxShadow: "0 6px 24px 0 rgba(16,185,129,0.3)",
    transition: "all 0.3s cubic-bezier(.4,2,.6,1) 0s",
    position: "relative",
    overflow: "hidden",
    minWidth: 0,
    whiteSpace: "nowrap",
    maxWidth: "180px",
  },
  actionButtonSecondary: {
    background: "linear-gradient(135deg, #6366f1 0%, #a78bfa 100%)",
    color: "white",
    border: "none",
    borderRadius: 16,
    padding: "10px 18px", // 幅を狭く
    fontSize: "0.98rem", // 文字を小さく
    fontWeight: 700,
    cursor: "pointer",
    boxShadow: "0 6px 24px 0 rgba(99,102,241,0.18)",
    transition: "all 0.3s cubic-bezier(.4,2,.6,1) 0s",
    position: "relative",
    overflow: "hidden",
    minWidth: 0,
    whiteSpace: "nowrap",
    maxWidth: "180px",
  },
}

const Result: FC = () => {
  const maxScore = Math.max(...players.map((p) => p.score))
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score)
  const [showList, setShowList] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setShowList(true)
  }, [])

  return (
    <div style={styles.bgOuter}>
      {/* Floating decorative elements */}
      <div style={styles.floatingElement1}>🎉</div>
      <div style={styles.floatingElement2}>⭐</div>
      <div style={styles.floatingElement3}>🏆</div>
      <div style={styles.floatingElement4}>✨</div>

      <div style={styles.cardOuter}>
        <div style={styles.titleContainer}>
          <h1 style={styles.title}>🎊 最終結果 🎊</h1>
          <div style={styles.titleDecoration}></div>
        </div>
        <p style={styles.subtitle}>みんなの結果を見てみよう！</p>

        <div style={styles.resultCard}>
          <div style={styles.cardHeader}>
            <h2 style={styles.cardTitle}>🏅 みんなの正解数</h2>
          </div>
          <ul style={styles.list}>
            {sortedPlayers.map((player, index) => (
              <li
                key={player.name}
                style={{
                  ...styles.listItem,
                  ...(player.score === maxScore ? styles.topPlayer : {}),
                  animationDelay: `${index * 0.1}s`,
                  ...(showList
                    ? { opacity: 1, transform: "translateX(0)" }
                    : {}),
                }}
              >
                <div style={styles.playerInfo}>
                  <span style={styles.rank}>
                    {index === 0 ? "👑" : index === 1 ? "🥈" : index === 2 ? "🥉" : "🎯"}
                  </span>
                  <span style={styles.playerName}>{player.name}</span>
                </div>
                <div style={styles.scoreContainer}>
                  <span style={styles.playerScore}>{player.score}</span>
                  <span style={styles.scoreLabel}>問正解</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div style={styles.summaryCard}>
          <div style={styles.cardHeader}>
            <h2 style={styles.cardTitle2}>📊 質問セットサマリー</h2>
          </div>
          <div style={styles.summaryContent}>
            <div style={styles.summaryItem}>
              <span style={styles.summaryIcon}>📝</span>
              <span style={styles.summaryText}>全{players.length}名が参加しました</span>
            </div>
            <div style={styles.summaryItem}>
              <span style={styles.summaryIcon}>🎯</span>
              <span style={styles.summaryText}>
                平均正解数: {Math.round(players.reduce((sum, p) => sum + p.score, 0) / players.length)}問
              </span>
            </div>
            <div style={styles.summaryItem}>
              <span style={styles.summaryIcon}>🌟</span>
              <span style={styles.summaryText}>最高得点: {maxScore}問</span>
            </div>
          </div>
        </div>

        <div style={styles.actionButtonGroup}>
          <button
            style={styles.actionButtonSecondary}
            onClick={() => router.push("/")}
            onMouseOver={e => {
              e.currentTarget.style.transform = "scale(1.08)";
              e.currentTarget.style.boxShadow = "0 12px 32px 0 rgba(99,102,241,0.28)";
              e.currentTarget.style.background = "linear-gradient(135deg, #818cf8 0%, #a78bfa 100%)";
            }}
            onMouseOut={e => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = styles.actionButtonSecondary.boxShadow as string;
              e.currentTarget.style.background = styles.actionButtonSecondary.background as string;
            }}
          >
            🏠 トップに戻る
          </button>
          <button
            style={styles.actionButton}
            onClick={() => router.refresh()}
            onMouseOver={e => {
              e.currentTarget.style.transform = "scale(1.08)";
              e.currentTarget.style.boxShadow = "0 12px 32px 0 rgba(16,185,129,0.38)"; // シャドウも緑系に
              e.currentTarget.style.background = "linear-gradient(135deg, #34d399 0%, #059669 100%)"; // ホバー時も緑系
            }}
            onMouseOut={e => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = styles.actionButton.boxShadow as string;
              e.currentTarget.style.background = styles.actionButton.background as string;
            }}
          >
            🔄 もう一度遊ぶ
          </button>
        </div>
      </div>
      <style>{`
        @keyframes float {
          0% { transform: translateY(0); }
          50% { transform: translateY(-16px); }
          100% { transform: translateY(0); }
        }
        @keyframes slideUp {
          0% { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInLeft {
          0% { opacity: 0; transform: translateX(-20px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </div>
  )
}

export default Result
