import type { FrameDef } from './types'

const JP: Record<string, string> = {
  go: '行きたいのですが', see: '見たいのですが', try: '試したいのですが', check: '確認したいのですが', ask: 'お聞きしたいのですが',
  know: '知りたいのですが', pay: 'お支払いしたいのですが', buy: '買いたいのですが', meet: 'お会いしたいのですが',
  talk: 'お話ししたいのですが', start: '始めたいのですが', leave: '失礼したいのですが', eat: '食べたいのですが',
  drink: '飲みたいのですが', read: '読みたいのですが', learn: '学びたいのですが', help: 'お手伝いしたいのですが',
  use: '使いたいのですが', take: 'いただきたいのですが', watch: '見たいのですが', come: '伺いたいのですが', look: '見てみたいのですが',
  apply: '応募したいのですが', attend: '出席したいのですが', confirm: '確認したいのですが', explain: 'ご説明したいのですが',
  discuss: 'ご相談したいのですが', suggest: 'ご提案したいのですが', prepare: '準備したいのですが', arrange: '手配したいのですが',
  cancel: 'キャンセルしたいのですが', improve: '上達したいのですが', consider: '検討したいのですが', borrow: 'お借りしたいのですが',
  mention: 'ひとこと申し上げたいのですが', apologize: 'お詫びしたいのですが', relax: 'ゆっくりしたいのですが', succeed: '成功したいのですが',
}

/** I'd like to ___.（〜したいのですが） */
export const idlike: FrameDef = {
  frame: { id: 'idlike', tpl: "I'd like to ___.", jp: '〜したいのですが（丁寧）', slot: 'verb' },
  ok: {
    beginner: ['go', 'see', 'try', 'check', 'ask', 'know', 'pay', 'buy', 'meet', 'talk', 'start', 'leave', 'eat', 'drink', 'read', 'learn', 'help', 'use', 'take', 'watch', 'come', 'look'],
    intermediate: ['apply', 'attend', 'confirm', 'explain', 'discuss', 'suggest', 'prepare', 'arrange', 'cancel', 'improve', 'consider', 'borrow', 'mention', 'apologize', 'relax', 'succeed'],
  },
  jp: (w, en) => JP[en] ?? `${w}（したいのですが）`,
  kana: 'アイド ライク トゥ ___',
  grammar: {
    meaning:
      "I'd like to ___. は I would like to の短縮形で、I want to（〜したい）の丁寧な言い方。「〜したいのですが」「〜させていただきたいです」にあたり、店・ホテル・仕事の場面で安心して使えます。",
    scenes: [
      'お店やホテル・病院で希望を伝える（I’d like to check in. / I’d like to pay.）',
      '仕事で申し出る（I’d like to confirm. 確認したいのですが）',
      '初対面や目上の人に希望を言う',
    ],
    examples: [
      { en: "I'd like to pay.", jp: 'お会計をお願いしたいのですが' },
      { en: "I'd like to try.", jp: '試してみたいのですが' },
      { en: "I'd like to confirm.", jp: '確認させていただきたいのですが' },
    ],
    tips: [
      'I’d の ’d は would。「私は〜が好きです（I like）」とは別の表現なので混同しない',
      '名詞を続けるなら I’d like ___.（I’d like a coffee. コーヒーをください）',
      '発音は「アイドライク」。I like（アイライク）と聞き分けが難しいので d を意識する',
      'I wanna（くだけた）→ I want to（普通）→ I’d like to（丁寧）の 3 段階で覚える',
    ],
    polite: 'これ自体が丁寧な言い方。さらに丁寧なら I would like to ___, please.',
  },
}
