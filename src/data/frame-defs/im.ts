import type { FrameDef } from './types'

const JP: Record<string, string> = {
  good: '元気だよ（大丈夫だよ）', ok: '大丈夫', fine: '元気だよ', great: '最高の気分', happy: 'うれしい',
  sad: '悲しい', hot: '暑い', cold: '寒い', tired: '疲れた', busy: '忙しい', ready: '準備できた',
  free: '暇だよ', sure: '確かだよ（自信ある）', right: '私が正しい', wrong: '私が間違ってた',
  available: '空いてるよ（都合つくよ）', confident: '自信がある', comfortable: '落ち着いてる（快適だよ）',
  curious: '気になる', excited: 'わくわくしてる', grateful: '感謝してる', nervous: '緊張してる',
  responsible: '私に責任がある', serious: '本気だよ',
}

/** I'm ___.（私は〜です） */
export const im: FrameDef = {
  frame: { id: 'im', tpl: "I'm ___.", jp: '私は〜です（今の状態）', slot: 'adj' },
  ok: {
    beginner: ['good', 'ok', 'fine', 'great', 'happy', 'sad', 'hot', 'cold', 'tired', 'busy', 'ready', 'free', 'sure', 'right', 'wrong'],
    intermediate: ['available', 'confident', 'comfortable', 'curious', 'excited', 'grateful', 'nervous', 'responsible', 'serious'],
  },
  jp: (w, en) => JP[en] ?? `私は${w}`,
  kana: 'アイム ___',
  grammar: {
    meaning:
      "I'm は I am の短縮形。「私は〜です」と、今の自分の状態や気持ちを伝える一番基本の型です。後ろに形容詞（tired / busy / ready）を置くだけで文になります。",
    scenes: [
      '「元気？」と聞かれて答える（I’m fine. / I’m good.）',
      '今の気持ちや体調を伝える（I’m tired. 疲れた）',
      '準備できた・忙しいなど、状況を一言で知らせる',
    ],
    examples: [
      { en: "I'm tired.", jp: '疲れた' },
      { en: "I'm ready.", jp: '準備できたよ' },
      { en: "I'm sure.", jp: '間違いないよ' },
    ],
    tips: [
      '日本語では主語を省くが、英語では I を必ず言う（Tired. だけだと不自然）',
      'I’m good. は「元気」のほかに「結構です（いりません）」の意味でも使う',
      '否定は I’m not ___.（I’m not sure. よく分からない）',
      '過去の状態は I was ___.（I was busy. 忙しかった）',
    ],
    polite: "I'm a little ___.（少し〜です）と a little を付けるとやわらかくなる",
  },
}
