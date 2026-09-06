import type { FrameDef } from './types'

const JP: Record<string, string> = {
  fine: '問題ないよ', free: '無料だよ', ready: '準備できてるよ', busy: '混んでるよ', ok: '大丈夫だよ',
  hot: '暑いね（熱いよ）', cold: '寒いね（冷たいよ）', available: '空いてるよ（使えるよ）',
  necessary: '必要だよ', obvious: '明らかだよ', possible: '可能だよ', popular: '人気だよ',
}

/** It's ___.（それは〜だ） */
export const its: FrameDef = {
  frame: { id: 'its', tpl: "It's ___.", jp: 'それは〜だ', slot: 'adj' },
  ok: {
    beginner: ['good', 'ok', 'fine', 'great', 'true', 'fun', 'hard', 'easy', 'right', 'wrong', 'nice', 'sad', 'hot', 'cold', 'free', 'ready', 'busy'],
    intermediate: ['available', 'comfortable', 'difficult', 'expensive', 'impressive', 'necessary', 'obvious', 'perfect', 'popular', 'possible', 'reasonable', 'serious', 'professional'],
  },
  jp: (w, en) => JP[en] ?? (w.endsWith('い') ? `${w}よ` : `${w}だよ`),
  kana: 'イッツ ___',
  grammar: {
    meaning:
      "It's は It is の短縮形。it は「それ」「今話しているもの・状況」を指し、後ろに形容詞を置くと「それは〜だ」という感想や説明になります。天気（It's hot.）や時間・値段にも使う万能の主語です。",
    scenes: [
      '食べ物・映画・場所などの感想を一言で言う（It’s good. / It’s nice.）',
      '天気や部屋の温度を言う（It’s hot. / It’s cold.）',
      '相手を安心させる（It’s ok. / It’s fine. 大丈夫だよ）',
    ],
    examples: [
      { en: "It's easy.", jp: '簡単だよ' },
      { en: "It's free.", jp: '無料だよ' },
      { en: "It's hot today.", jp: '今日は暑いね' },
    ],
    tips: [
      'I think it’s ___. の I think を外すと、より断定的な言い方になる',
      '否定は It’s not ___.（It’s not hard. 難しくないよ）',
      '疑問は Is it ___?（Is it free? 無料ですか）',
      '人には使わない。人なら He’s ___. / She’s ___.',
    ],
    polite: "It seems ___.（〜のようです）と言うと断定を避けられる",
  },
}
