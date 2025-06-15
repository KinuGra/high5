export type QuestionData = {
  question: string;
  choices: string[];
};

export async function GET(req: Request, res: Response) {
  // 抽選処理
  const questionIndex = Math.floor(Math.random() * questions.length);
  console.log(questionIndex)
  return Response.json(
    questions[questionIndex],
    { status: 200 }
  );
}

const questions = [
  {
    question: "この中でなれるとしたらなりたいものは？",
    choices: ["大統領", "スーパーヒーロー", "寿司屋さん", "イラストレーター"],
  },
  {
    question: "休日にするなら？",
    choices: ["ランニング", "カフェでゆっくり", "家でのんびり", "キャンプ"],
  },
  {
    question: "ドラえもんのひみつ道具で一番欲しいのは？",
    choices: ["どこでもドア", "もしもボックス", "タケコプター", "空気砲"],
  },
]