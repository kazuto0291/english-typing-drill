import type { FrameDef } from './types'

const JP: Record<string, string> = {
  try: 'やってみない？', go: '行かない？', eat: '食べに行かない？', drink: '飲みに行かない？', walk: '歩かない？',
  play: '遊ばない？', talk: '話さない？', start: '始めない？', stop: 'やめない？', meet: '会わない？', work: '作業しない？',
  read: '読まない？', wait: '待たない？', check: '確認しない？', ask: '聞いてみない？', call: '電話してみない？',
  relax: 'のんびりしない？', discuss: '話し合わない？', prepare: '準備しない？', organize: '整理しない？', focus: '集中しない？',
  arrange: '手配しない？', consider: '検討しない？', compare: '比べてみない？', decide: '決めない？', improve: '改善しない？',
  attend: '出席しない？', apply: '応募しない？', cancel: 'キャンセルしない？',
}

/** Why don't we ___?（〜しない？） */
export const whydontwe: FrameDef = {
  frame: { id: 'whydontwe', tpl: "Why don't we ___?", jp: '〜しない？（一緒にの提案）', slot: 'verb' },
  ok: {
    beginner: ['try', 'go', 'eat', 'drink', 'walk', 'play', 'talk', 'start', 'stop', 'meet', 'work', 'read', 'wait', 'check', 'ask', 'call'],
    intermediate: ['relax', 'discuss', 'prepare', 'organize', 'focus', 'arrange', 'consider', 'compare', 'decide', 'improve', 'attend', 'apply', 'cancel'],
  },
  jp: (w, en) => JP[en] ?? `${w}のはどう？`,
  kana: 'ワイ ドント ウィー ___？',
  grammar: {
    meaning:
      "Why don't we ___?（なぜ私たちは〜しないの？）は、直訳ではなく「〜しない？」「〜しようよ」と一緒に何かをする提案の決まり文句。Let's ___. よりも相手の意向を聞くやわらかい言い方です。",
    scenes: [
      '食事や外出に誘う（Why don’t we eat? 食べに行かない？）',
      '行き詰まったときの提案（Why don’t we try? やってみない？）',
      '会議で次の行動を提案する（Why don’t we discuss it? 話し合いませんか）',
    ],
    examples: [
      { en: "Why don't we try it?", jp: 'やってみない？' },
      { en: "Why don't we go?", jp: '行かない？' },
      { en: "Why don't we relax?", jp: 'ちょっとのんびりしない？' },
    ],
    tips: [
      '理由を聞いているのではない。返事は Sure! / Good idea. / Sounds good.',
      '相手だけに勧めるなら Why don’t you ___?（〜したら？）',
      'Let’s ___.（〜しよう）→ Why don’t we ___?（〜しない？）→ Shall we ___?（〜しましょうか）の順で丁寧',
      '発音は「ワイドンウィ」とつながる',
    ],
    polite: 'Shall we ___? / Would you like to ___ together?（一緒に〜しませんか）',
  },
}
