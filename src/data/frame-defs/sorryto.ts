import type { FrameDef } from './types'

const JP: Record<string, string> = {
  ask: 'お聞きしてすみません', call: '電話してすみません', say: '言ってしまってすみません', leave: '先に失礼します',
  come: '急に来てすみません', bother: 'お邪魔してすみません', tell: 'お伝えするのは心苦しいのですが',
  cancel: 'キャンセルしてすみません', complain: '文句を言ってすみません', mention: 'そのことを言ってすみません',
  refuse: 'お断りしてすみません', admit: '認めるのは残念ですが', argue: '言い合ってごめん', apologize: '謝るのが遅れてごめん',
}

/** I'm sorry to ___.（〜してすみません） */
export const sorryto: FrameDef = {
  frame: { id: 'sorryto', tpl: "I'm sorry to ___.", jp: '〜してすみません', slot: 'verb' },
  ok: {
    beginner: ['ask', 'call', 'say', 'leave', 'come', 'tell'],
    intermediate: ['cancel', 'complain', 'mention', 'refuse', 'admit', 'argue'],
  },
  // say / tell は「何を・誰に」が要るので it / you を付ける
  wordForm: { say: 'say it', tell: 'tell you' },
  jp: (w, en) => JP[en] ?? `${w}（してすみません）`,
  kana: 'アイム ソーリー トゥ ___',
  grammar: {
    meaning:
      "I'm sorry to ___.（〜してすみません）は、これからする（今している）ことについて先に謝る型。sorry の後ろに to + 動詞の原形を続けます。「お手数ですが」「恐縮ですが」のクッション言葉として便利です。",
    scenes: [
      '質問や電話の前置き（I’m sorry to ask. お聞きしてすみませんが）',
      '先に帰るとき（I’m sorry to leave. 先に失礼します）',
      '悪い知らせを伝えるとき（I’m sorry to tell you. 言いにくいのですが）',
    ],
    examples: [
      { en: "I'm sorry to ask.", jp: 'お聞きしてすみませんが' },
      { en: "I'm sorry to leave.", jp: '先に失礼します' },
      { en: "I'm sorry to cancel.", jp: 'キャンセルしてすみません' },
    ],
    tips: [
      'I’m sorry to bother you.（お邪魔してすみません）は話しかけるときの最頻出フレーズ',
      'すでに終わったことへの謝罪は I’m sorry for ___ing.（I’m sorry for being late. 遅れてすみません）',
      'I’m sorry to hear that.（それはお気の毒に）は同情を表す決まり文句で、謝罪ではない',
      '軽い謝りは Sorry to ___. と I’m を省いてもよい',
    ],
    polite: 'I apologize for ___.（〜についてお詫び申し上げます）',
  },
}
