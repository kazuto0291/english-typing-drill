import type { FrameDef } from './types'

const JP: Record<string, string> = {
  good: 'よさそう', great: 'すごくよさそう', nice: '素敵に見える', fun: '楽しそう', hard: '難しそう', easy: '簡単そう',
  ok: '大丈夫そう', fine: '問題なさそう', right: '合ってそう', wrong: '間違ってそう', cold: '寒そう（冷たそう）',
  hot: '暑そう（熱そう）', ready: '準備できてそう', busy: '混んでそう', sad: '悲しそう',
  difficult: '難しそう', expensive: '高そう', impressive: '印象的に見える', perfect: '完璧に見える', comfortable: '快適そう',
  popular: '人気ありそう', serious: '深刻そう', professional: 'プロっぽく見える', reasonable: '妥当に見える', obvious: '明らかに見える',
}

/** It looks ___.（〜に見える） */
export const itlooks: FrameDef = {
  frame: { id: 'itlooks', tpl: 'It looks ___.', jp: '〜に見える／〜そう（見た感想）', slot: 'adj' },
  ok: {
    beginner: ['good', 'great', 'nice', 'fun', 'hard', 'easy', 'ok', 'fine', 'right', 'wrong', 'cold', 'hot', 'ready', 'busy', 'sad'],
    intermediate: ['difficult', 'expensive', 'impressive', 'perfect', 'comfortable', 'popular', 'serious', 'professional', 'reasonable', 'obvious'],
  },
  jp: (w, en) => JP[en] ?? `${w}に見える`,
  kana: 'イット ルックス ___',
  grammar: {
    meaning:
      'It looks ___.（それは〜に見える）は、見た目からの感想や推測を言う型。look は「〜に見える」で、後ろに形容詞を置きます。It’s ___.（〜だ）と断定するより「見た感じ〜そう」とやわらかく言えます。',
    scenes: [
      '料理・服・場所の見た目をほめる（It looks good. / It looks nice.）',
      '状況を見て推測する（It looks busy. 混んでそう / It looks hard. 難しそう）',
      '出来上がりを確認する（It looks ready. できてるみたい）',
    ],
    examples: [
      { en: 'It looks good.', jp: 'よさそう（おいしそう）' },
      { en: 'It looks easy.', jp: '簡単そう' },
      { en: 'It looks expensive.', jp: '高そう' },
    ],
    tips: [
      '人なら You look ___.（You look tired. 疲れてるみたいだね）。ほめるときに便利',
      '名詞を続けるなら like を挟む（It looks like rain. 雨が降りそう）',
      '聞いた感想は It sounds ___.、味は It tastes ___.、触った感じは It feels ___.',
      'looks good は「見た目がいい」「おいしそう」「順調そう」と幅広く使える',
    ],
    polite: 'It looks ___ to me.（私には〜に見えます）と to me を付けると控えめになる',
  },
}
