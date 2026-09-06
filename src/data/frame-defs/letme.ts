import type { FrameDef } from './types'

const JP: Record<string, string> = {
  see: 'ちょっと見せて（えーっと）', check: '確認させて', think: '考えさせて', try: 'やらせて', help: '手伝わせて',
  know: '知らせてね（教えてね）', ask: '聞かせて', call: '電話させて', look: '見せて', pay: '払わせて（おごるよ）',
  go: '行かせて', sleep: '寝かせて', talk: '話させて', read: '読ませて', open: '開けさせて',
  explain: '説明させて', confirm: '確認させて', consider: '検討させて', prepare: '準備させて', handle: '対処させて（任せて）',
  organize: '整理させて', describe: '説明させて', apologize: '謝らせて', suggest: '提案させて', arrange: '手配させて',
}

/** Let me ___.（〜させて） */
export const letme: FrameDef = {
  frame: { id: 'letme', tpl: 'Let me ___.', jp: '〜させて', slot: 'verb' },
  ok: {
    beginner: ['see', 'check', 'think', 'try', 'help', 'know', 'ask', 'call', 'look', 'pay', 'go', 'sleep', 'talk', 'read', 'open'],
    intermediate: ['explain', 'confirm', 'consider', 'prepare', 'handle', 'organize', 'describe', 'apologize', 'suggest', 'arrange'],
  },
  jp: (w, en) => JP[en] ?? `${w}（させて）`,
  kana: 'レット ミー ___',
  grammar: {
    meaning:
      'Let me ___.（私に〜させて）は、自分がこれからすることを相手に軽く断る言い方。Let（〜させる）+ me（私に）+ 動詞の原形で、「ちょっと〜させて」「〜するね」というニュアンスです。',
    scenes: [
      '考える・確認する時間がほしいとき（Let me see. / Let me check.）',
      '手伝いや支払いを申し出る（Let me help. / Let me pay.）',
      '「分かったら教えて」と頼む（Let me know.）',
    ],
    examples: [
      { en: 'Let me check.', jp: 'ちょっと確認させて' },
      { en: 'Let me know.', jp: '分かったら教えてね' },
      { en: 'Let me help.', jp: '手伝わせて' },
    ],
    tips: [
      'Let me see. は「えーっと」と考えるときの口ぐせにもなる',
      'Let me know. は「知らせて」＝「教えてね」。相手に頼む定番',
      'Let’s ___. は「一緒に〜しよう」、Let me ___. は「私が〜するね」で主語が違う',
      '後ろは動詞の原形。Let me to check は ×',
    ],
    polite: 'Please let me ___. / Allow me to ___.（〜させてください）',
  },
}
