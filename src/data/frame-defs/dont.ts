import type { FrameDef } from './types'

const JP: Record<string, string> = {
  go: '行かないで', stop: 'やめないで', wait: '待たないで（先に行って）', look: '見ないで', leave: '行かないで（ここにいて）',
  talk: '話さないで', sleep: '寝ないで', start: 'まだ始めないで', use: '使わないで', open: '開けないで', close: '閉めないで',
  buy: '買わないで', take: '取らないで', watch: '見ないで', play: '遊ばないで', work: '働かないで（休んで）',
  read: '読まないで', say: '言わないで', do: 'やらないで', make: '作らないで', come: '来ないで', ask: '聞かないで',
  eat: '食べないで', drink: '飲まないで', call: '電話しないで', tell: '言わないで（内緒ね）',
  cancel: 'キャンセルしないで', apologize: '謝らないで', complain: '文句を言わないで', argue: '言い合わないで',
  waste: '無駄にしないで', refuse: '断らないで', mention: 'そのことは言わないで', expect: '期待しないで', avoid: '避けないで',
}

/** Don't ___.（〜しないで） */
export const dont: FrameDef = {
  frame: { id: 'dont', tpl: "Don't ___.", jp: '〜しないで', slot: 'verb' },
  ok: {
    beginner: ['go', 'stop', 'wait', 'look', 'leave', 'talk', 'sleep', 'start', 'use', 'open', 'close', 'buy', 'take', 'watch', 'play', 'work', 'read', 'say', 'do', 'make', 'come', 'ask', 'eat', 'drink', 'call', 'tell'],
    intermediate: ['cancel', 'apologize', 'complain', 'argue', 'waste', 'refuse', 'mention', 'expect', 'avoid'],
  },
  jp: (w, en) => JP[en] ?? `${w}（しないで）`,
  kana: 'ドント ___',
  grammar: {
    meaning:
      "Don't ___.（〜しないで）は Do not の短縮形で、相手に「〜するな」「〜しないで」と止める言い方。動詞の原形をそのまま後ろに置くだけです。友達には Don't worry.（心配しないで）のように優しく使えます。",
    scenes: [
      '相手を止める（Don’t go. 行かないで / Don’t open it. 開けないで）',
      '注意する・止める（Don’t use it. それは使わないで）',
      '安心させる・気づかう（Don’t worry. / Don’t apologize. 謝らないで）',
    ],
    examples: [
      { en: "Don't go.", jp: '行かないで' },
      { en: "Don't say it.", jp: 'それは言わないで' },
      { en: "Don't worry.", jp: '心配しないで' },
    ],
    tips: [
      'use / open / take など「何を」が必要な動詞には it が付く（Don’t use it.）',
      '強い命令に聞こえることがあるので、please を付けるとやわらぐ（Please don’t go.）',
      '「〜しよう」の否定は Let’s not ___.、「〜しないほうがいい」は You shouldn’t ___.',
      'Don’t worry. / Don’t mention it.（どういたしまして）は決まり文句として丸ごと覚える',
    ],
    polite: "Please don't ___. / Would you mind not ___ing?（〜しないでいただけますか）",
  },
}
