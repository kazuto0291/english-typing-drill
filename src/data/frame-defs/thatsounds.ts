import type { FrameDef } from './types'

const JP: Record<string, string> = {
  good: 'いいね', great: '最高だね', fun: '楽しそう', hard: '大変そう', easy: '簡単そう', nice: 'いいね', right: '合ってそう',
  wrong: 'なんか違いそう', sad: '悲しいね', ok: 'まあいいね', fine: '問題なさそう',
  difficult: '難しそう', expensive: '高そう', impressive: 'すごそう', perfect: '完璧だね', reasonable: '妥当だね',
  serious: '深刻そう', possible: 'できそう', comfortable: '快適そう',
}

/** That sounds ___.（それは〜そうだね） */
export const thatsounds: FrameDef = {
  frame: { id: 'thatsounds', tpl: 'That sounds ___.', jp: 'それは〜そうだね（聞いた感想）', slot: 'adj' },
  ok: {
    beginner: ['good', 'great', 'fun', 'hard', 'easy', 'nice', 'right', 'wrong', 'sad', 'ok', 'fine'],
    intermediate: ['difficult', 'expensive', 'impressive', 'perfect', 'reasonable', 'serious', 'possible', 'comfortable'],
  },
  jp: (w, en) => JP[en] ?? `${w}そうだね`,
  kana: 'ザット サウンズ ___',
  grammar: {
    meaning:
      'That sounds ___.（それは〜そうだね）は、相手の話を聞いて感想を返す型。sound は「〜に聞こえる」で、「話を聞いた限りでは〜だね」というニュアンスです。あいづちとして会話をつなぐのにとても便利です。',
    scenes: [
      '誘いや提案に賛成する（That sounds good. いいね）',
      '相手の話に共感する（That sounds hard. 大変そうだね）',
      '計画を聞いて感想を言う（That sounds fun. 楽しそう）',
    ],
    examples: [
      { en: 'That sounds good.', jp: 'いいね' },
      { en: 'That sounds fun.', jp: '楽しそう' },
      { en: 'That sounds hard.', jp: '大変そうだね' },
    ],
    tips: [
      'Sounds good. と That を省いてもよい（会話では省くほうが多い）',
      '「見た目」の感想なら That looks ___.、「味」なら That tastes ___.',
      '名詞を続けるなら like を挟む（That sounds like a plan. いい計画だね）',
      '断るときのクッションにも使える（That sounds fun, but I’m busy.）',
    ],
    polite: 'That sounds wonderful.（それは素晴らしいですね）は褒めるときに便利',
  },
}
