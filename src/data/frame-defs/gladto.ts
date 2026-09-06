import type { FrameDef } from './types'

const JP: Record<string, string> = {
  help: '手伝えてうれしい（お役に立てて何より）', know: '知れてよかった', come: '来られてうれしい', learn: '学べてうれしい',
  work: '働けてうれしい', talk: '話せてうれしい', start: '始められてうれしい', meet: '会えてうれしい', see: '会えてうれしい',
  attend: '出席できてうれしい', succeed: '成功できてうれしい', improve: '上達できてうれしい', discover: '発見できてうれしい',
  apply: '応募できてうれしい', respond: '返答できてうれしい', support: '支えられてうれしい', achieve: '達成できてうれしい',
}

/** I'm glad to ___.（〜できてうれしい） */
export const gladto: FrameDef = {
  frame: { id: 'gladto', tpl: "I'm glad to ___.", jp: '〜できてうれしい', slot: 'verb' },
  ok: {
    beginner: ['help', 'know', 'come', 'learn', 'work', 'talk', 'start', 'meet', 'see'],
    intermediate: ['attend', 'succeed', 'improve', 'discover', 'apply', 'respond', 'support', 'achieve'],
  },
  // meet / see は「誰に」が要るので you を付ける
  wordForm: { meet: 'meet you', see: 'see you' },
  jp: (w, en) => JP[en] ?? `${w}（できてうれしい）`,
  kana: 'アイム グラッド トゥ ___',
  grammar: {
    meaning:
      "I'm glad to ___.（〜できてうれしい）は、うれしい気持ちとその理由を一度に言う型。glad（うれしい）の後ろに to + 動詞の原形を続けて「〜して／〜できてうれしい」となります。",
    scenes: [
      '人に会ったとき（I’m glad to meet you. / I’m glad to see you. 会えてうれしい）',
      '手伝えたとき（I’m glad to help. お役に立ててうれしいです）',
      'よい知らせを聞いたとき（I’m glad to know. それは知れてよかった）',
    ],
    examples: [
      { en: "I'm glad to meet you.", jp: 'お会いできてうれしいです' },
      { en: "I'm glad to help.", jp: 'お役に立ててうれしいです' },
      { en: "I'm glad to know.", jp: 'それは知れてよかった' },
    ],
    tips: [
      'meet / see は「誰に」が要るので you を付ける（I’m glad to meet you.）',
      'I’m glad. だけでも「よかった」と言える。I’m glad you’re ok.（無事でよかった）',
      'Nice to meet you. と I’m glad to meet you. はほぼ同じ',
      'happy を使うと I’m happy to ___.（喜んで〜します）で、申し出にも使える',
    ],
    polite: "It's a pleasure to ___.（〜できて光栄です）",
  },
}
