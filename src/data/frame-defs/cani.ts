import type { FrameDef } from './types'

const JP: Record<string, string> = {
  go: '行ってもいい？', see: '見てもいい？', come: '行ってもいい？（そっちに）', try: 'やってみてもいい？', help: '手伝ってもいい？',
  ask: '聞いてもいい？', use: '使ってもいい？', take: '取ってもいい？（もらってもいい？）', start: '始めてもいい？',
  stop: 'やめてもいい？', leave: '帰ってもいい？', look: '見てもいい？', eat: '食べてもいい？', drink: '飲んでもいい？',
  read: '読んでもいい？', write: '書いてもいい？', open: '開けてもいい？', close: '閉めてもいい？', pay: '払ってもいい？（払いましょうか）',
  check: '確認してもいい？', watch: '見てもいい？', play: '遊んでもいい？', sleep: '寝てもいい？', talk: '話してもいい？',
  call: '電話してもいい？',
  apply: '応募してもいい？', attend: '出席してもいい？', borrow: '借りてもいい？', cancel: 'キャンセルしてもいい？',
  confirm: '確認してもいい？', explain: '説明してもいい？', respond: '返答してもいい？', suggest: '提案してもいい？',
  relax: 'のんびりしてもいい？', prepare: '準備してもいい？', discuss: '話し合ってもいい？', replace: '取り替えてもいい？',
}

/** Can I ___?（〜してもいい？） */
export const cani: FrameDef = {
  frame: { id: 'cani', tpl: 'Can I ___?', jp: '〜してもいい？（許可）', slot: 'verb' },
  ok: {
    beginner: ['go', 'see', 'come', 'try', 'help', 'ask', 'use', 'take', 'start', 'stop', 'leave', 'look', 'eat', 'drink', 'read', 'write', 'open', 'close', 'pay', 'check', 'watch', 'play', 'sleep', 'talk', 'call'],
    intermediate: ['apply', 'attend', 'borrow', 'cancel', 'confirm', 'explain', 'respond', 'suggest', 'relax', 'prepare', 'discuss', 'replace'],
  },
  jp: (w, en) => JP[en] ?? `${w}（してもいい？）`,
  kana: 'キャナイ ___？',
  grammar: {
    meaning:
      'Can I ___?（私は〜できる？）は「〜してもいい？」と許可をもらう言い方。Can you ___?（〜してくれる？）が相手にお願いするのに対し、こちらは自分がすることの許可を取ります。',
    scenes: [
      '店や人の家で「使っていい？」「見てもいい？」と許可を取る',
      '会話に入るとき（Can I ask? 聞いてもいい？）',
      '退席や休憩（Can I go? / Can I leave? もう帰ってもいい？）',
    ],
    examples: [
      { en: 'Can I use it?', jp: 'これ使ってもいい？' },
      { en: 'Can I ask?', jp: 'ちょっと聞いてもいい？' },
      { en: 'Can I try?', jp: 'やってみてもいい？' },
    ],
    tips: [
      'use / take / open など「何を」が必要な動詞には it（それを）が付く',
      '許可の返事は Sure. / Go ahead.（どうぞ）、断るなら Sorry, you can’t.',
      'Can I get ___? は「〜をもらえる？」、Can I have ___? もほぼ同じ',
      'May I ___? はより丁寧でかしこまった言い方（May I come in? 入ってもいいですか）',
    ],
    polite: 'Could I ___? / May I ___?（〜してもよろしいですか）',
  },
}
