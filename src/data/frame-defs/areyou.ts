import type { FrameDef } from './types'

const JP: Record<string, string> = {
  ok: '大丈夫？', fine: '元気？', happy: 'うれしい？', sad: '悲しいの？', hot: '暑い？', cold: '寒い？',
  tired: '疲れてる？', busy: '忙しい？', ready: '準備できた？', free: '暇？（時間ある？）', sure: '本当に？（確か？）',
  available: '都合つく？', confident: '自信ある？', comfortable: '居心地いい？', curious: '気になる？',
  excited: 'わくわくしてる？', nervous: '緊張してる？', serious: '本気？',
}

/** Are you ___?（あなたは〜？） */
export const areyou: FrameDef = {
  frame: { id: 'areyou', tpl: 'Are you ___?', jp: 'あなたは〜？（状態を聞く）', slot: 'adj' },
  ok: {
    beginner: ['ok', 'fine', 'happy', 'sad', 'hot', 'cold', 'tired', 'busy', 'ready', 'free', 'sure'],
    intermediate: ['available', 'confident', 'comfortable', 'curious', 'excited', 'nervous', 'serious'],
  },
  jp: (w, en) => JP[en] ?? `${w}？`,
  kana: 'アー ユー ___？',
  grammar: {
    meaning:
      'You are ___.（あなたは〜だ）の語順を入れ替えると Are you ___?（あなたは〜？）という質問になります。相手の状態・気持ち・都合を聞く型です。',
    scenes: [
      '相手を気づかう（Are you ok? 大丈夫？ / Are you tired? 疲れてる？）',
      '出発前や作業前に確認する（Are you ready? 準備できた？）',
      '予定を合わせる（Are you free? 時間ある？ / Are you busy? 忙しい？）',
    ],
    examples: [
      { en: 'Are you ok?', jp: '大丈夫？' },
      { en: 'Are you ready?', jp: '準備できた？' },
      { en: 'Are you sure?', jp: '本当に？' },
    ],
    tips: [
      '答えは Yes, I am. / No, I’m not.（Yes, I’m. とは言わない）',
      '語尾を上げて言うと質問になる。書くときは最後に ? を付ける',
      'Are you sure? は「本当にいいの？」と念を押す定番フレーズ',
      '自分のことを言う I’m ___. とセットで覚えると会話になる',
    ],
    polite: 'Are you ___ by any chance?（ひょっとして〜ですか）',
  },
}
