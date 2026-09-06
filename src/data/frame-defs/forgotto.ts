import type { FrameDef } from './types'

const JP: Record<string, string> = {
  call: '電話し忘れた', ask: '聞き忘れた', check: '確認し忘れた', pay: '払い忘れた', buy: '買い忘れた', bring: '持ってくるのを忘れた',
  close: '閉め忘れた', send: '送り忘れた', say: '言い忘れた', write: '書き忘れた', read: '読み忘れた', eat: '食べ忘れた',
  take: '持っていくのを忘れた', do: 'やり忘れた', tell: '伝え忘れた',
  confirm: '確認し忘れた', cancel: 'キャンセルし忘れた', mention: '言い忘れた', prepare: '準備し忘れた', apologize: '謝り忘れた',
  respond: '返信し忘れた', attend: '出席し忘れた', apply: '応募し忘れた', organize: '整理し忘れた', replace: '取り替え忘れた',
}

/** I forgot to ___.（〜し忘れた） */
export const forgotto: FrameDef = {
  frame: { id: 'forgotto', tpl: 'I forgot to ___.', jp: '〜し忘れた', slot: 'verb' },
  ok: {
    beginner: ['call', 'ask', 'check', 'pay', 'buy', 'bring', 'close', 'send', 'say', 'write', 'read', 'eat', 'take', 'do', 'tell'],
    intermediate: ['confirm', 'cancel', 'mention', 'prepare', 'apologize', 'respond', 'attend', 'apply', 'organize', 'replace'],
  },
  jp: (w, en) => JP[en] ?? `${w}（し忘れた）`,
  kana: 'アイ フォガット トゥ ___',
  grammar: {
    meaning:
      'I forgot to ___.（〜するのを忘れた）は、やるはずだったことを忘れたと伝える型。forgot は forget（忘れる）の過去形で、後ろに to + 動詞の原形を置きます。',
    scenes: [
      'うっかりミスを報告する（I forgot to call. 電話し忘れた）',
      '持ち物を忘れたとき（I forgot to bring it. 持ってくるのを忘れた）',
      '手続きの抜け（I forgot to confirm. 確認し忘れました）',
    ],
    examples: [
      { en: 'I forgot to call.', jp: '電話し忘れた' },
      { en: 'I forgot to bring it.', jp: 'それを持ってくるのを忘れた' },
      { en: 'I forgot to confirm.', jp: '確認し忘れました' },
    ],
    tips: [
      'forget to ___ は「〜するのを忘れた（していない）」、forget ___ing は「〜したことを忘れた（したのに覚えていない）」',
      '名詞なら I forgot my key.（鍵を忘れた）のように to を付けない',
      'よくある一言: I forgot. / I totally forgot.（すっかり忘れてた）',
      '「忘れないでね」は Don’t forget to ___.',
    ],
    polite: "I'm afraid I forgot to ___.（申し訳ありません、〜し忘れました）",
  },
}
