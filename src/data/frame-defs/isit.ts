import type { FrameDef } from './types'

const JP: Record<string, string> = {
  good: 'いい感じ？', ok: '大丈夫？', fine: '問題ない？', true: '本当？', fun: '楽しい？', hard: '難しい？', easy: '簡単？',
  right: '合ってる？', wrong: '間違ってる？', nice: 'いいやつ？（素敵？）', hot: '熱い？（暑い？）', cold: '冷たい？（寒い？）',
  free: '無料？（空いてる？）', ready: '準備できてる？', busy: '混んでる？',
  available: '空いてる？（使える？）', difficult: '難しい？', expensive: '高い？', necessary: '必要？', obvious: '明らか？',
  perfect: '完璧？', popular: '人気？', possible: '可能？', reasonable: '妥当？', serious: '深刻？', comfortable: '快適？',
}

/** Is it ___?（それは〜？） */
export const isit: FrameDef = {
  frame: { id: 'isit', tpl: 'Is it ___?', jp: 'それは〜？', slot: 'adj' },
  ok: {
    beginner: ['good', 'ok', 'fine', 'true', 'fun', 'hard', 'easy', 'right', 'wrong', 'nice', 'hot', 'cold', 'free', 'ready', 'busy'],
    intermediate: ['available', 'difficult', 'expensive', 'necessary', 'obvious', 'perfect', 'popular', 'possible', 'reasonable', 'serious', 'comfortable'],
  },
  jp: (w, en) => JP[en] ?? `${w}？`,
  kana: 'イズ イット ___？',
  grammar: {
    meaning:
      'Is it ___?（それは〜ですか）は It’s ___.（それは〜だ）を疑問文にした型。物・場所・状況について「〜なの？」と確認するときに使います。',
    scenes: [
      '値段や条件を確認する（Is it free? 無料ですか / Is it expensive? 高い？）',
      '準備や状況を確認する（Is it ready? できてる？）',
      '正しいかどうか聞く（Is it right? 合ってる？ / Is it true? 本当？）',
    ],
    examples: [
      { en: 'Is it free?', jp: '無料ですか' },
      { en: 'Is it ready?', jp: '準備できてる？' },
      { en: 'Is it possible?', jp: '可能ですか' },
    ],
    tips: [
      '答えは Yes, it is. / No, it isn’t.（No, it’s not. も可）',
      'Is it ok? は「大丈夫？」「いい？」と許可を取るときにも使える',
      '人には Is he ___? / Is she ___?、自分のことなら Am I ___?',
      '「〜じゃないの？」と念を押すなら Isn’t it ___?',
    ],
    polite: 'Would it be ___?（〜でしょうか）はやわらかい確認',
  },
}
